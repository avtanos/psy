"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Slot = { startAt: string; endAt: string };

function fmtDay(d: Date) {
  return d.toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
}
function fmtTime(d: Date) {
  return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

export function AvailabilityCalendar({
  psychologistId,
  sessionMinutes,
}: {
  psychologistId: string;
  sessionMinutes: number;
}) {
  const router = useRouter();
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [booking, setBooking] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/psychologists/${psychologistId}/slots`)
      .then((r) => r.json())
      .then((d) => setSlots(d.slots))
      .catch(() => setSlots([]));
  }, [psychologistId]);

  async function book(startAt: string) {
    setError(null);
    setBooking(startAt);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ psychologistId, startAt }),
    });
    setBooking(null);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        router.push(`/login?next=/psychologists/${psychologistId}`);
        return;
      }
      setError(data.error ?? "Не удалось забронировать слот");
      return;
    }
    const data = await res.json();
    router.push(`/me/bookings/${data.bookingId}/pay`);
  }

  if (slots === null) {
    return <div className="mt-3 text-sm text-slate-500">Загружаем слоты…</div>;
  }
  if (slots.length === 0) {
    return (
      <div className="mt-3 text-sm text-slate-600">
        Сейчас нет доступных слотов. Загляните позже или напишите специалисту.
      </div>
    );
  }

  // Группируем по дням
  const byDay = new Map<string, Slot[]>();
  for (const s of slots) {
    const key = new Date(s.startAt).toDateString();
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key)!.push(s);
  }

  return (
    <div className="mt-3 space-y-3 max-h-96 overflow-y-auto pr-1">
      {[...byDay.entries()].map(([key, daySlots]) => (
        <div key={key}>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {fmtDay(new Date(key))}
          </div>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {daySlots.map((s) => (
              <button
                key={s.startAt}
                disabled={booking === s.startAt}
                onClick={() => book(s.startAt)}
                className="rounded-md border border-slate-200 px-2.5 py-1 text-sm hover:border-brand hover:bg-brand-50 disabled:opacity-50"
              >
                {fmtTime(new Date(s.startAt))}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="text-xs text-slate-500">
        Длительность сессии: {sessionMinutes} мин. Время указано в вашем часовом
        поясе.
      </div>
      {error && <div className="text-sm text-rose-600">{error}</div>}
    </div>
  );
}
