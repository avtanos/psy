import Link from "next/link";
import { MOCK_PENDING_VERIFICATIONS } from "@/lib/mock-data";

export default function VerificationsPage() {
  const pending = MOCK_PENDING_VERIFICATIONS;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 space-y-4">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Верификация психологов</h1>
      <p className="text-sm text-slate-600">
        Проверяйте документы: диплом, сертификаты, лицензии. После одобрения психолог
        получает бейдж и появляется в каталоге.
      </p>

      {pending.length === 0 && (
        <div className="card text-sm text-slate-600">Очередь пуста.</div>
      )}

      {pending.map((p) => (
        <div key={p.id} className="card">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="font-medium text-slate-800">{p.displayName}</div>
              <div className="text-sm text-slate-600 break-anywhere">{p.email}</div>
              <div className="text-sm text-slate-600 mt-1">Опыт: {p.experienceYears} лет</div>
            </div>
            <span className="badge bg-slate-100 text-slate-700">{p.verification}</span>
          </div>
          <p className="mt-3 text-sm text-slate-700 whitespace-pre-line">{p.bio}</p>

          <div className="mt-3">
            <h4 className="text-sm font-medium text-slate-700">Документы</h4>
            <ul className="mt-1 text-sm">
              {p.documents.map((d) => (
                <li key={d.id}>
                  <span className="text-brand">{d.kind}</span> — {d.comment}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <input placeholder="Комментарий (необязательно)" className="input flex-1 min-w-[200px]" />
            <button className="btn-primary opacity-60 cursor-not-allowed">Одобрить (демо)</button>
            <button className="btn-danger opacity-60 cursor-not-allowed">Отклонить (демо)</button>
          </div>
        </div>
      ))}

      <Link href="/admin" className="text-brand text-sm">← Назад в админку</Link>
    </div>
  );
}
