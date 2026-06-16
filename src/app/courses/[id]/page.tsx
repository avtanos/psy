import Link from "next/link";
import { MOCK_COURSES } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";
import { HeroIllustration } from "@/components/hero-illustration";
import {
  IconHome, IconChevronRight, IconChevronDown, IconCheck, IconCheckCircle,
  IconAward, IconList, IconPlay, IconClock, IconVideo, IconChartBar, IconLifeBuoy,
  IconShield, IconLeaf, IconBrain, IconLungs, IconClipboard, IconHeadphones,
  IconNotebook, IconSparkles,
} from "@/components/icons";

export function generateStaticParams() {
  return MOCK_COURSES.map((c) => ({ id: c.id }));
}

const MODULE_ICONS = [IconLeaf, IconBrain, IconLungs, IconShield];

const FOR_YOU = [
  "Чувствуете постоянную тревогу или напряжение",
  "Часто беспокоитесь о будущем",
  "Испытываете трудности с контролем тревожных мыслей",
  "Хотите научиться техникам, которые действительно работают",
];

const COURSE_INFO = [
  { icon: IconClock, label: "Длительность", value: "6 недель" },
  { icon: IconVideo, label: "Формат", value: "Онлайн, в удобном темпе" },
  { icon: IconChartBar, label: "Уровень", value: "Подходит для начинающих" },
  { icon: IconCheckCircle, label: "Доступ", value: "Доступ к материалам навсегда" },
  { icon: IconLifeBuoy, label: "Поддержка", value: "Обратная связь от психолога" },
];

const BENEFITS = [
  { icon: IconClipboard, title: "Практические инструменты", sub: "для работы с тревогой" },
  { icon: IconNotebook, title: "Рабочие тетради и чек-листы" },
  { icon: IconHeadphones, title: "Аудио-упражнения и медитации" },
  { icon: IconAward, title: "Сертификат о прохождении курса" },
];

export default function CoursePage({ params }: { params: { id: string } }) {
  const c = MOCK_COURSES.find((x) => x.id === params.id) ?? MOCK_COURSES[0];

  return (
    <div className="bg-[#FBFAF7]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-brand">
            <IconHome size={14} /> Главная
          </Link>
          <IconChevronRight size={12} />
          <Link href="/courses" className="hover:text-brand">Курсы</Link>
          <IconChevronRight size={12} />
          <span className="text-slate-700 font-medium truncate">{c.title}</span>
        </nav>

        <div className="mt-5 grid gap-6 lg:grid-cols-3">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero card */}
            <div className="card-soft">
              <div className="grid items-start gap-6 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-mint-100 flex items-center justify-center text-brand-700 font-semibold">
                      {c.authorName.slice(0, 1)}
                    </div>
                    <div>
                      <div className="font-semibold text-brand-700">{c.authorName}</div>
                      <span className="badge-verified mt-0.5">
                        <IconCheck size={12} /> Верифицированный специалист
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Клинический психолог, КПТ-терапевт</div>

                  <h1 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-brand-700 leading-tight">
                    {c.title}
                  </h1>
                  <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div>
                  <HeroIllustration className="w-full max-w-sm mx-auto" />
                </div>
              </div>

              <hr className="my-6 border-slate-100" />

              <div className="grid gap-4 md:grid-cols-3 md:items-center">
                <div className="flex items-center gap-3">
                  <span className="icon-circle h-10 w-10">
                    <IconAward size={18} />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-brand-700">Сертификат</div>
                    <div className="text-xs text-slate-500">по завершении курса</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="icon-circle h-10 w-10">
                    <IconList size={18} />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-brand-700">Структурированная</div>
                    <div className="text-xs text-slate-500">пошаговая программа</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="icon-circle h-10 w-10">
                    <IconPlay size={18} />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-brand-700">Онлайн-формат</div>
                    <div className="text-xs text-slate-500">учитесь в удобное время</div>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-slate-100" />

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-3xl font-bold text-brand-700">
                  {c.price === 0 ? "Бесплатно" : formatKGS(c.price)}
                </div>
                <button className="btn-primary !px-7 !py-3">
                  Записаться
                </button>
              </div>
            </div>

            {/* Program */}
            <div className="card-soft">
              <h2 className="text-xl font-bold text-brand-700">Программа курса</h2>
              <div className="mt-5 space-y-3">
                {c.modules.map((m, i) => {
                  const Icon = MODULE_ICONS[i % MODULE_ICONS.length];
                  return (
                    <div key={m.id} className="rounded-xl border border-slate-100 bg-white px-4 py-3.5">
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint-100 text-brand-700 font-semibold">
                          {i + 1}
                        </div>
                        <span className="icon-circle h-10 w-10 shrink-0">
                          <Icon size={18} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-brand-700">
                            Модуль {i + 1}.&nbsp;&nbsp;{m.title}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-600">
                            {m.lessons.map((l, li) => (
                              <span key={l.id} className="inline-flex items-center gap-1.5">
                                {li > 0 && <span className="text-slate-300">·</span>}
                                {l.title}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 shrink-0">
                          <span>{m.lessons.length} {m.lessons.length === 1 ? "урок" : m.lessons.length < 5 ? "урока" : "уроков"}</span>
                          <IconChevronDown size={16} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {c.certificateEnabled && (
                <div className="mt-5 rounded-xl bg-mint-50 border border-mint-100 px-4 py-3 flex items-center gap-3 text-sm text-brand-700">
                  <IconAward size={20} className="text-mint-500 shrink-0" />
                  По завершении курса выдаётся сертификат об успешном прохождении.
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-5">
            <div className="card-soft">
              <h3 className="font-semibold text-brand-700">Курс для вас, если вы:</h3>
              <ul className="mt-4 space-y-3">
                {FOR_YOU.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-600 mt-0.5">
                      <IconCheck size={12} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-soft">
              <ul className="space-y-4">
                {COURSE_INFO.map((info) => (
                  <li key={info.label} className="flex items-start gap-3">
                    <span className="icon-circle h-10 w-10 shrink-0">
                      <info.icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-brand-700">{info.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{info.value}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-soft">
              <h3 className="font-semibold text-brand-700">Что вы получите</h3>
              <ul className="mt-4 space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b.title} className="flex items-start gap-3 text-sm">
                    <span className="icon-circle h-8 w-8 shrink-0">
                      <b.icon size={14} />
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-800">{b.title}</div>
                      {b.sub && <div className="text-xs text-slate-500">{b.sub}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-soft bg-mint-50 border-mint-100">
              <div className="flex items-start gap-3">
                <span className="icon-circle h-10 w-10 shrink-0 bg-white">
                  <IconShield size={18} />
                </span>
                <div>
                  <div className="font-semibold text-brand-700">14 дней на размышление</div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Если курс не подойдёт, мы вернём деньги
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
