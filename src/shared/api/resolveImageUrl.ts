/**
 * Backend sometimes returns relative paths like "uploads/moments/xxx.png".
 * next/image requires absolute URLs or root-relative paths (starting with "/").
 *
 * We return a root-relative path ("/uploads/...") so Next.js treats it as a
 * same-origin asset — the rewrite in next.config.ts proxies /uploads/** to
 * the backend. This avoids the private-IP SSRF block that occurs when the
 * image optimiser fetches an absolute http://localhost URL server-side.
 */
export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("data:") || url.startsWith("/")) return url;
  return `/${url}`;
}
