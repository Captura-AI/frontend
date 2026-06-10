import { type Metadata } from "next";
import { getPhotographerUploadsPageContent } from "@/domains/photographer-uploads";
import { PhotographerUploadsPageView } from "@/presentation/features/photographer-uploads";

export const metadata: Metadata = {
  title: "Uploads — Captura",
  description: "Manage photo batch uploads, AI processing status, and metadata review before publishing.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PhotographerUploadsPage() {
  const content = getPhotographerUploadsPageContent();
  return <PhotographerUploadsPageView content={content} />;
}
