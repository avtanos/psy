import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { decryptNote, encryptNote } from "@/lib/crypto";

// Заметки доступны ИСКЛЮЧИТЕЛЬНО автору (психологу). ТЗ п.2.7.

async function ensurePsychologistOwner(bookingId: string, userId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { psychologist: true, session: true },
  });
  if (!booking) return { error: "Не найдено", status: 404 as const };
  if (booking.psychologist.userId !== userId) {
    return { error: "Нет доступа", status: 403 as const };
  }
  return { booking };
}

export async function GET(
  _req: Request,
  { params }: { params: { bookingId: string } }
) {
  try {
    const user = await requireUser(["PSYCHOLOGIST"]);
    const res = await ensurePsychologistOwner(params.bookingId, user.id);
    if ("error" in res) return NextResponse.json({ error: res.error }, { status: res.status });

    const session = res.booking.session;
    if (!session) return NextResponse.json({ content: "" });
    const note = await prisma.psychologistNote.findUnique({
      where: { sessionId: session.id },
    });
    if (!note) return NextResponse.json({ content: "" });

    const plain = decryptNote({
      iv: note.iv,
      authTag: note.authTag,
      encryptedContent: note.encryptedContent,
    });
    return NextResponse.json({ content: plain, updatedAt: note.updatedAt });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 500;
    return NextResponse.json({ error: "Ошибка" }, { status });
  }
}

const Body = z.object({ content: z.string().max(50_000) });

export async function PUT(
  req: Request,
  { params }: { params: { bookingId: string } }
) {
  try {
    const user = await requireUser(["PSYCHOLOGIST"]);
    const res = await ensurePsychologistOwner(params.bookingId, user.id);
    if ("error" in res) return NextResponse.json({ error: res.error }, { status: res.status });
    const { content } = Body.parse(await req.json());

    let session = res.booking.session;
    if (!session) {
      session = await prisma.session.create({
        data: { bookingId: res.booking.id },
      });
    }

    const enc = encryptNote(content);
    await prisma.psychologistNote.upsert({
      where: { sessionId: session.id },
      update: {
        encryptedContent: enc.encryptedContent,
        iv: enc.iv,
        authTag: enc.authTag,
      },
      create: {
        sessionId: session.id,
        psychologistId: res.booking.psychologistId,
        clientId: res.booking.clientId,
        encryptedContent: enc.encryptedContent,
        iv: enc.iv,
        authTag: enc.authTag,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const status = (err as { status?: number }).status ?? 500;
    return NextResponse.json({ error: "Ошибка" }, { status });
  }
}
