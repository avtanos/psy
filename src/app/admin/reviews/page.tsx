import Link from "next/link";
import { MOCK_PENDING_REVIEWS } from "@/lib/mock-data";

export default function AdminReviewsPage() {
  const pending = MOCK_PENDING_REVIEWS;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-800">Модерация отзывов</h1>
      {pending.length === 0 && <div className="card text-sm text-slate-600">Очередь пуста.</div>}
      {pending.map((r) => (
        <div key={r.id} className="card">
          <div className="text-sm text-slate-600">
            {r.authorName} → {r.psychologistName} ·{" "}
            {"★".repeat(r.rating)}
            <span className="text-slate-300">{"★".repeat(5 - r.rating)}</span>
          </div>
          {r.text && <p className="mt-2 whitespace-pre-line">{r.text}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            <input className="input flex-1 min-w-[200px]" placeholder="Заметка модератора" />
            <button className="btn-primary opacity-60 cursor-not-allowed">Опубликовать (демо)</button>
            <button className="btn-danger opacity-60 cursor-not-allowed">Скрыть (демо)</button>
          </div>
        </div>
      ))}
      <Link href="/admin" className="text-brand text-sm">← Назад в админку</Link>
    </div>
  );
}
