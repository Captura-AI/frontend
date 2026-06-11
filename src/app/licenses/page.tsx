import { type Metadata } from "next";
import { getLicensesPageContent } from "@/domains/licenses";
import { LicensesPageView } from "@/presentation/features/licenses";

export const metadata: Metadata = {
  title: "Licenses — Captura",
  description:
    "Compare Personal, Editorial, and Commercial licenses — usage rights, restrictions, included files, and credit requirements.",
};

export default function LicensesPage() {
  const content = getLicensesPageContent();
  return <LicensesPageView content={content} />;
}
