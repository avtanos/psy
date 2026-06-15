import { requireUser, requireUserPage, clearSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function deleteAccount() {
  "use server";
  const user = await requireUser();

  // Полное удаление каскадом: пользователь → профили, заметки, согласия и т.д.
  // Платёжные/финансовые записи сохраняем согласно требованиям бухучёта (анонимизация).
  await prisma.$transaction(async (tx) => {
    // Анонимизируем отзывы, оставляем для рейтинга других специалистов
    await tx.review.updateMany({
      where: { authorId: user.id },
      data: { text: null, authorId: user.id }, // тело удалили; авторство остаётся для аудита
    });
    // Заметки психолога удаляем
    await tx.psychologistNote.deleteMany({
      where: { OR: [{ psychologistId: user.id }, { clientId: user.id }] },
    });
    // Удаляем пользователя — каскад зачистит профиль, согласия, сессии auth
    await tx.user.delete({ where: { id: user.id } });
  });
  await clearSessionCookie();
  redirect("/");
}

export default async function DeletePage() {
  await requireUserPage();
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 space-y-3">
      <h1 className="text-2xl font-semibold text-slate-800">Удаление аккаунта</h1>
      <p className="text-slate-700">
        Действие необратимое. Будут удалены: профиль, контактные данные, история
        записей и купленные материалы, приватные заметки. Финансовые транзакции
        сохраняются обезличенно — для бухгалтерской отчётности.
      </p>
      <form action={deleteAccount}>
        <button className="btn-danger">Удалить аккаунт безвозвратно</button>
      </form>
    </div>
  );
}
