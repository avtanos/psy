import { requireUserPage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatKGS } from "@/lib/money";

export default async function AnalyticsPage() {
  await requireUserPage(["ADMIN", "CONTENT_MANAGER"]);

  const since30 = new Date(Date.now() - 30 * 24 * 3600 * 1000);
  const [newUsers, newBookings, completedBookings, payments] = await Promise.all([
    prisma.user.count({ where: { createdAt: { gte: since30 } } }),
    prisma.booking.count({ where: { createdAt: { gte: since30 } } }),
    prisma.booking.count({ where: { status: "COMPLETED", updatedAt: { gte: since30 } } }),
    prisma.payment.aggregate({
      where: { status: "PAID", paidAt: { gte: since30 } },
      _sum: { amount: true, commissionAmount: true },
      _count: { _all: true },
    }),
  ]);

  const avgCheck = payments._count._all > 0
    ? Math.round((payments._sum.amount ?? 0) / payments._count._all)
    : 0;
  const conversion = newUsers > 0 ? ((newBookings / newUsers) * 100).toFixed(1) : "0.0";
  const showRate = newBookings > 0 ? ((completedBookings / newBookings) * 100).toFixed(1) : "0.0";

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 space-y-5 md:space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Аналитика (30 дней)</h1>
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        <Stat label="Новые пользователи" value={newUsers} />
        <Stat label="Новые записи" value={newBookings} />
        <Stat label="Состоявшиеся сессии" value={completedBookings} />
        <Stat label="Оплат" value={payments._count._all} />
        <Stat label="Оборот" value={formatKGS(payments._sum.amount ?? 0)} />
        <Stat label="Комиссия" value={formatKGS(payments._sum.commissionAmount ?? 0)} />
        <Stat label="Средний чек" value={formatKGS(avgCheck)} />
        <Stat label="Конверсия (бронь/новый)" value={conversion + "%"} />
        <Stat label="Состоявшиеся (от броней)" value={showRate + "%"} />
      </div>
      <p className="text-xs text-slate-500">
        Метрики — упрощённые. LTV, удержание и когорты считаются в продовой версии
        на отдельном пайплайне (BigQuery / ClickHouse).
      </p>
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
