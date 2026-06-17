import Link from "next/link";
import { MOCK_ADMIN_STATS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";

export default function AdminDashboard() {
  const s = MOCK_ADMIN_STATS;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 space-y-5 md:space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Админ-панель</h1>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Stat label="Пользователей" value={s.usersTotal} />
        <Stat label="Клиентов" value={s.clients} />
        <Stat label="Психологов" value={s.psychologists} />
        <Stat label="Ждут верификации" value={s.pendingVerifications} highlight />
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3">
        <Stat label="Сессий всего" value={s.bookingsTotal} />
        <Stat label="Завершённых" value={s.completedBookings} />
        <Stat label="Оборот" value={formatKGS(s.totalRevenue)} />
        <Stat label="Комиссия платформы" value={formatKGS(s.totalCommission)} />
        <Stat label="К выплате психологам" value={formatKGS(s.totalPsychologistPayout)} />
      </div>

      <Link href="/admin/crisis" className="block rounded-2xl border-2 border-rose-200 bg-rose-50/70 p-5 hover:border-rose-300 transition-colors">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-rose-700">🆘 Кризисные кейсы</h3>
            <p className="mt-1 text-sm text-slate-600">Очередь срочных обращений из скрининга безопасности. Реагирование по протоколу.</p>
          </div>
          <span className="rounded-full bg-rose-600 px-3 py-1 text-sm font-semibold text-white shrink-0">1 новый</span>
        </div>
      </Link>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3">
        <Link href="/admin/verifications" className="card hover:border-brand">
          <h3 className="font-medium text-slate-800">Верификация психологов</h3>
          <p className="mt-1 text-sm text-slate-600">Проверка документов и присвоение бейджа.</p>
        </Link>
        <Link href="/admin/reviews" className="card hover:border-brand">
          <h3 className="font-medium text-slate-800">Модерация отзывов</h3>
          <p className="mt-1 text-sm text-slate-600">Грубость и нарушения приватности.</p>
        </Link>
        <Link href="/admin/finance" className="card hover:border-brand">
          <h3 className="font-medium text-slate-800">Финансы и выплаты</h3>
          <p className="mt-1 text-sm text-slate-600">Запросы на вывод, история операций.</p>
        </Link>
        <Link href="/admin/commissions" className="card hover:border-brand">
          <h3 className="font-medium text-slate-800">Тарифы и комиссии</h3>
          <p className="mt-1 text-sm text-slate-600">Подписки, промокоды, ставки.</p>
        </Link>
        <Link href="/admin/disputes" className="card hover:border-brand">
          <h3 className="font-medium text-slate-800">Споры</h3>
          <p className="mt-1 text-sm text-slate-600">Разбор конфликтных ситуаций.</p>
        </Link>
        <Link href="/admin/analytics" className="card hover:border-brand">
          <h3 className="font-medium text-slate-800">Аналитика</h3>
          <p className="mt-1 text-sm text-slate-600">DAU, конверсия, удержание, LTV.</p>
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`card ${highlight ? "border-brand" : ""}`}>
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-slate-800">{value}</div>
    </div>
  );
}
