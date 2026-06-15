import Link from "next/link";
import { MOCK_MATERIALS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";

const KIND_LABELS: Record<string, string> = {
  ARTICLE: "Статья",
  PDF: "PDF",
  AUDIO: "Аудио",
  VIDEO: "Видео",
  TEST: "Тест",
  WORKBOOK: "Рабочая тетрадь",
};

export default function MaterialsPage() {
  const items = MOCK_MATERIALS;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Материалы</h1>
          <p className="text-sm text-slate-600">
            Статьи, PDF, аудио и рабочие тетради от верифицированных психологов.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <Link href="/materials" className="badge bg-brand-50 text-brand">Все</Link>
        <span className="badge bg-slate-100 text-slate-700">Бесплатно</span>
        <span className="badge bg-slate-100 text-slate-700">Платно</span>
        {Object.keys(KIND_LABELS).map((k) => (
          <span key={k} className="badge bg-slate-100 text-slate-700">
            {KIND_LABELS[k]}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <Link key={m.id} href={`/materials/${m.id}`} className="card hover:border-brand">
            <span className="badge bg-slate-100 text-slate-700">{KIND_LABELS[m.kind]}</span>
            <h3 className="mt-2 font-medium text-slate-800 line-clamp-2">{m.title}</h3>
            <p className="mt-1 text-sm text-slate-600 line-clamp-3">{m.description}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-slate-500">{m.authorName}</span>
              <span className="font-semibold">{m.price === 0 ? "Бесплатно" : formatKGS(m.price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
