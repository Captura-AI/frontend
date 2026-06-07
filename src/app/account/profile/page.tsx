import { type Metadata } from "next";
import { getAccountProfilePageContent } from "@/domains/account";
import { AccountProfilePageView } from "@/presentation/features/account";

export const metadata: Metadata = {
  title: "Account Profile — Captura",
  description:
    "Manage Captura account identity, search preferences, privacy settings, and support shortcuts.",
};

export default function AccountProfilePage() {
  const content = getAccountProfilePageContent();
  return <AccountProfilePageView content={content} />;
}
