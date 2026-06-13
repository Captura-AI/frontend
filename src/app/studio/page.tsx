import type { Metadata } from "next";
import StudioView from "@/presentation/features/studio";
import { getStudioPageData } from "@/domains/studio";

export const metadata: Metadata = {
  title: "Captura — Photographer AI Studio",
  description:
    "Upload your roll and let Captura Vision auto-tag plates, classify vehicles, drop GPS pins, and draft captions for review.",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  const data = getStudioPageData();
  return <StudioView data={data} />;
}
