"use client";

import Link from "next/link";
import { formatKGS } from "@/lib/money";
import { parseList } from "@/lib/json-list";
import { useT } from "@/components/lang-provider";
import { IconHome, IconChevronRight, IconCheck, IconStar, IconShield } from "@/components/icons";

const TOPIC_KEYS: Record<string, string> = {
  anxiety: "topic.anxiety.t",
  depression: "topic.depression.t",
  relationships: "topic.relationships.t",
  family: "topic.family.t",
  "self-esteem": "topic.selfEsteem.t",
  trauma: "topic.trauma.t",
  addiction: "topic.addiction.t",
  career: "topic.career.t",
  grief: "topic.grief.t",
};

const METHOD_KEYS: Record<string, string> = {
  cbt: "method.cbt",
  gestalt: "method.gestalt",
  psychoanalysis: "method.psychoanalysis",
  "schema-therapy": "method.schema-therapy",
  humanistic: "method.humanistic",
  act: "method.act",
  emdr: "method.emdr",
};

type Psy = {
  id: string;
  bio: string;
  approach: string;
  experienceYears: number;
  pricePerSession: number;
  sessionMinutes: number;
  rating: number;
  reviewsCount: number;
  verifiedBadge: boolean;
  topics: string;
  methods: string;
  languages: string;
  user: { displayName: string };
};

type Review = { id: string; authorName: string; rating: number; text: string; date: string };

export function PsychologistDetailClient({
  psychologist: p,
  reviews,
}: {
  psychologist: Psy;
  reviews: Review[];
}) {
  const t = useT();
  const topics = parseList(p.topics);
  const methods = parseList(p.methods);
  const languages = parseList(p.languages);

  return (
    <div className="bg-[#FBFAF7] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-brand">
            <IconHome size={14} /> {t("common.home")}
          </Link>
          <IconChevronRight size={12} />
          <Link href="/psychologists" className="hover:text-brand">{t("nav.psychologists")}</Link>
          <IconChevronRight size={12} />
          <span className="text-slate-700 font-medium truncate">{p.user.displayName}</span>
        </nav>

        <div className="mt-5 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <div className="card-soft">
              <div className="flex flex-wrap items-start gap-5">
                <div className="h-20 w-20 shrink-0 rounded-full bg-mint-100 flex items-center justify-center text-brand-700 text-2xl font-semibold">
                  {p.user.displayName.slice(0, 1)}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-brand-700">
                    {p.user.displayName}
                  </h1>
                  <div className="mt-1 text-sm text-slate-500">
                    {t("common.psychologist")} · {t("common.experience")} {p.experienceYears} {t("common.years")}
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-sm flex-wrap">
                    <div className="inline-flex items-center gap-1.5">
                      <IconStar size={14} className="text-amber-500" />
                      <span className="font-semibold text-slate-800">{p.rating.toFixed(1)}</span>
                      <span className="text-slate-500">· {p.reviewsCount} {t("common.reviews")}</span>
                    </div>
                    {p.verifiedBadge && (
                      <span className="badge-verified">
                        <IconCheck size={12} /> {t("common.verified")}
                      </span>
                    )}
                    {languages.map((l) => (
                      <span key={l} className="text-xs rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
                        {t(`language.${l}`)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-full sm:w-auto sm:text-right">
                  <div className="text-2xl font-bold text-brand-700">{formatKGS(p.pricePerSession)}</div>
                  <div className="text-xs text-slate-500">{t("psy.perSession")} {p.sessionMinutes} {t("common.minutes")}</div>
                </div>
              </div>

              <hr className="my-5 border-slate-100" />

              <p className="text-slate-700 whitespace-pre-line leading-relaxed">{p.bio}</p>
              {p.approach && (
                <>
                  <h3 className="mt-5 font-semibold text-brand-700">{t("psy.approach")}</h3>
                  <p className="mt-2 text-slate-700 whitespace-pre-line leading-relaxed">{p.approach}</p>
                </>
              )}
            </div>

            <div className="card-soft">
              <h3 className="font-semibold text-brand-700">{t("psy.topicsMethods")}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {topics.map((to) => (
                  <span key={to} className="text-xs rounded-full bg-mint-50 px-3 py-1.5 text-mint-700 font-medium">
                    {t(TOPIC_KEYS[to] ?? to)}
                  </span>
                ))}
                {methods.map((m) => (
                  <span key={m} className="text-xs rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
                    {t(METHOD_KEYS[m] ?? m)}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-soft">
              <h3 className="font-semibold text-brand-700">{t("psy.reviewsTitle")}</h3>
              {reviews.length === 0 && (
                <p className="mt-3 text-sm text-slate-600">{t("psy.noReviews")}</p>
              )}
              <ul className="mt-4 space-y-4">
                {reviews.map((r) => (
                  <li key={r.id} className="rounded-xl border border-slate-100 p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-slate-800">{r.authorName}</span>
                      <span className="text-amber-500 inline-flex">
                        {Array.from({ length: r.rating }).map((_, i) => <IconStar key={i} size={12} />)}
                      </span>
                      <span className="ml-auto text-xs text-slate-500">{r.date}</span>
                    </div>
                    {r.text && <p className="mt-2 text-sm text-slate-700 leading-relaxed">{r.text}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="card-soft">
              <h3 className="font-semibold text-brand-700">{t("psy.book")}</h3>
              <p className="mt-1 text-sm text-slate-600">{t("psy.bookSlots")}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {["Пн 10:00", "Пн 14:00", "Вт 10:00", "Ср 11:00", "Чт 15:00", "Пт 10:00"].map((slot) => (
                  <button key={slot} className="rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-brand-700 hover:border-brand hover:bg-mint-50">
                    {slot}
                  </button>
                ))}
              </div>
              <button className="btn-primary w-full mt-4">{t("psy.bookCta")}</button>
              <p className="mt-3 text-xs text-slate-500 text-center">{t("psy.demoNote")}</p>
            </div>

            <div className="card-soft bg-mint-50 border-mint-100">
              <div className="flex items-start gap-3">
                <span className="icon-circle h-10 w-10 shrink-0 bg-white">
                  <IconShield size={18} />
                </span>
                <div>
                  <div className="font-semibold text-brand-700">{t("psy.safetyTitle")}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t("psy.safetyText")}</p>
                </div>
              </div>
              <Link href="/legal/privacy" className="mt-3 inline-block text-xs text-brand-600 font-medium hover:underline">
                {t("psy.privacyLink")}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
