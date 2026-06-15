import crypto from "node:crypto";
import { env } from "../env";

// Адаптер Freedom Pay / PayBox (КР). Соответствует п.4.1 ТЗ — лицензированный
// провайдер с поддержкой сплитования платежей. Интерфейс PaymentProvider
// абстрактный — можно заменить провайдера, не меняя бизнес-логики.

export type InitPaymentInput = {
  paymentId: string;
  amount: number;           // тыйыны
  description: string;
  successUrl: string;
  failureUrl: string;
  userEmail?: string | null;
  userPhone?: string | null;
  split?: { merchantId: string; amount: number }; // куда уходит доля психолога
};

export interface PaymentProvider {
  initPayment(input: InitPaymentInput): Promise<{ redirectUrl: string; providerRef: string }>;
  parseWebhook(payload: unknown, headers: Record<string, string>): {
    paymentId: string;
    providerRef: string;
    status: "PAID" | "FAILED";
    paidAmount?: number;
  };
}

function pgSig(params: Record<string, string>, script: string, secret: string): string {
  const keys = Object.keys(params).sort();
  const arr = [script, ...keys.map((k) => params[k]), secret];
  return crypto.createHash("md5").update(arr.join(";")).digest("hex");
}

class FreedomPayProvider implements PaymentProvider {
  async initPayment(input: InitPaymentInput) {
    if (!env.freedompay.merchantId || !env.freedompay.secret) {
      // dev-режим: имитируем редирект на внутреннюю стабовую страницу
      return {
        redirectUrl: `/payments/dev?paymentId=${input.paymentId}`,
        providerRef: `dev-${input.paymentId}`,
      };
    }
    const salt = crypto.randomBytes(8).toString("hex");
    const params: Record<string, string> = {
      pg_merchant_id: env.freedompay.merchantId,
      pg_order_id: input.paymentId,
      pg_amount: (input.amount / 100).toFixed(2),
      pg_description: input.description,
      pg_currency: "KGS",
      pg_salt: salt,
      pg_success_url: input.successUrl,
      pg_failure_url: input.failureUrl,
      pg_result_url: env.freedompay.resultUrl,
      pg_request_method: "POST",
    };
    if (input.userEmail) params.pg_user_contact_email = input.userEmail;
    if (input.userPhone) params.pg_user_phone = input.userPhone.replace(/\D/g, "");
    if (input.split) {
      params.pg_split_merchant_id = input.split.merchantId;
      params.pg_split_amount = (input.split.amount / 100).toFixed(2);
    }
    params.pg_sig = pgSig(params, "init_payment.php", env.freedompay.secret);

    const res = await fetch(`${env.freedompay.apiUrl}/init_payment.php`, {
      method: "POST",
      body: new URLSearchParams(params),
    });
    const text = await res.text();
    // Freedom Pay отвечает XML; для простоты примера парсим через regex
    const url = /<pg_redirect_url>([^<]+)<\/pg_redirect_url>/.exec(text)?.[1];
    const ref = /<pg_payment_id>([^<]+)<\/pg_payment_id>/.exec(text)?.[1] ?? "";
    if (!url) throw new Error("FreedomPay: no redirect url. Response: " + text);
    return { redirectUrl: url, providerRef: ref };
  }

  parseWebhook(payload: unknown) {
    const p = payload as Record<string, string>;
    return {
      paymentId: p.pg_order_id,
      providerRef: p.pg_payment_id ?? "",
      status: p.pg_result === "1" ? ("PAID" as const) : ("FAILED" as const),
      paidAmount: p.pg_amount ? Math.round(Number(p.pg_amount) * 100) : undefined,
    };
  }
}

export const paymentProvider: PaymentProvider = new FreedomPayProvider();
