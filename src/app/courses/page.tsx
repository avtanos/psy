import Link from "next/link";
import { MOCK_COURSES } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";
import { HeroIllustration } from "@/components/hero-illustration";
import { IconHome, IconChevronRight, IconCheck } from "@/components/icons";

export default function CoursesPage() {
  return (
    <div className="bg-[#FBFAF7]">
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-6">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <nav className="flex items-center gap-1.5 text-sm text-slate-500">
                <Link href="/" className="inline-flex items-center gap-1 hover:text-brand">
                  <IconHome size={14} /> Главная
                </Link>
                <IconChevronRight size={12} />
                <span className="text-slate-700 font-medium">Курсы</span>
              </nav>
              <h1 className="h-display mt-5">Курсы</h1>
              <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
                Структурированные программы — модули, уроки, практика и сертификат.
                Учитесь в удобном темпе с обратной связью от психолога.
              </p>
            </div>
            <div className="hidden lg:block">
              <HeroIllustration className="w-full max-w-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_COURSES.map((c) => (
            <Link key={c.id} href={`/courses/${c.id}`} className="card-soft group block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-mint-100 flex items-center justify-center text-brand-700 font-semibold">
                  {c.authorName.slice(0, 1)}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700">{c.authorName}</div>
                  <span className="badge-verified mt-0.5">
                    <IconCheck size={11} /> Верифицирован
                  </span>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-bold text-brand-700 group-hover:text-brand-600 leading-snug">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">{c.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="rounded-full bg-mint-50 text-mint-700 px-2.5 py-1 font-medium">
                  {c.modules.length} модулей
                </span>
                <span className="rounded-full bg-slate-100 text-slate-700 px-2.5 py-1">
                  {c.enrollments} учеников
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="text-lg font-bold text-brand-700">
                  {c.price === 0 ? "Бесплатно" : formatKGS(c.price)}
                </div>
                <span className="btn-primary !py-2.5 !text-sm">Подробнее</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
