import { type Metadata } from "next";
import { buildSeoMeta, type SeoBuilderInput } from "@/domains/seo";
import { seoConfig } from "@/shared/config/seo.config";
import { toNextMetadata } from "../mappers/toNextMetadata";

export type GeneratePageSeoInput = Omit<SeoBuilderInput, "canonical"> & {
  path: string;
};

export function generatePageSeo(input: GeneratePageSeoInput): Metadata {
  const canonical = `${seoConfig.baseUrl}${input.path}`;

  const openGraph = input.openGraph ?? {
    title: input.title,
    description: input.description,
    url: canonical,
    image: seoConfig.defaultOgImage,
    type: "website" as const,
  };

  const twitterCard = input.twitterCard ?? {
    card: "summary_large_image" as const,
    title: input.title,
    description: input.description,
    image: seoConfig.defaultOgImage,
  };

  const seoMeta = buildSeoMeta({
    ...input,
    canonical,
    openGraph,
    twitterCard,
  });

  return toNextMetadata(seoMeta);
}
