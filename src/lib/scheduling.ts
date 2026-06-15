import { prisma } from "./prisma";
import { addDays, addMinutes, isBefore, startOfDay } from "date-fns";

export type Slot = { startAt: Date; endAt: Date };

/**
 * Возвращает доступные слоты психолога на ближайшие `days` дней.
 * Учитывает: правила расписания, выходные (TimeOff), уже забронированные сессии,
 * буфер между встречами, минимальное упреждение записи.
 */
export async function getAvailableSlots(
  psychologistId: string,
  days = 14,
  minLeadMinutes = 60,
): Promise<Slot[]> {
  const p = await prisma.psychologistProfile.findUnique({
    where: { id: psychologistId },
    include: { availability: true, timeOff: true },
  });
  if (!p) return [];

  const now = new Date();
  const minStart = addMinutes(now, minLeadMinutes);

  const horizonEnd = addDays(startOfDay(now), days);

  const bookings = await prisma.booking.findMany({
    where: {
      psychologistId,
      startAt: { gte: now, lt: horizonEnd },
      status: { in: ["PENDING_PAYMENT", "CONFIRMED"] },
    },
    select: { startAt: true, endAt: true },
  });

  const slotMinutes = p.sessionMinutes;
  const buffer = p.bufferMinutes;
  const slots: Slot[] = [];

  for (let d = 0; d < days; d++) {
    const day = addDays(startOfDay(now), d);
    const weekday = day.getDay();
    const rules = p.availability.filter((r) => r.weekday === weekday);

    for (const rule of rules) {
      let cursor = addMinutes(day, rule.startMinutes);
      const endOfWindow = addMinutes(day, rule.endMinutes);

      while (isBefore(addMinutes(cursor, slotMinutes), addMinutes(endOfWindow, 1))) {
        const slotEnd = addMinutes(cursor, slotMinutes);

        if (isBefore(cursor, minStart)) {
          cursor = addMinutes(cursor, slotMinutes + buffer);
          continue;
        }
        const conflictTimeOff = p.timeOff.some(
          (t) => !(isBefore(slotEnd, t.startAt) || isBefore(t.endAt, cursor))
        );
        const conflictBooking = bookings.some(
          (b) => !(isBefore(slotEnd, b.startAt) || isBefore(b.endAt, cursor))
        );

        if (!conflictTimeOff && !conflictBooking) {
          slots.push({ startAt: new Date(cursor), endAt: new Date(slotEnd) });
        }
        cursor = addMinutes(cursor, slotMinutes + buffer);
      }
    }
  }

  return slots;
}
