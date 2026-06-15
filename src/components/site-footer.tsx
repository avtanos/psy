import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <div className="font-semibold text-brand">PsychKG</div>
            <p className="mt-2 text-slate-500">
              Платформа психологической помощи и онлайн-консультаций. Кыргызская Республика.
            </p>
          </div>
          <div>
            <div className="font-medium text-slate-700">Платформа</div>
            <ul className="mt-2 space-y-1">
              <li><Link href="/psychologists">Психологи</Link></li>
              <li><Link href="/materials">Материалы</Link></li>
              <li><Link href="/courses">Курсы</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-slate-700">Помощь</div>
            <ul className="mt-2 space-y-1">
              <li><Link href="/legal/terms">Оферта</Link></li>
              <li><Link href="/legal/privacy">Политика конфиденциальности</Link></li>
              <li><Link href="/legal/consent">Согласие на обработку данных</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-slate-700">Психологам</div>
            <ul className="mt-2 space-y-1">
              <li><Link href="/for-psychologists">Стать психологом</Link></li>
              <li><Link href="/about">О платформе</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-4 text-xs text-slate-500">
          © {new Date().getFullYear()} PsychKG. Обработка персональных данных
          соответствует Цифровому кодексу КР № 178 от 31.07.2025.
        </div>
      </div>
    </footer>
  );
}
