const ACCESS_TOKEN_KEY = "fe_access_token";
const REFRESH_TOKEN_KEY = "fe_refresh_token";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const AUTH_SESSION_EVENT = "captura-auth-session-change";
// Fired specifically when a 401 clears the session (token expired/revoked).
// Distinct from AUTH_SESSION_EVENT so listeners can differentiate expiry from logout.
export const AUTH_SESSION_EXPIRED_EVENT = "captura-session-expired";

export interface SessionStore {
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;
  getRefreshToken: () => string | null;
  setRefreshToken: (token: string) => void;
  saveSession: (accessToken: string, refreshToken?: string) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
}

// ─── Cookie helpers (client-side only) ────────────────────────────────────────

function readCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  if (!match) return null;
  const value = match.split("=")[1];
  return value !== undefined ? decodeURIComponent(value) : null;
}

function writeCookie(name: string, value: string, maxAge: number): void {
  const encoded = encodeURIComponent(value);
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encoded}; Max-Age=${maxAge}; Path=/; SameSite=Strict${secure}`;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Strict`;
}

function notifySessionChange(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

/**
 * Creates a session store that persists auth tokens in browser cookies.
 * Falls back to an in-memory map on the server (SSR/RSC) so it is safe
 * to call in any context.
 */
export function createSessionStore(): SessionStore {
  // SSR fallback — per-instance, not shared across requests
  const memory = new Map<string, string>();
  const isClient = (): boolean => typeof document !== "undefined";

  function getAccessToken(): string | null {
    return isClient() ? readCookie(ACCESS_TOKEN_KEY) : (memory.get(ACCESS_TOKEN_KEY) ?? null);
  }

  function setAccessToken(token: string): void {
    if (isClient()) writeCookie(ACCESS_TOKEN_KEY, token, COOKIE_MAX_AGE_SECONDS);
    else memory.set(ACCESS_TOKEN_KEY, token);
  }

  function getRefreshToken(): string | null {
    return isClient() ? readCookie(REFRESH_TOKEN_KEY) : (memory.get(REFRESH_TOKEN_KEY) ?? null);
  }

  function setRefreshToken(token: string): void {
    if (isClient()) writeCookie(REFRESH_TOKEN_KEY, token, COOKIE_MAX_AGE_SECONDS);
    else memory.set(REFRESH_TOKEN_KEY, token);
  }

  function saveSession(accessToken: string, refreshToken?: string): void {
    setAccessToken(accessToken);
    if (refreshToken) setRefreshToken(refreshToken);
    notifySessionChange();
  }

  function clearSession(): void {
    if (isClient()) {
      deleteCookie(ACCESS_TOKEN_KEY);
      deleteCookie(REFRESH_TOKEN_KEY);
      notifySessionChange();
    } else {
      memory.clear();
    }
  }

  function isAuthenticated(): boolean {
    return getAccessToken() !== null;
  }

  return {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    saveSession,
    clearSession,
    isAuthenticated,
  };
}

