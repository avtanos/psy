"use client";

import Link from "next/link";
import { MOCK_PSYCHOLOGISTS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";
import { TOPICS, METHODS, LANGUAGES } from "@/lib/catalog-data";
import { parseList } from "@/lib/json-list";
import { Banner } from "@/components/banner";
import { useT } from "@/components/lang-provider";
import {
  IconShield, IconSearch, IconStar, IconCheck, IconGrid, IconList,
  IconArrowRight, IconArrowLeft, IconRefresh,
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
  "psy-1": "Психолог, КПТ-терапевт",
  "psy-2": "Гештальт-терапевт",
  "psy-3": "Психоаналитик",
  "psy-4": "EMDR-терапевт",
  "psy-5": "Схема-терапевт",
  "psy-6": "Детский психолог",
  "psy-7": "ACT-терапевт",
  "psy-8": "Гуманистический психолог",
  "psy-9": "Специалист по зависимостям",
  "psy-10": "Кризисный психолог",
};

export default function PsychologistsPage() {
  const t = useT();
  const items = MOCK_PSYCHOLOGISTS;

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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-6">
        <Banner
          src="/banners/hero-catalog.jpg"
          imgHeight="md:h-[360px]"
          title={t("catalog.title")}
          subtitle={t("catalog.sub")}
        />
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="card-soft">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="label">{t("form.search")}</label>
              <div className="relative">
                <input className="input pl-10" placeholder={t("form.searchPlaceholder")} />
                <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="label">{t("form.topic")}</label>
              <select className="input">
                <option>{t("common.anyF")}</option>
                {TOPICS.map((to) => <option key={to.slug}>{t(TOPIC_KEYS[to.slug] ?? to.slug)}</option>)}
              </select>
            </div>
            <div>
              <label className="label">{t("form.method")}</label>
              <select className="input">
                <option>{t("common.anyM")}</option>
                {METHODS.map((m) => <option key={m.slug}>{t(METHOD_KEYS[m.slug] ?? m.slug)}</option>)}
              </select>
            </div>
            <div>
              <label className="label">{t("form.language")}</label>
              <select className="input">
                <option>{t("common.anyM")}</option>
                {LANGUAGES.map((l) => <option key={l.code}>{t(`language.${l.code}`)}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
            <div>
              <label className="label">{t("form.priceMax")}</label>
              <input type="number" className="input" placeholder={t("form.pricePlaceholder")} />
            </div>
            <div>
              <label className="label">{t("form.format")}</label>
              <select className="input">
                <option>{t("common.anyM")}</option>
                <option>{t("common.video")}</option>
                <option>{t("common.chat")}</option>
              </select>
            </div>
            <div>
              <label className="label">{t("form.sort")}</label>
              <select className="input">
                <option>{t("common.sortBy.rating")}</option>
                <option>{t("common.sortBy.priceAsc")}</option>
                <option>{t("common.sortBy.priceDesc")}</option>
                <option>{t("common.sortBy.experience")}</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary flex-1">
                {t("catalog.reset")} <IconRefresh size={15} />
              </button>
              <button className="btn-primary flex-1">{t("catalog.show")} ({items.length})</button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-600 mr-1">{t("common.quickFilters")}</span>
            {QUICK_FILTERS.map((slug) => (
              <button key={slug} className="rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-300 hover:bg-mint-50 transition-colors">
                {t(TOPIC_KEYS[slug])}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Count + view toggle */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-3 flex items-center justify-between">
        <div className="text-sm text-slate-600">{t("common.found")}: <b className="text-slate-800">{items.length} {t("common.specialistsFound")}</b></div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 hidden sm:inline">{t("common.view")}:</span>
          <div className="flex items-center gap-1 rounded-lg bg-white border border-brand-100 p-1">
            <button className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white">
              <IconGrid size={15} />
            </button>
            <button className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:text-brand">
              <IconList size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Cards grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, idx) => (
            <div key={p.id} className="card-soft flex flex-col">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="avatar-tile h-20 w-20 text-2xl">{p.user.displayName.slice(0, 1)}</div>
                  {idx === 0 && (
                    <span className="absolute -top-2 -left-2 rounded-full bg-brand text-white text-[10px] font-semibold px-2 py-1 shadow-sm whitespace-nowrap">
                      {t("common.topRated")}
                    </span>
                  )}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-white border border-mint-200 px-2 py-0.5 text-[10px] font-medium text-brand-600 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint-500" /> {t("common.online")}
                  </span>
                </div>
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

              <div className="mt-3 flex flex-wrap gap-1.5">
                {parseList(p.methods).slice(0, 2).map((m) => (
                  <span key={m} className="text-[11px] rounded-full bg-mint-50 px-2.5 py-1 text-brand-600 font-medium">
                    {t(METHOD_KEYS[m] ?? m)}
                  </span>
                ))}
                {parseList(p.methods).length > 2 && (
                  <span className="text-[11px] rounded-full bg-cream-100 px-2.5 py-1 text-slate-600 font-medium">
                    +{parseList(p.methods).length - 2}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm">
                  <IconStar size={14} className="text-amber-500" />
                  <span className="font-semibold text-slate-800">{p.rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-xs">· {p.reviewsCount} {t("common.reviews")}</span>
                </div>
                <div className="font-bold text-brand-700">{formatKGS(p.pricePerSession)}</div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link href={`/psychologists/${p.id}`} className="btn-primary !py-2.5 !text-sm">
                  <IconCheck size={15} /> {t("common.book")}
                </Link>
                <Link href={`/psychologists/${p.id}`} className="btn-secondary !py-2.5 !text-sm">
                  {t("common.details")}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-1">
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-100 bg-white text-slate-500 hover:border-brand-300">
            <IconArrowLeft size={16} />
          </button>
          {[1, 2, 3, 4].map((n) => (
            <button key={n} className={n === 1
              ? "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white font-medium"
              : "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-100 bg-white text-slate-700 hover:border-brand-300"}>
              {n}
            </button>
          ))}
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-100 bg-white text-slate-500 hover:border-brand-300">
            <IconArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
