"use client";

import Link from "next/link";
import { useT } from "@/components/lang-provider";
import { IconUser, IconHeartSmall, IconShield, IconNotebook, IconChevronRight, IconHome } from "@/components/icons";

export default function BrochuresIndex() {
  const t = useT();

  const BROCHURES = [
    {
      href: "/brochures/client",
      role: "common.psychologist", // wrong, fix below
      roleKey: "Кардар / Клиент",
      title: t("broch.client.t"),
      text: t("broch.client.s"),
      icon: IconHeartSmall,
      accent: "bg-mint-100 text-brand-700 ring-mint-200",
    },
    {
      href: "/brochures/psychologist",
      roleKey: t("common.psychologist"),
      title: t("broch.psy.t"),
      text: t("broch.psy.s"),
      icon: IconUser,
      accent: "bg-amber-100 text-brand-700 ring-amber-200",
    },
    {
      href: "/brochures/admin",
      roleKey: "Администратор",
      title: t("broch.admin.t"),
      text: t("broch.admin.s"),
      icon: IconShield,
      accent: "bg-rose-100 text-brand-700 ring-rose-200",
    },
    {
      href: "/brochures/content-manager",
      roleKey: "Контент-менеджер",
      title: t("broch.cm.t"),
      text: t("broch.cm.s"),
      icon: IconNotebook,
      accent: "bg-sky-100 text-brand-700 ring-sky-200",
    },
  ];

  return (
    <div className="bg-[#FBFAF7] py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-brand">
            <IconHome size={14} /> {t("common.home")}
          </Link>
          <IconChevronRight size={12} />
          <span className="text-slate-700 font-medium">{t("nav.brochures")}</span>
        </nav>

        <h1 className="h-display mt-5">{t("broch.title")}</h1>
        <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl">{t("broch.sub")}</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {BROCHURES.map((b) => (
            <Link key={b.href} href={b.href} className="card-soft group flex gap-4 items-start hover:shadow-soft transition-all">
              <span className={"shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl ring-4 " + b.accent}>
                <b.icon size={26} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-xs uppercase tracking-wide text-slate-500 font-medium">{b.roleKey}</div>
                <div className="mt-0.5 text-lg font-semibold text-brand-700 group-hover:text-brand-600">{b.title}</div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{b.text}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-brand-600 font-medium">
                  {t("broch.open")} <IconChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
