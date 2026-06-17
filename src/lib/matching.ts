// ------------------------------------------------------------------
// Триаж / матчинг «клиент → психолог».
// На входе — ответы анкеты интейка, на выходе — ранжированный список
// специалистов с процентом совпадения и причинами подбора.
//
// В проде gender хранится в PsychologistProfile.gender; здесь — карта по id
// (демо на мок-данных).
// ------------------------------------------------------------------

import { MOCK_PSYCHOLOGISTS } from "./mock-data";
import { parseList } from "./json-list";

export type IntakeAnswers = {
  topic?: string; // slug | "unknown"
  urgency?: "safety" | "soon" | "calm";
  gender?: "any" | "F" | "M";
  language?: string; // "ru" | "ky" | "en" | "any"
  format?: "video" | "chat" | "any";
  method?: string; // slug | "any"
  budget?: number; // тыйыны, 0 = не важно
};

export type ReasonCode = "topic" | "method" | "language" | "gender" | "format" | "budget" | "rating";

export type Match = {
  psy: (typeof MOCK_PSYCHOLOGISTS)[number];
  score: number; // 0..98
  reasons: ReasonCode[];
};

const GENDER: Record<string, "F" | "M"> = {
  "psy-1": "F", "psy-2": "F", "psy-3": "M", "psy-4": "F", "psy-5": "M",
  "psy-6": "F", "psy-7": "M", "psy-8": "F", "psy-9": "M", "psy-10": "M",
};

export function matchPsychologists(a: IntakeAnswers): Match[] {
  return MOCK_PSYCHOLOGISTS.map((p) => {
    const topics = parseList(p.topics);
    const methods = parseList(p.methods);
    const languages = parseList(p.languages);
    const format = parseList(p.format);
    let score = 0;
    const reasons: ReasonCode[] = [];

    // Тема (вес 40) — главный фактор фита
    if (!a.topic || a.topic === "unknown") score += 18;
    else if (topics.includes(a.topic)) { score += 40; reasons.push("topic"); }

    // Метод (15)
    if (!a.method || a.method === "any") score += 8;
    else if (methods.includes(a.method)) { score += 15; reasons.push("method"); }

    // Язык (15) — мягкий фильтр: при несовпадении баллов нет
    if (!a.language || a.language === "any") score += 7;
    else if (languages.includes(a.language)) { score += 15; reasons.push("language"); }

    // Пол специалиста (10)
    if (!a.gender || a.gender === "any") score += 5;
    else if (GENDER[p.id] === a.gender) { score += 10; reasons.push("gender"); }

    // Формат (8)
    if (!a.format || a.format === "any") score += 4;
    else if (format.includes(a.format)) { score += 8; reasons.push("format"); }

    // Бюджет (12)
    if (!a.budget) score += 6;
    else if (p.pricePerSession <= a.budget) { score += 12; reasons.push("budget"); }

    // Рейтинг — тай-брейк (до +10)
    score += Math.min(10, Math.max(0, (p.rating - 4) * 10));
    if (p.rating >= 4.8) reasons.push("rating");

    return { psy: p, score: Math.min(98, Math.round(score)), reasons };
  }).sort((x, y) => y.score - x.score);
}
