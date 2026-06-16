"use client";

import Link from "next/link";
import { useT } from "./lang-provider";
import { LogoMark } from "./icons";

export function SiteFooter() {
  const t = useT();

  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <LogoMark size={40} />
              <span className="text-lg font-semibold tracking-tight text-brand-700">PsychKG</span>
            </div>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {t("footer.tagline")}
            </p>
            <div className="mt-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t("nav.demo")}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link href="/me" className="rounded-full bg-mint-50 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-mint-100">{t("nav.roleClient")}</Link>
                <Link href="/psychologist" className="rounded-full bg-mint-50 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-mint-100">{t("nav.rolePsych")}</Link>
                <Link href="/admin" className="rounded-full bg-mint-50 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-mint-100">{t("nav.roleAdmin")}</Link>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-800">{t("footer.platform")}</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/psychologists" className="hover:text-brand">{t("nav.psychologists")}</Link></li>
              <li><Link href="/materials" className="hover:text-brand">{t("nav.materials")}</Link></li>
              <li><Link href="/courses" className="hover:text-brand">{t("nav.courses")}</Link></li>
              <li><Link href="/about" className="hover:text-brand">{t("nav.about")}</Link></li>
              <li><Link href="/brochures" className="hover:text-brand">{t("nav.brochures")}</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-800">{t("footer.help")}</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/legal/terms" className="hover:text-brand">{t("footer.terms")}</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-brand">{t("footer.privacy")}</Link></li>
              <li><Link href="/legal/consent" className="hover:text-brand">{t("footer.consent")}</Link></li>
              <li><span className="hover:text-brand">{t("footer.faq")}</span></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-800">{t("footer.psychologists")}</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/for-psychologists" className="hover:text-brand">{t("footer.becomePsy")}</Link></li>
              <li><span className="hover:text-brand">{t("footer.requirements")}</span></li>
              <li><span className="hover:text-brand">{t("footer.helpSpec")}</span></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <div className="text-sm font-semibold text-slate-800">{t("footer.subscribeT")}</div>
            <p className="mt-3 text-sm text-slate-600">
              {t("footer.subscribeS")}
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder={t("footer.emailPh")}
                className="input flex-1"
              />
              <button type="button" className="btn-primary shrink-0">{t("footer.subscribe")}</button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {["⌖", "◎", "✈", "♪", "▶"].map((s, i) => (
              <span key={i} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 cursor-pointer hover:bg-mint-100 hover:text-brand">
                {s}
              </span>
            ))}
          </div>
          <div>
            © {new Date().getFullYear()} {t("footer.legal")}
          </div>
        </div>
      </div>
    </footer>
  );
}
