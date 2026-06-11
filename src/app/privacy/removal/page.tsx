import { type Metadata } from "next";
import { getPrivacyRemovalPageContent } from "@/domains/privacy-removal";
import { PrivacyRemovalPageView } from "@/presentation/features/privacy-removal";

export const metadata: Metadata = {
  title: "Request Removal — Captura",
  description:
    "Ask Captura to remove a photo, hide a plate number, correct metadata, or report a copyright issue.",
};

export default function PrivacyRemovalPage() {
  const content = getPrivacyRemovalPageContent();
  return <PrivacyRemovalPageView content={content} />;
}
