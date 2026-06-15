import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

// Право на экспорт своих данных (ТЗ п.2.7 / Цифровой кодекс КР).
export async function GET() {
  try {
    const user = await requireUser();
    const [bookings, payments, materials, courses, reviews, notifications] = await Promise.all([
      prisma.booking.findMany({ where: { clientId: user.id } }),
      prisma.payment.findMany({ where: { userId: user.id } }),
      prisma.materialPurchase.findMany({ where: { userId: user.id } }),
      prisma.courseEnrollment.findMany({ where: { userId: user.id } }),
      prisma.review.findMany({ where: { authorId: user.id } }),
      prisma.notification.findMany({ where: { userId: user.id } }),
    ]);
    const data = {
      exportedAt: new Date().toISOString(),
      profile: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        displayName: user.displayName,
        role: user.role,
        createdAt: user.createdAt,
      },
      bookings,
      payments,
      materials,
      courses,
      reviews,
      notifications,
    };
    return new NextResponse(JSON.stringify(data, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="psychkg-export-${user.id}.json"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  }
}
