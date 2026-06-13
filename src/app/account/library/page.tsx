import { type Metadata } from "next";
import { generatePageSeo } from "@/application/seo";
import { getAccountLibraryPageContent } from "@/domains/account";
import { AccountLibraryPageView } from "@/presentation/features/account";

export const metadata: Metadata = generatePageSeo({
  title: "Purchase Library — Captura",
  description:
    "Access purchased Captura moments, download status, license details, invoices, and support links.",
  path: "/account/library",
  noIndex: true,
  noFollow: true,
});

export default function AccountLibraryPage() {
  const content = getAccountLibraryPageContent();
  return <AccountLibraryPageView content={content} />;
}
