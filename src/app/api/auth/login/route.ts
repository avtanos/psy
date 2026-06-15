import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  isValidPhoneKG,
  normalizePhoneKG,
  setSessionCookie,
  signSession,
  verifyPassword,
} from "@/lib/auth";

const Body = z.object({
  identifier: z.string().min(3),
  password: z.string().min(1),
});

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  let body;
  try {
    body = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Неверные данные" }, { status: 400 });
  }

  let where;
  if (isEmail(body.identifier)) {
    where = { email: body.identifier.toLowerCase() };
  } else if (isValidPhoneKG(body.identifier)) {
    where = { phone: normalizePhoneKG(body.identifier) };
  } else {
    return NextResponse.json({ error: "Введите e-mail или телефон" }, { status: 400 });
  }

  const user = await prisma.user.findFirst({ where });
  if (!user) {
    return NextResponse.json({ error: "Неверные учётные данные" }, { status: 401 });
  }
  if (user.status === "BLOCKED") {
    return NextResponse.json({ error: "Аккаунт заблокирован" }, { status: 403 });
  }

  const ok = await verifyPassword(body.password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Неверные учётные данные" }, { status: 401 });
  }

  const token = await signSession({
    sub: user.id,
    role: user.role as never,
    email: user.email,
    phone: user.phone,
  });
  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}
