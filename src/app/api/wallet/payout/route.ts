import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

const Body = z.object({
  amount: z.number().int().positive(),     // тыйыны
  details: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  try {
    const user = await requireUser(["PSYCHOLOGIST"]);
    const body = Body.parse(await req.json());

    const profile = await prisma.psychologistProfile.findUnique({
      where: { userId: user.id },
      include: { wallet: true },
    });
    if (!profile?.wallet) {
      return NextResponse.json({ error: "Кошелёк не найден" }, { status: 400 });
    }
    if (profile.wallet.balance < body.amount) {
      return NextResponse.json({ error: "Недостаточно средств" }, { status: 400 });
    }

    const payout = await prisma.$transaction(async (tx) => {
      const p = await tx.payout.create({
        data: {
          walletId: profile.wallet!.id,
          amount: body.amount,
          details: body.details ?? null,
        },
      });
      await tx.wallet.update({
        where: { id: profile.wallet!.id },
        data: { balance: { decrement: body.amount } },
      });
      await tx.walletOperation.create({
        data: {
          walletId: profile.wallet!.id,
          kind: "PAYOUT",
          amount: -body.amount,
          reason: `Запрос на выплату ${p.id}`,
          refId: p.id,
        },
      });
      return p;
    });

    return NextResponse.json({ ok: true, payoutId: payout.id });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 500;
    return NextResponse.json(
      { error: status === 401 ? "Требуется вход" : (err as Error).message ?? "Ошибка" },
      { status }
    );
  }
}
