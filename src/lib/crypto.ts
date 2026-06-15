import crypto from "node:crypto";
import { env } from "./env";

function getKey(): Buffer {
  const raw = env.notesKeyHex;
  // допускаем hex (64 символа) или base64 (44 символа)
  if (/^[0-9a-fA-F]{64}$/.test(raw)) return Buffer.from(raw, "hex");
  const buf = Buffer.from(raw, "base64");
  if (buf.length === 32) return buf;
  throw new Error("NOTES_ENCRYPTION_KEY must be 32 bytes (hex64 or base64).");
}

export type EncryptedBlob = {
  iv: string;
  authTag: string;
  encryptedContent: string;
};

export function encryptNote(plain: string): EncryptedBlob {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    iv: iv.toString("base64"),
    authTag: tag.toString("base64"),
    encryptedContent: enc.toString("base64"),
  };
}

export function decryptNote(blob: EncryptedBlob): string {
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    getKey(),
    Buffer.from(blob.iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(blob.authTag, "base64"));
  const dec = Buffer.concat([
    decipher.update(Buffer.from(blob.encryptedContent, "base64")),
    decipher.final(),
  ]);
  return dec.toString("utf8");
}

export function sha256(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}
