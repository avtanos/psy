"use client";

import { useState } from "react";
import Link from "next/link";
import { useT } from "@/components/lang-provider";

type Role = "CLIENT" | "PSYCHOLOGIST";

export default function RegisterPage() {
  const t = useT();
  const [role, setRole] = useState<Role>("CLIENT");

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold text-slate-800">{t("auth.register.title")}</h1>
      <p className="mt-1 text-sm text-slate-600">{t("auth.register.sub")}</p>

      <div className="card mt-6">
        <div className="rounded-md bg-brand-50 border border-brand-100 px-3 py-2 text-sm text-brand-700 mb-4">
          {t("auth.login.demo")}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRole("CLIENT")}
            className={`rounded-md border px-3 py-2 text-sm ${
              role === "CLIENT"
                ? "border-brand bg-brand text-white"
                : "border-slate-300 bg-white text-slate-700"
            }`}
          >
            {t("auth.register.iClient")}
          </button>
          <button
            type="button"
            onClick={() => setRole("PSYCHOLOGIST")}
            className={`rounded-md border px-3 py-2 text-sm ${
              role === "PSYCHOLOGIST"
                ? "border-brand bg-brand text-white"
                : "border-slate-300 bg-white text-slate-700"
            }`}
          >
            {t("auth.register.iPsy")}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">{t("auth.register.name")}</label>
            <input className="input" />
          </div>
          <div>
            <label className="label">{t("auth.login.idLabel")}</label>
            <input className="input" placeholder={t("auth.login.idPh")} />
          </div>
          <div>
            <label className="label">{t("auth.login.password")}</label>
            <input className="input" type="password" />
            <p className="mt-1 text-xs text-slate-500">{t("auth.register.passNote")}</p>
          </div>
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input type="checkbox" className="mt-1" />
            <span>
              {t("auth.register.consent.pre")}
              <Link href="/legal/terms" className="text-brand underline">{t("auth.register.consent.terms")}</Link>
              {t("auth.register.consent.with")}
              <Link href="/legal/privacy" className="text-brand underline">{t("auth.register.consent.privacy")}</Link>
              {t("auth.register.consent.post")}
              <Link href="/legal/consent" className="text-brand underline">{t("auth.register.consent.giveConsent")}</Link>
              {t("auth.register.consent.end")}
            </span>
          </label>
          <button className="btn-primary w-full opacity-60 cursor-not-allowed">
            {t("auth.register.submit")}
          </button>
          <div className="text-sm text-slate-600">
            {t("auth.register.haveAcc")}{" "}
            <Link href="/login" className="text-brand font-medium">
              {t("auth.register.login")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
