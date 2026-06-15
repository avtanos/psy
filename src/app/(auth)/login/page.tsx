"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold text-slate-800">Вход</h1>
      <p className="mt-1 text-sm text-slate-600">
        Войдите по e-mail или номеру телефона.
      </p>
      <div className="card mt-6 space-y-4">
        <div className="rounded-md bg-brand-50 border border-brand-100 px-3 py-2 text-sm text-brand-700">
          Демо-версия. Авторизация недоступна — используйте навигацию для просмотра всех страниц.
        </div>
        <div>
          <label className="label">E-mail или телефон</label>
          <input
            className="input"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="you@example.com или +996 700 123 456"
          />
        </div>
        <div>
          <label className="label">Пароль</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn-primary w-full opacity-60 cursor-not-allowed">
          Войти (демо)
        </button>
        <div className="text-sm text-slate-600">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-brand font-medium">
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}
