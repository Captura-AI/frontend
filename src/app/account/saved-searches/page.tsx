import { type Metadata } from "next";
import { generatePageSeo } from "@/application/seo";
import { getAccountSavedSearchesPageContent } from "@/domains/saved";
import { AccountSavedSearchesPageView } from "@/presentation/features/saved";

export const metadata: Metadata = generatePageSeo({
  title: "Saved Searches — Captura",
  description: "Saved location, time, vehicle, plate, and visual filters — ready to rerun the moment new frames come in.",
  path: "/account/saved-searches",
  noIndex: true,
  noFollow: true,
});

export const dynamic = "force-dynamic";

export default async function AccountSavedSearchesPage() {
  const content = await getAccountSavedSearchesPageContent();

  return <AccountSavedSearchesPageView content={content} />;
}
