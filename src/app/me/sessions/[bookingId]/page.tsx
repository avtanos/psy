import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { JoinRoom } from "@/components/join-room";
import { RecordingConsent } from "@/components/recording-consent";
import { PrivateNoteEditor } from "@/components/private-note-editor";

export default async function SessionPage({
  params,
}: {
  params: { bookingId: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=/me/sessions/${params.bookingId}`);

  const booking = await prisma.booking.findUnique({
    where: { id: params.bookingId },
    include: {
      psychologist: { include: { user: true } },
      session: { include: { notes: true } },
      client: { select: { id: true, displayName: true } },
    },
  });
  if (!booking) notFound();

  const isClient = booking.clientId === user.id;
  const isPsych =
    user.role === "PSYCHOLOGIST" && booking.psychologist.userId === user.id;
  if (!isClient && !isPsych) redirect("/");

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:py-8 space-y-4 md:space-y-5">
      <div className="card">
        <h1 className="text-lg md:text-xl font-semibold text-slate-800">Сессия</h1>
        <p className="text-sm text-slate-600">
          {new Date(booking.startAt).toLocaleString("ru-RU")} ·{" "}
          {isClient
            ? `Психолог: ${booking.psychologist.user.displayName}`
            : `Клиент: ${booking.client.displayName}`}{" "}
          · Статус: {booking.status}
        </p>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Видеосвязь</h2>
        <p className="mt-1 text-sm text-slate-600">
          Кнопка ниже создаст для вас защищённую комнату. Ссылка доступна только
          участникам сессии.
        </p>
        <div className="mt-3">
          <JoinRoom bookingId={booking.id} />
        </div>
      </div>

      <div className="card">
        <h2 className="font-medium text-slate-800">Запись сессии</h2>
        <p className="mt-1 text-sm text-slate-600">
          По умолчанию запись выключена. Включить запись можно только при
          согласии обеих сторон.
        </p>
        <RecordingConsent
          bookingId={booking.id}
          isClient={isClient}
          clientConsent={booking.session?.recordingAllowedByClient ?? false}
          psychConsent={booking.session?.recordingAllowedByPsychologist ?? false}
        />
      </div>

      {isPsych && (
        <div className="card">
          <h2 className="font-medium text-slate-800">Приватные заметки</h2>
          <p className="mt-1 text-sm text-slate-600">
            Заметки видны только вам. Содержимое шифруется на сервере (AES-256-GCM).
          </p>
          <PrivateNoteEditor bookingId={booking.id} hasNote={Boolean(booking.session?.notes)} />
        </div>
      )}
    </div>
  );
}
