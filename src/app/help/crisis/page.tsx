"use client";

import Link from "next/link";
import { useLang } from "@/components/lang-provider";
import { getCrisis, emergencyContacts } from "@/lib/crisis";
import {
  IconHome, IconChevronRight, IconAlert, IconPhone, IconShield, IconCheck, IconChevronRight as IconArrow,
} from "@/components/icons";

export default function CrisisHelpPage() {
  const { lang } = useLang();
  const c = getCrisis(lang);
  const contacts = emergencyContacts(lang);

  return (
    <div className="bg-cream-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-brand">
            <IconHome size={14} /> {lang === "ru" ? "Главная" : "Башкы"}
          </Link>
          <IconChevronRight size={12} />
          <span className="text-slate-700 font-medium">{c.helpTitle}</span>
        </nav>

        {/* Hero alert */}
        <div className="mt-5 rounded-2xl border-2 border-rose-300 bg-white shadow-soft overflow-hidden">
          <div className="bg-rose-600 text-white px-6 py-5 flex items-start gap-3">
            <IconAlert size={26} className="shrink-0 mt-0.5" />
            <div>
              <h1 className="text-xl font-bold">{c.helpTitle}</h1>
              <p className="mt-1 text-sm text-rose-50 leading-relaxed">{c.helpLead}</p>
            </div>
          </div>
          <div className="p-6">
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
            <p className="mt-4 text-xs text-slate-500">{c.disclaimer}</p>
          </div>
        </div>

        {/* What you can do now */}
        <div className="mt-5 card-soft">
          <div className="flex items-center gap-2 text-brand-700">
            <IconShield size={18} className="text-mint-500" />
            <h2 className="font-semibold">{c.safetyTitle}</h2>
          </div>
          <ul className="mt-3 space-y-2">
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

        {/* Warning signs + for someone else */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="card-soft">
            <h2 className="font-semibold text-brand-700">{c.whenTitle}</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
              {c.warningSigns.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="card-soft">
            <h2 className="font-semibold text-brand-700">{c.forSomeoneTitle}</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {c.forSomeoneSteps.map((s) => (
                <li key={s} className="flex items-start gap-2.5">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-600 mt-0.5">
                    <IconCheck size={12} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA to screening + booking */}
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/me/safety-check" className="btn-secondary">
            {c.checkCta}
          </Link>
          <Link href="/psychologists" className="btn-primary">
            {c.bookCta} <IconArrow size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
