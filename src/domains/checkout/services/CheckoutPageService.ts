import { serverApiRequest } from "@/shared/api/serverApi";
import { type CheckoutPage, type PaymentTab } from "../entities/CheckoutPage";

// ─── Backend contracts (public moment + license, authed user) ───────────────

interface BackendCheckoutPhotographer {
  artistName?: string | null;
}

interface BackendCheckoutMoment {
  id?: string | null;
  caption?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  cameraInfo?: string | null;
  photographerProfile?: BackendCheckoutPhotographer | null;
}

interface BackendCheckoutLicenseType {
  name?: string | null;
}

interface BackendCheckoutLicense {
  id: string;
  price: number | string;
  currency: string;
  isActive: boolean;
  licenseType?: BackendCheckoutLicenseType | null;
}

interface BackendCheckoutUser {
  email?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
}

const SERVICE_FEE_PCT = 0.05;
const TAX_PCT = 0.11;

// ─── Presentational template (payment UI is a preview; Midtrans Snap hosts the
// real method selection on redirect). ───────────────────────────────────────

const PAYMENT_TABS: PaymentTab[] = [
  {
    id: "local",
    label: "Indonesia",
    methods: [
      {
        id: "qris",
        logo: "QRIS",
        title: "QRIS · scan with any Indonesian app",
        subtitle: "GoPay · OVO · DANA · ShopeePay · LinkAja · BCA · Mandiri · BRI",
        meta: "No fee · Instant",
        feeType: "free",
        darkLogo: true,
      },
      {
        id: "va",
        logo: "VA",
        title: "Virtual Account · BCA, Mandiri, BNI, BRI, Permata",
        subtitle: "Pay from any Indonesian bank · 24-hour window",
        meta: "+ Rp 4,000 · ~5 min",
        feeType: "fee",
      },
      {
        id: "gopay",
        logo: "GoPay",
        title: "GoPay direct",
        subtitle: "Open Gojek app · approve · done",
        meta: "No fee · Instant",
        feeType: "free",
      },
      {
        id: "ovo",
        logo: "OVO",
        title: "OVO direct",
        subtitle: "Receive a push notification in OVO app",
        meta: "No fee · Instant",
        feeType: "free",
      },
      {
        id: "dana",
        logo: "DANA",
        title: "DANA",
        subtitle: "Approve from your DANA balance",
        meta: "No fee · Instant",
        feeType: "free",
      },
    ],
  },
  {
    id: "card",
    label: "Card",
    methods: [
      {
        id: "card",
        logo: "VISA",
        title: "Credit / Debit card",
        subtitle: "Visa · Mastercard · JCB · American Express",
        darkLogo: true,
      },
    ],
  },
];

const QRIS_APPS = [
  "GoPay",
  "OVO",
  "DANA",
  "ShopeePay",
  "LinkAja",
  "BCA Mobile",
  "Livin' Mandiri",
  "BRImo",
];

const CARD_BRANDS = ["VISA", "MC", "JCB", "AMEX"];

const COUNTRIES = ["Indonesia", "Singapore", "Malaysia", "United States", "Japan", "Australia"];

function checkoutTemplate(): CheckoutPage {
  return {
    header: {
      title: "Almost",
      emphasis: "yours",
      status: "Order completes after payment confirmation",
    },
    contact: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      countries: COUNTRIES,
    },
    payment: {
      tabs: PAYMENT_TABS,
      qrisApps: QRIS_APPS,
      cardBrands: CARD_BRANDS,
    },
    summary: {
      eyebrow: "Order summary · 1 moment",
      imageUrl: "/window.svg",
      title: "Select a",
      emphasis: "moment",
      photographer: "—",
      license: "—",
      edition: "Single moment",
      file: "Full-resolution",
      frame: "—",
      subtotal: 0,
      serviceFeePct: SERVICE_FEE_PCT,
      taxPct: TAX_PCT,
    },
    purchase: {
      momentId: "",
      licenseId: "",
    },
  };
}

function splitName(name: string | null | undefined): { firstName: string; lastName: string } {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);

  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
}

async function fetchMoment(momentId: string): Promise<BackendCheckoutMoment | null> {
  try {
    return await serverApiRequest<BackendCheckoutMoment>(`/moments/${momentId}`, {
      revalidate: false,
    });
  } catch {
    return null;
  }
}

async function fetchLicenses(momentId: string): Promise<BackendCheckoutLicense[]> {
  try {
    return await serverApiRequest<BackendCheckoutLicense[]>(`/moments/${momentId}/licenses`, {
      revalidate: false,
    });
  } catch {
    return [];
  }
}

async function fetchUser(): Promise<BackendCheckoutUser | null> {
  try {
    return await serverApiRequest<BackendCheckoutUser>("/users/me", {
      auth: true,
      revalidate: false,
    });
  } catch {
    return null;
  }
}

function applyContact(template: CheckoutPage, user: BackendCheckoutUser | null): CheckoutPage["contact"] {
  if (!user) {
    return template.contact;
  }

  const { firstName, lastName } = splitName(user.name);

  return {
    ...template.contact,
    email: user.email ?? "",
    firstName,
    lastName,
    phone: user.phoneNumber ?? "",
  };
}

function applySummary(
  template: CheckoutPage,
  moment: BackendCheckoutMoment,
  license: BackendCheckoutLicense
): CheckoutPage["summary"] {
  return {
    ...template.summary,
    imageUrl: moment.thumbnailUrl ?? moment.imageUrl ?? template.summary.imageUrl,
    title: moment.caption ?? moment.description ?? "Captura moment",
    emphasis: "",
    photographer: moment.photographerProfile?.artistName ?? "Captura photographer",
    license: license.licenseType?.name ?? "Standard license",
    file: moment.cameraInfo ?? "Full-resolution",
    frame: "Numbered edition",
    subtotal: Number(license.price),
  };
}

/**
 * Builds the checkout page for a specific moment + license. The summary and
 * billing prefill come from real data; the payment-method UI is a preview
 * (Midtrans Snap hosts the real selection after redirect). If the moment or
 * license cannot be loaded, an inert template is returned so the page still
 * renders, with an empty `purchase` that disables the pay action.
 */
export async function getCheckoutPageContent(
  momentId: string | undefined,
  licenseId: string | undefined
): Promise<CheckoutPage> {
  const template = checkoutTemplate();

  if (!momentId || !licenseId) {
    return template;
  }

  const [moment, licenses, user] = await Promise.all([
    fetchMoment(momentId),
    fetchLicenses(momentId),
    fetchUser(),
  ]);

  const license = licenses.find((candidate) => candidate.id === licenseId && candidate.isActive);

  if (!moment || !license) {
    return { ...template, contact: applyContact(template, user) };
  }

  return {
    ...template,
    contact: applyContact(template, user),
    summary: applySummary(template, moment, license),
    purchase: { momentId: moment.id ?? momentId, licenseId: license.id },
  };
}
