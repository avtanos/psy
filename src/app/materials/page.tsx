import Link from "next/link";
import { MOCK_MATERIALS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";
import { BooksIllustration } from "@/components/hero-illustration";
import {
  IconHome, IconChevronRight,
  IconGrid, IconHeartSmall, IconLock, IconDocument, IconPdf,
  IconHeadphones, IconVideo, IconCheckCircle, IconNotebook,
} from "@/components/icons";

const FILTERS = [
  { key: "all", label: "Все", icon: IconGrid, active: true },
  { key: "free", label: "Бесплатно", icon: IconHeartSmall },
  { key: "paid", label: "Платно", icon: IconLock },
  { key: "ARTICLE", label: "Статья", icon: IconDocument },
  { key: "PDF", label: "PDF", icon: IconPdf },
  { key: "AUDIO", label: "Аудио", icon: IconHeadphones },
  { key: "VIDEO", label: "Видео", icon: IconVideo },
  { key: "TEST", label: "Тест", icon: IconCheckCircle },
  { key: "WORKBOOK", label: "Рабочая тетрадь", icon: IconNotebook },
];

const KIND_LABELS: Record<string, { label: string; icon: typeof IconDocument }> = {
  ARTICLE: { label: "Статья", icon: IconDocument },
  PDF: { label: "PDF", icon: IconPdf },
  AUDIO: { label: "Аудио", icon: IconHeadphones },
  VIDEO: { label: "Видео", icon: IconVideo },
  TEST: { label: "Тест", icon: IconCheckCircle },
  WORKBOOK: { label: "Рабочая тетрадь", icon: IconNotebook },
};

// Different gradient backgrounds for material previews
const PREVIEW_BG: Record<string, string> = {
  ARTICLE: "from-mint-100 via-mint-50 to-cream-100",
  PDF: "from-cream-100 via-mint-50 to-cream-50",
  AUDIO: "from-blue-50 via-mint-50 to-mint-100",
  VIDEO: "from-amber-50 via-cream-100 to-mint-100",
  TEST: "from-cream-50 via-mint-50 to-mint-100",
  WORKBOOK: "from-mint-100 via-mint-50 to-cream-100",
};

function MaterialPreview({ kind, title }: { kind: string; title: string }) {
  const Icon = KIND_LABELS[kind]?.icon ?? IconDocument;
  const gradient = PREVIEW_BG[kind] ?? "from-mint-100 via-mint-50 to-cream-100";

  return (
    <div className={`relative h-44 rounded-t-2xl bg-gradient-to-br ${gradient} overflow-hidden flex items-center justify-center`}>
      <svg viewBox="0 0 200 130" className="absolute inset-0 w-full h-full opacity-60" aria-hidden>
        <ellipse cx="40" cy="120" rx="40" ry="10" fill="#7BA68A" opacity="0.3" />
        <ellipse cx="170" cy="115" rx="35" ry="9" fill="#578E6B" opacity="0.3" />
        <path d="M30 100 q15 -20 30 -25 q15 -5 25 5 q12 12 4 30 z" fill="#7BA68A" opacity="0.4" />
        <path d="M140 100 q15 -25 35 -20 q10 3 5 25 z" fill="#578E6B" opacity="0.4" />
      </svg>
      <div className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 backdrop-blur text-brand-700 shadow-sm">
        <Icon size={28} />
      </div>
    </div>
  );
}

export default function MaterialsPage() {
  const items = MOCK_MATERIALS;

  return (
    <div className="bg-[#FBFAF7]">
      {/* Breadcrumbs + Heading */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-6">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <nav className="flex items-center gap-1.5 text-sm text-slate-500">
                <Link href="/" className="inline-flex items-center gap-1 hover:text-brand">
                  <IconHome size={14} /> Главная
                </Link>
                <IconChevronRight size={12} />
                <span className="text-slate-700 font-medium">Материалы</span>
              </nav>

              <h1 className="h-display mt-5">Материалы</h1>
              <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
                Статьи, рабочие тетради, аудио и видео от проверенных психологов.<br />
                Практические инструменты для вашего ментального благополучия.
              </p>
            </div>
            <div className="hidden lg:block">
              <BooksIllustration className="w-full max-w-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button key={f.key} className={f.active ? "chip-active" : "chip"}>
              <f.icon size={14} className={f.active ? "" : "text-mint-500"} />
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Cards grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((m) => {
            const kind = KIND_LABELS[m.kind] ?? KIND_LABELS.ARTICLE;
            return (
              <Link key={m.id} href={`/materials/${m.id}`} className="group">
                <article className="overflow-hidden rounded-2xl bg-white shadow-card transition-all hover:shadow-soft border border-slate-100">
                  <div className="relative">
                    <MaterialPreview kind={m.kind} title={m.title} />
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-brand-700 shadow-sm">
                      <kind.icon size={12} /> {kind.label}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-brand-700 line-clamp-2 group-hover:text-brand-600">{m.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">{m.description}</p>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="h-7 w-7 shrink-0 rounded-full bg-mint-100 flex items-center justify-center text-brand-700 text-xs font-semibold">
                          {m.authorName.slice(0, 1)}
                        </div>
                        <span className="text-xs text-slate-600 truncate">{m.authorName}</span>
                      </div>
                      <span className={"text-sm font-semibold shrink-0 " + (m.price === 0 ? "text-mint-600" : "text-brand-700")}>
                        {m.price === 0 ? "Бесплатно" : formatKGS(m.price)}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
