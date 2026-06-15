import { prisma } from "./prisma";

// Перевод суммы из pending в balance при завершении сессии (или возврат комиссии при no-show психолога).
export async function releaseHoldOnSessionComplete(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { payment: true, psychologist: { include: { wallet: true } } },
  });
  if (!booking || !booking.payment || !booking.psychologist.wallet) return;
  const amount = booking.payment.splitToPsychologist ?? 0;
  if (amount <= 0) return;

  await prisma.$transaction(async (tx) => {
    await tx.wallet.update({
      where: { id: booking.psychologist.wallet!.id },
      data: {
        balance: { increment: amount },
        pendingBalance: { decrement: amount },
      },
    });
    await tx.walletOperation.create({
      data: {
        walletId: booking.psychologist.wallet!.id,
        kind: "RELEASE",
        amount,
        reason: `Сессия завершена (booking ${bookingId})`,
        refId: booking.payment!.id,
      },
    });
  });
}
