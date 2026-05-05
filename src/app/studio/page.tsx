import type { Metadata } from "next";
import StudioView from "@/presentation/features/studio";
import { getStudioPageData } from "@/domains/studio";

export const metadata: Metadata = {
  title: "Captura — Photographer AI Studio",
};

export default function StudioPage() {
  const data = getStudioPageData();
  return <StudioView data={data} />;
}
