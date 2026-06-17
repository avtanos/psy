"use client";

import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { LangSwitcher } from "./lang-switcher";
import { DemoMenu } from "./demo-menu";
import { useT } from "./lang-provider";
import { LogoMark, IconCalendar } from "./icons";

export function SiteHeader() {
  const t = useT();
  const NAV = [
    { href: "/psychologists", label: t("nav.psychologists") },
    { href: "/materials", label: t("nav.materials") },
    { href: "/courses", label: t("nav.courses") },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-brand-100/70 bg-cream-50/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 py-3.5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <LogoMark size={40} />
          <span className="text-lg font-semibold tracking-tight text-brand-700">PsychKG</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-slate-700 hover:text-brand font-medium">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5">
          <LangSwitcher tone="light" />
          <DemoMenu />
          <Link href="/login" className="inline-flex items-center rounded-xl border border-brand-200 bg-white/70 hover:bg-white px-5 py-2 text-sm font-medium text-brand-700">
            {t("nav.login")}
          </Link>
          <Link
            href="/intake"
            className="inline-flex items-center gap-2 rounded-xl bg-brand text-white hover:bg-brand-600 px-5 py-2 text-sm font-semibold shadow-sm"
          >
            <IconCalendar size={16} />
            {t("home.findPsy")}
          </Link>
        </div>

        <MobileMenu
          items={NAV}
          rightSlot={
            <div className="space-y-2">
              <div className="flex justify-center mb-3">
                <LangSwitcher tone="light" />
              </div>
              <Link href="/psychologists" className="btn-primary w-full">{t("home.findPsy")}</Link>
              <Link href="/me" className="btn-secondary w-full">{t("nav.demoClient")}</Link>
              <Link href="/psychologist" className="btn-secondary w-full">{t("nav.demoPsych")}</Link>
              <Link href="/admin" className="btn-secondary w-full">{t("nav.demoAdmin")}</Link>
              <Link href="/login" className="btn-secondary w-full">{t("nav.login")}</Link>
            </div>
          }
        />
      </div>
    </header>
  );
}
