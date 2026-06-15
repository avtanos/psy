import Link from "next/link";
import { MOCK_DISPUTES } from "@/lib/mock-data";

export default function DisputesPage() {
  const disputes = MOCK_DISPUTES;
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-800">Споры</h1>
      {disputes.length === 0 && <div className="card text-sm">Споров нет.</div>}
      {disputes.map((d) => (
        <div key={d.id} className="card">
          <div className="text-sm text-slate-600">Бронирование: {d.bookingId} · {d.status}</div>
          <div className="font-medium text-slate-800 mt-1">{d.reason}</div>
          <p className="mt-2 whitespace-pre-line text-sm">{d.description}</p>
        </div>
      ))}
      <Link href="/admin" className="text-brand text-sm">← Назад в админку</Link>
    </div>
  );
}
