"use client";

import { useEffect, useState } from "react";

export function PrivateNoteEditor({
  bookingId,
  hasNote,
}: {
  bookingId: string;
  hasNote: boolean;
}) {
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(!hasNote);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!hasNote) return;
    fetch(`/api/sessions/${bookingId}/notes`)
      .then((r) => (r.ok ? r.json() : { content: "" }))
      .then((d) => setText(d.content ?? ""))
      .finally(() => setLoaded(true));
  }, [bookingId, hasNote]);

  async function save() {
    setSaving(true);
    setMsg(null);
    const res = await fetch(`/api/sessions/${bookingId}/notes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });
    setSaving(false);
    setMsg(res.ok ? "Сохранено." : "Не удалось сохранить.");
  }

  if (!loaded) return <div className="mt-3 text-sm text-slate-500">Загружаем…</div>;
  return (
    <div className="mt-3 space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="input"
        placeholder="Заметки по сессии. Видны только вам."
      />
      <div className="flex items-center gap-3">
        <button onClick={save} disabled={saving} className="btn-primary">
          {saving ? "Сохраняем…" : "Сохранить"}
        </button>
        {msg && <span className="text-sm text-slate-600">{msg}</span>}
      </div>
    </div>
  );
}
