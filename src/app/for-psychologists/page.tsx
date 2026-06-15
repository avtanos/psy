import Link from "next/link";

export default function ForPsychologistsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-brand">Психологам</h1>
      <p className="mt-2 text-slate-700">
        Ведите практику с понятной комиссией, удобным календарём, безопасной
        видеосвязью и собственным магазином материалов.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {[
          ["Удобный календарь", "Слоты, буферы, переносы, политика no-show."],
          ["Прозрачные финансы", "Сплит-выплаты, кошелёк, вывод средств."],
          ["Безопасность данных", "Шифрование заметок, согласие на запись."],
          ["Магазин материалов", "Продавайте статьи, PDF, аудио, курсы."],
        ].map(([t, d]) => (
          <div key={t} className="card">
            <div className="font-medium text-slate-800">{t}</div>
            <p className="mt-1 text-sm text-slate-600">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-2">
        <Link href="/register" className="btn-primary">Зарегистрироваться</Link>
        <Link href="/login" className="btn-secondary">У меня уже есть аккаунт</Link>
      </div>
    </div>
  );
}
