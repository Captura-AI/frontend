import { type HttpClient } from "@/infrastructure/api/HttpClient";
import { type SessionStore } from "@/infrastructure/session/SessionCookieStore";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string | null;
  username: string | null;
  name?: string | null;
  avatar?: string | null;
  phoneNumber?: string | null;
  providers?: string[];
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
}

export interface PhoneInitPayload {
  phoneNumber: string;
  countryCode?: string;
}

export interface PhoneVerifyPayload extends PhoneInitPayload {
  otp: string;
}

export interface MagicLinkInitPayload {
  email: string;
}

export interface BackendResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
  result?: T;
}

export interface OAuthProviderStatus {
  available: boolean;
  message?: string;
}

export interface OAuthProvidersStatus {
  apple: OAuthProviderStatus;
  google: OAuthProviderStatus;
}

export interface AuthRepository {
  getOAuthUrl: (provider: "google" | "apple") => string;
  getOAuthProviders: () => Promise<OAuthProvidersStatus>;
  getProfile: () => Promise<AuthUser>;
  initMagicLink: (payload: MagicLinkInitPayload) => Promise<string>;
  initPhoneOtp: (payload: PhoneInitPayload) => Promise<string>;
  login: (credentials: LoginCredentials) => Promise<AuthTokens>;
  logout: () => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<AuthTokens>;
  refreshSession: () => Promise<void>;
  verifyMagicLink: (token: string) => Promise<AuthTokens>;
  verifyPhoneOtp: (payload: PhoneVerifyPayload) => Promise<AuthTokens>;
  isAuthenticated: () => boolean;
}

export function createAuthRepository(
  http: HttpClient,
  session: SessionStore
): AuthRepository {
  function unwrapResponseData<T>(
    response: BackendResponse<T>,
    errorMessage: string
  ): T {
    const payload = response.data ?? response.result;

    if (payload === undefined || payload === null) {
      throw new Error(errorMessage);
    }

    return payload;
  }

  function saveTokens(tokens: AuthTokens): AuthTokens {
    if (!tokens.accessToken) {
      throw new Error("Authentication response did not include an access token.");
    }

    session.saveSession(tokens.accessToken, tokens.refreshToken);
    return tokens;
  }

  async function login(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await http.post<BackendResponse<AuthTokens>>(
      "/authentication/login",
      credentials
    );
    return saveTokens(
      unwrapResponseData(response, "Login response did not include authentication tokens.")
    );
  }

  async function register(credentials: RegisterCredentials): Promise<AuthTokens> {
    await http.post<BackendResponse<AuthUser>>("/authentication/register", credentials);
    return login({
      username: credentials.username,
      password: credentials.password,
    });
  }

  async function initPhoneOtp(payload: PhoneInitPayload): Promise<string> {
    const response = await http.post<BackendResponse<null>>(
      "/authentication/phone/init",
      payload
    );
    return response.message;
  }

  async function verifyPhoneOtp(payload: PhoneVerifyPayload): Promise<AuthTokens> {
    const response = await http.post<BackendResponse<AuthTokens>>(
      "/authentication/phone/verify",
      payload
    );
    return saveTokens(
      unwrapResponseData(response, "Phone verification response did not include authentication tokens.")
    );
  }

  async function initMagicLink(payload: MagicLinkInitPayload): Promise<string> {
    const response = await http.post<BackendResponse<null>>(
      "/authentication/magic-link/init",
      payload
    );
    return response.message;
  }

  async function verifyMagicLink(token: string): Promise<AuthTokens> {
    const response = await http.get<BackendResponse<AuthTokens>>(
      `/authentication/magic-link/verify?token=${encodeURIComponent(token)}`
    );
    return saveTokens(
      unwrapResponseData(response, "Magic link response did not include authentication tokens.")
    );
  }

  async function getProfile(): Promise<AuthUser> {
    const response = await http.get<BackendResponse<AuthUser>>("/authentication/profile");
    return unwrapResponseData(response, "Profile response did not include a user.");
  }

  async function getOAuthProviders(): Promise<OAuthProvidersStatus> {
    const response = await http.get<BackendResponse<OAuthProvidersStatus>>(
      "/authentication/oauth/providers"
    );
    return unwrapResponseData(
      response,
      "OAuth provider response did not include provider status."
    );
  }

  async function logout(): Promise<void> {
    session.clearSession();
  }

  async function refreshSession(): Promise<void> {
    const refreshToken = session.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available. User must log in again.");
    }
    const response = await http.post<BackendResponse<AuthTokens>>(
      "/authentication/refresh",
      { refreshToken }
    );
    saveTokens(
      unwrapResponseData(response, "Refresh response did not include authentication tokens.")
    );
  }

  function getOAuthUrl(provider: "google" | "apple"): string {
    return `/authentication/${provider}`;
  }

  function isAuthenticated(): boolean {
    return session.isAuthenticated();
  }

  return {
    getOAuthUrl,
    getOAuthProviders,
    getProfile,
    initMagicLink,
    initPhoneOtp,
    isAuthenticated,
    login,
    logout,
    refreshSession,
    register,
    verifyMagicLink,
    verifyPhoneOtp,
  };
}

