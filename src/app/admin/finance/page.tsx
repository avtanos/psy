import { requireUserPage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatKGS } from "@/lib/money";

async function process(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const action = String(formData.get("action"));
  const user = await requireUserPage(["ADMIN"]);
  const payout = await prisma.payout.findUnique({ where: { id }, include: { wallet: true } });
  if (!payout) return;
  if (action === "complete") {
    await prisma.payout.update({
      where: { id },
      data: { status: "COMPLETED", processedAt: new Date() },
    });
  } else if (action === "reject") {
    await prisma.$transaction(async (tx) => {
      await tx.payout.update({
        where: { id },
        data: { status: "REJECTED", processedAt: new Date() },
      });
      await tx.wallet.update({
        where: { id: payout.walletId },
        data: { balance: { increment: payout.amount } },
      });
      await tx.walletOperation.create({
        data: {
          walletId: payout.walletId,
          kind: "ADJUSTMENT",
          amount: payout.amount,
          reason: `Возврат при отклонении выплаты ${id}`,
          refId: id,
        },
      });
    });
  }
  await prisma.adminLog.create({
    data: {
      actorId: user.id,
      action: `payout.${action}`,
      targetType: "payout",
      targetId: id,
    },
  });
}

export default async function FinancePage() {
  await requireUserPage(["ADMIN"]);
  const payouts = await prisma.payout.findMany({
    where: { status: { in: ["REQUESTED", "PROCESSING"] } },
    include: { wallet: { include: { psychologist: { include: { user: true } } } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 space-y-4">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Финансы и выплаты</h1>
      {payouts.length === 0 && <div className="card text-sm">Запросов на выплату нет.</div>}
      {payouts.map((p) => (
        <div key={p.id} className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="font-medium text-slate-800">
              {p.wallet.psychologist.user.displayName}
            </div>
            <div className="text-sm text-slate-600 break-anywhere">
              {formatKGS(p.amount)} · реквизиты: {p.details ?? "—"}
            </div>
          </div>
          <form action={process} className="flex flex-wrap gap-2 shrink-0">
            <input type="hidden" name="id" value={p.id} />
            <button name="action" value="complete" className="btn-primary">Выплачено</button>
            <button name="action" value="reject" className="btn-danger">Отклонить</button>
          </form>
        </div>
      ))}
    </div>
  );
}
