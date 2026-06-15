import { type Metadata } from "next";
import { getPhotographersPageContent } from "@/domains/photographers/services/PhotographersPageService";
import { PhotographersPageView } from "@/presentation/features/photographers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Photographers — Captura",
  description:
    "Meet Captura street photographers across Indonesia and book private photo sessions in the streets they know best.",
};

export default async function PhotographersPage() {
  const content = await getPhotographersPageContent();

  return <PhotographersPageView content={content} />;
}
