import Link from "next/link";
import { formatKGS } from "@/lib/money";

export default function CommissionsPage() {
  const plans = [
    { id: "sp-1", name: "Базовый", monthlyPrice: 0, commissionPercent: 20 },
    { id: "sp-2", name: "Профессионал", monthlyPrice: 299900, commissionPercent: 12 },
  ];
  const promos = [
    { id: "pc-1", code: "WELCOME2026", discountPercent: 15, discountAmount: null, usesCount: 28, maxUses: 100 },
    { id: "pc-2", code: "FRIEND500", discountPercent: null, discountAmount: 50000, usesCount: 12, maxUses: 50 },
    { id: "pc-3", code: "NEWYEAR", discountPercent: 20, discountAmount: null, usesCount: 0, maxUses: null },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Тарифы и комиссии</h1>

      <div className="card">
        <h2 className="font-medium text-slate-800">Базовая комиссия платформы (%)</h2>
        <div className="mt-2 flex gap-2 max-w-sm">
          <input type="number" min={0} max={50} defaultValue={20} className="input" readOnly />
          <button className="btn-primary opacity-60 cursor-not-allowed">Сохранить (демо)</button>
        </div>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Подписки для психологов</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {plans.map((p) => (
            <li key={p.id}>
              {p.name} — {p.monthlyPrice === 0 ? "Бесплатно" : formatKGS(p.monthlyPrice)} / мес · комиссия {p.commissionPercent}%
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Промокоды</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {promos.map((p) => (
            <li key={p.id}>
              <span className="font-mono">{p.code}</span> · скидка{" "}
              {p.discountPercent ? `${p.discountPercent}%` : formatKGS(p.discountAmount ?? 0)} ·{" "}
              использований: {p.usesCount}/{p.maxUses ?? "∞"}
            </li>
          ))}
        </ul>
      </div>

      <Link href="/admin" className="text-brand text-sm">← Назад в админку</Link>
    </div>
  );
}
