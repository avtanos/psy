import { NextResponse } from "next/server";
import { z } from "zod";
import { addMinutes } from "date-fns";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { env } from "@/lib/env";
import { notify } from "@/lib/notifications";
import { getAvailableSlots } from "@/lib/scheduling";

const Body = z.object({
  psychologistId: z.string().min(1),
  startAt: z.string().datetime(),
  format: z.enum(["VIDEO", "CHAT"]).default("VIDEO"),
});

export async function POST(req: Request) {
  try {
    const user = await requireUser(["CLIENT"]);
    const body = Body.parse(await req.json());

    const psych = await prisma.psychologistProfile.findUnique({
      where: { id: body.psychologistId },
      include: { user: true },
    });
    if (!psych) {
      return NextResponse.json({ error: "Психолог не найден" }, { status: 404 });
    }
    if (psych.verification !== "VERIFIED") {
      return NextResponse.json(
        { error: "Психолог не прошёл верификацию" },
        { status: 400 }
      );
    }

    const startAt = new Date(body.startAt);
    const endAt = addMinutes(startAt, psych.sessionMinutes);

    // Проверяем, что слот действительно свободен
    const slots = await getAvailableSlots(psych.id, 14);
    const ok = slots.some((s) => s.startAt.getTime() === startAt.getTime());
    if (!ok) {
      return NextResponse.json(
        { error: "Слот уже занят. Выберите другой." },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        clientId: user.id,
        psychologistId: psych.id,
        startAt,
        endAt,
        format: body.format,
        status: "PENDING_PAYMENT",
        pricePerSession: psych.pricePerSession,
        commissionPercent: env.defaultCommissionPercent,
      },
    });

    await notify({
      userId: psych.userId,
      channel: "EMAIL",
      template: "booking_confirmed",
      title: "Новая запись",
      body: `Клиент ${user.displayName} забронировал сессию на ${startAt.toLocaleString("ru-RU")}.`,
      payload: { bookingId: booking.id },
    });

    return NextResponse.json({ bookingId: booking.id });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 500;
    const msg = (err as Error).message;
    if (status === 401) return NextResponse.json({ error: "Требуется вход" }, { status });
    if (status === 403) return NextResponse.json({ error: "Нет доступа" }, { status });
    if (msg === "UNAUTHENTICATED") return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
    console.error(err);
    return NextResponse.json({ error: "Внутренняя ошибка" }, { status: 500 });
  }
}
