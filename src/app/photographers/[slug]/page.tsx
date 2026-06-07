import { type Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPhotographerDetail,
  getPhotographerSlugs,
} from "@/domains/photographers";
import { PhotographerDetailPageView } from "@/presentation/features/photographers/detail";

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

  return {
    title: `${detail.name} — Captura Photographer`,
    description: `${detail.name} captures ${detail.area}. View portfolio, active areas, packages, reviews, and latest Captura moments.`,
  };
}

export default async function PhotographerDetailPage({
  params,
}: PhotographerDetailPageProps) {
  const { slug } = await params;
  const detail = getPhotographerDetail(slug);

  if (!detail) notFound();

  return <PhotographerDetailPageView detail={detail} />;
}
