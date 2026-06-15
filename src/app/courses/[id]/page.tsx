import Link from "next/link";
import { MOCK_COURSES } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";

export function generateStaticParams() {
  return MOCK_COURSES.map((c) => ({ id: c.id }));
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const c = MOCK_COURSES.find((x) => x.id === params.id) ?? MOCK_COURSES[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="card">
        <div className="text-sm text-slate-500">{c.authorName}</div>
        <h1 className="text-2xl font-semibold text-slate-800">{c.title}</h1>
        <p className="mt-2 text-slate-700 whitespace-pre-line">{c.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-bold">{c.price === 0 ? "Бесплатно" : formatKGS(c.price)}</div>
          <span className="btn-primary opacity-60 cursor-not-allowed">
            Записаться (демо)
          </span>
        </div>
      </div>

      <div className="card mt-4">
        <h2 className="font-medium text-slate-800">Программа</h2>
        <ol className="mt-3 space-y-3">
          {c.modules.map((m, mi) => (
            <li key={m.id}>
              <div className="font-medium text-slate-800">
                Модуль {mi + 1}. {m.title}
              </div>
              <ul className="ml-4 mt-1 list-disc text-sm text-slate-600">
                {m.lessons.map((l) => (
                  <li key={l.id}>{l.title}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        {c.certificateEnabled && (
          <p className="mt-3 text-xs text-slate-500">По завершении выдаётся сертификат.</p>
        )}
      </div>

      <div className="mt-4">
        <Link href="/courses" className="text-brand text-sm">← Все курсы</Link>
      </div>
    </div>
  );
}
