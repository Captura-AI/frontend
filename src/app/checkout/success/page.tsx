import { type Metadata } from "next";
import { generatePageSeo } from "@/application/seo";
import { getCheckoutResultPageContent } from "@/domains/checkout";
import { CheckoutResultPageView } from "@/presentation/features/account";

export const metadata: Metadata = generatePageSeo({
  title: "Checkout Confirmation — Captura",
  description:
    "Confirm Captura payment status, download next steps, receipt delivery, and order support options.",
  path: "/checkout/success",
  noIndex: true,
  noFollow: true,
});

// Result depends on the order id query + an authenticated lookup.
export const dynamic = "force-dynamic";

type SearchParamValue = string | string[] | undefined;

function firstParam(value: SearchParamValue): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    order_id?: SearchParamValue;
    orderId?: SearchParamValue;
    status?: SearchParamValue;
  }>;
}) {
  const params = await searchParams;
  const orderId = firstParam(params.order_id) ?? firstParam(params.orderId);
  const content = await getCheckoutResultPageContent(orderId, firstParam(params.status));

  return <CheckoutResultPageView content={content} />;
}
