"use client";

import Link from "next/link";
import { formatKGS } from "@/lib/money";
import { HeroIllustration } from "@/components/hero-illustration";
import { useT } from "@/components/lang-provider";
import {
  IconHome, IconChevronRight, IconChevronDown, IconCheck, IconCheckCircle,
  IconAward, IconList, IconPlay, IconClock, IconVideo, IconChartBar, IconLifeBuoy,
  IconShield, IconLeaf, IconBrain, IconLungs, IconClipboard, IconHeadphones, IconNotebook,
  IconUser, IconQuote,
} from "@/components/icons";

const MODULE_ICONS = [IconLeaf, IconBrain, IconLungs, IconShield];

type Lesson = { id: string; title: string };
type Module = { id: string; title: string; lessons: Lesson[] };
type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  authorName: string;
  enrollments: number;
  certificateEnabled: boolean;
  modules: Module[];
};

function lessonWord(n: number, t: (k: string) => string) {
  if (n === 1) return t("course.lesson1");
  if (n >= 2 && n <= 4) return t("course.lessonFew");
  return t("course.lessonMany");
}

export function CourseDetailClient({ course: c }: { course: Course }) {
  const t = useT();

  const FOR_YOU = [
    "Чувствуете постоянную тревогу или напряжение",
    "Часто беспокоитесь о будущем",
    "Испытываете трудности с контролем тревожных мыслей",
    "Хотите научиться техникам, которые действительно работают",
  ];

  const COURSE_INFO = [
    { icon: IconUser, label: t("course.forYou"), value: "Для взрослых, испытывающих тревогу и беспокойство" },
    { icon: IconClock, label: t("course.duration"), value: t("course.durationVal") },
    { icon: IconVideo, label: t("course.formatLabel"), value: t("course.formatVal") },
    { icon: IconCheckCircle, label: t("course.access"), value: t("course.accessVal") },
    { icon: IconLifeBuoy, label: t("course.support"), value: t("course.supportVal") },
  ];

  const HERO_FEATURES = [
    { icon: IconAward, title: t("course.feat.cert"), sub: t("course.feat.certSub") },
    { icon: IconList, title: t("course.feat.struct"), sub: t("course.feat.structSub") },
    { icon: IconPlay, title: t("course.feat.online"), sub: t("course.feat.onlineSub") },
    { icon: IconShield, title: t("course.feat.safe"), sub: t("course.feat.safeSub") },
  ];

  return (
    <div className="bg-cream-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-12">
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-brand">
            <IconHome size={14} /> {t("common.home")}
          </Link>
          <IconChevronRight size={12} />
          <Link href="/courses" className="hover:text-brand">{t("courses.title")}</Link>
          <IconChevronRight size={12} />
          <span className="text-slate-700 font-medium truncate">{c.title}</span>
        </nav>

        <div className="mt-5 grid gap-6 lg:grid-cols-3 lg:items-start">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero card */}
            <div className="card-soft overflow-hidden">
              <div className="grid items-start gap-6 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="avatar-tile h-12 w-12">{c.authorName.slice(0, 1)}</div>
                    <div>
                      <div className="font-semibold text-brand-700">{c.authorName}</div>
                      <span className="badge-verified mt-0.5">
                        <IconCheck size={12} /> {t("course.aboutAuthor")}
                      </span>
                    </div>
                  </div>

                  <h1 className="mt-5 font-display text-3xl md:text-4xl font-semibold tracking-tight text-brand-700 leading-tight">
                    {c.title}
                  </h1>
                  <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="mt-6 flex items-center gap-4 flex-wrap">
                    <div className="font-display text-3xl font-semibold text-brand-700">
                      {c.price === 0 ? t("common.free") : formatKGS(c.price)}
                    </div>
                    <button className="btn-primary !px-6">{t("course.signUpCourse")}</button>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs text-slate-500">
                    <IconShield size={14} className="text-mint-500" />
                    {t("course.securePay")}
                  </div>
                </div>

                <div>
                  <HeroIllustration className="w-full max-w-sm mx-auto" />
                </div>
              </div>

              <hr className="my-6 border-brand-100/60" />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {HERO_FEATURES.map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <span className="icon-circle h-10 w-10 shrink-0"><f.icon size={18} /></span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-brand-700 leading-snug">{f.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{f.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Program */}
            <div className="card-soft">
              <h2 className="font-display text-xl font-semibold text-brand-700">{t("course.program")}</h2>
              <div className="mt-5 space-y-3">
                {c.modules.map((m, i) => {
                  const Icon = MODULE_ICONS[i % MODULE_ICONS.length];
                  const weeks = i < 1 ? 1 : 2;
                  return (
                    <div key={m.id} className="rounded-xl border border-brand-100/60 bg-white px-4 py-3.5 hover:border-mint-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="icon-circle h-10 w-10 shrink-0"><Icon size={18} /></span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-brand-700">
                            {t("course.module")} {i + 1}. {m.title}
                          </div>
                          <div className="mt-1 hidden sm:flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                            {m.lessons.map((l, li) => (
                              <span key={l.id} className="inline-flex items-center gap-1.5">
                                {li > 0 && <span className="text-slate-300">·</span>}
                                {l.title}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {weeks} {t("course.week")}
                        </span>
                        <IconChevronDown size={16} className="text-slate-400 shrink-0" />
                      </div>
                    </div>
                  );
                })}
              </div>
              {c.certificateEnabled && (
                <div className="mt-5 rounded-xl bg-mint-50 border border-mint-100 px-4 py-3 flex items-center gap-3 text-sm text-brand-700">
                  <IconAward size={20} className="text-mint-500 shrink-0" />
                  {t("course.certNote")}
                </div>
              )}
            </div>
          </div>

          {/* FLOATING SIDEBAR */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl bg-white shadow-float border border-brand-100/50 overflow-hidden">
              {/* Quote header */}
              <div className="relative bg-brand-700 text-white px-6 py-6">
                <IconQuote size={22} className="text-mint-300" />
                <p className="mt-2 font-display italic text-mint-50 leading-relaxed text-sm">
                  {t("course.quote")}
                </p>
                <IconLeaf size={90} className="absolute -bottom-4 -right-4 text-white/5" />
              </div>

              {/* Info list */}
              <div className="px-6 py-5">
                <ul className="space-y-4">
                  {COURSE_INFO.map((info) => (
                    <li key={info.label} className="flex items-start gap-3">
                      <span className="icon-circle h-9 w-9 shrink-0"><info.icon size={16} /></span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-brand-700">{info.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{info.value}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-brand-100/60 pt-5">
                  <div className="text-sm font-semibold text-brand-700">{t("course.whatYouGet")}</div>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{t("course.benefit1")}</p>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-xl bg-cream-100 px-4 py-3">
                  <IconAward size={20} className="text-mint-500 shrink-0" />
                  <div className="text-xs">
                    <div className="font-semibold text-brand-700">{t("course.feat.cert")} PsychKG</div>
                    <div className="text-slate-500">{t("course.feat.certSub")}</div>
                  </div>
                </div>

                <button className="btn-primary w-full mt-5">{t("course.signUpCourse")}</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
