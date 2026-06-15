import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/rbac";
import { MobileMenu } from "./mobile-menu";

const NAV = [
  { href: "/psychologists", label: "Психологи" },
  { href: "/materials", label: "Материалы" },
  { href: "/courses", label: "Курсы" },
  { href: "/about", label: "О платформе" },
];

export async function SiteHeader() {
  const user = await getCurrentUser();
  const dashboardLink = user ? dashboardHref(user.role) : null;
  const roleLabel = user ? ROLE_LABELS[user.role as keyof typeof ROLE_LABELS] : null;

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

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-2">
          {user && dashboardLink ? (
            <>
              <Link href={dashboardLink} className="btn-secondary">
                <span className="hidden lg:inline">{user.displayName} · </span>
                {roleLabel}
              </Link>
              <form action="/api/auth/logout" method="post">
                <button className="btn-secondary" type="submit">Выйти</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary">Войти</Link>
              <Link href="/register" className="btn-primary">Регистрация</Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <MobileMenu
          items={NAV}
          rightSlot={
            user && dashboardLink ? (
              <div className="space-y-2">
                <Link href={dashboardLink} className="btn-primary w-full">
                  {roleLabel}
                </Link>
                <form action="/api/auth/logout" method="post">
                  <button className="btn-secondary w-full" type="submit">Выйти</button>
                </form>
              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/login" className="btn-secondary w-full">Войти</Link>
                <Link href="/register" className="btn-primary w-full">Регистрация</Link>
              </div>
            )
          }
        />
      </div>
    </header>
  );
}

function dashboardHref(role: string) {
  switch (role) {
    case "ADMIN":
    case "CONTENT_MANAGER":
      return "/admin";
    case "PSYCHOLOGIST":
      return "/psychologist";
    default:
      return "/me";
  }
}
