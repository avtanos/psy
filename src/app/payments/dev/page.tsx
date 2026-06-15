"use client";

export default function DevPaymentPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="card">
        <h1 className="text-xl font-semibold text-slate-800">DEV: эмулятор оплаты</h1>
        <p className="mt-2 text-sm text-slate-600">
          Это страница-заглушка для разработки. В production пользователь будет
          переадресован на страницу Freedom Pay.
        </p>
        <div className="mt-4 flex gap-2">
          <button className="btn-primary flex-1 opacity-60 cursor-not-allowed">
            Оплатить «успех» (демо)
          </button>
          <button className="btn-danger flex-1 opacity-60 cursor-not-allowed">
            Симулировать ошибку (демо)
          </button>
        </div>
      </div>
    </div>
  );
}
