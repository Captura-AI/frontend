import { type HttpClient } from "@/infrastructure/api/HttpClient";
import { type SessionStore } from "@/infrastructure/session/SessionCookieStore";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthRepository {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  isAuthenticated: () => boolean;
}

export function createAuthRepository(
  http: HttpClient,
  session: SessionStore
): AuthRepository {
  async function login(credentials: LoginCredentials): Promise<void> {
    const tokens = await http.post<AuthTokens>("/auth/login", credentials);
    session.saveSession(tokens.accessToken, tokens.refreshToken);
  }

  async function logout(): Promise<void> {
    try {
      await http.post("/auth/logout");
    } finally {
      session.clearSession();
    }
  }

  async function refreshSession(): Promise<void> {
    const refreshToken = session.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available. User must log in again.");
    }
    const tokens = await http.post<AuthTokens>("/auth/refresh", { refreshToken });
    session.saveSession(tokens.accessToken, tokens.refreshToken);
  }

  function isAuthenticated(): boolean {
    return session.isAuthenticated();
  }

  return { login, logout, refreshSession, isAuthenticated };
}

