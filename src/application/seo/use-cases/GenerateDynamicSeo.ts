import { type Metadata } from "next";
import { buildSeoMeta, type SeoBuilderInput } from "@/domains/seo";
import { seoConfig } from "@/shared/config/seo.config";
import { toNextMetadata } from "../mappers/toNextMetadata";

export type GenerateDynamicSeoInput = Omit<SeoBuilderInput, "canonical"> & {
  slug: string;
  basePath: string;
};

export async function generateDynamicSeo(
  input: GenerateDynamicSeoInput
): Promise<Metadata> {
  const canonical = `${seoConfig.baseUrl}${input.basePath}/${input.slug}`;

  const openGraph = input.openGraph ?? {
    title: input.title,
    description: input.description,
    url: canonical,
    image: seoConfig.defaultOgImage,
    type: "article" as const,
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
