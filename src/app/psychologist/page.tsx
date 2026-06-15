import Link from "next/link";
import { MOCK_WALLET } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";

export default function PsychDashboard() {
  const upcoming = [
    { id: "bk-201", clientName: "Айдана К.", startAt: "2026-06-18T10:00:00", status: "CONFIRMED" },
    { id: "bk-202", clientName: "Бектур М.", startAt: "2026-06-18T14:00:00", status: "CONFIRMED" },
    { id: "bk-203", clientName: "Нурия С.", startAt: "2026-06-19T11:00:00", status: "CONFIRMED" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 space-y-5 md:space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Кабинет психолога</h1>
          <p className="text-sm text-slate-600">
            Статус верификации: <span className="font-medium">VERIFIED</span>
          </p>
        </div>
        <Link href="/psychologist/profile" className="btn-secondary">Редактировать профиль</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <div className="text-sm text-slate-500">Баланс</div>
          <div className="mt-1 text-2xl font-bold">{formatKGS(MOCK_WALLET.balance)}</div>
          <div className="mt-1 text-xs text-slate-500">
            В ожидании: {formatKGS(MOCK_WALLET.pendingBalance)}
          </div>
          <Link href="/psychologist/wallet" className="btn-secondary mt-3">Выплаты</Link>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">Цена сессии</div>
          <div className="mt-1 text-2xl font-bold">{formatKGS(250000)}</div>
          <div className="mt-1 text-xs text-slate-500">Длительность 50 мин</div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">Рейтинг</div>
          <div className="mt-1 text-2xl font-bold">4.9 ★</div>
          <div className="mt-1 text-xs text-slate-500">47 отзывов</div>
        </div>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Ближайшие сессии</h2>
        <ul className="mt-3 divide-y divide-slate-100">
          {upcoming.map((b) => (
            <li key={b.id} className="py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="font-medium text-slate-800 truncate">{b.clientName}</div>
                <div className="text-sm text-slate-600">
                  {new Date(b.startAt).toLocaleString("ru-RU")} · {b.status}
                </div>
              </div>
              <span className="btn-primary opacity-60 cursor-not-allowed">Открыть (демо)</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/psychologist/schedule" className="card hover:border-brand">
          <h3 className="font-medium text-slate-800">Расписание</h3>
          <p className="mt-1 text-sm text-slate-600">Настройте рабочие часы и выходные.</p>
        </Link>
        <Link href="/psychologist/materials" className="card hover:border-brand">
          <h3 className="font-medium text-slate-800">Мои материалы</h3>
          <p className="mt-1 text-sm text-slate-600">Загрузите статьи, PDF, аудио, тесты.</p>
        </Link>
      </div>
    </div>
  );
}
