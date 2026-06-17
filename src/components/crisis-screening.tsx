"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "./lang-provider";
import {
  getCrisis, classifyRisk, needsEscalation, emergencyContacts,
  RISK_META, type Answers, type RiskLevel,
} from "@/lib/crisis";
import {
  IconAlert, IconPhone, IconShield, IconCheck, IconLifeRing, IconChevronRight,
} from "./icons";

type StepId = keyof Answers | "DONE";

function next(id: keyof Answers, val: boolean, a: Answers): StepId {
  switch (id) {
    case "q1": return "q2";
    case "q2": return a.q1 || val ? "q3" : "q6";
    case "q3": return "q4";
    case "q4": return "q5";
    case "q5": return "q6";
    case "q6": return val ? "q6recent" : "DONE";
    case "q6recent": return "DONE";
    default: return "DONE";
  }
}

export function CrisisScreening() {
  const { lang } = useLang();
  const c = getCrisis(lang);
  const contacts = emergencyContacts(lang);

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState<StepId>("q1");
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const level: RiskLevel = classifyRisk(answers);
  const escalate = done && needsEscalation(level);

  function answer(val: boolean) {
    if (current === "DONE") return;
    const id = current as keyof Answers;
    const a = { ...answers, [id]: val };
    setAnswers(a);
    const n = next(id, val, a);
    if (n === "DONE") setDone(true);
    else setCurrent(n);
  }

  function restart() {
    setAnswers({});
    setCurrent("q1");
    setDone(false);
    setStarted(false);
  }

  // Persistent emergency mini-bar — видна на всех экранах скрининга
  const EmergencyBar = (
    <div className="flex flex-wrap items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 px-3 py-2 text-sm">
      <span className="inline-flex items-center gap-1.5 font-medium text-rose-700">
        <IconAlert size={15} /> {c.emergencyShort}:
      </span>
      <a href="tel:112" className="rounded-lg bg-rose-600 text-white px-2.5 py-1 text-xs font-semibold">112</a>
      <a href="tel:103" className="rounded-lg bg-rose-600 text-white px-2.5 py-1 text-xs font-semibold">103</a>
    </div>
  );

  const ContactButtons = (
    <div className="grid gap-2 sm:grid-cols-2">
      {contacts.map((ct) => (
        <a
          key={ct.tel}
          href={`tel:${ct.tel}`}
          className={
            "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors " +
            (ct.primary
              ? "bg-rose-600 text-white hover:bg-rose-700"
              : "bg-white border border-rose-100 text-rose-700 hover:bg-rose-50")
          }
        >
          <IconPhone size={18} className="shrink-0" />
          <span className="min-w-0">
            <span className="block font-semibold leading-tight">{ct.display}</span>
            <span className={"block text-xs leading-tight " + (ct.primary ? "text-rose-100" : "text-slate-500")}>
              {ct.label}{ct.note ? ` · ${ct.note}` : ""}
            </span>
          </span>
        </a>
      ))}
    </div>
  );

  // ---- ESCALATION (HIGH / IMMINENT) ----
  if (escalate) {
    return (
      <div className="rounded-2xl border-2 border-rose-300 bg-white shadow-soft overflow-hidden">
        <div className="bg-rose-600 text-white px-6 py-5 flex items-start gap-3">
          <IconAlert size={26} className="shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-bold">{c.resultTitles[level]}</h2>
            <p className="mt-1 text-sm text-rose-50 leading-relaxed">{c.resultBody[level]}</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <div className="text-sm font-semibold text-slate-800 mb-2">{c.callNow}</div>
            {ContactButtons}
          </div>

          <div className="rounded-xl bg-mint-50 border border-mint-100 px-4 py-3 flex items-start gap-3">
            <IconShield size={18} className="text-brand-600 shrink-0 mt-0.5" />
            <div className="text-sm text-brand-700">
              {c.supervisorNotified}
              <a href={`tel:${contacts[contacts.length - 1].tel}`} className="mt-2 inline-flex items-center gap-1.5 font-semibold text-rose-700">
                <IconPhone size={14} /> {c.contactSupervisor}
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-800 mb-2">{c.safetyTitle}</div>
            <ul className="space-y-2">
              {c.safetySteps.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-600 mt-0.5">
                    <IconCheck size={12} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-slate-500">{c.disclaimer}</p>

          <div className="flex items-center justify-between pt-1">
            <Link href="/help/crisis" className="text-sm text-brand-600 font-medium hover:underline">
              {c.resourcesTitle} →
            </Link>
            <button onClick={restart} className="text-sm text-slate-500 hover:text-slate-700">{c.restart}</button>
          </div>

          <p className="rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-400">
            Демо: в рабочей версии создаётся кризис-кейс и приходит уведомление дежурному супервайзеру.
          </p>
        </div>
      </div>
    );
  }

  // ---- RESULT (NONE / LOW / MODERATE) ----
  if (done) {
    const meta = RISK_META[level];
    const moderate = level === "MODERATE";
    return (
      <div className="card-soft space-y-5">
        {EmergencyBar}
        <div>
          <span className={"badge " + meta.badge}>{level}</span>
          <h2 className="mt-2 text-xl font-bold text-brand-700">{c.resultTitles[level]}</h2>
          <p className="mt-2 text-slate-600 leading-relaxed">{c.resultBody[level]}</p>
        </div>

        {moderate && (
          <div>
            <div className="text-sm font-semibold text-slate-800 mb-2">{c.resourcesTitle}</div>
            {ContactButtons}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link href="/psychologists" className="btn-primary">
            {c.bookCta} <IconChevronRight size={16} />
          </Link>
          <Link href="/help/crisis" className="btn-secondary">
            <IconLifeRing size={16} /> {c.resourcesTitle}
          </Link>
          <button onClick={restart} className="text-sm text-slate-500 hover:text-slate-700 ml-auto">{c.restart}</button>
        </div>

        <p className="text-xs text-slate-500">{c.disclaimer}</p>
      </div>
    );
  }

  // ---- INTRO ----
  if (!started) {
    return (
      <div className="card-soft space-y-5">
        <div className="flex items-start gap-3">
          <span className="icon-circle h-11 w-11 shrink-0"><IconShield size={20} /></span>
          <div>
            <h2 className="text-xl font-bold text-brand-700">{c.introTitle}</h2>
            <p className="mt-2 text-slate-600 leading-relaxed">{c.introText}</p>
          </div>
        </div>
        <div className="rounded-xl bg-mint-50 border border-mint-100 px-4 py-3 text-sm text-brand-700">
          {c.privacy}
        </div>
        {EmergencyBar}
        <button onClick={() => setStarted(true)} className="btn-primary">
          {c.introTitle} <IconChevronRight size={16} />
        </button>
      </div>
    );
  }

  // ---- QUESTION ----
  const q = c.questions.find((x) => x.id === current);
  const isRecent = current === "q6recent";
  const text = isRecent ? c.q6recentText : q?.text ?? "";
  const sub = isRecent ? undefined : q?.sub;
  const idx = ["q1", "q2", "q3", "q4", "q5", "q6", "q6recent"].indexOf(current as string) + 1;

  return (
    <div className="card-soft space-y-5">
      {EmergencyBar}
      <div>
        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {c.introTitle} · {Math.min(idx, 6)}/6
        </div>
        <h2 className="mt-2 text-lg md:text-xl font-semibold text-brand-700 leading-snug">{text}</h2>
        {sub && <p className="mt-1.5 text-sm text-slate-500">{sub}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => answer(true)} className="rounded-xl border-2 border-brand-200 bg-white py-3.5 font-semibold text-brand-700 hover:border-brand hover:bg-mint-50">
          {c.yes}
        </button>
        <button onClick={() => answer(false)} className="rounded-xl border-2 border-slate-200 bg-white py-3.5 font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50">
          {c.no}
        </button>
      </div>
      <button onClick={restart} className="text-sm text-slate-400 hover:text-slate-600">{c.restart}</button>
    </div>
  );
}
