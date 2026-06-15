"use client";

import { useState } from "react";

export function JoinRoom({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ roomName: string; token: string } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function join() {
    setLoading(true);
    setErr(null);
    const res = await fetch(`/api/sessions/${bookingId}/room`, { method: "POST" });
    setLoading(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setErr(d.error ?? "Не удалось получить доступ к комнате");
      return;
    }
    setData(await res.json());
  }

  if (data) {
    const url = `https://${process.env.NEXT_PUBLIC_DAILY_DOMAIN ?? "example"}.daily.co/${data.roomName}?t=${data.token}`;
    return (
      <div className="space-y-2">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="btn-primary inline-flex"
        >
          Открыть видеокомнату
        </a>
        <div className="text-xs text-slate-500">Ссылка одноразовая и привязана к вашему аккаунту.</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button disabled={loading} onClick={join} className="btn-primary">
        {loading ? "Готовим комнату…" : "Подключиться к сессии"}
      </button>
      {err && <div className="text-sm text-rose-600">{err}</div>}
    </div>
  );
}
