import Link from "next/link";
import { requireUserPage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatKGS, somToTyiyn } from "@/lib/money";

async function create(formData: FormData) {
  "use server";
  const user = await requireUserPage(["PSYCHOLOGIST"]);
  const profile = await prisma.psychologistProfile.findUniqueOrThrow({
    where: { userId: user.id },
  });
  const title = String(formData.get("title") ?? "").slice(0, 200);
  const description = String(formData.get("description") ?? "").slice(0, 4000);
  const kind = String(formData.get("kind") ?? "ARTICLE") as never;
  const priceSom = Math.max(0, Number(formData.get("price") ?? 0));
  const contentBody = String(formData.get("body") ?? "");

  await prisma.material.create({
    data: {
      authorId: profile.id,
      title,
      description,
      kind,
      price: somToTyiyn(priceSom),
      contentBody: contentBody || null,
      isPublished: true,
    },
  });
}

export default async function PsychMaterialsPage() {
  const user = await requireUserPage(["PSYCHOLOGIST"]);
  const profile = await prisma.psychologistProfile.findUniqueOrThrow({
    where: { userId: user.id },
    include: {
      materials: { orderBy: { createdAt: "desc" } },
    },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Мои материалы</h1>

      <div className="card">
        <h2 className="font-medium text-slate-800">Добавить материал</h2>
        <form action={create} className="mt-3 space-y-2">
          <input name="title" placeholder="Заголовок" className="input" required />
          <textarea name="description" placeholder="Описание" rows={2} className="input" />
          <div className="grid gap-2 md:grid-cols-2">
            <select name="kind" className="input">
              <option value="ARTICLE">Статья</option>
              <option value="PDF">PDF</option>
              <option value="AUDIO">Аудио</option>
              <option value="VIDEO">Видео</option>
              <option value="TEST">Тест</option>
              <option value="WORKBOOK">Рабочая тетрадь</option>
            </select>
            <input name="price" type="number" placeholder="Цена, сом (0 = бесплатно)" className="input" />
          </div>
          <textarea name="body" placeholder="Содержимое (для статьи)" rows={6} className="input" />
          <button className="btn-primary">Опубликовать</button>
        </form>
      </div>

      <ul className="space-y-2">
        {profile.materials.map((m) => (
          <li key={m.id} className="card flex items-center justify-between">
            <div>
              <Link href={`/materials/${m.id}`} className="font-medium text-brand">
                {m.title}
              </Link>
              <div className="text-xs text-slate-500">{m.kind} · {formatKGS(m.price)}</div>
            </div>
            <span className="badge bg-slate-100 text-slate-700">
              {m.isPublished ? "Опубликован" : "Черновик"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
