// Утилиты для полей-массивов, которые в dev-режиме хранятся как JSON-строки в SQLite.
// В production-режиме (PostgreSQL) поля имели бы тип String[] и эти функции стали бы no-op.

export function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const v = JSON.parse(value);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

export function stringifyList(value: string[] | undefined | null): string {
  return JSON.stringify(value ?? []);
}
