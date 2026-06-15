import { requireUserPage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatKGS, somToTyiyn } from "@/lib/money";
import { redirect } from "next/navigation";

async function request(formData: FormData) {
  "use server";
  const user = await requireUserPage(["PSYCHOLOGIST"]);
  const amountSom = Number(formData.get("amount") ?? 0);
  const details = String(formData.get("details") ?? "");
  if (!amountSom || amountSom <= 0) return;

  const profile = await prisma.psychologistProfile.findUniqueOrThrow({
    where: { userId: user.id },
    include: { wallet: true },
  });
  if (!profile.wallet) return;

  const amount = somToTyiyn(amountSom);
  if (profile.wallet.balance < amount) return;

  await prisma.$transaction(async (tx) => {
    const p = await tx.payout.create({
      data: { walletId: profile.wallet!.id, amount, details },
    });
    await tx.wallet.update({
      where: { id: profile.wallet!.id },
      data: { balance: { decrement: amount } },
    });
    await tx.walletOperation.create({
      data: {
        walletId: profile.wallet!.id,
        kind: "PAYOUT",
        amount: -amount,
        reason: `Запрос ${p.id}`,
        refId: p.id,
      },
    });
  });
  redirect("/psychologist/wallet");
}

export default async function WalletPage() {
  const user = await requireUserPage(["PSYCHOLOGIST"]);
  const profile = await prisma.psychologistProfile.findUniqueOrThrow({
    where: { userId: user.id },
    include: {
      wallet: {
        include: {
          operations: { orderBy: { createdAt: "desc" }, take: 30 },
          payouts: { orderBy: { createdAt: "desc" }, take: 10 },
        },
      },
    },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8 space-y-5 md:space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Кошелёк</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card">
          <div className="text-sm text-slate-500">Доступно</div>
          <div className="text-2xl font-bold">{formatKGS(profile.wallet?.balance ?? 0)}</div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">В ожидании (после сессий)</div>
          <div className="text-2xl font-bold">{formatKGS(profile.wallet?.pendingBalance ?? 0)}</div>
        </div>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Запрос на выплату</h2>
        <form action={request} className="mt-3 grid gap-2 sm:grid-cols-3">
          <input name="amount" type="number" min={1} placeholder="Сумма, сом" className="input" />
          <input
            name="details"
            placeholder="Реквизиты (банк, счёт, MBank…)"
            className="input sm:col-span-2"
          />
          <button className="btn-primary sm:col-span-3">Запросить выплату</button>
        </form>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">История операций</h2>
        <ul className="mt-2 divide-y divide-slate-100">
          {profile.wallet?.operations.map((o) => (
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
    </div>
  );
}
