"use client";

import { useState } from "react";
import Link from "next/link";
import { useT } from "@/components/lang-provider";

export default function LoginPage() {
  const t = useT();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold text-slate-800">{t("auth.login.title")}</h1>
      <p className="mt-1 text-sm text-slate-600">{t("auth.login.sub")}</p>
      <div className="card mt-6 space-y-4">
        <div className="rounded-md bg-brand-50 border border-brand-100 px-3 py-2 text-sm text-brand-700">
          {t("auth.login.demo")}
        </div>
        <div>
          <label className="label">{t("auth.login.idLabel")}</label>
          <input
            className="input"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder={t("auth.login.idPh")}
          />
        </div>
        <div>
          <label className="label">{t("auth.login.password")}</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn-primary w-full opacity-60 cursor-not-allowed">
          {t("auth.login.submit")}
        </button>
        <div className="text-sm text-slate-600">
          {t("auth.login.noAcc")}{" "}
          <Link href="/register" className="text-brand font-medium">
            {t("auth.login.register")}
          </Link>
        </div>
      </div>
    </div>
  );
}
