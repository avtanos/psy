import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { paymentProvider } from "@/lib/payments/freedompay";
import { splitCommission } from "@/lib/money";
import { env } from "@/lib/env";

const Body = z.object({
  bookingId: z.string().optional(),
  materialId: z.string().optional(),
  courseId: z.string().optional(),
  subscriptionId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = Body.parse(await req.json());

    let amount = 0;
    let purpose: "SESSION" | "MATERIAL" | "COURSE" | "SUBSCRIPTION" = "SESSION";
    let description = "";
    let commissionPercent = env.defaultCommissionPercent;
    let psychologistId: string | null = null;

    if (body.bookingId) {
      const b = await prisma.booking.findUnique({
        where: { id: body.bookingId },
        include: { psychologist: true },
      });
      if (!b || b.clientId !== user.id) {
        return NextResponse.json({ error: "Запись не найдена" }, { status: 404 });
      }
      if (b.status !== "PENDING_PAYMENT") {
        return NextResponse.json({ error: "Запись уже оплачена или отменена" }, { status: 400 });
      }
      amount = b.pricePerSession;
      commissionPercent = b.commissionPercent;
      psychologistId = b.psychologistId;
      purpose = "SESSION";
      description = `Сессия с психологом ${b.psychologist.id}`;
    } else if (body.materialId) {
      const m = await prisma.material.findUnique({ where: { id: body.materialId } });
      if (!m || !m.isPublished) {
        return NextResponse.json({ error: "Материал недоступен" }, { status: 404 });
      }
      amount = m.price;
      purpose = "MATERIAL";
      description = `Материал: ${m.title}`;
      psychologistId = m.authorId;
    } else if (body.courseId) {
      const c = await prisma.course.findUnique({ where: { id: body.courseId } });
      if (!c || !c.isPublished) {
        return NextResponse.json({ error: "Курс недоступен" }, { status: 404 });
      }
      amount = c.price;
      purpose = "COURSE";
      description = `Курс: ${c.title}`;
      psychologistId = c.authorId;
    } else {
      return NextResponse.json({ error: "Не указан предмет оплаты" }, { status: 400 });
    }

    if (amount <= 0) {
      return NextResponse.json({ error: "Сумма должна быть больше 0" }, { status: 400 });
    }

    const split = psychologistId
      ? splitCommission(amount, commissionPercent)
      : { commission: amount, psychologistAmount: 0 };

    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        purpose,
        bookingId: body.bookingId,
        materialId: body.materialId,
        courseId: body.courseId,
        subscriptionId: body.subscriptionId,
        amount,
        method: "CARD",
        status: "CREATED",
        commissionAmount: split.commission,
        splitToPsychologist: split.psychologistAmount,
      },
    });

    const init = await paymentProvider.initPayment({
      paymentId: payment.id,
      amount,
      description,
      successUrl: `${env.appUrl}/payments/return?paymentId=${payment.id}&status=success`,
      failureUrl: `${env.appUrl}/payments/return?paymentId=${payment.id}&status=fail`,
      userEmail: user.email,
      userPhone: user.phone,
      // sub-merchant id для сплита прикладывается в проде
    });

    await prisma.payment.update({
      where: { id: payment.id },
      data: { providerRef: init.providerRef },
    });

    return NextResponse.json({ redirectUrl: init.redirectUrl, paymentId: payment.id });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 500;
    return NextResponse.json(
      { error: status === 401 ? "Требуется вход" : (err as Error).message ?? "Ошибка" },
      { status }
    );
  }
}
