"use client";

import { useState } from "react";
import Link from "next/link";

type Role = "CLIENT" | "PSYCHOLOGIST";

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("CLIENT");

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold text-slate-800">Регистрация</h1>
      <p className="mt-1 text-sm text-slate-600">
        Создайте аккаунт по e-mail или номеру телефона.
      </p>

      <div className="card mt-6">
        <div className="rounded-md bg-brand-50 border border-brand-100 px-3 py-2 text-sm text-brand-700 mb-4">
          Демо-версия. Регистрация недоступна — используйте навигацию для просмотра всех страниц.
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
            Я клиент
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
            Я психолог
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">Имя или псевдоним</label>
            <input className="input" />
          </div>
          <div>
            <label className="label">E-mail или телефон</label>
            <input className="input" placeholder="you@example.com или +996 700 123 456" />
          </div>
          <div>
            <label className="label">Пароль</label>
            <input className="input" type="password" />
            <p className="mt-1 text-xs text-slate-500">Минимум 8 символов.</p>
          </div>
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input type="checkbox" className="mt-1" />
            <span>
              Я ознакомлен(а) с{" "}
              <Link href="/legal/terms" className="text-brand underline">офертой</Link>,{" "}
              <Link href="/legal/privacy" className="text-brand underline">политикой
              конфиденциальности</Link> и даю{" "}
              <Link href="/legal/consent" className="text-brand underline">согласие
              на обработку персональных данных</Link> в соответствии с Цифровым
              кодексом КР.
            </span>
          </label>
          <button className="btn-primary w-full opacity-60 cursor-not-allowed">
            Создать аккаунт (демо)
          </button>
          <div className="text-sm text-slate-600">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-brand font-medium">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
