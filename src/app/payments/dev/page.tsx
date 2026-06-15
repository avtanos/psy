"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Симулятор платёжного провайдера для разработки.
// В production используется Freedom Pay / PayBox (см. lib/payments/freedompay.ts).

export default function DevPaymentPage() {
  const params = useSearchParams();
  const router = useRouter();
  const paymentId = params.get("paymentId") ?? "";
  const [busy, setBusy] = useState(false);

  async function simulate(status: "PAID" | "FAILED") {
    setBusy(true);
    await fetch("/api/payments/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pg_order_id: paymentId,
        pg_payment_id: `dev-${Date.now()}`,
        pg_result: status === "PAID" ? "1" : "0",
      }),
    });
    router.push(
      `/payments/return?paymentId=${paymentId}&status=${status === "PAID" ? "success" : "fail"}`
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="card">
        <h1 className="text-xl font-semibold text-slate-800">DEV: эмулятор оплаты</h1>
        <p className="mt-2 text-sm text-slate-600">
          Это страница-заглушка для разработки. В production пользователь будет
          переадресован на страницу Freedom Pay.
        </p>
        <div className="mt-4 flex gap-2">
          <button disabled={busy} onClick={() => simulate("PAID")} className="btn-primary flex-1">
            Оплатить «успех»
          </button>
          <button disabled={busy} onClick={() => simulate("FAILED")} className="btn-danger flex-1">
            Симулировать ошибку
          </button>
        </div>
      </div>
    </div>
  );
}
