import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  hashPassword,
  signSession,
  setSessionCookie,
  isValidPhoneKG,
  normalizePhoneKG,
} from "@/lib/auth";

const Body = z.object({
  displayName: z.string().min(2).max(80),
  identifier: z.string().min(3),
  password: z.string().min(8),
  role: z.enum(["CLIENT", "PSYCHOLOGIST"]).default("CLIENT"),
});

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  let body;
  try {
    body = Body.parse(await req.json());
  } catch (err) {
    return NextResponse.json({ error: "Неверные данные формы" }, { status: 400 });
  }

  let email: string | null = null;
  let phone: string | null = null;

  if (isEmail(body.identifier)) {
    email = body.identifier.toLowerCase();
  } else if (isValidPhoneKG(body.identifier)) {
    phone = normalizePhoneKG(body.identifier);
  } else {
    return NextResponse.json(
      { error: "Введите корректный e-mail или номер телефона КР (+996…)." },
      { status: 400 }
    );
  }

  const exists = await prisma.user.findFirst({
    where: {
      OR: [
        email ? { email } : { id: "__none__" },
        phone ? { phone } : { id: "__none__" },
      ],
    },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Пользователь с такими контактами уже зарегистрирован." },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(body.password);

  const user = await prisma.user.create({
    data: {
      email,
      phone,
      passwordHash,
      role: body.role,
      displayName: body.displayName,
      status: body.role === "PSYCHOLOGIST" ? "PENDING_VERIFICATION" : "ACTIVE",
      consents: {
        create: [
          { type: "terms", version: "1.0" },
          { type: "privacy", version: "1.0" },
          { type: "data_processing", version: "1.0" },
        ],
      },
      client: body.role === "CLIENT" ? { create: {} } : undefined,
      psychologist:
        body.role === "PSYCHOLOGIST"
          ? {
              create: {
                source: "EXTERNAL",
                pricePerSession: 150000, // 1500 сом по умолчанию
                languages: JSON.stringify(["ru"]),
                topics: JSON.stringify([]),
                methods: JSON.stringify([]),
                format: JSON.stringify(["video"]),
                wallet: { create: {} },
              },
            }
          : undefined,
    },
  });

  const token = await signSession({
    sub: user.id,
    role: user.role as never,
    email: user.email,
    phone: user.phone,
  });
  await setSessionCookie(token);

  return NextResponse.json({ ok: true, userId: user.id });
}
