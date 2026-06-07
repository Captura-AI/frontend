import {
  type CheckoutResultPage,
  type CheckoutResultStatus,
} from "../entities/CheckoutPage";

const VALID_STATUSES: CheckoutResultStatus[] = ["success", "pending", "failed"];

export function getCheckoutResultPageContent(
  status: string | string[] | undefined
): CheckoutResultPage {
  const normalizedStatus = Array.isArray(status) ? status[0] : status;
  const resultStatus = VALID_STATUSES.includes(normalizedStatus as CheckoutResultStatus)
    ? (normalizedStatus as CheckoutResultStatus)
    : "success";

  return {
    status: resultStatus,
    order: {
      id: "ord-01428",
      title: "Seen near Shibuya, just before dusk",
      imageUrl:
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=900&q=80&auto=format&fit=crop",
      photographer: "Ayaka Mori",
      license: "Personal print · Edition 1/25",
      total: "USD 53.90",
      email: "ayaka@captura.studio",
      estimatedAvailability: "Instant after payment confirmation",
    },
    states: {
      success: {
        eyebrow: "Payment confirmed",
        title: "Your moment is",
        emphasis: "ready",
        description:
          "The receipt has been sent and your full-resolution files are now available in your library.",
        primaryLabel: "Open download library",
        primaryHref: "/account/library",
        secondaryLabel: "View moment",
        secondaryHref: "/explorer/m-1",
      },
      pending: {
        eyebrow: "Payment pending",
        title: "We are watching the",
        emphasis: "payment",
        description:
          "Some transfer methods take a little longer. We will email you the second the file is ready.",
        primaryLabel: "Track in library",
        primaryHref: "/account/library",
        secondaryLabel: "Payment support",
        secondaryHref: "/support/payments",
      },
      failed: {
        eyebrow: "Payment failed",
        title: "No charge went",
        emphasis: "through",
        description:
          "The order is saved, but payment did not complete. Try another method or contact support if the bank shows a hold.",
        primaryLabel: "Retry checkout",
        primaryHref: "/checkout",
        secondaryLabel: "Contact support",
        secondaryHref: "/support/payments",
      },
    },
    nextSteps: [
      {
        label: "Download",
        description: "Access TIFF and JPG files from your account library when the order is ready.",
      },
      {
        label: "Receipt",
        description: "A tax-ready receipt and invoice link are sent to ayaka@captura.studio.",
      },
      {
        label: "License",
        description: "Personal print usage is stored with the order for future reference.",
      },
    ],
    support: {
      label: "Need help with this order?",
      href: "/support/orders/ord-01428",
      description: "Captura support can help with failed payments, download issues, refunds, and license questions.",
    },
  };
}
