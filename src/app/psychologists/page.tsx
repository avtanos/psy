import Link from "next/link";
import { MOCK_PSYCHOLOGISTS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";
import { TOPICS, METHODS, LANGUAGES } from "@/lib/catalog-data";
import { parseList } from "@/lib/json-list";

export default function PsychologistsPage() {
  const items = MOCK_PSYCHOLOGISTS;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
            Каталог психологов
          </h1>
          <p className="text-sm text-slate-600">
            Найдено: {items.length}. Все специалисты прошли верификацию документов.
          </p>
        </div>
        <Link href="/for-psychologists" className="btn-secondary hidden md:inline-flex">
          Стать психологом
        </Link>
      </div>

      <div className="card mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <label className="label">Поиск</label>
          <input className="input" placeholder="Имя, метод, ключевое слово…" />
        </div>
        <div>
          <label className="label">Тема</label>
          <select className="input">
            <option value="">Любая</option>
            {TOPICS.map((t) => (
              <option key={t.slug} value={t.slug}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Метод</label>
          <select className="input">
            <option value="">Любой</option>
            {METHODS.map((m) => (
              <option key={m.slug} value={m.slug}>{m.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Язык</label>
          <select className="input">
            <option value="">Любой</option>
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Цена до (сом)</label>
          <input type="number" min={0} step={100} className="input" placeholder="напр., 3000" />
        </div>
        <div>
          <label className="label">Формат</label>
          <select className="input">
            <option value="">Любой</option>
            <option value="video">Видео</option>
            <option value="chat">Чат</option>
          </select>
        </div>
        <div>
          <label className="label">Сортировка</label>
          <select className="input">
            <option value="rating">По рейтингу</option>
            <option value="price_asc">Сначала дешевле</option>
            <option value="price_desc">Сначала дороже</option>
            <option value="experience">По опыту</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="text-xs text-slate-500">Психолог</div>
              </div>
              {p.verifiedBadge && (
                <span className="badge bg-brand-50 text-brand ml-auto">✓ Верифицирован</span>
              )}
            </div>
            <p className="mt-3 line-clamp-3 text-sm text-slate-600">
              {p.bio}
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
