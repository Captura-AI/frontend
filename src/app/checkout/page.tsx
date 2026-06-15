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

// Depends on the moment/license query + an authenticated billing prefill.
export const dynamic = "force-dynamic";

type SearchParamValue = string | string[] | undefined;

function firstParam(value: SearchParamValue): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ momentId?: SearchParamValue; licenseId?: SearchParamValue }>;
}) {
  const params = await searchParams;
  const content = await getCheckoutPageContent(
    firstParam(params.momentId),
    firstParam(params.licenseId)
  );

  return <CheckoutPageView content={content} />;
}
