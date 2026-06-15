import Link from "next/link";
import { TOPICS, METHODS, LANGUAGES } from "@/lib/catalog-data";

export default function ProfileEdit() {
  const p = {
    bio: "Клинический психолог, КПТ-терапевт. Работаю с тревожными расстройствами, паническими атаками, социальной фобией.",
    approach: "Когнитивно-поведенческая терапия (КПТ), техники экспозиции, поведенческие эксперименты.",
    experienceYears: 8,
    price: 2500,
    sessionMinutes: 50,
    bufferMinutes: 15,
    topics: ["anxiety", "depression", "self-esteem"],
    methods: ["cbt", "act"],
    languages: ["ru", "ky"],
    format: ["video", "chat"],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8 space-y-4">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Профиль</h1>
      <div className="card space-y-4">
        <div>
          <label className="label">О себе</label>
          <textarea name="bio" rows={4} defaultValue={p.bio} className="input" readOnly />
        </div>
        <div>
          <label className="label">Подход к работе</label>
          <textarea name="approach" rows={4} defaultValue={p.approach} className="input" readOnly />
        </div>

        <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
          <div>
            <label className="label">Опыт (лет)</label>
            <input type="number" defaultValue={p.experienceYears} className="input" readOnly />
          </div>
          <div>
            <label className="label">Цена сессии (сом)</label>
            <input type="number" defaultValue={p.price} className="input" readOnly />
          </div>
          <div>
            <label className="label">Длительность (мин)</label>
            <input type="number" defaultValue={p.sessionMinutes} className="input" readOnly />
          </div>
          <div>
            <label className="label">Буфер (мин)</label>
            <input type="number" defaultValue={p.bufferMinutes} className="input" readOnly />
          </div>
        </div>

        <fieldset>
          <legend className="label">Темы</legend>
          <div className="grid grid-cols-2 gap-1 text-sm md:grid-cols-3">
            {TOPICS.map((t) => (
              <label key={t.slug} className="flex items-center gap-2">
                <input type="checkbox" defaultChecked={p.topics.includes(t.slug)} disabled />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="label">Методы</legend>
          <div className="grid grid-cols-2 gap-1 text-sm md:grid-cols-3">
            {METHODS.map((m) => (
              <label key={m.slug} className="flex items-center gap-2">
                <input type="checkbox" defaultChecked={p.methods.includes(m.slug)} disabled />
                {m.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="label">Языки</legend>
          <div className="flex gap-3 text-sm">
            {LANGUAGES.map((l) => (
              <label key={l.code} className="flex items-center gap-2">
                <input type="checkbox" defaultChecked={p.languages.includes(l.code)} disabled />
                {l.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="label">Формат</legend>
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked={p.format.includes("video")} disabled /> Видео
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked={p.format.includes("chat")} disabled /> Чат
            </label>
          </div>
        </fieldset>

        <button className="btn-primary opacity-60 cursor-not-allowed">Сохранить (демо)</button>
      </div>
      <Link href="/psychologist" className="text-brand text-sm">← Назад в кабинет</Link>
    </div>
  );
}
