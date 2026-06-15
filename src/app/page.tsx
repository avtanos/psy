import Link from "next/link";

const TOPICS = [
  { slug: "anxiety", label: "Тревога и стресс" },
  { slug: "relationships", label: "Отношения" },
  { slug: "depression", label: "Депрессия" },
  { slug: "self-esteem", label: "Самооценка" },
  { slug: "addiction", label: "Зависимости" },
  { slug: "family", label: "Семья и дети" },
  { slug: "trauma", label: "Травма" },
  { slug: "career", label: "Карьера и выгорание" },
];

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-50 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand leading-tight">
              Психологическая помощь онлайн — рядом с вами
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-700">
              Выбирайте психолога по подходу и теме, записывайтесь в удобное время,
              проводите сессии безопасно. Поддержка на русском и кыргызском.
            </p>
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              <Link href="/psychologists" className="btn-primary">
                Найти психолога
              </Link>
              <Link href="/for-psychologists" className="btn-secondary">
                Я психолог
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Темы запросов</h2>
        <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {TOPICS.map((t) => (
            <Link
              key={t.slug}
              href={`/psychologists?topic=${t.slug}`}
              className="rounded-lg border border-slate-200 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm hover:border-brand"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Как это работает</h2>
        <div className="mt-4 sm:mt-5 grid gap-3 sm:gap-4 sm:grid-cols-3">
          {[
            ["1. Выбор", "Найдите психолога по теме, методу и языку."],
            ["2. Запись", "Забронируйте слот и оплатите онлайн."],
            ["3. Сессия", "Подключитесь по защищённой видеоссылке."],
          ].map(([t, d]) => (
            <div key={t} className="card">
              <div className="text-brand font-semibold">{t}</div>
              <p className="mt-1 text-sm text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600">
          <p>
            <span className="font-medium text-slate-800">Безопасность данных.</span>{" "}
            Платформа обрабатывает чувствительные данные согласно Цифровому кодексу
            КР № 178 от 31.07.2025: данные шифруются в передаче и на хранении,
            запись сессий выключена по умолчанию и включается только при явном
            двойном согласии сторон.
          </p>
        </div>
      </section>
    </div>
  );
}
