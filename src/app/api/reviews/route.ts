import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notify } from "@/lib/notifications";

// ТЗ п.2.8: отзыв может оставить только клиент по состоявшейся сессии. Модерация.
const Body = z.object({
  bookingId: z.string(),
  rating: z.number().int().min(1).max(5),
  text: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  try {
    const user = await requireUser(["CLIENT"]);
    const body = Body.parse(await req.json());

    const booking = await prisma.booking.findUnique({
      where: { id: body.bookingId },
      include: { review: true, psychologist: true },
    });
    if (!booking || booking.clientId !== user.id) {
      return NextResponse.json({ error: "Запись не найдена" }, { status: 404 });
    }
    if (booking.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Отзыв можно оставить только после состоявшейся сессии" },
        { status: 400 }
      );
    }
    if (booking.review) {
      return NextResponse.json({ error: "Отзыв уже оставлен" }, { status: 409 });
    }

    const review = await prisma.review.create({
      data: {
        bookingId: booking.id,
        psychologistId: booking.psychologistId,
        authorId: user.id,
        rating: body.rating,
        text: body.text,
      },
    });

    // Пересчёт агрегатов (учитываем только отмодерированные и не скрытые)
    const agg = await prisma.review.aggregate({
      where: {
        psychologistId: booking.psychologistId,
        isHidden: false,
        isModerated: true,
      },
      _avg: { rating: true },
      _count: { _all: true },
    });
    await prisma.psychologistProfile.update({
      where: { id: booking.psychologistId },
      data: {
        rating: agg._avg.rating ?? 0,
        reviewsCount: agg._count._all,
      },
    });

    await notify({
      userId: booking.psychologist.userId,
      channel: "INAPP",
      template: "review_received",
      title: "Новый отзыв",
      body: `Клиент оставил отзыв на ${body.rating}★. Ожидает модерации.`,
      payload: { reviewId: review.id },
    });

    return NextResponse.json({ ok: true, reviewId: review.id });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 500;
    return NextResponse.json(
      { error: status === 401 ? "Требуется вход" : (err as Error).message ?? "Ошибка" },
      { status }
    );
  }
}
