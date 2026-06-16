// Префикс basePath для статических ассетов из public/.
// next/image при output:export + unoptimized НЕ добавляет basePath к public-ассетам,
// поэтому добавляем его вручную (и в dev, и в prod basePath = /psy).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${p}`;
}
