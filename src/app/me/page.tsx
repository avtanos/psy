import { requireUserPage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatKGS } from "@/lib/money";
import Link from "next/link";

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

export default async function ClientDashboard() {
  const user = await requireUserPage();

  const bookings = await prisma.booking.findMany({
    where: { clientId: user.id },
    orderBy: { startAt: "desc" },
    take: 20,
    include: { psychologist: { include: { user: true } } },
  });

  const [materials, courses] = await Promise.all([
    prisma.materialPurchase.findMany({
      where: { userId: user.id },
      include: { material: true },
      take: 20,
    }),
    prisma.courseEnrollment.findMany({
      where: { userId: user.id },
      include: { course: true },
      take: 20,
    }),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 space-y-5 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Личный кабинет</h1>
        <p className="text-sm text-slate-600">Здравствуйте, {user.displayName}.</p>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Записи</h2>
        {bookings.length === 0 && (
          <p className="mt-2 text-sm text-slate-600">У вас нет записей. <Link href="/psychologists" className="text-brand">Найти психолога</Link></p>
        )}
        <ul className="mt-3 divide-y divide-slate-100">
          {bookings.map((b) => (
            <li key={b.id} className="py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-800 truncate">{b.psychologist.user.displayName}</div>
                <div className="text-sm text-slate-600">
                  {b.startAt.toLocaleString("ru-RU")} · {STATUS_LABEL[b.status]} · {formatKGS(b.pricePerSession)}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                {b.status === "PENDING_PAYMENT" && (
                  <Link className="btn-primary" href={`/me/bookings/${b.id}/pay`}>Оплатить</Link>
                )}
                {(b.status === "CONFIRMED" || b.status === "COMPLETED") && (
                  <Link className="btn-secondary" href={`/me/sessions/${b.id}`}>Открыть</Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card">
          <h2 className="font-medium text-slate-800">Купленные материалы</h2>
          {materials.length === 0 && <p className="mt-2 text-sm text-slate-600">Пока пусто.</p>}
          <ul className="mt-2 space-y-2 text-sm">
            {materials.map((p) => (
              <li key={p.id}>
                <Link href={`/materials/${p.material.id}`} className="text-brand">{p.material.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="font-medium text-slate-800">Мои курсы</h2>
          {courses.length === 0 && <p className="mt-2 text-sm text-slate-600">Пока пусто.</p>}
          <ul className="mt-2 space-y-2 text-sm">
            {courses.map((e) => (
              <li key={e.id}>
                <Link href={`/courses/${e.course.id}`} className="text-brand">{e.course.title}</Link>
              </li>
            ))}
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
