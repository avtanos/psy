"use client";

import { useState } from "react";
import Link from "next/link";

type NavItem = { href: string; label: string };

export function MobileMenu({
  items,
  rightSlot,
}: {
  items: NavItem[];
  rightSlot?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Меню"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-700"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40"
          onClick={() => setOpen(false)}
        >
          <nav
            className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-brand">Меню</span>
              <button
                aria-label="Закрыть"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-700"
              >
                ✕
              </button>
            </div>
            <ul className="mt-4 space-y-1">
              {items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
            {rightSlot && <div className="mt-4 border-t border-slate-100 pt-4">{rightSlot}</div>}
          </nav>
        </div>
      )}
    </div>
  );
}
