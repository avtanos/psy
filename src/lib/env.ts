function required(name: string, fallback?: string): string {
  const v = process.env[name];
  if (v && v.length) return v;
  if (fallback !== undefined) return fallback;
  if (process.env.NODE_ENV === "production") {
    throw new Error(`Missing required env: ${name}`);
  }
  return "";
}

export const env = {
  appUrl: required("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  authSecret: required("AUTH_SECRET", "dev-secret-please-change-32bytes-min!!"),
  authCookieName: required("AUTH_COOKIE_NAME", "psych_session"),
  sessionTtlHours: Number(process.env.SESSION_TTL_HOURS ?? 24),
  notesKeyHex: required(
    "NOTES_ENCRYPTION_KEY",
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
  ),
  defaultCommissionPercent: Number(process.env.DEFAULT_COMMISSION_PERCENT ?? 20),
  noShowHoldPercent: Number(process.env.NO_SHOW_HOLD_PERCENT ?? 50),

  sms: {
    url: process.env.SMS_PROVIDER_URL ?? "",
    token: process.env.SMS_PROVIDER_TOKEN ?? "",
    sender: process.env.SMS_SENDER_NAME ?? "PsychKG",
  },
  smtp: {
    host: process.env.SMTP_HOST ?? "",
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER ?? "",
    password: process.env.SMTP_PASSWORD ?? "",
    from: process.env.SMTP_FROM ?? "no-reply@psych.kg",
  },
  daily: {
    apiKey: process.env.DAILY_API_KEY ?? "",
    domain: process.env.DAILY_DOMAIN ?? "",
  },
  freedompay: {
    merchantId: process.env.FREEDOMPAY_MERCHANT_ID ?? "",
    secret: process.env.FREEDOMPAY_SECRET_KEY ?? "",
    apiUrl: process.env.FREEDOMPAY_API_URL ?? "https://api.freedompay.kg",
    resultUrl: process.env.FREEDOMPAY_RESULT_URL ?? "",
  },
  s3: {
    endpoint: process.env.S3_ENDPOINT ?? "",
    region: process.env.S3_REGION ?? "us-east-1",
    bucket: process.env.S3_BUCKET ?? "psych-media",
    accessKey: process.env.S3_ACCESS_KEY ?? "",
    secretKey: process.env.S3_SECRET_KEY ?? "",
  },
};
