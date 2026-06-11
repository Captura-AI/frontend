import { type Metadata } from "next";
import { getAccountSavedPageContent } from "@/domains/saved";
import { AccountSavedPageView } from "@/presentation/features/saved";

export const metadata: Metadata = {
  title: "Saved Moments — Captura",
  description: "Moments you bookmarked from Explorer or a moment detail page, kept here until you're ready to license them.",
};

export default function AccountSavedPage() {
  const content = getAccountSavedPageContent();
  return <AccountSavedPageView content={content} />;
}
