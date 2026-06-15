import Link from "next/link";

export default function ExportPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 space-y-3">
      <h1 className="text-2xl font-semibold text-slate-800">Экспорт данных</h1>
      <p className="text-slate-700">
        По вашему запросу мы выгрузим всё, что хранится о вас на платформе, в
        JSON-файл. Файл содержит профиль, бронирования, оплаты, покупки, отзывы
        и уведомления.
      </p>
      <Link href="/api/me/export" className="btn-primary">Скачать JSON</Link>
    </div>
  );
}
