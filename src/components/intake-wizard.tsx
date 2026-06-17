"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useT, useLang } from "./lang-provider";
import { TOPICS, METHODS, LANGUAGES } from "@/lib/catalog-data";
import { matchPsychologists, type IntakeAnswers } from "@/lib/matching";
import { formatKGS } from "@/lib/money";
import {
  IconShield, IconStar, IconCheck, IconChevronRight, IconArrowLeft, IconAlert, IconSparkles,
} from "./icons";

const TOPIC_KEYS: Record<string, string> = {
  anxiety: "topic.anxiety.t", depression: "topic.depression.t", relationships: "topic.relationships.t",
  family: "topic.family.t", "self-esteem": "topic.selfEsteem.t", trauma: "topic.trauma.t",
  addiction: "topic.addiction.t", career: "topic.career.t", grief: "topic.grief.t",
};
const METHOD_KEYS: Record<string, string> = {
  cbt: "method.cbt", gestalt: "method.gestalt", psychoanalysis: "method.psychoanalysis",
  "schema-therapy": "method.schema-therapy", humanistic: "method.humanistic", act: "method.act", emdr: "method.emdr",
};
const SPECIALTY: Record<string, string> = {
  "psy-1": "Психолог, КПТ-терапевт", "psy-2": "Гештальт-терапевт", "psy-3": "Психоаналитик",
  "psy-4": "EMDR-терапевт", "psy-5": "Схема-терапевт", "psy-6": "Детский психолог",
  "psy-7": "ACT-терапевт", "psy-8": "Гуманистический психолог", "psy-9": "Специалист по зависимостям",
  "psy-10": "Кризисный психолог",
};

type Opt = { value: string; label: string };
type Step = { id: keyof IntakeAnswers; title: string; options: Opt[]; numeric?: boolean };

export function IntakeWizard() {
  const t = useT();
  const { lang } = useLang();
  const router = useRouter();

  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<IntakeAnswers>({});
  const [done, setDone] = useState(false);
  const [safetyGate, setSafetyGate] = useState(false);

  const steps: Step[] = [
    {
      id: "topic", title: t("q.topic.title"),
      options: [...TOPICS.map((x) => ({ value: x.slug, label: t(TOPIC_KEYS[x.slug]) })), { value: "unknown", label: t("opt.unknown") }],
    },
    {
      id: "urgency", title: t("q.urgency.title"),
      options: [
        { value: "safety", label: t("urgency.safety") },
        { value: "soon", label: t("urgency.soon") },
        { value: "calm", label: t("urgency.calm") },
      ],
    },
    {
      id: "gender", title: t("q.gender.title"),
      options: [{ value: "any", label: t("gender.any") }, { value: "F", label: t("gender.F") }, { value: "M", label: t("gender.M") }],
    },
    {
      id: "language", title: t("q.language.title"),
      options: [...LANGUAGES.map((l) => ({ value: l.code, label: t(`language.${l.code}`) })), { value: "any", label: t("lang.any") }],
    },
    {
      id: "format", title: t("q.format.title"),
      options: [{ value: "video", label: t("common.video") }, { value: "chat", label: t("common.chat") }, { value: "any", label: t("format.any") }],
    },
    {
      id: "method", title: t("q.method.title"),
      options: [...METHODS.map((m) => ({ value: m.slug, label: t(METHOD_KEYS[m.slug]) })), { value: "any", label: t("method.any") }],
    },
    {
      id: "budget", title: t("q.budget.title"), numeric: true,
      options: [
        { value: "250000", label: t("budget.opt1") },
        { value: "300000", label: t("budget.opt2") },
        { value: "350000", label: t("budget.opt3") },
        { value: "0", label: t("budget.any") },
      ],
    },
  ];

  function choose(s: Step, value: string) {
    const a: IntakeAnswers = { ...answers, [s.id]: s.numeric ? Number(value) : value };
    setAnswers(a);
    if (s.id === "urgency" && value === "safety") { setSafetyGate(true); return; }
    if (step + 1 >= steps.length) setDone(true);
    else setStep(step + 1);
  }

  function restart() {
    setAnswers({}); setStep(0); setDone(false); setStarted(false); setSafetyGate(false);
  }

  // ---- Safety gate (urgency = safety) ----
  if (safetyGate) {
    return (
      <div className="rounded-2xl border-2 border-rose-300 bg-white shadow-soft overflow-hidden">
        <div className="bg-rose-600 text-white px-6 py-5 flex items-start gap-3">
          <IconAlert size={26} className="shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-bold">{t("intake.safetyTitle")}</h2>
            <p className="mt-1 text-sm text-rose-50 leading-relaxed">{t("intake.safetyText")}</p>
          </div>
        </div>
        <div className="p-6 flex flex-wrap gap-3">
          <button onClick={() => router.push("/me/safety-check")} className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-700">
            {t("intake.safetyGo")}
          </button>
          <button onClick={() => { setSafetyGate(false); setStep(step + 1 >= steps.length ? steps.length - 1 : step + 1); }} className="btn-secondary">
            {t("intake.safetySkip")}
          </button>
        </div>
      </div>
    );
  }

  // ---- Results ----
  if (done) {
    const matches = matchPsychologists(answers).slice(0, 4);
    const weak = matches[0]?.score < 60;
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-brand-700">
          <IconSparkles size={20} className="text-mint-500" />
          <h2 className="text-xl font-bold">{t("intake.resultsTitle")}</h2>
        </div>
        {weak && (
          <div className="rounded-xl bg-cream-100 border border-cream-200 px-4 py-3 text-sm text-slate-600">
            {t("intake.noStrong")}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {matches.map((m) => (
            <div key={m.psy.id} className="card-soft flex flex-col">
              <div className="flex items-start gap-3.5">
                <div className="avatar-tile h-16 w-16 text-xl">{m.psy.user.displayName.slice(0, 1)}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-brand-700 leading-snug">{m.psy.user.displayName}</span>
                    <span className="shrink-0 rounded-full bg-mint-100 text-brand-700 px-2.5 py-1 text-xs font-bold">
                      {m.score}% {t("intake.match")}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{SPECIALTY[m.psy.id]}</div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-sm">
                    <IconStar size={13} className="text-amber-500" />
                    <span className="font-medium text-slate-700">{m.psy.rating.toFixed(1)}</span>
                    <span className="text-slate-400 text-xs">· {m.psy.reviewsCount} {t("common.reviews")}</span>
                    <span className="ml-auto font-semibold text-brand-700">{formatKGS(m.psy.pricePerSession)}</span>
                  </div>
                </div>
              </div>

              {m.reasons.length > 0 && (
                <div className="mt-3">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{t("intake.why")}</div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {m.reasons.slice(0, 3).map((r) => (
                      <span key={r} className="inline-flex items-center gap-1 rounded-full bg-mint-50 px-2.5 py-1 text-[11px] font-medium text-brand-600">
                        <IconCheck size={11} /> {t(`reason.${r}`)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link href={`/psychologists/${m.psy.id}`} className="btn-primary !py-2.5 !text-sm">{t("intake.book")}</Link>
                <Link href={`/psychologists/${m.psy.id}`} className="btn-secondary !py-2.5 !text-sm">{t("intake.viewProfile")}</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={restart} className="btn-secondary">{t("intake.restart")}</button>
          <Link href="/psychologists" className="text-sm text-brand-600 font-medium hover:underline">
            {lang === "ru" ? "Смотреть весь каталог" : "Бардык каталогду көрүү"} →
          </Link>
        </div>
      </div>
    );
  }

  // ---- Intro ----
  if (!started) {
    return (
      <div className="card-soft space-y-5 max-w-xl">
        <div className="flex items-start gap-3">
          <span className="icon-circle h-11 w-11 shrink-0"><IconSparkles size={20} /></span>
          <div>
            <h2 className="text-xl font-bold text-brand-700">{t("intake.title")}</h2>
            <p className="mt-2 text-slate-600 leading-relaxed">{t("intake.intro")}</p>
          </div>
        </div>
        <button onClick={() => setStarted(true)} className="btn-primary">
          {t("intake.start")} <IconChevronRight size={16} />
        </button>
      </div>
    );
  }

  // ---- Question ----
  const s = steps[step];
  return (
    <div className="card-soft space-y-5 max-w-xl">
      <div>
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {lang === "ru" ? "Вопрос" : "Суроо"} {step + 1}/{steps.length}
          </div>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700">
              <IconArrowLeft size={13} /> {t("intake.back")}
            </button>
          )}
        </div>
        {/* progress */}
        <div className="mt-2 h-1.5 rounded-full bg-mint-100 overflow-hidden">
          <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <h2 className="mt-4 text-lg md:text-xl font-semibold text-brand-700 leading-snug">{s.title}</h2>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {s.options.map((o) => {
          const danger = s.id === "urgency" && o.value === "safety";
          return (
            <button
              key={o.value}
              onClick={() => choose(s, o.value)}
              className={
                "rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-colors " +
                (danger
                  ? "border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-400"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand hover:bg-mint-50")
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>

      <button onClick={restart} className="text-sm text-slate-400 hover:text-slate-600">{t("intake.restart")}</button>
    </div>
  );
}
