const BACKEND_ROOT = (
  process.env["NEXT_PUBLIC_API_BASE_URL"] ?? "http://localhost:1337/api"
).replace(/\/api$/, "");

/**
 * Backend sometimes returns relative paths like "uploads/moments/xxx.png".
 * next/image requires absolute URLs or paths starting with "/".
 * This helper converts relative backend paths to absolute URLs.
 */
export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("data:") || url.startsWith("/")) return url;
  return `${BACKEND_ROOT}/${url}`;
}
