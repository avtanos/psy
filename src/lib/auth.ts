import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { env } from "./env";
import type { User } from "@prisma/client";
import type { Role } from "./enums";

const secret = new TextEncoder().encode(env.authSecret);

export type SessionPayload = {
  sub: string;
  role: Role;
  email?: string | null;
  phone?: string | null;
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${env.sessionTtlHours}h`)
    .sign(secret);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  cookies().set({
    name: env.authCookieName,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: env.sessionTtlHours * 3600,
  });
}

export async function clearSessionCookie() {
  cookies().set({
    name: env.authCookieName,
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const token = cookies().get(env.authCookieName)?.value;
  if (!token) return null;
  const payload = await verifySession(token);
  if (!payload) return null;
  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user || user.status === "BLOCKED") return null;
  return user;
}

// Для API-роутов: бросает ошибку со status, которую обработчик превращает в JSON.
export async function requireUser(roles?: Role[]): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    const e = new Error("UNAUTHENTICATED");
    (e as Error & { status: number }).status = 401;
    throw e;
  }
  if (roles && !roles.includes(user.role as Role)) {
    const e = new Error("FORBIDDEN");
    (e as Error & { status: number }).status = 403;
    throw e;
  }
  return user;
}

// Для серверных страниц и server actions: вместо необработанного исключения
// делает redirect. Это корректно отрабатывает в т.ч. «протухшую» cookie-сессию
// (например, после пересоздания БД), когда JWT валиден, но пользователя уже нет.
export async function requireUserPage(roles?: Role[]): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  if (roles && !roles.includes(user.role as Role)) {
    redirect("/");
  }
  return user;
}

export function isValidPhoneKG(input: string): boolean {
  const clean = input.replace(/\s+/g, "");
  // КР: +996XXXXXXXXX (12 знаков с плюсом) или 0XXXXXXXXX (10 знаков)
  return /^\+996\d{9}$/.test(clean) || /^0\d{9}$/.test(clean);
}

export function normalizePhoneKG(input: string): string {
  const clean = input.replace(/\s+/g, "");
  if (clean.startsWith("0")) return "+996" + clean.slice(1);
  return clean;
}
