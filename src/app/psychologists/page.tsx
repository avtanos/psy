import Link from "next/link";
import { MOCK_PSYCHOLOGISTS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";
import { TOPICS, METHODS, LANGUAGES } from "@/lib/catalog-data";
import { parseList } from "@/lib/json-list";
import { HeroIllustration } from "@/components/hero-illustration";
import {
  IconShield, IconSearch, IconStar, IconCheck, IconGrid, IconList,
  IconBrain, IconCloud, IconHeart, IconUser, IconUsers,
  IconArrowRight, IconArrowLeft, IconChevronDown,
} from "@/components/icons";

const QUICK_FILTERS = [
  { slug: "anxiety", label: "Тревога и стресс", icon: IconBrain },
  { slug: "depression", label: "Депрессия", icon: IconCloud },
  { slug: "relationships", label: "Отношения", icon: IconHeart },
  { slug: "self-esteem", label: "Самооценка", icon: IconUser },
  { slug: "trauma", label: "Травма (ПТСР)", icon: IconShield },
  { slug: "family", label: "Семья и дети", icon: IconUsers },
];

export default function PsychologistsPage() {
  const items = MOCK_PSYCHOLOGISTS;

  return (
    <div className="bg-[#FBFAF7]">
      {/* Trust banner */}
      <div className="bg-mint-50 border-y border-mint-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-center gap-3 text-sm text-brand-700">
          <IconShield size={18} className="text-mint-500 shrink-0" />
          <span>Все специалисты проходят проверку документов и интервью. Ваша безопасность и конфиденциальность — наш приоритет.</span>
        </div>
      </div>

      {/* Heading */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-6">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h1 className="h-display">Каталог психологов</h1>
              <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
                Найдите проверенного специалиста, который подходит именно вам.
                10 специалистов прошли верификацию документов и опыта работы.
              </p>
            </div>
            <div className="hidden lg:block">
              <HeroIllustration className="w-full max-w-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="card-soft">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="label">Поиск</label>
              <div className="relative">
                <input className="input pr-10" placeholder="Имя, метод, ключевое слово…" />
                <IconSearch size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="label">Тема</label>
              <select className="input">
                <option>Любая</option>
                {TOPICS.map((t) => <option key={t.slug}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Метод</label>
              <select className="input">
                <option>Любой</option>
                {METHODS.map((m) => <option key={m.slug}>{m.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Язык</label>
              <select className="input">
                <option>Любой</option>
                {LANGUAGES.map((l) => <option key={l.code}>{l.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Цена до (сом)</label>
              <input type="number" className="input" placeholder="напр., 3000" />
            </div>
            <div>
              <label className="label">Формат</label>
              <select className="input">
                <option>Любой</option>
                <option>Видео</option>
                <option>Чат</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className="label">Сортировка</label>
              <select className="input">
                <option>По рейтингу</option>
                <option>Сначала дешевле</option>
                <option>Сначала дороже</option>
                <option>По опыту</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-600 mr-1">Быстрые фильтры:</span>
            {QUICK_FILTERS.map((f) => (
              <button key={f.slug} className="chip">
                <f.icon size={14} className="text-mint-500" />
                {f.label}
              </button>
            ))}
            <button className="chip">
              Ещё <IconChevronDown size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Count + view toggle */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-3 flex items-center justify-between">
        <div className="text-sm text-slate-600">Найдено: <b className="text-slate-800">{items.length} специалистов</b></div>
        <div className="flex items-center gap-1.5">
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
            <IconGrid size={16} />
          </button>
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-brand-200">
            <IconList size={16} />
          </button>
        </div>
      </section>

      {/* Cards grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <div key={p.id} className="card-soft">
              <div className="flex items-start gap-3.5">
                <div className="h-14 w-14 shrink-0 rounded-full bg-mint-100 flex items-center justify-center text-brand-700 text-xl font-semibold">
                  {p.user.displayName.slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-brand-700">{p.user.displayName}</span>
                    {p.verifiedBadge && (
                      <span className="badge-verified">
                        <IconCheck size={12} /> Верифицирован
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Психолог</div>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {p.bio}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {parseList(p.methods).slice(0, 2).map((m) => (
                  <span key={m} className="text-[11px] rounded-full bg-mint-50 px-2.5 py-1 text-mint-700 font-medium">
                    {METHODS.find((x) => x.slug === m)?.label ?? m}
                  </span>
                ))}
                {parseList(p.methods).length > 2 && (
                  <span className="text-[11px] rounded-full bg-slate-100 px-2.5 py-1 text-slate-600 font-medium">
                    +{parseList(p.methods).length - 2}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm">
                  <IconStar size={14} className="text-amber-500" />
                  <span className="font-semibold text-slate-800">{p.rating.toFixed(1)}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500 text-xs">{p.reviewsCount} отзывов</span>
                </div>
                <div className="font-bold text-brand-700">{formatKGS(p.pricePerSession)}</div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link href={`/psychologists/${p.id}`} className="btn-primary !py-2.5 !text-sm">
                  Записаться
                </Link>
                <Link href={`/psychologists/${p.id}`} className="btn-secondary !py-2.5 !text-sm">
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1" />
          <div className="flex items-center gap-1">
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-brand-200">
              <IconArrowLeft size={16} />
            </button>
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white font-medium">1</button>
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:border-brand-200">2</button>
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-brand-200">
              <IconArrowRight size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 flex-1 justify-end">
            Показывать по:
            <select className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm">
              <option>9</option>
              <option>18</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
