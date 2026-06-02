import { type Metadata } from "next";
import { getPhotographersPageContent } from "@/domains/photographers";
import { PhotographersPageView } from "@/presentation/features/photographers";

export const metadata: Metadata = {
  title: "Photographers — Captura",
  description:
    "Meet Captura street photographers across Indonesia and book private photo sessions in the streets they know best.",
};

export default function PhotographersPage() {
  const content = getPhotographersPageContent();
  return <PhotographersPageView content={content} />;
}
