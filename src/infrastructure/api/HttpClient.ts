import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";
import { AUTH_SESSION_EXPIRED_EVENT, type SessionStore } from "@/infrastructure/session/SessionCookieStore";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpRequestOptions extends AxiosRequestConfig {
  headers?: Record<string, string>;
}

export interface HttpClient {
  get: <T>(path: string, options?: HttpRequestOptions) => Promise<T>;
  post: <T>(path: string, body?: unknown, options?: HttpRequestOptions) => Promise<T>;
  put: <T>(path: string, body?: unknown, options?: HttpRequestOptions) => Promise<T>;
  patch: <T>(path: string, body?: unknown, options?: HttpRequestOptions) => Promise<T>;
  delete: <T>(path: string, options?: HttpRequestOptions) => Promise<T>;
}

// ─── Interceptor setup ────────────────────────────────────────────────────────

function attachRequestInterceptor(instance: AxiosInstance, session: SessionStore): void {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = session.getAccessToken();
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    },
    (error: unknown) => Promise.reject(error)
  );
}

function attachResponseInterceptor(instance: AxiosInstance, session: SessionStore): void {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const responseData = response.data as {
        accessToken?: unknown;
        data?: { accessToken?: unknown };
        result?: { accessToken?: unknown };
      };
      const newToken: unknown =
        responseData?.accessToken ??
        responseData?.data?.accessToken ??
        responseData?.result?.accessToken;
      if (typeof newToken === "string") {
        session.setAccessToken(newToken);
      }
      return response;
    },
    (error: unknown) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data as
          | { data?: unknown; message?: string | string[]; error?: string; result?: unknown }
          | undefined;
        const responseMessage = Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message;
        const message = responseMessage ?? data?.error ?? error.message;
        const path = error.config?.url ?? "";

        if (status === 401) {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED_EVENT));
          }
          session.clearSession();
        }

        return Promise.reject(
          new Error(`${message} (${status ?? "?"} ${path})`)
        );
      }
      return Promise.reject(error);
    }
  );
}

// ─── Factory ──────────────────────────────────────────────────────────────────

export function createHttpClient(baseUrl: string, session: SessionStore): HttpClient {
  const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  attachRequestInterceptor(instance, session);
  attachResponseInterceptor(instance, session);

  return {
    async get<T>(path: string, options?: HttpRequestOptions): Promise<T> {
      const response = await instance.get<T>(path, options);
      return response.data;
    },
    async post<T>(path: string, body?: unknown, options?: HttpRequestOptions): Promise<T> {
      const response = await instance.post<T>(path, body, options);
      return response.data;
    },
    async put<T>(path: string, body?: unknown, options?: HttpRequestOptions): Promise<T> {
      const response = await instance.put<T>(path, body, options);
      return response.data;
    },
    async patch<T>(path: string, body?: unknown, options?: HttpRequestOptions): Promise<T> {
      const response = await instance.patch<T>(path, body, options);
      return response.data;
    },
    async delete<T>(path: string, options?: HttpRequestOptions): Promise<T> {
      const response = await instance.delete<T>(path, options);
      return response.data;
    },
  };
}

