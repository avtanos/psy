import Link from "next/link";

export default function DeletePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 space-y-3">
      <h1 className="text-2xl font-semibold text-slate-800">Удаление аккаунта</h1>
      <p className="text-slate-700">
        Действие необратимое. Будут удалены: профиль, контактные данные, история
        записей и купленные материалы, приватные заметки. Финансовые транзакции
        сохраняются обезличенно — для бухгалтерской отчётности.
      </p>
      <button className="btn-danger opacity-60 cursor-not-allowed">Удалить аккаунт (демо)</button>
      <div className="mt-4">
        <Link href="/me" className="text-brand text-sm">← Назад в кабинет</Link>
      </div>
    </div>
  );
}
