import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { formatKGS } from "@/lib/money";
import { PayButton } from "@/components/pay-button";

export default async function MaterialPage({ params }: { params: { id: string } }) {
  const m = await prisma.material.findUnique({
    where: { id: params.id },
    include: { author: { include: { user: { select: { displayName: true } } } } },
  });
  if (!m || !m.isPublished) notFound();

  const user = await getCurrentUser();
  const purchased = user
    ? Boolean(
        await prisma.materialPurchase.findUnique({
          where: { materialId_userId: { materialId: m.id, userId: user.id } },
        })
      )
    : false;
  const free = m.price === 0;
  const canRead = free || purchased;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="card">
        <div className="text-sm text-slate-500">{m.author.user.displayName}</div>
        <h1 className="text-2xl font-semibold text-slate-800">{m.title}</h1>
        <p className="mt-2 text-slate-700 whitespace-pre-line">{m.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-bold">
            {free ? "Бесплатно" : formatKGS(m.price)}
          </div>
          {!canRead && user && <PayButton materialId={m.id} label="Купить материал" />}
          {!user && (
            <Link href={`/login?next=/materials/${m.id}`} className="btn-primary">
              Войти для покупки
            </Link>
          )}
        </div>
      </div>

      {canRead && (
        <div className="card mt-4">
          <h2 className="font-medium text-slate-800">Содержимое</h2>
          {m.contentBody && (
            <article className="prose prose-slate mt-3 whitespace-pre-line">
              {m.contentBody}
            </article>
          )}
          {m.fileUrl && (
            <a href={m.fileUrl} className="btn-primary mt-3 inline-flex" target="_blank" rel="noreferrer">
              Открыть файл
            </a>
          )}
          <p className="mt-3 text-xs text-slate-500">
            Контент защищён от свободного распространения: доступ привязан к
            аккаунту, PDF получают водяной знак.
          </p>
        </div>
      )}
    </div>
  );
}
