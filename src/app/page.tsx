"use client";

import Link from "next/link";
import { Banner } from "@/components/banner";
import { MOCK_PSYCHOLOGISTS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";
import { parseList } from "@/lib/json-list";
import { useT } from "@/components/lang-provider";
import {
  IconShield, IconLock, IconMessageCircle, IconCalendar,
  IconBrain, IconHeart, IconCloud, IconUser, IconLeaf, IconUsers, IconBriefcase,
  IconChevronRight, IconSearch, IconVideo, IconStar, IconCheck,
  IconArrowRight, IconQuote,
} from "@/components/icons";

const TOPICS = [
  { slug: "anxiety", icon: IconBrain, k: "topic.anxiety.t" },
  { slug: "relationships", icon: IconHeart, k: "topic.relationships.t" },
  { slug: "depression", icon: IconCloud, k: "topic.depression.t" },
  { slug: "self-esteem", icon: IconUser, k: "topic.selfEsteem.t" },
  { slug: "family", icon: IconUsers, k: "topic.family.t" },
  { slug: "trauma", icon: IconShield, k: "topic.trauma.t" },
  { slug: "addiction", icon: IconLeaf, k: "topic.addiction.t" },
  { slug: "career", icon: IconBriefcase, k: "topic.career.t" },
];

const METHOD_KEYS: Record<string, string> = {
  cbt: "method.cbt", gestalt: "method.gestalt", psychoanalysis: "method.psychoanalysis",
  "schema-therapy": "method.schema-therapy", humanistic: "method.humanistic", act: "method.act", emdr: "method.emdr",
};

export default function Home() {
  const t = useT();
  const featured = MOCK_PSYCHOLOGISTS.slice(0, 3);

  const FEATURES = [
    { icon: IconShield, title: t("home.feat1.t"), sub: t("home.feat1.s") },
    { icon: IconLock, title: t("home.feat2.t"), sub: t("home.feat2.s") },
    { icon: IconMessageCircle, title: t("home.feat3.t"), sub: t("home.feat3.s") },
    { icon: IconCalendar, title: t("home.feat4.t"), sub: t("home.feat4.s") },
  ];

  const STEPS = [
    { n: 1, title: t("home.step1.t"), text: t("home.step1.s"), icon: IconSearch },
    { n: 2, title: t("home.step2.t"), text: t("home.step2.s"), icon: IconCalendar },
    { n: 3, title: t("home.step3.t"), text: t("home.step3.s"), icon: IconVideo },
  ];

  return (
    <div className="bg-cream-50">
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 md:pt-8">
          <Banner
            src="/banners/hero-home.jpg"
            imgHeight="md:h-[460px]"
            title={<>{t("home.heroTitleA")}{" "}<span className="italic font-normal text-brand-600">{t("home.heroTitleB")}</span></>}
            subtitle={t("home.heroSub")}
            actions={<>
              <Link href="/psychologists" className="btn-primary">
                {t("home.findPsy")}
                <IconChevronRight size={16} />
              </Link>
              <Link href="/for-psychologists" className="btn-secondary">
                <IconUser size={16} />
                {t("home.iAmPsy")}
              </Link>
            </>}
            note={
              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <IconShield size={16} className="text-mint-500" />
                {t("home.trustLine")}
              </div>
            }
          />
        </div>

        {/* Features card overlapping */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative -mt-2 md:-mt-8 pb-2">
          <div className="rounded-2xl bg-white shadow-soft border border-brand-100/50 px-4 sm:px-6 py-5">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-brand-100/70">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-3 lg:px-5 first:lg:pl-0">
                  <span className="icon-circle h-11 w-11">
                    <f.icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-brand-700">{f.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-12">
        <div className="flex items-center justify-between">
          <h2 className="h-section">{t("home.topicsTitle")}</h2>
          <Link href="/psychologists" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            {t("home.allTopics")} <IconArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {TOPICS.map((to) => (
            <Link
              key={to.slug}
              href={`/psychologists?topic=${to.slug}`}
              className="topic-chip w-full !whitespace-normal !rounded-2xl text-left leading-tight"
            >
              <span className="icon-circle h-8 w-8 shrink-0">
                <to.icon size={16} />
              </span>
              <span>{t(to.k)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS + STATS */}
      <section id="how" className="mx-auto max-w-7xl px-4 sm:px-6 pb-4">
        <div className="rounded-3xl bg-cream-100 border border-cream-200 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="h-section">{t("home.howTitle")}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 relative">
                {STEPS.map((s, i) => (
                  <div key={s.n} className="relative">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white text-sm font-semibold">
                        {s.n}
                      </div>
                      <span className="icon-circle h-11 w-11 bg-white">
                        <s.icon size={18} />
                      </span>
                    </div>
                    <div className="mt-3 font-semibold text-brand-700">{s.title}</div>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.text}</p>
                    {i < STEPS.length - 1 && (
                      <div className="hidden sm:block absolute top-4 left-[calc(100%-1.25rem)] w-8 border-t-2 border-dashed border-mint-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Dark stats + testimonial card */}
            <div className="rounded-2xl bg-brand-700 text-white p-6 relative overflow-hidden">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { v: "10+", l: t("home.stat1") },
                  { v: "1 200+", l: t("home.stat2") },
                  { v: "98%", l: t("home.stat3") },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-2xl font-semibold">{s.v}</div>
                    <div className="text-[11px] text-mint-200 mt-1 leading-tight">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-white/15 pt-5 relative">
                <IconQuote size={22} className="text-mint-300" />
                <p className="mt-2 font-display italic text-mint-50 leading-relaxed">
                  {t("home.testimonial")}
                </p>
              </div>
              <IconLeaf size={120} className="absolute -bottom-6 -right-6 text-white/5" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SPECIALISTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-14">
        <div className="flex items-center justify-between">
          <h2 className="h-section">{t("home.featuredTitle")}</h2>
          <Link href="/psychologists" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            {t("home.seeAll")} <IconArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link key={p.id} href={`/psychologists/${p.id}`} className="card-soft group flex items-start gap-4">
              <div className="avatar-tile h-16 w-16 text-xl">{p.user.displayName.slice(0, 1)}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-brand-700 group-hover:underline">{p.user.displayName}</span>
                  {p.verifiedBadge && <IconCheck size={14} className="text-mint-500" />}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{p.bio.split(/[.,]/)[0]}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {parseList(p.methods).slice(0, 2).map((m) => (
                    <span key={m} className="text-[11px] rounded-full bg-mint-50 px-2 py-0.5 text-brand-600 font-medium">
                      {t(METHOD_KEYS[m] ?? m)}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-sm">
                  <IconStar size={14} className="text-amber-500" />
                  <span className="font-medium text-slate-700">{p.rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-xs">({p.reviewsCount} {t("common.reviews")})</span>
                  <span className="ml-auto font-semibold text-brand-700">{formatKGS(p.pricePerSession)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
