import { type Metadata } from "next";
import { getAccountSavedSearchesPageContent } from "@/domains/saved";
import { AccountSavedSearchesPageView } from "@/presentation/features/saved";

export const metadata: Metadata = {
  title: "Saved Searches — Captura",
  description: "Saved location, time, vehicle, plate, and visual filters — ready to rerun the moment new frames come in.",
};

export default function AccountSavedSearchesPage() {
  const content = getAccountSavedSearchesPageContent();
  return <AccountSavedSearchesPageView content={content} />;
}
