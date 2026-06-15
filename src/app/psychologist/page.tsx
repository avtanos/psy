import Link from "next/link";
import { requireUserPage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatKGS } from "@/lib/money";

export default async function PsychDashboard() {
  const user = await requireUserPage(["PSYCHOLOGIST"]);

  const profile = await prisma.psychologistProfile.findUnique({
    where: { userId: user.id },
    include: { wallet: { include: { operations: { take: 8, orderBy: { createdAt: "desc" } } } } },
  });

  const upcoming = await prisma.booking.findMany({
    where: { psychologistId: profile?.id, status: { in: ["CONFIRMED", "PENDING_PAYMENT"] } },
    orderBy: { startAt: "asc" },
    take: 10,
    include: { client: { select: { displayName: true } } },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 space-y-5 md:space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Кабинет психолога</h1>
          <p className="text-sm text-slate-600">
            Статус верификации:{" "}
            <span className="font-medium">{profile?.verification}</span>
          </p>
        </div>
        <Link href="/psychologist/profile" className="btn-secondary">Редактировать профиль</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <div className="text-sm text-slate-500">Баланс</div>
          <div className="mt-1 text-2xl font-bold">{formatKGS(profile?.wallet?.balance ?? 0)}</div>
          <div className="mt-1 text-xs text-slate-500">
            В ожидании: {formatKGS(profile?.wallet?.pendingBalance ?? 0)}
          </div>
          <Link href="/psychologist/wallet" className="btn-secondary mt-3">Выплаты</Link>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">Цена сессии</div>
          <div className="mt-1 text-2xl font-bold">{formatKGS(profile?.pricePerSession ?? 0)}</div>
          <div className="mt-1 text-xs text-slate-500">Длительность {profile?.sessionMinutes} мин</div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">Рейтинг</div>
          <div className="mt-1 text-2xl font-bold">{(profile?.rating ?? 0).toFixed(1)} ★</div>
          <div className="mt-1 text-xs text-slate-500">{profile?.reviewsCount} отзывов</div>
        </div>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Ближайшие сессии</h2>
        {upcoming.length === 0 && (
          <p className="mt-2 text-sm text-slate-600">Сессий пока нет.</p>
        )}
        <ul className="mt-3 divide-y divide-slate-100">
          {upcoming.map((b) => (
            <li key={b.id} className="py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="font-medium text-slate-800 truncate">{b.client.displayName}</div>
                <div className="text-sm text-slate-600">
                  {b.startAt.toLocaleString("ru-RU")} · {b.status}
                </div>
              </div>
              <Link href={`/me/sessions/${b.id}`} className="btn-primary">Открыть</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/psychologist/schedule" className="card hover:border-brand">
          <h3 className="font-medium text-slate-800">Расписание</h3>
          <p className="mt-1 text-sm text-slate-600">Настройте рабочие часы и выходные.</p>
        </Link>
        <Link href="/psychologist/materials" className="card hover:border-brand">
          <h3 className="font-medium text-slate-800">Мои материалы</h3>
          <p className="mt-1 text-sm text-slate-600">Загрузите статьи, PDF, аудио, тесты.</p>
        </Link>
      </div>
    </div>
  );
}
