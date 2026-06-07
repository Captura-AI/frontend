import { type Metadata } from "next";
import { getAccountLibraryPageContent } from "@/domains/account";
import { AccountLibraryPageView } from "@/presentation/features/account";

export const metadata: Metadata = {
  title: "Purchase Library — Captura",
  description:
    "Access purchased Captura moments, download status, license details, invoices, and support links.",
};

export default function AccountLibraryPage() {
  const content = getAccountLibraryPageContent();
  return <AccountLibraryPageView content={content} />;
}
