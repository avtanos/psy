import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { IconChevronDown } from "./icons";

const NAV = [
  { href: "/psychologists", label: "Психологи" },
  { href: "/materials", label: "Материалы" },
  { href: "/courses", label: "Курсы" },
  { href: "/about", label: "О платформе" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-brand-700 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 py-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-mint-100 text-brand-700 text-xl font-semibold">
            Ψ
          </span>
          <span className="text-lg font-semibold tracking-tight">PsychKG</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-white/90 hover:text-white font-medium">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5">
          <button className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 px-4 py-2 text-sm font-medium">
            Русский <IconChevronDown size={14} />
          </button>
          <Link href="/login" className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/15 px-5 py-2 text-sm font-medium">
            Войти
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center rounded-full bg-white text-brand-700 hover:bg-mint-50 px-5 py-2 text-sm font-semibold shadow-sm"
          >
            Стать клиентом
          </Link>
        </div>

        <MobileMenu
          items={NAV}
          rightSlot={
            <div className="space-y-2">
              <Link href="/me" className="btn-primary w-full">Демо: Клиент</Link>
              <Link href="/psychologist" className="btn-secondary w-full">Демо: Психолог</Link>
              <Link href="/admin" className="btn-secondary w-full">Демо: Админ</Link>
              <Link href="/login" className="btn-secondary w-full">Войти</Link>
            </div>
          }
        />
      </div>
    </header>
  );
}
