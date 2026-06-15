// Union-типы вместо Prisma enum (нужно для совместимости с SQLite dev-режимом).
// В production-режиме (PostgreSQL) эти типы соответствуют настоящим enum.

export type Role = "CLIENT" | "PSYCHOLOGIST" | "ADMIN" | "CONTENT_MANAGER";
export type UserStatus = "ACTIVE" | "PENDING_VERIFICATION" | "BLOCKED";

export type PsychVerificationStatus = "DRAFT" | "PENDING" | "VERIFIED" | "REJECTED";
export type SourceType = "IN_HOUSE" | "EXTERNAL";

export type BookingStatus =
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED_BY_CLIENT"
  | "CANCELLED_BY_PSYCHOLOGIST"
  | "NO_SHOW_CLIENT"
  | "NO_SHOW_PSYCHOLOGIST"
  | "REFUNDED";

export type BookingFormat = "VIDEO" | "CHAT";

export type PaymentStatus = "CREATED" | "PAID" | "FAILED" | "REFUNDED" | "PARTIAL_REFUND";
export type PaymentMethod = "CARD" | "MBANK" | "ELKART" | "OMONEY" | "OTHER";
export type PaymentPurpose = "SESSION" | "PACKAGE" | "MATERIAL" | "COURSE" | "SUBSCRIPTION";

export type PayoutStatus = "REQUESTED" | "PROCESSING" | "COMPLETED" | "REJECTED";

export type MaterialKind = "ARTICLE" | "PDF" | "AUDIO" | "VIDEO" | "TEST" | "WORKBOOK";

export type NotificationChannel = "EMAIL" | "SMS" | "PUSH" | "INAPP";

export type DisputeStatus =
  | "OPEN"
  | "IN_REVIEW"
  | "RESOLVED_CLIENT"
  | "RESOLVED_PSYCHOLOGIST"
  | "CLOSED";
