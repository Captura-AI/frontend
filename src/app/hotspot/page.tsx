import type { Metadata } from "next";
import HotspotView from "@/presentation/features/hotspot";

export const metadata: Metadata = {
  title: "Captura — Hotspot Map · Jawa Barat",
  description:
    "Explore live photographer hotspots across Jawa Barat — find active routes, recent moments, and the busiest streets right now.",
};

export default function HotspotPage() {
  return <HotspotView />;
}
