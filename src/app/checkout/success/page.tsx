import { type Metadata } from "next";
import { getCheckoutResultPageContent } from "@/domains/checkout";
import { CheckoutResultPageView } from "@/presentation/features/account";

export const metadata: Metadata = {
  title: "Checkout Confirmation — Captura",
  description:
    "Confirm Captura payment status, download next steps, receipt delivery, and order support options.",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const params = await searchParams;
  const content = getCheckoutResultPageContent(params.status);

  return <CheckoutResultPageView content={content} />;
}
