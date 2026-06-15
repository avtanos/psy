"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Не удалось войти");
      return;
    }
    const next = params.get("next") ?? "/";
    router.push(next);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-semibold text-slate-800">Вход</h1>
      <p className="mt-1 text-sm text-slate-600">
        Войдите по e-mail или номеру телефона.
      </p>
      <form onSubmit={onSubmit} className="card mt-6 space-y-4">
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
            required
          />
        </div>
        {error && <div className="text-sm text-rose-600">{error}</div>}
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? "Входим..." : "Войти"}
        </button>
        <div className="text-sm text-slate-600">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-brand font-medium">
            Регистрация
          </Link>
        </div>
      </form>
    </div>
  );
}
