export function validateCanonicalUrl(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`CanonicalUrl is not a valid URL: "${raw}"`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("CanonicalUrl must use http or https protocol.");
  }
  return url.href;
}
