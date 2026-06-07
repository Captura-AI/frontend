export type PaymentTabId = "local" | "card" | "wallet" | "bank";

export interface PaymentMethod {
  id: string;
  logo: string;
  title: string;
  subtitle: string;
  meta?: string;
  feeType?: "free" | "fee";
  darkLogo?: boolean;
}

export interface PaymentTab {
  id: PaymentTabId;
  label: string;
  methods: PaymentMethod[];
}

export interface CheckoutPage {
  header: {
    title: string;
    emphasis: string;
    status: string;
  };
  contact: {
    email: string;
    countries: string[];
  };
  payment: {
    tabs: PaymentTab[];
    qrisApps: string[];
    cardBrands: string[];
  };
  summary: {
    eyebrow: string;
    imageUrl: string;
    title: string;
    emphasis: string;
    photographer: string;
    license: string;
    edition: string;
    file: string;
    frame: string;
    subtotal: number;
    serviceFeePct: number;
    taxPct: number;
    rateToIdr: number;
    promoCode: string;
    promoPct: number;
  };
}

export type CheckoutResultStatus = "success" | "pending" | "failed";

export interface CheckoutResultPage {
  status: CheckoutResultStatus;
  order: {
    id: string;
    title: string;
    imageUrl: string;
    photographer: string;
    license: string;
    total: string;
    email: string;
    estimatedAvailability: string;
  };
  states: Record<
    CheckoutResultStatus,
    {
      eyebrow: string;
      title: string;
      emphasis: string;
      description: string;
      primaryLabel: string;
      primaryHref: string;
      secondaryLabel: string;
      secondaryHref: string;
    }
  >;
  nextSteps: Array<{
    label: string;
    description: string;
  }>;
  support: {
    label: string;
    href: string;
    description: string;
  };
}
