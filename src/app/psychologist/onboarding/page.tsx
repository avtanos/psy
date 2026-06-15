import Link from "next/link";
import { requireUserPage } from "@/lib/auth";

export default async function OnboardingPage() {
  await requireUserPage(["PSYCHOLOGIST"]);
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 space-y-5">
      <h1 className="text-2xl font-semibold text-slate-800">Добро пожаловать!</h1>
      <p className="text-slate-700">
        Чтобы появиться в каталоге, пройдите простые шаги:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-slate-700">
        <li>
          <Link href="/psychologist/profile" className="text-brand">
            Заполнить профиль
          </Link>{" "}
          — биография, подход, темы, методы, цена.
        </li>
        <li>Загрузить документы об образовании на верификацию.</li>
        <li>
          <Link href="/psychologist/schedule" className="text-brand">
            Настроить расписание
          </Link>
          : рабочие часы и буферы между сессиями.
        </li>
        <li>После одобрения администратором ваш профиль появится в каталоге.</li>
      </ol>
      <Link href="/psychologist" className="btn-primary">Перейти в кабинет</Link>
    </div>
  );
}
