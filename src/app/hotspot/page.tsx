import type { Metadata } from "next";
import HotspotView from "@/presentation/features/hotspot";

export const metadata: Metadata = {
  title: "Captura — Hotspot Map · Jawa Barat",
};

export default function HotspotPage() {
  return <HotspotView />;
}
