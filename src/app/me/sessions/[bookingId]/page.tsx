import Link from "next/link";
import { MOCK_BOOKINGS } from "@/lib/mock-data";

export function generateStaticParams() {
  return MOCK_BOOKINGS.map((b) => ({ bookingId: b.id }));
}

export default function SessionPage({
  params,
}: {
  params: { bookingId: string };
}) {
  const booking = MOCK_BOOKINGS.find((b) => b.id === params.bookingId) ?? MOCK_BOOKINGS[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:py-8 space-y-4 md:space-y-5">
      <div className="card">
        <h1 className="text-lg md:text-xl font-semibold text-slate-800">Сессия</h1>
        <p className="text-sm text-slate-600">
          {new Date(booking.startAt).toLocaleString("ru-RU")} ·{" "}
          Психолог: {booking.psychologistName} · Статус: {booking.status}
        </p>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Видеосвязь</h2>
        <p className="mt-1 text-sm text-slate-600">
          Кнопка ниже создаст для вас защищённую комнату. Ссылка доступна только
          участникам сессии.
        </p>
        <div className="mt-3">
          <button className="btn-primary opacity-60 cursor-not-allowed">
            Подключиться к видеокомнате (демо)
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Запись сессии</h2>
        <p className="mt-1 text-sm text-slate-600">
          По умолчанию запись выключена. Включить запись можно только при
          согласии обеих сторон.
        </p>
        <div className="mt-3 space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" disabled /> Я (клиент) даю согласие на запись
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-400">
            <input type="checkbox" disabled /> Психолог даёт согласие на запись
          </label>
        </div>
      </div>

      <div className="mt-4">
        <Link href="/me" className="text-brand text-sm">← Назад в кабинет</Link>
      </div>
    </div>
  );
}
