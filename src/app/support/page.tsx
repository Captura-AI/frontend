import { type Metadata } from "next";
import { getSupportPageContent } from "@/domains/support";
import { SupportPageView } from "@/presentation/features/support";

export const metadata: Metadata = {
  title: "Support — Captura",
  description:
    "Get help with payments, downloads, licenses, refunds, your account, or privacy and removal requests.",
};

export default function SupportPage() {
  const content = getSupportPageContent();
  return <SupportPageView content={content} />;
}
