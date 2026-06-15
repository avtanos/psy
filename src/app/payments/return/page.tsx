import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PaymentReturnPage({
  searchParams,
}: {
  searchParams: { paymentId?: string; status?: string };
}) {
  const paymentId = searchParams.paymentId;
  const payment = paymentId
    ? await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { booking: true },
      })
    : null;

  const success = payment?.status === "PAID";
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="card text-center">
        {success ? (
          <>
            <div className="text-3xl">✓</div>
            <h1 className="text-xl font-semibold text-slate-800 mt-2">
              Оплата прошла успешно
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Запись подтверждена. Мы напомним вам о сессии.
            </p>
          </>
        ) : (
          <>
            <div className="text-3xl">✗</div>
            <h1 className="text-xl font-semibold text-slate-800 mt-2">
              Оплата не завершена
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Попробуйте ещё раз или выберите другой способ оплаты.
            </p>
          </>
        )}
        <div className="mt-4">
          {payment?.bookingId ? (
            <Link href={`/me/sessions/${payment.bookingId}`} className="btn-primary">
              Перейти к сессии
            </Link>
          ) : (
            <Link href="/me" className="btn-primary">В личный кабинет</Link>
          )}
        </div>
      </div>
    </div>
  );
}
