import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { paymentProvider } from "@/lib/payments/freedompay";
import { notify } from "@/lib/notifications";

// Webhook от платёжного провайдера. Идемпотентен.
export async function POST(req: Request) {
  const ct = req.headers.get("content-type") ?? "";
  let payload: Record<string, string> = {};
  if (ct.includes("application/json")) {
    payload = await req.json();
  } else {
    const text = await req.text();
    payload = Object.fromEntries(new URLSearchParams(text));
  }

  const parsed = paymentProvider.parseWebhook(
    payload,
    Object.fromEntries(req.headers.entries())
  );

  const payment = await prisma.payment.findUnique({
    where: { id: parsed.paymentId },
    include: { booking: { include: { psychologist: { include: { wallet: true } } } } },
  });
  if (!payment) {
    return NextResponse.json({ ok: false, error: "unknown payment" }, { status: 404 });
  }
  if (payment.status === "PAID") {
    return NextResponse.json({ ok: true });
  }

  if (parsed.status !== "PAID") {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "FAILED",
        providerData: JSON.stringify(payload),
      },
    });
    return NextResponse.json({ ok: true });
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "PAID",
        paidAt: new Date(),
        providerRef: parsed.providerRef || payment.providerRef,
        providerData: JSON.stringify(payload),
      },
    });

    if (payment.purpose === "SESSION" && payment.bookingId) {
      await tx.booking.update({
        where: { id: payment.bookingId },
        data: { status: "CONFIRMED" },
      });
      // зачисляем долю психолога в pending до завершения сессии
      if (payment.booking?.psychologist?.wallet && payment.splitToPsychologist) {
        await tx.wallet.update({
          where: { id: payment.booking.psychologist.wallet.id },
          data: {
            pendingBalance: { increment: payment.splitToPsychologist },
          },
        });
        await tx.walletOperation.create({
          data: {
            walletId: payment.booking.psychologist.wallet.id,
            kind: "HOLD",
            amount: payment.splitToPsychologist,
            reason: `Удержано до завершения сессии (booking ${payment.bookingId})`,
            refId: payment.id,
          },
        });
      }
    }

    if (payment.purpose === "MATERIAL" && payment.materialId) {
      await tx.materialPurchase.upsert({
        where: { materialId_userId: { materialId: payment.materialId, userId: payment.userId } },
        update: {},
        create: { materialId: payment.materialId, userId: payment.userId },
      });
    }

    if (payment.purpose === "COURSE" && payment.courseId) {
      await tx.courseEnrollment.upsert({
        where: { courseId_userId: { courseId: payment.courseId, userId: payment.userId } },
        update: {},
        create: { courseId: payment.courseId, userId: payment.userId },
      });
    }
  });

  await notify({
    userId: payment.userId,
    channel: "EMAIL",
    template: "payment_received",
    title: "Платёж получен",
    body: "Спасибо! Платёж успешно обработан.",
    payload: { paymentId: payment.id },
  });

  return NextResponse.json({ ok: true });
}
