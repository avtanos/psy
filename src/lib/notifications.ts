import { prisma } from "./prisma";
import { env } from "./env";
import type { NotificationChannel } from "./enums";

// Слой уведомлений: в проде подменяется на реальные адаптеры
// (SMS-провайдер КР, SMTP, push-сервис). Интеграция вынесена за интерфейс,
// чтобы можно было поменять провайдера согласно п.7 ТЗ ("абстрагировать
// интеграции слоем, допускающим замену провайдера").

export type NotificationTemplate =
  | "auth_code_email"
  | "auth_code_sms"
  | "booking_confirmed"
  | "booking_reminder_24h"
  | "booking_reminder_1h"
  | "booking_cancelled"
  | "payment_received"
  | "payout_processed"
  | "new_material"
  | "review_received"
  | "psychologist_verified";

export type NotifyInput = {
  userId: string;
  channel: NotificationChannel;
  template: NotificationTemplate;
  title: string;
  body: string;
  payload?: Record<string, unknown>;
};

export async function notify(input: NotifyInput) {
  const created = await prisma.notification.create({
    data: {
      userId: input.userId,
      channel: input.channel,
      template: input.template,
      title: input.title,
      body: input.body,
      payload: input.payload ? JSON.stringify(input.payload) : null,
    },
  });

  try {
    if (input.channel === "EMAIL") await sendEmail(input.userId, input);
    if (input.channel === "SMS") await sendSms(input.userId, input);
    if (input.channel === "PUSH") await sendPush(input.userId, input);

    await prisma.notification.update({
      where: { id: created.id },
      data: { sentAt: new Date() },
    });
  } catch (err) {
    console.error("[notify] delivery failed:", err);
  }

  return created;
}

async function sendEmail(userId: string, n: NotifyInput) {
  if (!env.smtp.host) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[email→${userId}] ${n.title}: ${n.body}`);
    }
    return;
  }
  // TODO: интеграция nodemailer / SMTP-провайдера
}

async function sendSms(userId: string, n: NotifyInput) {
  if (!env.sms.url || !env.sms.token) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[sms→${userId}] ${n.body}`);
    }
    return;
  }
  // TODO: интеграция SMS-провайдера КР
}

async function sendPush(userId: string, n: NotifyInput) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[push→${userId}] ${n.title}: ${n.body}`);
  }
  // TODO: web/mobile push
}
