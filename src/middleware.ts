import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-please-change-32bytes-min!!"
);
const cookieName = process.env.AUTH_COOKIE_NAME || "psych_session";

type Payload = { sub: string; role: string };

async function readSession(req: NextRequest): Promise<Payload | null> {
  const token = req.cookies.get(cookieName)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as Payload;
  } catch {
    return null;
  }
}

const matchers: Array<{ pattern: RegExp; roles: string[] }> = [
  { pattern: /^\/me(\/|$)/, roles: ["CLIENT", "PSYCHOLOGIST", "ADMIN", "CONTENT_MANAGER"] },
  { pattern: /^\/psychologist(\/|$)/, roles: ["PSYCHOLOGIST"] },
  { pattern: /^\/admin(\/|$)/, roles: ["ADMIN", "CONTENT_MANAGER"] },
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const rule = matchers.find((m) => m.pattern.test(pathname));
  if (!rule) return NextResponse.next();

  const session = await readSession(req);
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  if (!rule.roles.includes(session.role)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/me/:path*", "/psychologist/:path*", "/admin/:path*"],
};
