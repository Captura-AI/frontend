import { getHotspotPageData } from "@/domains/hotspot";
import HotspotPageClient from "./components/HotspotPageClient";

export default function HotspotView() {
  const data = getHotspotPageData();
  return <HotspotPageClient data={data} />;
}
