import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getHotspotDetail, getHotspotIds } from "@/domains/hotspot";
import { HotspotDetailView } from "@/presentation/features/hotspot/components/HotspotDetailView";

interface HotspotDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getHotspotIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: HotspotDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const detail = getHotspotDetail(id);

  if (!detail) {
    return {
      title: "Hotspot Not Found — Captura",
    };
  }

  return {
    title: `${detail.name} — Captura Hotspot`,
    description: detail.description,
  };
}

export default async function HotspotDetailPage({
  params,
}: HotspotDetailPageProps) {
  const { id } = await params;
  const detail = getHotspotDetail(id);

  if (!detail) notFound();

  return <HotspotDetailView detail={detail} />;
}
