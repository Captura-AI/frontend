import { type Metadata } from "next";
import { getPhotographerMomentsPageContent } from "@/domains/photographer-moments";
import { PhotographerMomentsPageView } from "@/presentation/features/photographer-moments";

export const metadata: Metadata = {
  title: "Moments — Captura",
  description: "Manage your published catalog: filter by status, edit metadata, and run bulk pricing actions.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function PhotographerMomentsPage() {
  const content = await getPhotographerMomentsPageContent();
  return <PhotographerMomentsPageView content={content} />;
}
