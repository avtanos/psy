import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { videoProvider } from "@/lib/video/daily";
import { addMinutes } from "date-fns";

// Идемпотентно выдаёт ссылку/токен на видеокомнату для участника сессии.
export async function POST(
  _req: Request,
  { params }: { params: { bookingId: string } }
) {
  try {
    const user = await requireUser();
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
    if (booking.status !== "CONFIRMED") {
      return NextResponse.json(
        { error: "Сессия станет доступна после подтверждения оплаты" },
        { status: 400 }
      );
    }

    // Запись разрешена ТОЛЬКО при двойном согласии (ТЗ п.2.4)
    const recordingAllowed =
      (booking.session?.recordingAllowedByClient ?? false) &&
      (booking.session?.recordingAllowedByPsychologist ?? false);

    let session = booking.session;
    if (!session?.roomName) {
      const room = await videoProvider.createRoom({
        name: `bk-${booking.id.slice(0, 12)}`,
        expiresAt: addMinutes(booking.endAt, 30),
      });
      session = await prisma.session.upsert({
        where: { bookingId: booking.id },
        update: { roomName: room.name },
        create: { bookingId: booking.id, roomName: room.name },
      });
    }

    const token = await videoProvider.issueToken({
      roomName: session.roomName!,
      userName: user.displayName,
      isOwner: isPsych,
      expiresAt: addMinutes(booking.endAt, 15),
      enableRecording: recordingAllowed,
    });

    return NextResponse.json({
      roomName: session.roomName,
      token,
      recordingAllowed,
    });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 500;
    return NextResponse.json(
      { error: status === 401 ? "Требуется вход" : "Ошибка" },
      { status }
    );
  }
}
