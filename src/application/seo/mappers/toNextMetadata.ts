import { type Metadata } from "next";
import { type SeoMeta, getRobotsValue } from "@/domains/seo/entities/SeoMeta";
import { seoConfig } from "@/shared/config/seo.config";

export function toNextMetadata(seoMeta: SeoMeta): Metadata {
  const robots = getRobotsValue(seoMeta);

  return {
    title: seoMeta.title,
    description: seoMeta.description,
    keywords: seoMeta.keywords,
    robots,
    alternates: {
      canonical: seoMeta.canonical,
    },
    openGraph: seoMeta.openGraph
      ? {
          title: seoMeta.openGraph.title,
          description: seoMeta.openGraph.description,
          url: seoMeta.openGraph.url,
          images: seoMeta.openGraph.image ? [seoMeta.openGraph.image] : undefined,
          type: seoMeta.openGraph.type ?? "website",
          siteName: seoConfig.siteName,
          locale: seoConfig.locale,
        }
      : undefined,
    twitter: seoMeta.twitterCard
      ? {
          card: seoMeta.twitterCard.card ?? "summary_large_image",
          title: seoMeta.twitterCard.title,
          description: seoMeta.twitterCard.description,
          images: seoMeta.twitterCard.image ? [seoMeta.twitterCard.image] : undefined,
        }
      : undefined,
  };
}
