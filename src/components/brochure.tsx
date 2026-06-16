import Link from "next/link";
import { PrintButton } from "./print-button";
import { IconHome, IconChevronRight, IconCheck } from "./icons";

type Section = { title?: string; children: React.ReactNode };

export function BrochureLayout({
  role,
  title,
  tagline,
  accent = "mint",
  RoleIcon,
  children,
}: {
  role: string;
  title: string;
  tagline: string;
  accent?: "mint" | "amber" | "rose" | "blue";
  RoleIcon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  const accents: Record<string, { bg: string; chip: string; ring: string }> = {
    mint:  { bg: "bg-mint-100",   chip: "bg-mint-50 text-mint-700",     ring: "ring-mint-200" },
    amber: { bg: "bg-amber-100",  chip: "bg-amber-50 text-amber-700",   ring: "ring-amber-200" },
    rose:  { bg: "bg-rose-100",   chip: "bg-rose-50 text-rose-700",     ring: "ring-rose-200" },
    blue:  { bg: "bg-sky-100",    chip: "bg-sky-50 text-sky-700",       ring: "ring-sky-200" },
  };
  const a = accents[accent];

  return (
    <div className="bg-cream-50 py-8 print:py-0 print:bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 print:max-w-full print:px-0">
        <div className="flex items-center justify-between gap-4 mb-5 no-print">
          <nav className="flex items-center gap-1.5 text-sm text-slate-500">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-brand">
              <IconHome size={14} /> Главная
            </Link>
            <IconChevronRight size={12} />
            <Link href="/brochures" className="hover:text-brand">Брошюры</Link>
            <IconChevronRight size={12} />
            <span className="text-slate-700 font-medium">{role}</span>
          </nav>
          <PrintButton />
        </div>

        <article className="brochure bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden print:rounded-none">
          {/* Header */}
          <header className={"relative px-6 sm:px-10 pt-10 pb-8 " + a.bg}>
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <svg viewBox="0 0 800 200" className="h-full w-full" aria-hidden>
                <path d="M0 150 Q200 90 400 130 T800 110 L800 200 L0 200 Z" fill="white" opacity="0.5" />
              </svg>
            </div>
            <div className="relative flex items-start gap-5">
              <div className={"shrink-0 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-sm ring-4 " + a.ring}>
                <RoleIcon size={28} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium text-brand-700">
                  PsychKG · Брошюра
                </div>
                <h1 className="mt-2 text-2xl sm:text-4xl font-bold text-brand-700 leading-tight">
                  {title}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-700 max-w-2xl">{tagline}</p>
              </div>
            </div>
          </header>

          {/* Body */}
          <div className="px-6 sm:px-10 py-8 space-y-8 print:space-y-6">
            {children}
          </div>

          {/* Footer */}
          <footer className="px-6 sm:px-10 py-5 border-t border-slate-100 bg-slate-50/60 text-xs text-slate-500 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-700 text-mint-100 text-sm font-semibold">Ψ</span>
              <span>PsychKG — платформа психологической помощи и онлайн-консультаций</span>
            </div>
            <div>psych.kg · Кыргызская Республика</div>
          </footer>
        </article>

        <div className="mt-6 flex justify-center no-print">
          <Link href="/brochures" className="text-sm text-brand-600 hover:underline">← Все брошюры</Link>
        </div>
      </div>
    </div>
  );
}

export function Section({ title, children }: Section) {
  return (
    <section className="avoid-break">
      {title && <h2 className="text-lg sm:text-xl font-bold text-brand-700 mb-3">{title}</h2>}
      {children}
    </section>
  );
}

export function BenefitGrid({
  items,
  cols = 2,
}: {
  items: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; text: string }[];
  cols?: 2 | 3;
}) {
  const gridCls = cols === 3
    ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    : "grid gap-4 sm:grid-cols-2";
  return (
    <div className={gridCls}>
      {items.map((b) => (
        <div key={b.title} className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4">
          <span className="icon-circle h-10 w-10 shrink-0">
            <b.icon size={18} />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-brand-700">{b.title}</div>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">{b.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StepList({
  steps,
}: {
  steps: { title: string; text: string }[];
}) {
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-4 rounded-2xl bg-mint-50/70 border border-mint-100 p-4 avoid-break">
          <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-700 font-semibold shadow-sm">
            {i + 1}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-brand-700">{s.title}</div>
            <p className="mt-1 text-sm text-slate-700 leading-relaxed">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-sm text-slate-700">
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-600 mt-0.5">
            <IconCheck size={12} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

export function CTA({
  title,
  text,
  href,
  cta,
}: {
  title: string;
  text: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-2xl bg-brand-700 text-white px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 avoid-break">
      <div className="flex-1">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-sm text-white/80 mt-1">{text}</div>
      </div>
      <Link href={href} className="btn-light shrink-0 print:hidden">{cta}</Link>
    </div>
  );
}

export function InfoNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-cream-50 border border-cream-200 px-5 py-4 text-sm text-slate-700 leading-relaxed avoid-break">
      {children}
    </div>
  );
}
