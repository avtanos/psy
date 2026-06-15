import { requireUserPage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatKGS } from "@/lib/money";

async function saveSetting(formData: FormData) {
  "use server";
  await requireUserPage(["ADMIN"]);
  const key = String(formData.get("key"));
  const value = String(formData.get("value"));
  await prisma.systemSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export default async function CommissionsPage() {
  await requireUserPage(["ADMIN"]);
  const settings = await prisma.systemSetting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  const plans = await prisma.subscriptionPlan.findMany();
  const promos = await prisma.promocode.findMany({ orderBy: { code: "asc" } });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Тарифы и комиссии</h1>

      <div className="card">
        <h2 className="font-medium text-slate-800">Базовая комиссия платформы (%)</h2>
        <form action={saveSetting} className="mt-2 flex gap-2 max-w-sm">
          <input type="hidden" name="key" value="commission_percent" />
          <input
            name="value"
            type="number"
            min={0}
            max={50}
            defaultValue={map.commission_percent ?? process.env.DEFAULT_COMMISSION_PERCENT ?? 20}
            className="input"
          />
          <button className="btn-primary">Сохранить</button>
        </form>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Подписки для психологов</h2>
        {plans.length === 0 && <p className="mt-1 text-sm text-slate-600">Нет планов.</p>}
        <ul className="mt-2 space-y-1 text-sm">
          {plans.map((p) => (
            <li key={p.id}>
              {p.name} — {formatKGS(p.monthlyPrice)} / мес · комиссия {p.commissionPercent}%
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Промокоды</h2>
        {promos.length === 0 && <p className="mt-1 text-sm text-slate-600">Промокодов нет.</p>}
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
    </div>
  );
}
