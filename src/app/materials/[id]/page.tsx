import Link from "next/link";
import { MOCK_MATERIALS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";

export function generateStaticParams() {
  return MOCK_MATERIALS.map((m) => ({ id: m.id }));
}

export default function MaterialPage({ params }: { params: { id: string } }) {
  const m = MOCK_MATERIALS.find((x) => x.id === params.id) ?? MOCK_MATERIALS[0];
  const free = m.price === 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="card">
        <div className="text-sm text-slate-500">{m.authorName}</div>
        <h1 className="text-2xl font-semibold text-slate-800">{m.title}</h1>
        <p className="mt-2 text-slate-700 whitespace-pre-line">{m.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-bold">
            {free ? "Бесплатно" : formatKGS(m.price)}
          </div>
          {!free && (
            <span className="btn-primary opacity-60 cursor-not-allowed">
              Купить (демо)
            </span>
          )}
        </div>
      </div>

      {(free || m.contentBody) && (
        <div className="card mt-4">
          <h2 className="font-medium text-slate-800">Содержимое</h2>
          {m.contentBody && (
            <article className="prose prose-slate mt-3 whitespace-pre-line">
              {m.contentBody}
            </article>
          )}
          {!m.contentBody && (
            <p className="mt-3 text-sm text-slate-500">
              Файл доступен после покупки (в рабочей версии платформы).
            </p>
          )}
          <p className="mt-3 text-xs text-slate-500">
            Контент защищён от свободного распространения: доступ привязан к
            аккаунту, PDF получают водяной знак.
          </p>
        </div>
      )}

      <div className="mt-4">
        <Link href="/materials" className="text-brand text-sm">← Все материалы</Link>
      </div>
    </div>
  );
}
