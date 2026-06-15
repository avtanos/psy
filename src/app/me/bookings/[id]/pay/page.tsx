import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { formatKGS } from "@/lib/money";
import { PayButton } from "@/components/pay-button";

export default async function PayBookingPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=/me/bookings/${params.id}/pay`);

  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: { psychologist: { include: { user: true } } },
  });
  if (!booking || booking.clientId !== user.id) notFound();

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <div className="card">
        <h1 className="text-xl font-semibold text-slate-800">Оплата сессии</h1>
        <div className="mt-3 text-sm text-slate-700">
          <div>Психолог: <b>{booking.psychologist.user.displayName}</b></div>
          <div>Дата: {new Date(booking.startAt).toLocaleString("ru-RU")}</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {formatKGS(booking.pricePerSession)}
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Оплата производится на стороне сертифицированного PCI DSS провайдера.
          Платформа не хранит номера карт.
        </p>
        <div className="mt-4">
          <PayButton bookingId={booking.id} />
        </div>
      </div>
    </div>
  );
}
