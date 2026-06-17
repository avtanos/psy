"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MOCK_PSYCHOLOGISTS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";
import { TOPICS, METHODS, LANGUAGES } from "@/lib/catalog-data";
import { parseList } from "@/lib/json-list";
import { Banner } from "@/components/banner";
import { useT } from "@/components/lang-provider";
import {
  IconShield, IconSearch, IconStar, IconCheck, IconGrid, IconList,
  IconArrowRight, IconArrowLeft, IconRefresh, IconSparkles, IconChevronRight,
} from "@/components/icons";

const QUICK_FILTERS = ["anxiety", "relationships", "depression", "self-esteem", "family", "trauma", "addiction", "career"];

const TOPIC_KEYS: Record<string, string> = {
  anxiety: "topic.anxiety.t", depression: "topic.depression.t", relationships: "topic.relationships.t",
  family: "topic.family.t", "self-esteem": "topic.selfEsteem.t", trauma: "topic.trauma.t",
  addiction: "topic.addiction.t", career: "topic.career.t", grief: "topic.grief.t",
};
const METHOD_KEYS: Record<string, string> = {
  cbt: "method.cbt", gestalt: "method.gestalt", psychoanalysis: "method.psychoanalysis",
  "schema-therapy": "method.schema-therapy", humanistic: "method.humanistic", act: "method.act", emdr: "method.emdr",
};
const ROLE_TITLES: Record<string, string> = {
  "psy-1": "Психолог, КПТ-терапевт", "psy-2": "Гештальт-терапевт", "psy-3": "Психоаналитик",
  "psy-4": "EMDR-терапевт", "psy-5": "Схема-терапевт", "psy-6": "Детский психолог",
  "psy-7": "ACT-терапевт", "psy-8": "Гуманистический психолог", "psy-9": "Специалист по зависимостям",
  "psy-10": "Кризисный психолог",
};

type Sort = "rating" | "price_asc" | "price_desc" | "experience";
type View = "grid" | "list";
type Psy = (typeof MOCK_PSYCHOLOGISTS)[number];

export default function PsychologistsPage() {
  const t = useT();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("");
  const [method, setMethod] = useState("");
  const [language, setLanguage] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [format, setFormat] = useState("");
  const [sort, setSort] = useState<Sort>("rating");
  const [view, setView] = useState<View>("grid");
  const [pageSize, setPageSize] = useState(9);
  const [page, setPage] = useState(1);

  const anyFilter = q || topic || method || language || priceMax || format;

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const priceCap = priceMax ? Number(priceMax) * 100 : 0;
    const list = MOCK_PSYCHOLOGISTS.filter((p) => {
      if (topic && !parseList(p.topics).includes(topic)) return false;
      if (method && !parseList(p.methods).includes(method)) return false;
      if (language && !parseList(p.languages).includes(language)) return false;
      if (format && !parseList(p.format).includes(format)) return false;
      if (priceCap && p.pricePerSession > priceCap) return false;
      if (ql) {
        const hay = `${p.user.displayName} ${p.bio} ${p.approach} ${ROLE_TITLES[p.id] ?? ""}`.toLowerCase();
        if (!hay.includes(ql)) return false;
      }
      return true;
    });
    list.sort((a, b) => {
      switch (sort) {
        case "price_asc": return a.pricePerSession - b.pricePerSession;
        case "price_desc": return b.pricePerSession - a.pricePerSession;
        case "experience": return b.experienceYears - a.experienceYears;
        default: return b.rating - a.rating || b.reviewsCount - a.reviewsCount;
      }
    });
    return list;
  }, [q, topic, method, language, priceMax, format, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  function resetPage() { setPage(1); }
  function reset() {
    setQ(""); setTopic(""); setMethod(""); setLanguage(""); setPriceMax(""); setFormat(""); setSort("rating"); setPage(1);
  }
  function scrollToResults() {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-cream-50">
      {/* Trust banner */}
      <div className="bg-mint-50 border-b border-mint-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2.5 flex items-center justify-center gap-3 text-sm text-brand-700">
          <IconShield size={16} className="text-mint-500 shrink-0" />
          <span className="text-center">{t("trust.banner")}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-4">
        <Banner src="/banners/hero-catalog.jpg" imgHeight="md:h-[360px]" title={t("catalog.title")} subtitle={t("catalog.sub")} />
      </section>

      {/* Guided matching CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-4">
        <Link href="/intake" className="flex items-center justify-between gap-3 rounded-2xl bg-brand-700 text-white px-5 py-4 hover:bg-brand-600 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <span className="icon-circle h-10 w-10 bg-white/10 text-white shrink-0"><IconSparkles size={18} /></span>
            <div className="min-w-0">
              <div className="font-semibold">{t("intake.cta")}</div>
              <div className="text-sm text-mint-200 truncate">{t("intake.ctaSub")}</div>
            </div>
          </div>
          <IconChevronRight size={20} className="shrink-0" />
        </Link>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="card-soft">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="label">{t("form.search")}</label>
              <div className="relative">
                <input
                  value={q}
                  onChange={(e) => { setQ(e.target.value); resetPage(); }}
                  className="input pl-10"
                  placeholder={t("form.searchPlaceholder")}
                />
                <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="label">{t("form.topic")}</label>
              <select value={topic} onChange={(e) => { setTopic(e.target.value); resetPage(); }} className="input">
                <option value="">{t("common.anyF")}</option>
                {TOPICS.map((to) => <option key={to.slug} value={to.slug}>{t(TOPIC_KEYS[to.slug] ?? to.slug)}</option>)}
              </select>
            </div>
            <div>
              <label className="label">{t("form.method")}</label>
              <select value={method} onChange={(e) => { setMethod(e.target.value); resetPage(); }} className="input">
                <option value="">{t("common.anyM")}</option>
                {METHODS.map((m) => <option key={m.slug} value={m.slug}>{t(METHOD_KEYS[m.slug] ?? m.slug)}</option>)}
              </select>
            </div>
            <div>
              <label className="label">{t("form.language")}</label>
              <select value={language} onChange={(e) => { setLanguage(e.target.value); resetPage(); }} className="input">
                <option value="">{t("common.anyM")}</option>
                {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{t(`language.${l.code}`)}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="label">{t("form.priceMax")}</label>
              <input
                type="number" min={0} step={100} value={priceMax}
                onChange={(e) => { setPriceMax(e.target.value); resetPage(); }}
                className="input" placeholder={t("form.pricePlaceholder")}
              />
            </div>
            <div>
              <label className="label">{t("form.format")}</label>
              <select value={format} onChange={(e) => { setFormat(e.target.value); resetPage(); }} className="input">
                <option value="">{t("common.anyM")}</option>
                <option value="video">{t("common.video")}</option>
                <option value="chat">{t("common.chat")}</option>
              </select>
            </div>
            <div>
              <label className="label">{t("form.sort")}</label>
              <select value={sort} onChange={(e) => { setSort(e.target.value as Sort); resetPage(); }} className="input">
                <option value="rating">{t("common.sortBy.rating")}</option>
                <option value="price_asc">{t("common.sortBy.priceAsc")}</option>
                <option value="price_desc">{t("common.sortBy.priceDesc")}</option>
                <option value="experience">{t("common.sortBy.experience")}</option>
              </select>
            </div>
          </div>

          {/* Quick filters */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-600 mr-1">{t("common.quickFilters")}</span>
            {QUICK_FILTERS.map((slug) => {
              const active = topic === slug;
              return (
                <button
                  key={slug}
                  onClick={() => { setTopic(active ? "" : slug); resetPage(); }}
                  className={
                    "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors border " +
                    (active
                      ? "border-brand bg-brand text-white"
                      : "border-brand-100 bg-white text-slate-700 hover:border-brand-300 hover:bg-mint-50")
                  }
                >
                  {t(TOPIC_KEYS[slug])}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-brand-100/60 pt-4">
            <button
              onClick={reset}
              disabled={!anyFilter}
              className="btn-secondary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconRefresh size={15} /> {t("catalog.reset")}
            </button>
            <button onClick={scrollToResults} className="btn-primary whitespace-nowrap">
              {t("catalog.show")} ({filtered.length})
            </button>
          </div>
        </div>
      </section>

      {/* Count + view + page size */}
      <section ref={resultsRef} className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-3 flex flex-wrap items-center justify-between gap-3 scroll-mt-20">
        <div className="text-sm text-slate-600">
          {t("common.found")}: <b className="text-slate-800">{filtered.length} {t("common.specialistsFound")}</b>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="hidden sm:inline">{t("common.showBy")}</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="rounded-lg border border-brand-100 bg-white px-2 py-1.5 text-sm text-slate-700"
            >
              <option value={9}>9</option>
              <option value={18}>18</option>
            </select>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-white border border-brand-100 p-1">
            <button
              onClick={() => setView("grid")}
              aria-label="grid"
              className={"inline-flex h-7 w-7 items-center justify-center rounded-md " + (view === "grid" ? "bg-brand text-white" : "text-slate-400 hover:text-brand")}
            >
              <IconGrid size={15} />
            </button>
            <button
              onClick={() => setView("list")}
              aria-label="list"
              className={"inline-flex h-7 w-7 items-center justify-center rounded-md " + (view === "list" ? "bg-brand text-white" : "text-slate-400 hover:text-brand")}
            >
              <IconList size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-10">
        {filtered.length === 0 ? (
          <div className="card-soft text-center py-12">
            <p className="text-slate-600">{t("catalog.empty")}</p>
            <button onClick={reset} className="btn-secondary mt-4">
              <IconRefresh size={15} /> {t("catalog.reset")}
            </button>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((p, i) => (
              <CardGrid key={p.id} p={p} t={t} topRated={sort === "rating" && safePage === 1 && i === 0} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {pageItems.map((p, i) => (
              <RowList key={p.id} p={p} t={t} topRated={sort === "rating" && safePage === 1 && i === 0} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, safePage - 1))}
              disabled={safePage === 1}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-100 bg-white text-slate-500 hover:border-brand-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IconArrowLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, n) => n + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={n === safePage
                  ? "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white font-medium"
                  : "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-100 bg-white text-slate-700 hover:border-brand-300"}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, safePage + 1))}
              disabled={safePage === totalPages}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-100 bg-white text-slate-500 hover:border-brand-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IconArrowRight size={16} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function MethodChips({ p, t }: { p: Psy; t: (k: string) => string }) {
  const methods = parseList(p.methods);
  return (
    <div className="flex flex-wrap gap-1.5">
      {methods.slice(0, 2).map((m) => (
        <span key={m} className="text-[11px] rounded-full bg-mint-50 px-2.5 py-1 text-brand-600 font-medium">
          {t(METHOD_KEYS[m] ?? m)}
        </span>
      ))}
      {methods.length > 2 && (
        <span className="text-[11px] rounded-full bg-cream-100 px-2.5 py-1 text-slate-600 font-medium">+{methods.length - 2}</span>
      )}
    </div>
  );
}

function RatingPrice({ p, t }: { p: Psy; t: (k: string) => string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-sm">
        <IconStar size={14} className="text-amber-500" />
        <span className="font-semibold text-slate-800">{p.rating.toFixed(1)}</span>
        <span className="text-slate-400 text-xs">· {p.reviewsCount} {t("common.reviews")}</span>
      </div>
      <div className="font-bold text-brand-700">{formatKGS(p.pricePerSession)}</div>
    </div>
  );
}

function Avatar({ p, t, topRated, size }: { p: Psy; t: (k: string) => string; topRated: boolean; size: string }) {
  return (
    <div className="relative shrink-0">
      <div className={"avatar-tile " + size}>{p.user.displayName.slice(0, 1)}</div>
      {topRated && (
        <span className="absolute -top-2 -left-2 rounded-full bg-brand text-white text-[10px] font-semibold px-2 py-1 shadow-sm whitespace-nowrap">
          {t("common.topRated")}
        </span>
      )}
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-white border border-mint-200 px-2 py-0.5 text-[10px] font-medium text-brand-600 shadow-sm whitespace-nowrap">
        <span className="h-1.5 w-1.5 rounded-full bg-mint-500" /> {t("common.online")}
      </span>
    </div>
  );
}

function CardGrid({ p, t, topRated }: { p: Psy; t: (k: string) => string; topRated: boolean }) {
  return (
    <div className="card-soft flex flex-col">
      <div className="flex items-start gap-4">
        <Avatar p={p} t={t} topRated={topRated} size="h-20 w-20 text-2xl" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <span className="font-semibold text-brand-700 leading-snug">{p.user.displayName}</span>
            {p.verifiedBadge && (
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-600" title={t("common.verified")}>
                <IconCheck size={13} />
              </span>
            )}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{ROLE_TITLES[p.id] ?? t("common.psychologist")}</div>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600 line-clamp-3 leading-relaxed flex-1">{p.bio}</p>
      <div className="mt-3"><MethodChips p={p} t={t} /></div>
      <div className="mt-4"><RatingPrice p={p} t={t} /></div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/psychologists/${p.id}`} className="btn-primary !py-2.5 !text-sm"><IconCheck size={15} /> {t("common.book")}</Link>
        <Link href={`/psychologists/${p.id}`} className="btn-secondary !py-2.5 !text-sm">{t("common.details")}</Link>
      </div>
    </div>
  );
}

function RowList({ p, t, topRated }: { p: Psy; t: (k: string) => string; topRated: boolean }) {
  return (
    <div className="card-soft flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-start gap-4 sm:flex-1 min-w-0">
        <Avatar p={p} t={t} topRated={topRated} size="h-16 w-16 text-xl" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-brand-700">{p.user.displayName}</span>
            {p.verifiedBadge && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-mint-100 text-mint-600" title={t("common.verified")}>
                <IconCheck size={11} />
              </span>
            )}
            <span className="text-xs text-slate-500">· {ROLE_TITLES[p.id] ?? t("common.psychologist")}</span>
          </div>
          <p className="mt-1 text-sm text-slate-600 line-clamp-2 leading-relaxed">{p.bio}</p>
          <div className="mt-2"><MethodChips p={p} t={t} /></div>
        </div>
      </div>
      <div className="sm:w-52 sm:shrink-0 sm:text-right space-y-2 sm:border-l sm:border-brand-100/60 sm:pl-4">
        <div className="flex items-center gap-1.5 text-sm sm:justify-end">
          <IconStar size={14} className="text-amber-500" />
          <span className="font-semibold text-slate-800">{p.rating.toFixed(1)}</span>
          <span className="text-slate-400 text-xs">· {p.reviewsCount}</span>
        </div>
        <div className="font-bold text-brand-700">{formatKGS(p.pricePerSession)}</div>
        <div className="grid grid-cols-2 gap-2">
          <Link href={`/psychologists/${p.id}`} className="btn-primary !py-2 !text-sm">{t("common.book")}</Link>
          <Link href={`/psychologists/${p.id}`} className="btn-secondary !py-2 !text-sm">{t("common.details")}</Link>
        </div>
      </div>
    </div>
  );
}
