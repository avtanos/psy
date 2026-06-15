import Link from "next/link";
import { MOCK_PENDING_PAYOUTS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";

export default function FinancePage() {
  const payouts = MOCK_PENDING_PAYOUTS;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 space-y-4">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Финансы и выплаты</h1>
      {payouts.length === 0 && <div className="card text-sm">Запросов на выплату нет.</div>}
      {payouts.map((p) => (
        <div key={p.id} className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="font-medium text-slate-800">{p.psychologistName}</div>
            <div className="text-sm text-slate-600 break-anywhere">
              {formatKGS(p.amount)} · реквизиты: {p.details}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button className="btn-primary opacity-60 cursor-not-allowed">Выплачено (демо)</button>
            <button className="btn-danger opacity-60 cursor-not-allowed">Отклонить (демо)</button>
          </div>
        </div>
      ))}
      <Link href="/admin" className="text-brand text-sm">← Назад в админку</Link>
    </div>
  );
}
