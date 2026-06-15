import { type Metadata } from "next";
import { generatePageSeo } from "@/application/seo";
import { getExplorerPageContent } from "@/domains/explorer";
import { ExplorerPageView } from "@/presentation/features/explorer";
import { JsonLd } from "@/presentation/base/components/seo/JsonLd";
import { seoConfig } from "@/shared/config/seo.config";

export const metadata: Metadata = generatePageSeo({
  title: "Explorer — Captura",
  description:
    "Trace the outline of a day. Search by place, time, vehicle, or how you looked that day.",
  path: "/explorer",
  keywords: ["street photography", "explorer", "moments", "search"],
});

interface ExplorerPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ExplorerPage({ searchParams }: ExplorerPageProps) {
  const content = await getExplorerPageContent(await searchParams);

  const jsonLdCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Explorer — Captura",
    description:
      "Trace the outline of a day. Search by place, time, vehicle, or how you looked that day.",
    url: `${seoConfig.baseUrl}/explorer`,
  };

  return (
    <>
      <JsonLd data={jsonLdCollection} />
      <ExplorerPageView content={content} />
    </>
  );
}
