import { type Metadata } from "next";
import { getPhotographerBookingsPageContent } from "@/domains/photographer-bookings";
import { PhotographerBookingsPageView } from "@/presentation/features/photographer-bookings";

export const metadata: Metadata = {
  title: "Bookings — Captura",
  description: "Review booking requests, manage your schedule, and keep your packages up to date.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PhotographerBookingsPage() {
  const content = getPhotographerBookingsPageContent();
  return <PhotographerBookingsPageView content={content} />;
}
