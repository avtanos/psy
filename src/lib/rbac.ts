import type { Role } from "./enums";

export const ROLE_LABELS: Record<Role, string> = {
  CLIENT: "Клиент",
  PSYCHOLOGIST: "Психолог",
  ADMIN: "Администратор",
  CONTENT_MANAGER: "Контент-менеджер",
};

export function canModerate(role: Role): boolean {
  return role === "ADMIN" || role === "CONTENT_MANAGER";
}

export function canManagePsychologists(role: Role): boolean {
  return role === "ADMIN";
}

export function canSeePsychologistDashboard(role: Role): boolean {
  return role === "PSYCHOLOGIST";
}

export function canSeeAdminPanel(role: Role): boolean {
  return role === "ADMIN" || role === "CONTENT_MANAGER";
}
