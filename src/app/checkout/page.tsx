import { type Metadata } from "next";
import { getCheckoutPageContent } from "@/domains/checkout";
import { CheckoutPageView } from "@/presentation/features/checkout";

export const metadata: Metadata = {
  title: "Checkout — Captura",
  description:
    "Complete your Captura moment purchase with QRIS, cards, wallets, bank transfer, and transparent order totals.",
};

export default function CheckoutPage() {
  const content = getCheckoutPageContent();
  return <CheckoutPageView content={content} />;
}
