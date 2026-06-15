import Link from "next/link";

export default function PaymentReturnPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="card text-center">
        <div className="text-3xl">✓</div>
        <h1 className="text-xl font-semibold text-slate-800 mt-2">
          Оплата прошла успешно
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Запись подтверждена. Мы напомним вам о сессии.
        </p>
        <div className="mt-4">
          <Link href="/me" className="btn-primary">В личный кабинет</Link>
        </div>
      </div>
    </div>
  );
}
