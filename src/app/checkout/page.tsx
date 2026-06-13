import { type Metadata } from "next";
import { generatePageSeo } from "@/application/seo";
import { getCheckoutPageContent } from "@/domains/checkout";
import { CheckoutPageView } from "@/presentation/features/checkout";

export const metadata: Metadata = generatePageSeo({
  title: "Checkout — Captura",
  description:
    "Complete your Captura moment purchase with QRIS, cards, wallets, bank transfer, and transparent order totals.",
  path: "/checkout",
  noIndex: true,
  noFollow: true,
});

export default function CheckoutPage() {
  const content = getCheckoutPageContent();
  return <CheckoutPageView content={content} />;
}
