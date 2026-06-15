import Link from "next/link";
import { MobileMenu } from "./mobile-menu";

const NAV = [
  { href: "/psychologists", label: "Психологи" },
  { href: "/materials", label: "Материалы" },
  { href: "/courses", label: "Курсы" },
  { href: "/about", label: "О платформе" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white font-bold">
            Ψ
          </span>
          <span className="text-base font-semibold text-brand">PsychKG</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-slate-700 hover:text-brand">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/me" className="btn-secondary">
            Демо: Клиент
          </Link>
          <Link href="/psychologist" className="btn-secondary">
            Демо: Психолог
          </Link>
          <Link href="/admin" className="btn-secondary">
            Демо: Админ
          </Link>
        </div>

        <MobileMenu
          items={NAV}
          rightSlot={
            <div className="space-y-2">
              <Link href="/me" className="btn-primary w-full">Демо: Клиент</Link>
              <Link href="/psychologist" className="btn-secondary w-full">Демо: Психолог</Link>
              <Link href="/admin" className="btn-secondary w-full">Демо: Админ</Link>
            </div>
          }
        />
      </div>
      <div className="bg-brand-50 border-b border-brand-100 px-4 py-1.5 text-center text-xs text-brand-700">
        Демо-версия — серверные функции (авторизация, БД, платежи) недоступны
      </div>
    </header>
  );
}
