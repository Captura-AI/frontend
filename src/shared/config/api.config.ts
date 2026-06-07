export const apiConfig = {
  baseUrl: process.env["NEXT_PUBLIC_API_BASE_URL"] ?? "http://localhost:1337/api",
} as const;

export type ApiConfig = typeof apiConfig;
