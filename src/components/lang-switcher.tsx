"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./lang-provider";
import { LANG_LABELS, type Lang } from "@/lib/i18n";
import { IconChevronDown, IconCheck } from "./icons";

export function LangSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const btnCls =
    tone === "dark"
      ? "inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 px-4 py-2 text-sm font-medium text-white"
      : "inline-flex items-center gap-1.5 rounded-full bg-mint-50 hover:bg-mint-100 px-4 py-2 text-sm font-medium text-brand-700";

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((v) => !v)} className={btnCls}>
        {LANG_LABELS[lang]} <IconChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-white shadow-soft border border-slate-100 overflow-hidden z-50">
          {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-mint-50"
            >
              <span>{LANG_LABELS[l]}</span>
              {lang === l && <IconCheck size={16} className="text-mint-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
