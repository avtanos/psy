import { requireUserPage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const WEEKDAYS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

async function addRule(formData: FormData) {
  "use server";
  const user = await requireUserPage(["PSYCHOLOGIST"]);
  const profile = await prisma.psychologistProfile.findUniqueOrThrow({
    where: { userId: user.id },
  });
  const weekday = Number(formData.get("weekday"));
  const start = String(formData.get("start"));
  const end = String(formData.get("end"));
  const toMin = (s: string) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + (m || 0);
  };
  await prisma.availabilityRule.create({
    data: {
      psychologistId: profile.id,
      weekday,
      startMinutes: toMin(start),
      endMinutes: toMin(end),
    },
  });
}

async function removeRule(formData: FormData) {
  "use server";
  const user = await requireUserPage(["PSYCHOLOGIST"]);
  const id = String(formData.get("id"));
  const profile = await prisma.psychologistProfile.findUniqueOrThrow({
    where: { userId: user.id },
  });
  await prisma.availabilityRule.deleteMany({ where: { id, psychologistId: profile.id } });
}

function fmt(min: number) {
  return `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
}

export default async function SchedulePage() {
  const user = await requireUserPage(["PSYCHOLOGIST"]);
  const profile = await prisma.psychologistProfile.findUniqueOrThrow({
    where: { userId: user.id },
    include: { availability: { orderBy: [{ weekday: "asc" }, { startMinutes: "asc" }] } },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8 space-y-5 md:space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Расписание</h1>

      <div className="card">
        <h2 className="font-medium text-slate-800">Правила доступности</h2>
        {profile.availability.length === 0 && (
          <p className="mt-2 text-sm text-slate-600">Нет правил. Добавьте окна работы.</p>
        )}
        <ul className="mt-3 space-y-2">
          {profile.availability.map((r) => (
            <li key={r.id} className="flex items-center justify-between rounded border border-slate-100 px-3 py-2">
              <div className="text-sm">
                {WEEKDAYS[r.weekday]}: {fmt(r.startMinutes)} – {fmt(r.endMinutes)}
              </div>
              <form action={removeRule}>
                <input type="hidden" name="id" value={r.id} />
                <button className="text-rose-600 text-sm">Удалить</button>
              </form>
            </li>
          ))}
        </ul>

        <form action={addRule} className="mt-4 grid gap-2 grid-cols-2 sm:grid-cols-4">
          <select name="weekday" className="input col-span-2 sm:col-span-1">
            {WEEKDAYS.map((w, i) => (
              <option key={i} value={i}>{w}</option>
            ))}
          </select>
          <input name="start" type="time" defaultValue="09:00" className="input" />
          <input name="end" type="time" defaultValue="18:00" className="input" />
          <button className="btn-primary col-span-2 sm:col-span-1">Добавить</button>
        </form>
      </div>

      <p className="text-xs text-slate-500">
        Длительность сессии: {profile.sessionMinutes} мин, буфер: {profile.bufferMinutes} мин.
        Эти настройки меняются в профиле.
      </p>
    </div>
  );
}
