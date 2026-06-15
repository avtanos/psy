import Link from "next/link";
import { searchPsychologists, TOPICS, METHODS, LANGUAGES, type CatalogFilters } from "@/lib/catalog";
import { formatKGS } from "@/lib/money";
import { ROLE_LABELS } from "@/lib/rbac";
import { parseList } from "@/lib/json-list";

type SearchParams = Record<string, string | undefined>;

function parseFilters(sp: SearchParams): CatalogFilters {
  return {
    topic: sp.topic,
    method: sp.method,
    language: sp.language,
    priceMax: sp.priceMax ? Number(sp.priceMax) : undefined,
    format: sp.format === "chat" ? "chat" : sp.format === "video" ? "video" : undefined,
    sort: (sp.sort as CatalogFilters["sort"]) ?? "rating",
    q: sp.q,
  };
}

export default async function PsychologistsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filters = parseFilters(searchParams);
  const { items, total } = await searchPsychologists(filters);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
            Каталог психологов
          </h1>
          <p className="text-sm text-slate-600">
            Найдено: {total}. Все специалисты прошли верификацию документов.
          </p>
        </div>
        <Link href="/for-psychologists" className="btn-secondary hidden md:inline-flex">
          Стать психологом
        </Link>
      </div>

      <form className="card mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" method="get">
        <div className="sm:col-span-2 lg:col-span-2">
          <label className="label">Поиск</label>
          <input
            name="q"
            defaultValue={filters.q}
            className="input"
            placeholder="Имя, метод, ключевое слово…"
          />
        </div>
        <div>
          <label className="label">Тема</label>
          <select name="topic" defaultValue={filters.topic ?? ""} className="input">
            <option value="">Любая</option>
            {TOPICS.map((t) => (
              <option key={t.slug} value={t.slug}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Метод</label>
          <select name="method" defaultValue={filters.method ?? ""} className="input">
            <option value="">Любой</option>
            {METHODS.map((m) => (
              <option key={m.slug} value={m.slug}>{m.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Язык</label>
          <select name="language" defaultValue={filters.language ?? ""} className="input">
            <option value="">Любой</option>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Цена до (сом)</label>
          <input
            name="priceMax"
            type="number"
            min={0}
            step={100}
            defaultValue={filters.priceMax ? Math.round(filters.priceMax / 100) : ""}
            className="input"
            placeholder="напр., 3000"
          />
        </div>
        <div>
          <label className="label">Формат</label>
          <select name="format" defaultValue={filters.format ?? ""} className="input">
            <option value="">Любой</option>
            <option value="video">Видео</option>
            <option value="chat">Чат</option>
          </select>
        </div>
        <div>
          <label className="label">Сортировка</label>
          <select name="sort" defaultValue={filters.sort ?? "rating"} className="input">
            <option value="rating">По рейтингу</option>
            <option value="price_asc">Сначала дешевле</option>
            <option value="price_desc">Сначала дороже</option>
            <option value="experience">По опыту</option>
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-5 flex flex-wrap justify-end gap-2">
          <Link href="/psychologists" className="btn-secondary">Сбросить</Link>
          <button className="btn-primary" type="submit">Применить</button>
        </div>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 && (
          <div className="card sm:col-span-2 lg:col-span-3 text-sm text-slate-600">
            Под выбранные фильтры пока никого не нашлось. Попробуйте смягчить
            критерии.
          </div>
        )}
        {items.map((p) => (
          <Link
            key={p.id}
            href={`/psychologists/${p.id}`}
            className="card hover:border-brand transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-brand-100 flex items-center justify-center text-brand text-lg font-semibold">
                {p.user.displayName.slice(0, 1)}
              </div>
              <div>
                <div className="font-medium text-slate-800">{p.user.displayName}</div>
                <div className="text-xs text-slate-500">{ROLE_LABELS.PSYCHOLOGIST}</div>
              </div>
              {p.verifiedBadge && (
                <span className="badge bg-brand-50 text-brand ml-auto">✓ Верифицирован</span>
              )}
            </div>
            <p className="mt-3 line-clamp-3 text-sm text-slate-600">
              {p.bio || "Описание скоро появится."}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {parseList(p.methods).slice(0, 3).map((m) => (
                <span key={m} className="badge bg-slate-100 text-slate-700">
                  {METHODS.find((x) => x.slug === m)?.label ?? m}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                ⭐ {p.rating.toFixed(1)} · {p.reviewsCount} отзывов
              </div>
              <div className="font-semibold text-slate-800">
                {formatKGS(p.pricePerSession)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
