import type { HotspotPage } from "@/domains/hotspot";
import HotspotPageClient from "./components/HotspotPageClient";

interface HotspotViewProps {
  data: HotspotPage;
}

export default function HotspotView({ data }: HotspotViewProps) {
  return <HotspotPageClient data={data} />;
}
