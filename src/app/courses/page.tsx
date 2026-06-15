import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatKGS } from "@/lib/money";

export default async function CoursesPage() {
  const items = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    include: {
      author: { include: { user: { select: { displayName: true } } } },
      _count: { select: { enrollments: true, modules: true } },
    },
  });
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
            <div className="text-xs text-slate-500">{c.author.user.displayName}</div>
            <p className="mt-2 text-sm text-slate-600 line-clamp-3">{c.description}</p>
            <div className="mt-3 text-xs text-slate-500">
              {c._count.modules} модулей · {c._count.enrollments} учеников
            </div>
            <div className="mt-2 font-semibold">{c.price === 0 ? "Бесплатно" : formatKGS(c.price)}</div>
          </Link>
        ))}
        {items.length === 0 && (
          <div className="card sm:col-span-2 lg:col-span-3 text-sm text-slate-600">Курсов пока нет.</div>
        )}
      </div>
    </div>
  );
}
