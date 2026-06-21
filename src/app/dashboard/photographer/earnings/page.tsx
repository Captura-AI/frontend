import { type Metadata } from "next";
import { getPhotographerEarningsPageContent } from "@/domains/photographer-earnings";
import { PhotographerEarningsPageView } from "@/presentation/features/photographer-earnings";

export const metadata: Metadata = {
  title: "Earnings — Captura",
  description: "Review your revenue split, order history, and upcoming payouts by period.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function PhotographerEarningsPage() {
  const content = await getPhotographerEarningsPageContent();
  return <PhotographerEarningsPageView content={content} />;
}
