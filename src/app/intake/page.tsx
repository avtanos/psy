"use client";

import Link from "next/link";
import { useLang } from "@/components/lang-provider";
import { IntakeWizard } from "@/components/intake-wizard";
import { IconHome, IconChevronRight } from "@/components/icons";

export default function IntakePage() {
  const { lang } = useLang();
  return (
    <div className="bg-cream-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-brand">
            <IconHome size={14} /> {lang === "ru" ? "Главная" : "Башкы"}
          </Link>
          <IconChevronRight size={12} />
          <span className="text-slate-700 font-medium">{lang === "ru" ? "Подбор психолога" : "Психолог тандоо"}</span>
        </nav>
        <IntakeWizard />
      </div>
    </div>
  );
}
