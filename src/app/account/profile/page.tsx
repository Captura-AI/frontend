import { type Metadata } from "next";
import { generatePageSeo } from "@/application/seo";
import { getAccountProfilePageContent } from "@/domains/account";
import { AccountProfilePageView } from "@/presentation/features/account";

export const metadata: Metadata = generatePageSeo({
  title: "Account Profile — Captura",
  description:
    "Manage Captura account identity, search preferences, privacy settings, and support shortcuts.",
  path: "/account/profile",
  noIndex: true,
  noFollow: true,
});

// Per-user authenticated page — always render on demand, never prerender.
export const dynamic = "force-dynamic";

export default async function AccountProfilePage() {
  const content = await getAccountProfilePageContent();

  return <AccountProfilePageView content={content} />;
}
