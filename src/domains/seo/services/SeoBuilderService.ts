import { createSeoMeta, type SeoMeta, type JsonLdData, type OpenGraph, type TwitterCard } from "../entities/SeoMeta";
import { validateMetaTitle } from "../value-objects/MetaTitle";
import { validateMetaDescription } from "../value-objects/MetaDescription";
import { validateCanonicalUrl } from "../value-objects/CanonicalUrl";

export interface SeoBuilderInput {
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

export function buildSeoMeta(input: SeoBuilderInput): SeoMeta {
  return createSeoMeta({
    title: validateMetaTitle(input.title),
    description: validateMetaDescription(input.description),
    canonical: validateCanonicalUrl(input.canonical),
    openGraph: input.openGraph,
    twitterCard: input.twitterCard,
    jsonLd: input.jsonLd,
    noIndex: input.noIndex,
    noFollow: input.noFollow,
    keywords: input.keywords,
  });
}

