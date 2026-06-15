import Link from "next/link";
import { MOCK_COURSES } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";

export default function CoursesPage() {
  const items = MOCK_COURSES;
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Курсы</h1>
      <p className="text-sm text-slate-600">
        Структурированные программы — модули, уроки, прогресс, сертификат.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <Link key={c.id} href={`/courses/${c.id}`} className="card hover:border-brand">
            <h3 className="font-medium text-slate-800">{c.title}</h3>
            <div className="text-xs text-slate-500">{c.authorName}</div>
            <p className="mt-2 text-sm text-slate-600 line-clamp-3">{c.description}</p>
            <div className="mt-3 text-xs text-slate-500">
              {c.modules.length} модулей · {c.enrollments} учеников
            </div>
            <div className="mt-2 font-semibold">{c.price === 0 ? "Бесплатно" : formatKGS(c.price)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
