import Link from "next/link";
import { MOCK_ANALYTICS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";

export default function AnalyticsPage() {
  const a = MOCK_ANALYTICS;
  const conversion = a.newUsers > 0 ? ((a.newBookings / a.newUsers) * 100).toFixed(1) : "0.0";
  const showRate = a.newBookings > 0 ? ((a.completedBookings / a.newBookings) * 100).toFixed(1) : "0.0";

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 space-y-5 md:space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Аналитика (30 дней)</h1>
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <Stat label="Новые пользователи" value={a.newUsers} />
        <Stat label="Новые записи" value={a.newBookings} />
        <Stat label="Состоявшиеся сессии" value={a.completedBookings} />
        <Stat label="Оплат" value={a.paymentsCount} />
        <Stat label="Оборот" value={formatKGS(a.totalRevenue)} />
        <Stat label="Комиссия" value={formatKGS(a.totalCommission)} />
        <Stat label="Средний чек" value={formatKGS(a.avgCheck)} />
        <Stat label="Конверсия (бронь/новый)" value={conversion + "%"} />
        <Stat label="Состоявшиеся (от броней)" value={showRate + "%"} />
      </div>
      <p className="text-xs text-slate-500">
        Метрики — упрощённые. LTV, удержание и когорты считаются в продовой версии
        на отдельном пайплайне (BigQuery / ClickHouse).
      </p>
      <Link href="/admin" className="text-brand text-sm">← Назад в админку</Link>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-slate-800">{value}</div>
    </div>
  );
}
