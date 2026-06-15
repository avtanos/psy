import { prisma } from "./prisma";
import type { Prisma } from "@prisma/client";

export const TOPICS: { slug: string; label: string }[] = [
  { slug: "anxiety", label: "Тревога и стресс" },
  { slug: "depression", label: "Депрессия" },
  { slug: "relationships", label: "Отношения" },
  { slug: "family", label: "Семья и дети" },
  { slug: "self-esteem", label: "Самооценка" },
  { slug: "trauma", label: "Травма и ПТСР" },
  { slug: "addiction", label: "Зависимости" },
  { slug: "career", label: "Карьера и выгорание" },
  { slug: "grief", label: "Утрата и горе" },
];

export const METHODS: { slug: string; label: string }[] = [
  { slug: "cbt", label: "КПТ" },
  { slug: "gestalt", label: "Гештальт" },
  { slug: "psychoanalysis", label: "Психоанализ" },
  { slug: "schema-therapy", label: "Схема-терапия" },
  { slug: "humanistic", label: "Гуманистический подход" },
  { slug: "act", label: "ACT (терапия принятия)" },
  { slug: "emdr", label: "EMDR" },
];

export const LANGUAGES: { code: string; label: string }[] = [
  { code: "ru", label: "Русский" },
  { code: "ky", label: "Кыргызча" },
  { code: "en", label: "English" },
];

export type CatalogFilters = {
  topic?: string;
  method?: string;
  language?: string;
  priceMax?: number;
  format?: "video" | "chat";
  sort?: "rating" | "price_asc" | "price_desc" | "experience";
  q?: string;
};

export async function searchPsychologists(filters: CatalogFilters, take = 24, skip = 0) {
  const where: Prisma.PsychologistProfileWhereInput = {
    verification: "VERIFIED",
    user: { status: { not: "BLOCKED" } },
  };

  // В SQLite-dev массивы хранятся как JSON-строки. Поиск по подстроке "value"
  // достаточно точен, т.к. слаги (anxiety, cbt, video) не содержат кавычек.
  if (filters.topic) where.topics = { contains: `"${filters.topic}"` };
  if (filters.method) where.methods = { contains: `"${filters.method}"` };
  if (filters.language) where.languages = { contains: `"${filters.language}"` };
  if (filters.format) where.format = { contains: `"${filters.format}"` };
  if (typeof filters.priceMax === "number" && filters.priceMax > 0) {
    where.pricePerSession = { lte: filters.priceMax };
  }
  if (filters.q) {
    where.OR = [
      { bio: { contains: filters.q } },
      { approach: { contains: filters.q } },
      { user: { displayName: { contains: filters.q } } },
    ];
  }

  const orderBy: Prisma.PsychologistProfileOrderByWithRelationInput[] = (() => {
    switch (filters.sort) {
      case "price_asc": return [{ pricePerSession: "asc" }];
      case "price_desc": return [{ pricePerSession: "desc" }];
      case "experience": return [{ experienceYears: "desc" }];
      case "rating":
      default:
        return [{ rating: "desc" }, { reviewsCount: "desc" }];
    }
  })();

  const [items, total] = await Promise.all([
    prisma.psychologistProfile.findMany({
      where,
      orderBy,
      take,
      skip,
      include: { user: { select: { displayName: true } } },
    }),
    prisma.psychologistProfile.count({ where }),
  ]);
  return { items, total };
}
