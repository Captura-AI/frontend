import type { Metadata } from "next";
import { getHotspotPageContent } from "@/domains/hotspot";
import HotspotView from "@/presentation/features/hotspot";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Captura — Hotspot Map · Jawa Barat",
  description:
    "Explore live photographer hotspots across Jawa Barat — find active routes, recent moments, and the busiest streets right now.",
};

export default async function HotspotPage() {
  const data = await getHotspotPageContent();

  return <HotspotView data={data} />;
}
