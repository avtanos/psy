import Link from "next/link";
import { MOCK_SCHEDULE_RULES } from "@/lib/mock-data";

const WEEKDAYS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function fmt(min: number) {
  return `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
}

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8 space-y-5 md:space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Расписание</h1>

      <div className="card">
        <h2 className="font-medium text-slate-800">Правила доступности</h2>
        <ul className="mt-3 space-y-2">
          {MOCK_SCHEDULE_RULES.map((r) => (
            <li key={r.id} className="flex items-center justify-between rounded border border-slate-100 px-3 py-2">
              <div className="text-sm">
                {WEEKDAYS[r.weekday]}: {fmt(r.startMinutes)} – {fmt(r.endMinutes)}
              </div>
              <button className="text-rose-600 text-sm opacity-60 cursor-not-allowed">Удалить</button>
            </li>
          ))}
        </ul>

        <div className="mt-4 grid gap-2 grid-cols-2 sm:grid-cols-4">
          <select className="input col-span-2 sm:col-span-1">
            {WEEKDAYS.map((w, i) => (
              <option key={i} value={i}>{w}</option>
            ))}
          </select>
          <input type="time" defaultValue="09:00" className="input" />
          <input type="time" defaultValue="18:00" className="input" />
          <button className="btn-primary col-span-2 sm:col-span-1 opacity-60 cursor-not-allowed">Добавить (демо)</button>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Длительность сессии: 50 мин, буфер: 15 мин.
        Эти настройки меняются в профиле.
      </p>
      <Link href="/psychologist" className="text-brand text-sm">← Назад в кабинет</Link>
    </div>
  );
}
