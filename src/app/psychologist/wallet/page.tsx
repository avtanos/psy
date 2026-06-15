import Link from "next/link";
import { MOCK_WALLET } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";

export default function WalletPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8 space-y-5 md:space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Кошелёк</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card">
          <div className="text-sm text-slate-500">Доступно</div>
          <div className="text-2xl font-bold">{formatKGS(MOCK_WALLET.balance)}</div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">В ожидании (после сессий)</div>
          <div className="text-2xl font-bold">{formatKGS(MOCK_WALLET.pendingBalance)}</div>
        </div>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Запрос на выплату</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <input type="number" min={1} placeholder="Сумма, сом" className="input" />
          <input placeholder="Реквизиты (банк, счёт, MBank…)" className="input sm:col-span-2" />
          <button className="btn-primary sm:col-span-3 opacity-60 cursor-not-allowed">Запросить (демо)</button>
        </div>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">История операций</h2>
        <ul className="mt-2 divide-y divide-slate-100">
          {MOCK_WALLET.operations.map((o) => (
            <li key={o.id} className="py-2 text-sm flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div><span className="font-mono text-xs">{o.kind}</span></div>
                <div className="break-anywhere">{o.reason}</div>
              </div>
              <div className={"shrink-0 " + (o.amount < 0 ? "text-rose-600" : "text-emerald-700")}>
                {o.amount > 0 ? "+" : ""}{formatKGS(o.amount)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Link href="/psychologist" className="text-brand text-sm">← Назад в кабинет</Link>
    </div>
  );
}
