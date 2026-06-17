"use client";

import Link from "next/link";
import { useLang } from "@/components/lang-provider";
import { CrisisScreening } from "@/components/crisis-screening";
import { getCrisis } from "@/lib/crisis";
import { IconHome, IconChevronRight } from "@/components/icons";

export default function SafetyCheckPage() {
  const { lang } = useLang();
  const c = getCrisis(lang);

  return (
    <div className="bg-cream-50 py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-5">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-brand">
            <IconHome size={14} /> {lang === "ru" ? "Главная" : "Башкы"}
          </Link>
          <IconChevronRight size={12} />
          <Link href="/me" className="hover:text-brand">{lang === "ru" ? "Кабинет" : "Кабинет"}</Link>
          <IconChevronRight size={12} />
          <span className="text-slate-700 font-medium">{c.introTitle}</span>
        </nav>

        <CrisisScreening />
      </div>
    </div>
  );
}
