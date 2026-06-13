import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { generateDynamicSeo } from "@/application/seo";
import {
  getPhotographerDetail,
  getPhotographerSlugs,
} from "@/domains/photographers";
import { PhotographerDetailPageView } from "@/presentation/features/photographers/detail";
import { JsonLd } from "@/presentation/base/components/seo/JsonLd";
import { seoConfig } from "@/shared/config/seo.config";

interface PhotographerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPhotographerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PhotographerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getPhotographerDetail(slug);

  if (!detail) {
    return {
      title: "Photographer Not Found — Captura",
    };
  }

  const description = `${detail.name} captures ${detail.area}. View portfolio, active areas, packages, reviews, and latest Captura moments.`;

  return generateDynamicSeo({
    title: `${detail.name} — Captura Photographer`,
    description,
    slug,
    basePath: "/photographers",
    openGraph: {
      title: `${detail.name} — Captura Photographer`,
      description,
      url: `${seoConfig.baseUrl}/photographers/${slug}`,
      image: detail.heroImageUrl,
      type: "profile",
    },
  });
}

export default async function PhotographerDetailPage({
  params,
}: PhotographerDetailPageProps) {
  const { slug } = await params;
  const detail = getPhotographerDetail(slug);

  if (!detail) notFound();

  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: detail.name,
    description: detail.bio,
    image: detail.avatarUrl,
    url: `${seoConfig.baseUrl}/photographers/${slug}`,
    jobTitle: "Street Photographer",
    address: {
      "@type": "PostalAddress",
      addressLocality: detail.city,
    },
    aggregateRating:
      detail.reviews.length > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: detail.rating,
            reviewCount: detail.reviews.length,
          }
        : undefined,
  };

  return (
    <>
      <JsonLd data={jsonLdPerson} />
      <PhotographerDetailPageView detail={detail} />
    </>
  );
}
