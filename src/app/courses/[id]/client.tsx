"use client";

import Link from "next/link";
import { formatKGS } from "@/lib/money";
import { HeroIllustration } from "@/components/hero-illustration";
import { useT } from "@/components/lang-provider";
import {
  IconHome, IconChevronRight, IconChevronDown, IconCheck, IconCheckCircle,
  IconAward, IconList, IconPlay, IconClock, IconVideo, IconChartBar, IconLifeBuoy,
  IconShield, IconLeaf, IconBrain, IconLungs, IconClipboard, IconHeadphones, IconNotebook,
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
  // KY: just "сабак" always; RU: урок/урока/уроков
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
    { icon: IconClock, label: t("course.duration"), value: t("course.durationVal") },
    { icon: IconVideo, label: t("course.formatLabel"), value: t("course.formatVal") },
    { icon: IconChartBar, label: t("course.level"), value: t("course.levelVal") },
    { icon: IconCheckCircle, label: t("course.access"), value: t("course.accessVal") },
    { icon: IconLifeBuoy, label: t("course.support"), value: t("course.supportVal") },
  ];

  const BENEFITS = [
    { icon: IconClipboard, title: t("course.benefit1") },
    { icon: IconNotebook, title: t("course.benefit2") },
    { icon: IconHeadphones, title: t("course.benefit3") },
    { icon: IconAward, title: t("course.benefit4") },
  ];

  return (
    <div className="bg-[#FBFAF7]">
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

        <div className="mt-5 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="card-soft">
              <div className="grid items-start gap-6 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-mint-100 flex items-center justify-center text-brand-700 font-semibold">
                      {c.authorName.slice(0, 1)}
                    </div>
                    <div>
                      <div className="font-semibold text-brand-700">{c.authorName}</div>
                      <span className="badge-verified mt-0.5">
                        <IconCheck size={12} /> {t("course.aboutAuthor")}
                      </span>
                    </div>
                  </div>

                  <h1 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-brand-700 leading-tight">
                    {c.title}
                  </h1>
                  <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div>
                  <HeroIllustration className="w-full max-w-sm mx-auto" />
                </div>
              </div>

              <hr className="my-6 border-slate-100" />

              <div className="grid gap-4 md:grid-cols-3 md:items-center">
                <div className="flex items-center gap-3">
                  <span className="icon-circle h-10 w-10"><IconAward size={18} /></span>
                  <div>
                    <div className="text-sm font-semibold text-brand-700">{t("course.feat.cert")}</div>
                    <div className="text-xs text-slate-500">{t("course.feat.certSub")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="icon-circle h-10 w-10"><IconList size={18} /></span>
                  <div>
                    <div className="text-sm font-semibold text-brand-700">{t("course.feat.struct")}</div>
                    <div className="text-xs text-slate-500">{t("course.feat.structSub")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="icon-circle h-10 w-10"><IconPlay size={18} /></span>
                  <div>
                    <div className="text-sm font-semibold text-brand-700">{t("course.feat.online")}</div>
                    <div className="text-xs text-slate-500">{t("course.feat.onlineSub")}</div>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-slate-100" />

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-3xl font-bold text-brand-700">
                  {c.price === 0 ? t("common.free") : formatKGS(c.price)}
                </div>
                <button className="btn-primary !px-7 !py-3">
                  {t("course.signUp")}
                </button>
              </div>
            </div>

            <div className="card-soft">
              <h2 className="text-xl font-bold text-brand-700">{t("course.program")}</h2>
              <div className="mt-5 space-y-3">
                {c.modules.map((m, i) => {
                  const Icon = MODULE_ICONS[i % MODULE_ICONS.length];
                  return (
                    <div key={m.id} className="rounded-xl border border-slate-100 bg-white px-4 py-3.5">
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint-100 text-brand-700 font-semibold">
                          {i + 1}
                        </div>
                        <span className="icon-circle h-10 w-10 shrink-0"><Icon size={18} /></span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-brand-700">
                            {t("course.module")} {i + 1}.&nbsp;&nbsp;{m.title}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-600">
                            {m.lessons.map((l, li) => (
                              <span key={l.id} className="inline-flex items-center gap-1.5">
                                {li > 0 && <span className="text-slate-300">·</span>}
                                {l.title}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 shrink-0">
                          <span>{m.lessons.length} {lessonWord(m.lessons.length, t)}</span>
                          <IconChevronDown size={16} />
                        </div>
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

          <aside className="space-y-5">
            <div className="card-soft">
              <h3 className="font-semibold text-brand-700">{t("course.forYou")}</h3>
              <ul className="mt-4 space-y-3">
                {FOR_YOU.map((tt) => (
                  <li key={tt} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-600 mt-0.5">
                      <IconCheck size={12} />
                    </span>
                    {tt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-soft">
              <ul className="space-y-4">
                {COURSE_INFO.map((info) => (
                  <li key={info.label} className="flex items-start gap-3">
                    <span className="icon-circle h-10 w-10 shrink-0"><info.icon size={16} /></span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-brand-700">{info.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{info.value}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-soft">
              <h3 className="font-semibold text-brand-700">{t("course.whatYouGet")}</h3>
              <ul className="mt-4 space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b.title} className="flex items-start gap-3 text-sm">
                    <span className="icon-circle h-8 w-8 shrink-0"><b.icon size={14} /></span>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-800">{b.title}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-soft bg-mint-50 border-mint-100">
              <div className="flex items-start gap-3">
                <span className="icon-circle h-10 w-10 shrink-0 bg-white">
                  <IconShield size={18} />
                </span>
                <div>
                  <div className="font-semibold text-brand-700">{t("course.guarantee.t")}</div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">{t("course.guarantee.s")}</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
