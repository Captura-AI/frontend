import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getHotspotDetailBySlug } from "@/domains/hotspot";
import { HotspotDetailView } from "@/presentation/features/hotspot/components/HotspotDetailView";

export const dynamic = "force-dynamic";

interface HotspotDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: HotspotDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const detail = await getHotspotDetailBySlug(id);

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
  const detail = await getHotspotDetailBySlug(id);

  if (!detail) notFound();

  return <HotspotDetailView detail={detail} />;
}
