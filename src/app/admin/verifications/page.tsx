import { requireUserPage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function decide(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const action = String(formData.get("action"));
  const note = String(formData.get("note") ?? "");
  const user = await requireUserPage(["ADMIN"]);

  if (action === "approve") {
    await prisma.psychologistProfile.update({
      where: { id },
      data: { verification: "VERIFIED", verifiedBadge: true },
    });
    await prisma.user.update({
      where: { id: (await prisma.psychologistProfile.findUniqueOrThrow({ where: { id } })).userId },
      data: { status: "ACTIVE" },
    });
  } else if (action === "reject") {
    await prisma.psychologistProfile.update({
      where: { id },
      data: { verification: "REJECTED" },
    });
  }
  await prisma.adminLog.create({
    data: {
      actorId: user.id,
      action: `psychologist.${action}`,
      targetType: "psychologist_profile",
      targetId: id,
      diff: note ? JSON.stringify({ note }) : null,
    },
  });
}

export default async function VerificationsPage() {
  await requireUserPage(["ADMIN"]);
  const pending = await prisma.psychologistProfile.findMany({
    where: { verification: { in: ["PENDING", "DRAFT"] } },
    include: {
      user: { select: { displayName: true, email: true, phone: true } },
      documents: true,
    },
    orderBy: { updatedAt: "asc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:py-8 space-y-4">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Верификация психологов</h1>
      <p className="text-sm text-slate-600">
        Проверяйте документы: диплом, сертификаты, лицензии. После одобрения психолог
        получает бейдж и появляется в каталоге.
      </p>

      {pending.length === 0 && (
        <div className="card text-sm text-slate-600">Очередь пуста.</div>
      )}

      {pending.map((p) => (
        <div key={p.id} className="card">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="font-medium text-slate-800">{p.user.displayName}</div>
              <div className="text-sm text-slate-600 break-anywhere">{p.user.email ?? p.user.phone}</div>
              <div className="text-sm text-slate-600 mt-1">Опыт: {p.experienceYears} лет</div>
            </div>
            <span className="badge bg-slate-100 text-slate-700">{p.verification}</span>
          </div>
          <p className="mt-3 text-sm text-slate-700 whitespace-pre-line">{p.bio}</p>

          <div className="mt-3">
            <h4 className="text-sm font-medium text-slate-700">Документы</h4>
            <ul className="mt-1 text-sm">
              {p.documents.map((d) => (
                <li key={d.id}>
                  <a href={d.fileUrl} target="_blank" rel="noreferrer" className="text-brand">
                    {d.kind}
                  </a>{" "}
                  — {d.comment ?? "—"}
                </li>
              ))}
              {p.documents.length === 0 && <li className="text-slate-500">Документы не загружены</li>}
            </ul>
          </div>

          <form action={decide} className="mt-4 flex flex-wrap items-center gap-2">
            <input type="hidden" name="id" value={p.id} />
            <input
              name="note"
              placeholder="Комментарий (необязательно)"
              className="input flex-1 min-w-[200px]"
            />
            <button name="action" value="approve" className="btn-primary">Одобрить</button>
            <button name="action" value="reject" className="btn-danger">Отклонить</button>
          </form>
        </div>
      ))}
    </div>
  );
}
