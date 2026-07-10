import { type BackendUser } from "@/shared/types/common";

/** Resolves the public display name for a photographer from their backend user record. */
export function toPhotographerName(user: BackendUser): string {
  return (
    user.photographerProfile?.artistName ??
    user.name ??
    user.username ??
    "Fotografer Captura"
  );
}

/** Builds a `@handle` slug for a photographer from their backend user record. */
export function toPhotographerHandle(user: BackendUser): string {
  const base = user.username ?? user.name ?? "photographer";

  return `@${base.toLowerCase().replace(/\s+/g, ".")}`;
}
