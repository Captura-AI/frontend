import { type Metadata } from "next";
import { generateDynamicSeo } from "@/application/seo";
import { getExplorerDetail } from "@/domains/explorer";
import { ExplorerDetailView } from "@/presentation/features/explorer/detail";
import { JsonLd } from "@/presentation/base/components/seo/JsonLd";
import { seoConfig } from "@/shared/config/seo.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const detail = await getExplorerDetail(id);

  return generateDynamicSeo({
    title: `${detail.titlePrefix}${detail.titleEmphasis} — Captura`,
    description: detail.description,
    slug: id,
    basePath: "/explorer",
    openGraph: {
      title: `${detail.titlePrefix}${detail.titleEmphasis}`,
      description: detail.description,
      url: `${seoConfig.baseUrl}/explorer/${id}`,
      image: detail.image.urls[0] ?? seoConfig.defaultOgImage,
      type: "article",
    },
  });
}

export default async function ExplorerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getExplorerDetail(id);

  const jsonLdPhoto = {
    "@context": "https://schema.org",
    "@type": "Photograph",
    name: `${detail.titlePrefix}${detail.titleEmphasis}`,
    description: detail.description,
    contentUrl: detail.image.urls[0],
    creator: {
      "@type": "Person",
      name: detail.photographer.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: detail.price.currentUsd,
      url: `${seoConfig.baseUrl}/explorer/${id}`,
    },
  };

  return (
    <>
      <JsonLd data={jsonLdPhoto} />
      <ExplorerDetailView detail={detail} />
    </>
  );
}
