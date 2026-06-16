import { type Metadata } from "next";
import { generatePageSeo } from "@/application/seo";
import { getAccountSavedPageContent } from "@/domains/saved";
import { AccountSavedPageView } from "@/presentation/features/saved";

export const metadata: Metadata = generatePageSeo({
  title: "Saved Moments — Captura",
  description: "Moments you bookmarked from Explorer or a moment detail page, kept here until you're ready to license them.",
  path: "/account/saved",
  noIndex: true,
  noFollow: true,
});

export const dynamic = "force-dynamic";

export default async function AccountSavedPage() {
  const content = await getAccountSavedPageContent();

  return <AccountSavedPageView content={content} />;
}
