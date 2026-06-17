"use client";

import Link from "next/link";
import { useT } from "./lang-provider";
import { IconLifeRing } from "./icons";

// Постоянно доступная кнопка экстренной помощи (best practice для mental health).
export function CrisisFab() {
  const t = useT();
  return (
    <Link
      href="/help/crisis"
      aria-label={t("nav.crisisHelp")}
      className="no-print fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-float hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
    >
      <IconLifeRing size={18} />
      <span className="hidden sm:inline">{t("nav.crisisHelp")}</span>
    </Link>
  );
}
