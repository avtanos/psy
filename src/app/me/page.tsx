import Link from "next/link";
import { MOCK_BOOKINGS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";

const STATUS_LABEL: Record<string, string> = {
  PENDING_PAYMENT: "Ожидает оплаты",
  CONFIRMED: "Подтверждена",
  COMPLETED: "Завершена",
  CANCELLED_BY_CLIENT: "Отменена клиентом",
  CANCELLED_BY_PSYCHOLOGIST: "Отменена психологом",
  NO_SHOW_CLIENT: "Клиент не пришёл",
  NO_SHOW_PSYCHOLOGIST: "Психолог не пришёл",
  REFUNDED: "Возврат",
};

export default function ClientDashboard() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 space-y-5 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Личный кабинет</h1>
        <p className="text-sm text-slate-600">Здравствуйте, Айдана К.</p>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Записи</h2>
        <ul className="mt-3 divide-y divide-slate-100">
          {MOCK_BOOKINGS.map((b) => (
            <li key={b.id} className="py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-800 truncate">{b.psychologistName}</div>
                <div className="text-sm text-slate-600">
                  {new Date(b.startAt).toLocaleString("ru-RU")} · {STATUS_LABEL[b.status]} · {formatKGS(b.price)}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                {(b.status === "CONFIRMED" || b.status === "COMPLETED") && (
                  <Link className="btn-secondary" href={`/me/sessions/${b.id}`}>Открыть</Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-rose-700">Чувствуете, что вам тяжело?</h2>
          <p className="mt-1 text-sm text-slate-600">
            Короткая проверка безопасности поможет понять, нужна ли срочная поддержка. Если опасность сейчас — звоните 103 или 112.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link href="/me/safety-check" className="btn-secondary !py-2.5 !text-sm">Проверка безопасности</Link>
          <Link href="/help/crisis" className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700">
            Срочная помощь
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card">
          <h2 className="font-medium text-slate-800">Купленные материалы</h2>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link href="/materials/mat-2" className="text-brand">Техники заземления при панической атаке</Link></li>
            <li><Link href="/materials/mat-5" className="text-brand">Рабочая тетрадь: работа с самооценкой</Link></li>
          </ul>
        </div>
        <div className="card">
          <h2 className="font-medium text-slate-800">Мои курсы</h2>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link href="/courses/course-1" className="text-brand">Управление тревогой: 6-недельный курс</Link></li>
          </ul>
        </div>
      </div>

      <div className="card text-sm text-slate-600">
        <Link href="/me/export" className="text-brand">Экспорт моих данных</Link> ·{" "}
        <Link href="/me/delete" className="text-brand">Удалить аккаунт и данные</Link>
        <p className="mt-2 text-xs">
          По Цифровому кодексу КР № 178 вы вправе получить копию своих данных и
          потребовать их удаления.
        </p>
      </div>
    </div>
  );
}
