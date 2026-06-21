import { type Metadata } from "next";
import { getPhotographerDashboardPageContent } from "@/domains/photographer-dashboard";
import { PhotographerDashboardPageView } from "@/presentation/features/photographer-dashboard";

export const metadata: Metadata = {
  title: "Photographer Dashboard — Captura",
  description:
    "Operational dashboard for Captura photographers to monitor revenue, uploads, bookings, AI review, and profile readiness.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function PhotographerDashboardPage() {
  const content = await getPhotographerDashboardPageContent();
  return <PhotographerDashboardPageView content={content} />;
}
