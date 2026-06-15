"use client";

import { useState } from "react";

export function RecordingConsent({
  bookingId,
  isClient,
  clientConsent,
  psychConsent,
}: {
  bookingId: string;
  isClient: boolean;
  clientConsent: boolean;
  psychConsent: boolean;
}) {
  const [c, setC] = useState(clientConsent);
  const [p, setP] = useState(psychConsent);
  const [saving, setSaving] = useState(false);

  const my = isClient ? c : p;
  const both = c && p;

  async function toggle() {
    setSaving(true);
    const next = !my;
    const res = await fetch(`/api/sessions/${bookingId}/recording-consent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ allow: next }),
    });
    if (res.ok) {
      if (isClient) setC(next);
      else setP(next);
    }
    setSaving(false);
  }

  return (
    <div className="mt-2 space-y-2 text-sm">
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={my} onChange={toggle} disabled={saving} />
        <span>Я даю согласие на запись этой сессии</span>
      </label>
      <div className="text-xs text-slate-500">
        Согласие клиента: {c ? "✓" : "—"}; согласие психолога: {p ? "✓" : "—"}.{" "}
        {both
          ? "Запись будет включена."
          : "Запись будет отключена до получения согласия обеих сторон."}
      </div>
    </div>
  );
}
