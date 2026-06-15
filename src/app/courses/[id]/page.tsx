import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { formatKGS } from "@/lib/money";
import { PayButton } from "@/components/pay-button";

export default async function CoursePage({ params }: { params: { id: string } }) {
  const c = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      author: { include: { user: { select: { displayName: true } } } },
      modules: { orderBy: { position: "asc" }, include: { lessons: { orderBy: { position: "asc" } } } },
    },
  });
  if (!c || !c.isPublished) notFound();

  const user = await getCurrentUser();
  const enrolled =
    user &&
    Boolean(
      await prisma.courseEnrollment.findUnique({
        where: { courseId_userId: { courseId: c.id, userId: user.id } },
      })
    );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="card">
        <div className="text-sm text-slate-500">{c.author.user.displayName}</div>
        <h1 className="text-2xl font-semibold text-slate-800">{c.title}</h1>
        <p className="mt-2 text-slate-700 whitespace-pre-line">{c.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-bold">{c.price === 0 ? "Бесплатно" : formatKGS(c.price)}</div>
          {!enrolled && user && <PayButton courseId={c.id} label="Записаться на курс" />}
          {!user && (
            <Link href={`/login?next=/courses/${c.id}`} className="btn-primary">Войти для записи</Link>
          )}
          {enrolled && <span className="badge bg-brand-50 text-brand">Вы записаны</span>}
        </div>
      </div>

      <div className="card mt-4">
        <h2 className="font-medium text-slate-800">Программа</h2>
        <ol className="mt-3 space-y-3">
          {c.modules.map((m, mi) => (
            <li key={m.id}>
              <div className="font-medium text-slate-800">
                Модуль {mi + 1}. {m.title}
              </div>
              <ul className="ml-4 mt-1 list-disc text-sm text-slate-600">
                {m.lessons.map((l) => (
                  <li key={l.id}>{l.title}</li>
                ))}
              </ul>
            </li>
          ))}
          {c.modules.length === 0 && (
            <li className="text-sm text-slate-500">Содержимое курса будет добавлено.</li>
          )}
        </ol>
        {c.certificateEnabled && (
          <p className="mt-3 text-xs text-slate-500">По завершении выдаётся сертификат.</p>
        )}
      </div>
    </div>
  );
}
