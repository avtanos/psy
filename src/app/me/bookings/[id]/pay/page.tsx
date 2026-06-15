import Link from "next/link";
import { MOCK_BOOKINGS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";

export function generateStaticParams() {
  return MOCK_BOOKINGS.map((b) => ({ id: b.id }));
}

export default function PayBookingPage({
  params,
}: {
  params: { id: string };
}) {
  const booking = MOCK_BOOKINGS.find((b) => b.id === params.id) ?? MOCK_BOOKINGS[0];

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <div className="card">
        <h1 className="text-xl font-semibold text-slate-800">Оплата сессии</h1>
        <div className="mt-3 text-sm text-slate-700">
          <div>Психолог: <b>{booking.psychologistName}</b></div>
          <div>Дата: {new Date(booking.startAt).toLocaleString("ru-RU")}</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {formatKGS(booking.price)}
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Оплата производится на стороне сертифицированного PCI DSS провайдера.
          Платформа не хранит номера карт.
        </p>
        <div className="mt-4">
          <button className="btn-primary opacity-60 cursor-not-allowed w-full">
            Оплатить (демо)
          </button>
        </div>
      </div>
      <div className="mt-4">
        <Link href="/me" className="text-brand text-sm">← Назад в кабинет</Link>
      </div>
    </div>
  );
}
