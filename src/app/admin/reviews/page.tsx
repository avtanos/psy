import { requireUserPage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function moderate(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const action = String(formData.get("action"));
  const note = String(formData.get("note") ?? "");
  await requireUserPage(["ADMIN", "CONTENT_MANAGER"]);
  await prisma.review.update({
    where: { id },
    data: {
      isModerated: true,
      isHidden: action === "hide",
      moderatorNote: note || null,
    },
  });

  // пересчёт рейтинга
  const review = await prisma.review.findUniqueOrThrow({ where: { id } });
  const agg = await prisma.review.aggregate({
    where: { psychologistId: review.psychologistId, isHidden: false, isModerated: true },
    _avg: { rating: true },
    _count: { _all: true },
  });
  await prisma.psychologistProfile.update({
    where: { id: review.psychologistId },
    data: { rating: agg._avg.rating ?? 0, reviewsCount: agg._count._all },
  });
}

export default async function AdminReviewsPage() {
  await requireUserPage(["ADMIN", "CONTENT_MANAGER"]);
  const pending = await prisma.review.findMany({
    where: { isModerated: false },
    orderBy: { createdAt: "asc" },
    include: {
      psychologist: { include: { user: { select: { displayName: true } } } },
      author: { select: { displayName: true } },
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-800">Модерация отзывов</h1>
      {pending.length === 0 && <div className="card text-sm text-slate-600">Очередь пуста.</div>}
      {pending.map((r) => (
        <div key={r.id} className="card">
          <div className="text-sm text-slate-600">
            {r.author.displayName} → {r.psychologist.user.displayName} ·{" "}
            {"★".repeat(r.rating)}
            <span className="text-slate-300">{"★".repeat(5 - r.rating)}</span>
          </div>
          {r.text && <p className="mt-2 whitespace-pre-line">{r.text}</p>}
          <form action={moderate} className="mt-3 flex flex-wrap gap-2">
            <input type="hidden" name="id" value={r.id} />
            <input name="note" className="input flex-1 min-w-[200px]" placeholder="Заметка модератора" />
            <button name="action" value="publish" className="btn-primary">Опубликовать</button>
            <button name="action" value="hide" className="btn-danger">Скрыть</button>
          </form>
        </div>
      ))}
    </div>
  );
}
