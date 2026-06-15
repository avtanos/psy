import Link from "next/link";
import { MOCK_MATERIALS } from "@/lib/mock-data";
import { formatKGS } from "@/lib/money";

export default function PsychMaterialsPage() {
  const myMaterials = MOCK_MATERIALS.filter((m) => m.authorName === "Айгерим Токтосунова");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Мои материалы</h1>

      <div className="card">
        <h2 className="font-medium text-slate-800">Добавить материал</h2>
        <div className="mt-3 space-y-2">
          <input placeholder="Заголовок" className="input" />
          <textarea placeholder="Описание" rows={2} className="input" />
          <div className="grid gap-2 md:grid-cols-2">
            <select className="input">
              <option value="ARTICLE">Статья</option>
              <option value="PDF">PDF</option>
              <option value="AUDIO">Аудио</option>
              <option value="VIDEO">Видео</option>
              <option value="TEST">Тест</option>
              <option value="WORKBOOK">Рабочая тетрадь</option>
            </select>
            <input type="number" placeholder="Цена, сом (0 = бесплатно)" className="input" />
          </div>
          <textarea placeholder="Содержимое (для статьи)" rows={6} className="input" />
          <button className="btn-primary opacity-60 cursor-not-allowed">Опубликовать (демо)</button>
        </div>
      </div>

      <ul className="space-y-2">
        {myMaterials.map((m) => (
          <li key={m.id} className="card flex items-center justify-between">
            <div>
              <Link href={`/materials/${m.id}`} className="font-medium text-brand">
                {m.title}
              </Link>
              <div className="text-xs text-slate-500">{m.kind} · {formatKGS(m.price)}</div>
            </div>
            <span className="badge bg-slate-100 text-slate-700">Опубликован</span>
          </li>
        ))}
      </ul>

      <Link href="/psychologist" className="text-brand text-sm">← Назад в кабинет</Link>
    </div>
  );
}
