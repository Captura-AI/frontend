export interface OpenGraph {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: "website" | "article" | "profile";
}

export interface TwitterCard {
  card?: "summary" | "summary_large_image" | "app" | "player";
  title: string;
  description: string;
  image?: string;
}

export interface JsonLdData {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  openGraph?: OpenGraph;
  twitterCard?: TwitterCard;
  jsonLd?: JsonLdData[];
  noIndex: boolean;
  noFollow: boolean;
  keywords?: string[];
}

export interface SeoMetaInput {
  title: string;
  description: string;
  canonical: string;
  openGraph?: OpenGraph;
  twitterCard?: TwitterCard;
  jsonLd?: JsonLdData[];
  noIndex?: boolean;
  noFollow?: boolean;
  keywords?: string[];
}

export function createSeoMeta(input: SeoMetaInput): SeoMeta {
  return {
    title: input.title,
    description: input.description,
    canonical: input.canonical,
    openGraph: input.openGraph,
    twitterCard: input.twitterCard,
    jsonLd: input.jsonLd,
    noIndex: input.noIndex ?? false,
    noFollow: input.noFollow ?? false,
    keywords: input.keywords,
  };
}

export function getRobotsValue(seoMeta: SeoMeta): string {
  const index = seoMeta.noIndex ? "noindex" : "index";
  const follow = seoMeta.noFollow ? "nofollow" : "follow";
  return `${index}, ${follow}`;
}

