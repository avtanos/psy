"use client";

import { useState } from "react";

export function PayButton(props: {
  bookingId?: string;
  materialId?: string;
  courseId?: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function pay() {
    setLoading(true);
    setErr(null);
    const res = await fetch("/api/payments/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: props.bookingId,
        materialId: props.materialId,
        courseId: props.courseId,
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setErr(d.error ?? "Ошибка инициации платежа");
      return;
    }
    const d = await res.json();
    window.location.href = d.redirectUrl;
  }

  return (
    <div>
      <button onClick={pay} disabled={loading} className="btn-primary w-full">
        {loading ? "Готовим оплату…" : props.label ?? "Перейти к оплате"}
      </button>
      {err && <div className="mt-2 text-sm text-rose-600">{err}</div>}
    </div>
  );
}
