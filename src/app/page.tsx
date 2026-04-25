import { type Metadata } from "next";
import { generatePageSeo } from "@/application/seo";
import { getHomePageContent } from "@/domains/home";
import { HomePageView } from "@/presentation/features/home";
import { JsonLd } from "@/presentation/base/components/seo/JsonLd";
import { seoConfig } from "@/shared/config/seo.config";

export const metadata: Metadata = generatePageSeo({
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  path: "/",
  keywords: ["frontend", "Next.js", "DDD", "SEO", "Tailwind CSS"],
});

export default function HomePage() {
  const content = getHomePageContent();

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: seoConfig.baseUrl,
    description: seoConfig.defaultDescription,
  };

  return (
    <>
      <JsonLd data={jsonLdWebsite} />
      <HomePageView content={content} />
    </>
  );
}
