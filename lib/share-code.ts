import { randomBytes } from "node:crypto";

/** Generates a short, URL-safe share code for public game links. */
export function generateShareCode(): string {
  return randomBytes(8).toString("base64url").slice(0, 10);
}
