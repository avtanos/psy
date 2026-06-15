import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

const Body = z.object({ allow: z.boolean() });

export async function POST(
  req: Request,
  { params }: { params: { bookingId: string } }
) {
  try {
    const user = await requireUser();
    const { allow } = Body.parse(await req.json());

    const booking = await prisma.booking.findUnique({
      where: { id: params.bookingId },
      include: { psychologist: true, session: true },
    });
    if (!booking) return NextResponse.json({ error: "Не найдено" }, { status: 404 });

    const isClient = booking.clientId === user.id;
    const isPsych =
      user.role === "PSYCHOLOGIST" && booking.psychologist.userId === user.id;
    if (!isClient && !isPsych) {
      return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
    }

    const updateData = isClient
      ? { recordingAllowedByClient: allow }
      : { recordingAllowedByPsychologist: allow };

    const session = await prisma.session.upsert({
      where: { bookingId: booking.id },
      update: updateData,
      create: { bookingId: booking.id, ...updateData },
    });

    return NextResponse.json({
      ok: true,
      bothAllowed:
        session.recordingAllowedByClient && session.recordingAllowedByPsychologist,
    });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 500;
    return NextResponse.json(
      { error: status === 401 ? "Требуется вход" : "Ошибка" },
      { status }
    );
  }
}
