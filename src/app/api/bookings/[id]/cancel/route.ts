import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { env } from "@/lib/env";
import { somToTyiyn } from "@/lib/money";
import { notify } from "@/lib/notifications";

const FREE_CANCEL_HOURS = 24;

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireUser();
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { psychologist: true },
    });
    if (!booking) {
      return NextResponse.json({ error: "Запись не найдена" }, { status: 404 });
    }
    const isClient = booking.clientId === user.id;
    const isPsych =
      user.role === "PSYCHOLOGIST" && booking.psychologist.userId === user.id;
    const isAdmin = user.role === "ADMIN";
    if (!isClient && !isPsych && !isAdmin) {
      return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
    }
    if (["COMPLETED", "REFUNDED", "NO_SHOW_CLIENT", "NO_SHOW_PSYCHOLOGIST"].includes(booking.status)) {
      return NextResponse.json({ error: "Запись уже завершена" }, { status: 400 });
    }

    const hoursLeft = (booking.startAt.getTime() - Date.now()) / 3_600_000;
    const lateCancel = hoursLeft < FREE_CANCEL_HOURS && isClient;

    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: isClient ? "CANCELLED_BY_CLIENT" : "CANCELLED_BY_PSYCHOLOGIST",
        cancelReason: lateCancel
          ? `Поздняя отмена клиентом (менее ${FREE_CANCEL_HOURS} ч до начала)`
          : null,
      },
    });

    // TODO: интеграция с возвратом платежа через провайдера.
    // Для поздней отмены клиентом удерживаем NO_SHOW_HOLD_PERCENT.
    if (lateCancel) {
      console.log(
        `[booking ${booking.id}] late cancel: hold ${env.noShowHoldPercent}%`
      );
    }

    await notify({
      userId: isClient ? booking.psychologist.userId : booking.clientId,
      channel: "EMAIL",
      template: "booking_cancelled",
      title: "Запись отменена",
      body: `Запись на ${booking.startAt.toLocaleString("ru-RU")} отменена.`,
      payload: { bookingId: booking.id, lateCancel },
    });

    return NextResponse.json({ ok: true, lateCancel });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 500;
    return NextResponse.json(
      { error: status === 401 ? "Требуется вход" : "Ошибка" },
      { status }
    );
  }
}
