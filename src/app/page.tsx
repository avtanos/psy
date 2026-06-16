import Link from "next/link";
import { HeroIllustration } from "@/components/hero-illustration";
import { MOCK_PSYCHOLOGISTS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";
import { parseList } from "@/lib/json-list";
import { METHODS } from "@/lib/catalog-data";
import {
  IconShield, IconLock, IconMessageCircle, IconHeartSmall,
  IconBrain, IconHeart, IconCloud, IconUser, IconLeaf, IconUsers, IconBriefcase,
  IconCalendar, IconPlay, IconChevronRight, IconSearch, IconVideo, IconStar, IconCheck,
} from "@/components/icons";

const TOPICS = [
  { slug: "anxiety", title: "Тревога и стресс", sub: "Панические атаки, навязчивые мысли", icon: IconBrain },
  { slug: "relationships", title: "Отношения", sub: "Партнёрство, конфликты, доверие", icon: IconHeart },
  { slug: "depression", title: "Депрессия", sub: "Апатия, упадок сил, потеря интереса", icon: IconCloud },
  { slug: "self-esteem", title: "Самооценка", sub: "Уверенность, принятие, любовь к себе", icon: IconUser },
  { slug: "addiction", title: "Зависимости", sub: "Алкоголь, переедание, игровая зависимость", icon: IconLeaf },
  { slug: "family", title: "Семья и дети", sub: "Воспитание, подростки, семейные трудности", icon: IconUsers },
  { slug: "trauma", title: "Травма", sub: "ПТСР, пережитое насилие, стрессовые события", icon: IconShield },
  { slug: "career", title: "Карьера и выгорание", sub: "Профессиональный рост, мотивация, баланс", icon: IconBriefcase },
];

const FEATURES = [
  { icon: IconShield, title: "Верифицированные психологи", sub: "Проверка дипломов и опыта работы" },
  { icon: IconLock, title: "Безопасные онлайн-сессии", sub: "Конфиденциальность и защита данных" },
  { icon: IconMessageCircle, title: "На русском и кыргызском", sub: "Понимаем ваш язык и культуру" },
  { icon: IconHeartSmall, title: "Поддержка, когда она нужна", sub: "Удобный график и гибкая запись" },
];

const STEPS = [
  { n: 1, title: "Выбор", text: "Найдите психолога по теме, методу и языку, который вам подходит.", icon: IconSearch },
  { n: 2, title: "Запись", text: "Выберите удобное время и забронируйте онлайн-сессию.", icon: IconCalendar },
  { n: 3, title: "Сессия", text: "Подключитесь по защищённой видеосвязи и получите поддержку.", icon: IconVideo },
];

export default function Home() {
  const featured = MOCK_PSYCHOLOGISTS.slice(0, 3);

  return (
    <div className="bg-[#FBFAF7]">
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 md:pt-16 pb-12 md:pb-16">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="max-w-xl">
              <h1 className="h-display">
                Психологическая помощь онлайн — рядом с вами
              </h1>
              <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
                Подберите проверенного психолога, запишитесь на удобное время
                и получите профессиональную поддержку из любой точки Кыргызстана.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/psychologists" className="btn-primary">
                  <IconCalendar size={18} />
                  Найти психолога
                </Link>
                <Link href="#how" className="btn-secondary">
                  <IconPlay size={18} />
                  Как это работает
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5">
                {FEATURES.map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <span className="icon-circle h-9 w-9">
                      <f.icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-brand-700">{f.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{f.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <HeroIllustration className="w-full max-w-xl mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-14">
        <h2 className="h-section">Темы запросов</h2>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((t) => (
            <Link
              key={t.slug}
              href={`/psychologists?topic=${t.slug}`}
              className="topic-card"
            >
              <span className="icon-circle h-12 w-12">
                <t.icon size={22} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-brand-700">{t.title}</div>
                <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">{t.sub}</div>
              </div>
              <IconChevronRight size={16} className="text-slate-400 shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-mint-50/60 border-y border-mint-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
          <h2 className="h-section">Как это работает</h2>
          <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-3 relative">
            {STEPS.map((s, i) => (
              <div key={s.n} className="card relative">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint-100 text-brand-700 font-semibold">
                    {s.n}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-brand-700">{s.title}</div>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.text}</p>
                  </div>
                  <span className="icon-circle h-10 w-10 shrink-0">
                    <s.icon size={18} />
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-mint-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SPECIALISTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
        <div className="card-soft">
          <h2 className="text-xl md:text-2xl font-bold text-brand-700">
            Проверенные специалисты, которые помогают
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-4 items-start">
            {featured.map((p) => (
              <Link key={p.id} href={`/psychologists/${p.id}`} className="block group">
                <div className="flex items-start gap-3">
                  <div className="h-14 w-14 shrink-0 rounded-full bg-mint-100 flex items-center justify-center text-brand-700 text-lg font-semibold">
                    {p.user.displayName.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-brand-700 group-hover:underline">{p.user.displayName}</span>
                      {p.verifiedBadge && (
                        <span className="badge-verified">
                          <IconCheck size={12} /> Верифицирован
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{p.bio.split(".")[0]}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {parseList(p.methods).slice(0, 2).map((m) => (
                        <span key={m} className="text-[11px] rounded-full bg-mint-50 px-2 py-0.5 text-mint-700">
                          {METHODS.find((x) => x.slug === m)?.label ?? m}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <IconStar size={14} className="text-amber-500" />
                      <span className="font-medium text-slate-700">{p.rating.toFixed(1)}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 text-xs">{p.reviewsCount} отзывов</span>
                      <span className="ml-auto font-semibold text-brand-700">{formatKGS(p.pricePerSession)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-3 text-center lg:border-l lg:border-mint-100 lg:pl-6">
              <div>
                <div className="text-2xl font-bold text-mint-700">100+</div>
                <div className="text-xs text-slate-500 mt-1">проверенных<br />психологов</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-mint-700">2 500+</div>
                <div className="text-xs text-slate-500 mt-1">успешных<br />консультаций</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-mint-700">4.8 ★</div>
                <div className="text-xs text-slate-500 mt-1">средняя оценка<br />пользователей</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
