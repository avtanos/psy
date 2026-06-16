import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-mint-100 text-xl font-semibold">
                Ψ
              </span>
              <span className="text-lg font-semibold tracking-tight text-brand-700">PsychKG</span>
            </div>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Платформа психологической помощи<br />и онлайн-консультаций.<br />
              Кыргызская Республика.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-800">Платформа</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/psychologists" className="hover:text-brand">Психологи</Link></li>
              <li><Link href="/materials" className="hover:text-brand">Материалы</Link></li>
              <li><Link href="/courses" className="hover:text-brand">Курсы</Link></li>
              <li><Link href="/about" className="hover:text-brand">О платформе</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-800">Помощь</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/legal/terms" className="hover:text-brand">Оферта</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-brand">Политика конфиденциальности</Link></li>
              <li><Link href="/legal/consent" className="hover:text-brand">Согласие на обработку данных</Link></li>
              <li><span className="hover:text-brand">Часто задаваемые вопросы</span></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-800">Психологам</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/for-psychologists" className="hover:text-brand">Стать психологом</Link></li>
              <li><span className="hover:text-brand">Требования и документы</span></li>
              <li><span className="hover:text-brand">Помощь специалистам</span></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <div className="text-sm font-semibold text-slate-800">Будьте в курсе полезного</div>
            <p className="mt-3 text-sm text-slate-600">
              Подпишитесь на рассылку с материалами и анонсами курсов.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Ваш e-mail"
                className="input flex-1"
              />
              <button type="button" className="btn-primary shrink-0">Подписаться</button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {["⌖", "◎", "✈", "♪", "▶"].map((s, i) => (
              <span key={i} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 cursor-pointer hover:bg-mint-100 hover:text-brand">
                {s}
              </span>
            ))}
          </div>
          <div>
            © {new Date().getFullYear()} PsychKG. Обработка персональных данных
            соответствует Цифровому кодексу КР № 178 от 31.07.2025.
          </div>
        </div>
      </div>
    </footer>
  );
}
