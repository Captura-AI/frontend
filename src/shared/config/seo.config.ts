export const seoConfig = {
  siteName: "FE Scanner",
  baseUrl: process.env["NEXT_PUBLIC_BASE_URL"] ?? "https://fe-scanner.com",
  defaultTitle: "FE Scanner - Modern Frontend Solutions",
  defaultDescription:
    "FE Scanner is a modern frontend platform delivering high-performance, SEO-optimised web experiences built with Next.js and Tailwind CSS.",
  defaultOgImage: "/images/og-default.png",
  twitterHandle: "@fe_scanner",
  locale: "en_US",
  titleTemplate: "%s | FE Scanner",
} as const;

export type SeoConfig = typeof seoConfig;
