"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Role = "CLIENT" | "PSYCHOLOGIST";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("CLIENT");
  const [displayName, setDisplayName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!consent) {
      setError("Необходимо согласие на обработку персональных данных.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, identifier, password, role }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Не удалось зарегистрироваться");
      return;
    }
    const next = role === "PSYCHOLOGIST" ? "/psychologist/onboarding" : "/me";
    router.push(next);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold text-slate-800">Регистрация</h1>
      <p className="mt-1 text-sm text-slate-600">
        Создайте аккаунт по e-mail или номеру телефона.
      </p>

      <div className="card mt-6">
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

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">Имя или псевдоним</label>
            <input
              className="input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">E-mail или телефон</label>
            <input
              className="input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@example.com или +996 700 123 456"
              required
            />
          </div>
          <div>
            <label className="label">Пароль</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
            <p className="mt-1 text-xs text-slate-500">Минимум 8 символов.</p>
          </div>
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1"
            />
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
          {error && <div className="text-sm text-rose-600">{error}</div>}
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? "Создаём аккаунт..." : "Создать аккаунт"}
          </button>
          <div className="text-sm text-slate-600">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-brand font-medium">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
