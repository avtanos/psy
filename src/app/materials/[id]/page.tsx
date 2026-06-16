import Link from "next/link";
import { MOCK_MATERIALS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";
import {
  IconHome, IconChevronRight, IconDocument, IconPdf, IconHeadphones,
  IconVideo, IconCheckCircle, IconNotebook,
} from "@/components/icons";

export function generateStaticParams() {
  return MOCK_MATERIALS.map((m) => ({ id: m.id }));
}

const KIND_LABELS: Record<string, { label: string; icon: typeof IconDocument }> = {
  ARTICLE: { label: "Статья", icon: IconDocument },
  PDF: { label: "PDF", icon: IconPdf },
  AUDIO: { label: "Аудио", icon: IconHeadphones },
  VIDEO: { label: "Видео", icon: IconVideo },
  TEST: { label: "Тест", icon: IconCheckCircle },
  WORKBOOK: { label: "Рабочая тетрадь", icon: IconNotebook },
};

export default function MaterialPage({ params }: { params: { id: string } }) {
  const m = MOCK_MATERIALS.find((x) => x.id === params.id) ?? MOCK_MATERIALS[0];
  const free = m.price === 0;
  const kind = KIND_LABELS[m.kind] ?? KIND_LABELS.ARTICLE;
  const Icon = kind.icon;

  return (
    <div className="bg-[#FBFAF7] py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-brand">
            <IconHome size={14} /> Главная
          </Link>
          <IconChevronRight size={12} />
          <Link href="/materials" className="hover:text-brand">Материалы</Link>
          <IconChevronRight size={12} />
          <span className="text-slate-700 font-medium truncate">{m.title}</span>
        </nav>

        <div className="mt-5 card-soft">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-mint-100 flex items-center justify-center text-brand-700 font-semibold">
              {m.authorName.slice(0, 1)}
            </div>
            <div className="text-sm text-slate-700">{m.authorName}</div>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-mint-50 px-3 py-1 text-xs font-medium text-mint-700">
              <Icon size={12} /> {kind.label}
            </span>
          </div>

          <h1 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-brand-700 leading-tight">{m.title}</h1>
          <p className="mt-4 text-slate-700 whitespace-pre-line leading-relaxed">{m.description}</p>

          <hr className="my-6 border-slate-100" />

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className={"text-3xl font-bold " + (free ? "text-mint-600" : "text-brand-700")}>
              {free ? "Бесплатно" : formatKGS(m.price)}
            </div>
            {!free && (
              <span className="btn-primary opacity-60 cursor-not-allowed">
                Купить материал
              </span>
            )}
          </div>
        </div>

        {(free || m.contentBody) && (
          <div className="mt-5 card-soft">
            <h2 className="font-semibold text-brand-700">Содержимое</h2>
            {m.contentBody && (
              <article className="prose prose-slate mt-4 whitespace-pre-line text-slate-700">
                {m.contentBody}
              </article>
            )}
            {!m.contentBody && (
              <p className="mt-3 text-sm text-slate-500">
                Файл доступен после покупки (в рабочей версии платформы).
              </p>
            )}
            <p className="mt-4 text-xs text-slate-500">
              Контент защищён от свободного распространения: доступ привязан к
              аккаунту, PDF получают водяной знак.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
