import Link from "next/link";
import { MOCK_PSYCHOLOGISTS, MOCK_REVIEWS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";
import { METHODS, TOPICS, LANGUAGES } from "@/lib/catalog-data";
import { parseList } from "@/lib/json-list";

export function generateStaticParams() {
  return MOCK_PSYCHOLOGISTS.map((p) => ({ id: p.id }));
}

export default function PsychologistDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const p = MOCK_PSYCHOLOGISTS.find((x) => x.id === params.id) ?? MOCK_PSYCHOLOGISTS[0];
  const reviews = MOCK_REVIEWS[p.id] ?? [];
  const topics = parseList(p.topics);
  const methods = parseList(p.methods);
  const languages = parseList(p.languages);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8">
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2 space-y-5 md:space-y-6">
          <div className="card">
            <div className="flex flex-wrap items-start gap-4">
              <div className="h-16 w-16 md:h-20 md:w-20 shrink-0 rounded-full bg-brand-100 flex items-center justify-center text-brand text-xl md:text-2xl font-semibold">
                {p.user.displayName.slice(0, 1)}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
                  {p.user.displayName}
                </h1>
                <div className="mt-1 text-sm text-slate-600">
                  ⭐ {p.rating.toFixed(1)} · {p.reviewsCount} отзывов · опыт{" "}
                  {p.experienceYears} лет
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.verifiedBadge && (
                    <span className="badge bg-brand-50 text-brand">✓ Верифицирован</span>
                  )}
                  {languages.map((l) => (
                    <span key={l} className="badge bg-slate-100 text-slate-700">
                      {LANGUAGES.find((x) => x.code === l)?.label ?? l}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full sm:w-auto sm:text-right">
                <div className="text-xl font-bold text-slate-900">
                  {formatKGS(p.pricePerSession)}
                </div>
                <div className="text-xs text-slate-500">за сессию {p.sessionMinutes} мин</div>
              </div>
            </div>

            <p className="mt-4 whitespace-pre-line text-slate-700">{p.bio}</p>
            {p.approach && (
              <>
                <h3 className="mt-4 font-medium text-slate-800">Подход к работе</h3>
                <p className="text-slate-700 whitespace-pre-line">{p.approach}</p>
              </>
            )}
          </div>

          <div className="card">
            <h3 className="font-medium text-slate-800">Темы и методы</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {topics.map((t) => (
                <span key={t} className="badge bg-brand-50 text-brand">
                  {TOPICS.find((x) => x.slug === t)?.label ?? t}
                </span>
              ))}
              {methods.map((m) => (
                <span key={m} className="badge bg-slate-100 text-slate-700">
                  {METHODS.find((x) => x.slug === m)?.label ?? m}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-medium text-slate-800">Отзывы</h3>
            {reviews.length === 0 && (
              <p className="mt-2 text-sm text-slate-600">Пока нет отзывов.</p>
            )}
            <ul className="mt-3 space-y-3">
              {reviews.map((r) => (
                <li key={r.id} className="rounded-md border border-slate-100 p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-slate-800">{r.authorName}</span>
                    <span className="text-yellow-500">
                      {"★".repeat(r.rating)}
                      <span className="text-slate-300">{"★".repeat(5 - r.rating)}</span>
                    </span>
                    <span className="ml-auto text-xs text-slate-500">{r.date}</span>
                  </div>
                  {r.text && <p className="mt-1 text-sm text-slate-700">{r.text}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card">
            <h3 className="font-medium text-slate-800">Запись</h3>
            <p className="mt-1 text-sm text-slate-600">
              Выберите удобный слот в ближайшие 14 дней.
            </p>
            <div className="mt-3 space-y-2">
              {["Пн 10:00", "Пн 14:00", "Вт 10:00", "Ср 11:00", "Чт 15:00", "Пт 10:00"].map((slot) => (
                <button key={slot} className="btn-secondary w-full text-sm">
                  {slot}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              В демо-версии запись недоступна. Зарегистрируйтесь для полного доступа.
            </p>
          </div>

          <div className="card text-sm text-slate-600">
            Запись сессий выключена по умолчанию и включается только при явном
            двойном согласии участников.
            <div className="mt-2">
              <Link href="/legal/privacy" className="text-brand">
                Подробнее о приватности
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
