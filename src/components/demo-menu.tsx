"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useT } from "./lang-provider";
import { IconChevronDown, IconHeartSmall, IconUser, IconShield } from "./icons";

export function DemoMenu() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const items = [
    { href: "/me", label: t("nav.roleClient"), icon: IconHeartSmall },
    { href: "/psychologist", label: t("nav.rolePsych"), icon: IconUser },
    { href: "/admin", label: t("nav.roleAdmin"), icon: IconShield },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-brand-200 bg-white/70 hover:bg-white px-4 py-2 text-sm font-medium text-brand-700"
      >
        {t("nav.demo")} <IconChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl bg-white shadow-soft border border-brand-100 overflow-hidden z-50">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-mint-50"
            >
              <span className="icon-circle h-7 w-7"><it.icon size={14} /></span>
              {it.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
