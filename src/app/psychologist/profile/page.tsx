import { requireUserPage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { somToTyiyn, tyiynToSom } from "@/lib/money";
import { TOPICS, METHODS, LANGUAGES } from "@/lib/catalog";
import { parseList, stringifyList } from "@/lib/json-list";

async function save(formData: FormData) {
  "use server";
  const user = await requireUserPage(["PSYCHOLOGIST"]);
  const profile = await prisma.psychologistProfile.findUniqueOrThrow({
    where: { userId: user.id },
  });

  const bio = String(formData.get("bio") ?? "").slice(0, 4000);
  const approach = String(formData.get("approach") ?? "").slice(0, 4000);
  const experienceYears = Math.max(0, Math.min(70, Number(formData.get("experienceYears") ?? 0)));
  const priceSom = Math.max(0, Number(formData.get("price") ?? 0));
  const sessionMinutes = Math.max(15, Math.min(180, Number(formData.get("sessionMinutes") ?? 50)));
  const bufferMinutes = Math.max(0, Math.min(60, Number(formData.get("bufferMinutes") ?? 15)));

  const topics = TOPICS.map((t) => t.slug).filter((s) => formData.get(`topic_${s}`));
  const methods = METHODS.map((m) => m.slug).filter((s) => formData.get(`method_${s}`));
  const languages = LANGUAGES.map((l) => l.code).filter((c) => formData.get(`lang_${c}`));
  const format: string[] = [];
  if (formData.get("format_video")) format.push("video");
  if (formData.get("format_chat")) format.push("chat");

  await prisma.psychologistProfile.update({
    where: { id: profile.id },
    data: {
      bio,
      approach,
      experienceYears,
      pricePerSession: somToTyiyn(priceSom),
      sessionMinutes,
      bufferMinutes,
      topics: stringifyList(topics),
      methods: stringifyList(methods),
      languages: stringifyList(languages),
      format: stringifyList(format),
      verification:
        profile.verification === "DRAFT" ? "PENDING" : profile.verification,
    },
  });
}

export default async function ProfileEdit() {
  const user = await requireUserPage(["PSYCHOLOGIST"]);
  const raw = await prisma.psychologistProfile.findUniqueOrThrow({
    where: { userId: user.id },
  });
  const p = {
    ...raw,
    topics: parseList(raw.topics),
    methods: parseList(raw.methods),
    languages: parseList(raw.languages),
    format: parseList(raw.format),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-8 space-y-4">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Профиль</h1>
      <form action={save} className="card space-y-4">
        <div>
          <label className="label">О себе</label>
          <textarea name="bio" rows={4} defaultValue={p.bio ?? ""} className="input" />
        </div>
        <div>
          <label className="label">Подход к работе</label>
          <textarea name="approach" rows={4} defaultValue={p.approach ?? ""} className="input" />
        </div>

        <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
          <div>
            <label className="label">Опыт (лет)</label>
            <input name="experienceYears" type="number" defaultValue={p.experienceYears} className="input" />
          </div>
          <div>
            <label className="label">Цена сессии (сом)</label>
            <input name="price" type="number" defaultValue={tyiynToSom(p.pricePerSession)} className="input" />
          </div>
          <div>
            <label className="label">Длительность (мин)</label>
            <input name="sessionMinutes" type="number" defaultValue={p.sessionMinutes} className="input" />
          </div>
          <div>
            <label className="label">Буфер (мин)</label>
            <input name="bufferMinutes" type="number" defaultValue={p.bufferMinutes} className="input" />
          </div>
        </div>

        <fieldset>
          <legend className="label">Темы</legend>
          <div className="grid grid-cols-2 gap-1 text-sm md:grid-cols-3">
            {TOPICS.map((t) => (
              <label key={t.slug} className="flex items-center gap-2">
                <input type="checkbox" name={`topic_${t.slug}`} defaultChecked={p.topics.includes(t.slug)} />
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
                <input type="checkbox" name={`method_${m.slug}`} defaultChecked={p.methods.includes(m.slug)} />
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
                <input type="checkbox" name={`lang_${l.code}`} defaultChecked={p.languages.includes(l.code)} />
                {l.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="label">Формат</legend>
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="format_video" defaultChecked={p.format.includes("video")} /> Видео
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="format_chat" defaultChecked={p.format.includes("chat")} /> Чат
            </label>
          </div>
        </fieldset>

        <button className="btn-primary">Сохранить и отправить на верификацию</button>
      </form>
    </div>
  );
}
