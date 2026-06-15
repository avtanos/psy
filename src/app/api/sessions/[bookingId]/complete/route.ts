import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { releaseHoldOnSessionComplete } from "@/lib/wallet";

export async function POST(
  _req: Request,
  { params }: { params: { bookingId: string } }
) {
  try {
    const user = await requireUser(["PSYCHOLOGIST", "ADMIN"]);
    const booking = await prisma.booking.findUnique({
      where: { id: params.bookingId },
      include: { psychologist: true },
    });
    if (!booking) return NextResponse.json({ error: "Не найдено" }, { status: 404 });
    if (user.role === "PSYCHOLOGIST" && booking.psychologist.userId !== user.id) {
      return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
    }
    if (booking.status !== "CONFIRMED") {
      return NextResponse.json({ error: "Запись не подтверждена" }, { status: 400 });
    }

    await prisma.booking.update({
      where: { id: booking.id },
      data: { status: "COMPLETED" },
    });
    await prisma.session.update({
      where: { bookingId: booking.id },
      data: { endedAt: new Date() },
    });
    await releaseHoldOnSessionComplete(booking.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 500;
    return NextResponse.json({ error: status === 401 ? "Требуется вход" : "Ошибка" }, { status });
  }
}
