import { NextResponse } from "next/server";
import { addHours, subHours } from "date-fns";
import { prisma } from "@/lib/prisma";
import { notify } from "@/lib/notifications";

// Эндпоинт для cron-сервиса (например, EasyCron / Vercel Cron).
// Отправляет напоминания о бронированиях за 24 часа и за 1 час до начала.
export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (process.env.NODE_ENV === "production" && auth !== expected) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const now = new Date();
  await Promise.all([
    sendReminderBatch(now, 24, "booking_reminder_24h", "Сессия завтра"),
    sendReminderBatch(now, 1, "booking_reminder_1h", "Сессия через час"),
  ]);
  return NextResponse.json({ ok: true });
}

async function sendReminderBatch(
  now: Date,
  hoursAhead: number,
  template: "booking_reminder_24h" | "booking_reminder_1h",
  title: string
) {
  const center = addHours(now, hoursAhead);
  const from = subHours(center, 0.25); // окно 30 минут
  const to = addHours(center, 0.25);

  const bookings = await prisma.booking.findMany({
    where: { status: "CONFIRMED", startAt: { gte: from, lte: to } },
    include: { client: true, psychologist: { include: { user: true } } },
  });

  for (const b of bookings) {
    const when = b.startAt.toLocaleString("ru-RU");
    await Promise.all([
      notify({
        userId: b.clientId,
        channel: "EMAIL",
        template,
        title,
        body: `Напоминаем: сессия ${when} с ${b.psychologist.user.displayName}.`,
        payload: { bookingId: b.id },
      }),
      notify({
        userId: b.psychologist.userId,
        channel: "EMAIL",
        template,
        title,
        body: `Сессия с клиентом ${b.client.displayName} — ${when}.`,
        payload: { bookingId: b.id },
      }),
    ]);
  }
}
