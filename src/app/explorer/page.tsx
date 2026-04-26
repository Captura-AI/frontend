import { type Metadata } from "next";
import { getExplorerPageContent } from "@/domains/explorer";
import { ExplorerPageView } from "@/presentation/features/explorer";

export const metadata: Metadata = {
  title: "Explorer — Captura",
  description:
    "Trace the outline of a day. Search by place, time, vehicle, or how you looked that day.",
};

export default function ExplorerPage() {
  const content = getExplorerPageContent();
  return <ExplorerPageView content={content} />;
}
