import "server-only";

import { cookies } from "next/headers";

import { apiConfig } from "@/shared/config/api.config";

import {
  ApiError,
  normalizeBackendMessage,
  unwrapEnvelope,
  type BackendEnvelope,
} from "./envelope";

/**
 * Server-side fetch helper for React Server Components and Server Actions.
 *
 * The browser `HttpClient` (axios + cookie session) cannot run server-side, so
 * public reads and SSR auth use this helper. It attaches the bearer token from
 * the HTTP-only session cookie when `auth: true`, unwraps the backend envelope,
 * and throws a typed `ApiError` carrying the HTTP status.
 */

const ACCESS_TOKEN_COOKIE = "fe_access_token";

export interface ServerRequestOptions {
  method?: "GET" | "POST";
  body?: unknown;
  /** Attach the bearer token from the session cookie (for protected reads). */
  auth?: boolean;
  /** ISR window in seconds, or `false` for always-dynamic (`no-store`). Default dynamic. */
  revalidate?: number | false;
  tags?: string[];
}

async function buildHeaders(auth: boolean): Promise<Record<string, string>> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (auth) {
    const store = await cookies();
    const token = store.get(ACCESS_TOKEN_COOKIE)?.value;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

export async function serverApiRequest<T>(
  path: string,
  options: ServerRequestOptions = {}
): Promise<T> {
  const { method = "GET", body, auth = false, revalidate, tags } = options;
  const url = `${apiConfig.baseUrl}${path}`;

  const cacheConfig =
    typeof revalidate === "number"
      ? { next: { revalidate, tags } }
      : { cache: "no-store" as const };

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers: await buildHeaders(auth),
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...cacheConfig,
    });
  } catch {
    throw new ApiError(`Could not reach the API (${path}).`, 0);
  }

  const json = (await response
    .json()
    .catch(() => undefined)) as BackendEnvelope<T> | undefined;

  if (!response.ok) {
    throw new ApiError(
      normalizeBackendMessage(json?.message, `Request to ${path} failed.`),
      response.status
    );
  }

  return unwrapEnvelope<T>(json ?? {}, `Empty response from ${path}.`);
}
