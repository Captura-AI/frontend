import { serverApiRequest } from "@/shared/api/serverApi";
import {
  type CheckoutResultPage,
  type CheckoutResultStatus,
} from "../entities/CheckoutPage";

// ─── Backend contract (GET /orders/:id) ─────────────────────────────────────
// The order detail carries no plate (stripped server-side).

interface BackendResultPhotographer {
  artistName?: string | null;
}

interface BackendResultMoment {
  id?: string | null;
  caption?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  photographerProfile?: BackendResultPhotographer | null;
}

interface BackendResultLicenseType {
  name?: string | null;
}

interface BackendResultLicense {
  licenseType?: BackendResultLicenseType | null;
}

interface BackendResultBilling {
  email?: string | null;
}

interface BackendOrderDetail {
  id: string;
  status: string;
  totalAmount: number | string;
  currency: string;
  billingInfo?: BackendResultBilling | null;
  moment?: BackendResultMoment | null;
  license?: BackendResultLicense | null;
}

const VALID_STATUSES: CheckoutResultStatus[] = ["success", "pending", "failed"];
const PAID_STATUS = "PAID";
const PENDING_STATUS = "PENDING";

function formatIdr(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}

function toResultStatus(status: string): CheckoutResultStatus {
  if (status === PAID_STATUS) {
    return "success";
  }

  if (status === PENDING_STATUS) {
    return "pending";
  }

  return "failed";
}

function availabilityFor(status: CheckoutResultStatus): string {
  if (status === "success") {
    return "Available now in your library";
  }

  if (status === "pending") {
    return "Ready shortly after payment confirms";
  }

  return "Not available — payment did not complete";
}

function buildStates(momentHref: string): CheckoutResultPage["states"] {
  return {
    success: {
      eyebrow: "Payment confirmed",
      title: "Your moment is",
      emphasis: "ready",
      description:
        "The receipt has been sent and your full-resolution files are now available in your library.",
      primaryLabel: "Open download library",
      primaryHref: "/account/library",
      secondaryLabel: "View moment",
      secondaryHref: momentHref,
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
      secondaryHref: "/support",
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
      secondaryHref: "/support",
    },
  };
}

function buildNextSteps(email: string): CheckoutResultPage["nextSteps"] {
  return [
    {
      label: "Download",
      description: "Access TIFF and JPG files from your account library when the order is ready.",
    },
    {
      label: "Receipt",
      description: `A tax-ready receipt and invoice link are sent to ${email}.`,
    },
    {
      label: "License",
      description: "Your selected usage license is stored with the order for future reference.",
    },
  ];
}

const SUPPORT_BLOCK: CheckoutResultPage["support"] = {
  label: "Need help with this order?",
  href: "/support",
  description:
    "Captura support can help with failed payments, download issues, refunds, and license questions.",
};

function toResultPage(order: BackendOrderDetail): CheckoutResultPage {
  const status = toResultStatus(order.status);
  const moment = order.moment;
  const momentId = moment?.id ?? null;
  const email = order.billingInfo?.email ?? "your email";

  return {
    status,
    order: {
      id: order.id,
      title: moment?.caption ?? moment?.description ?? "Captura moment",
      imageUrl: moment?.thumbnailUrl ?? moment?.imageUrl ?? "/window.svg",
      photographer: moment?.photographerProfile?.artistName ?? "Captura photographer",
      license: order.license?.licenseType?.name ?? "Standard license",
      total: formatIdr(Number(order.totalAmount)),
      email,
      estimatedAvailability: availabilityFor(status),
    },
    states: buildStates(momentId ? `/explorer/${momentId}` : "/explorer"),
    nextSteps: buildNextSteps(email),
    support: SUPPORT_BLOCK,
  };
}

/**
 * Neutral result used when no order id is provided or the order cannot be
 * loaded. It shows generic copy keyed by the redirect's status hint without
 * inventing order-specific details.
 */
function buildNeutralResult(statusFallback: string | undefined): CheckoutResultPage {
  const status = VALID_STATUSES.includes(statusFallback as CheckoutResultStatus)
    ? (statusFallback as CheckoutResultStatus)
    : "pending";

  return {
    status,
    order: {
      id: "—",
      title: "Your Captura order",
      imageUrl: "/window.svg",
      photographer: "Captura",
      license: "—",
      total: "—",
      email: "your email",
      estimatedAvailability: availabilityFor(status),
    },
    states: buildStates("/explorer"),
    nextSteps: buildNextSteps("your email"),
    support: SUPPORT_BLOCK,
  };
}

/**
 * Loads a checkout result by order id (from the payment redirect). The status
 * is derived from the backend order — the source of truth — not the URL, which
 * a user could spoof. Falls back to a neutral result if the order is missing.
 */
export async function getCheckoutResultPageContent(
  orderId: string | undefined,
  statusFallback: string | undefined
): Promise<CheckoutResultPage> {
  if (orderId) {
    try {
      const order = await serverApiRequest<BackendOrderDetail>(`/orders/${orderId}`, {
        auth: true,
        revalidate: false,
      });

      return toResultPage(order);
    } catch {
      return buildNeutralResult(statusFallback);
    }
  }

  return buildNeutralResult(statusFallback);
}
