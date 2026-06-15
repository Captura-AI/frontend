import { serverApiRequest } from "@/shared/api/serverApi";
import {
  type AccountLibraryPage,
  type AccountProfilePage,
  type DownloadStatus,
  type LibraryItem,
  type LinkedAccount,
  type OrderStatus,
  type VerificationState,
} from "../entities/AccountPage";

// ─── Profile: real identity from GET /users/me ──────────────────────────────
// Account settings (preferences/privacy/shortcuts) have no backend store yet,
// so they stay as presentational defaults — never claimed as saved user state.

interface BackendUserPhotographerProfile {
  location?: string | null;
}

interface BackendUser {
  name?: string | null;
  username?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  avatar?: string | null;
  providers?: string[] | null;
  isEmailVerified?: boolean | null;
  isPhoneVerified?: boolean | null;
  createdAt?: number | null; // Unix ms
  photographerProfile?: BackendUserPhotographerProfile | null;
}

const PROFILE_PREFERENCES: AccountProfilePage["preferences"] = [
  {
    label: "Default search city",
    value: "Jakarta",
    helper: "Explorer opens with Jakarta and nearby hotspots first.",
  },
  {
    label: "Language",
    value: "English",
    helper: "Receipts, download notes, and account emails.",
  },
  {
    label: "Notification channel",
    value: "Email + WhatsApp",
    helper: "Payment receipts, order readiness, and removal updates.",
  },
];

const PROFILE_PRIVACY: AccountProfilePage["privacy"] = [
  {
    label: "Mask plate numbers in public views",
    enabled: true,
    description: "Full plate metadata stays private unless needed for verified matching.",
  },
  {
    label: "Keep saved searches private",
    enabled: true,
    description: "Saved search terms never appear on photographer dashboards.",
  },
  {
    label: "Require approval before public use",
    enabled: false,
    description: "Ask Captura support to review any image where you are clearly identifiable.",
  },
];

const PROFILE_SHORTCUTS: AccountProfilePage["shortcuts"] = [
  {
    label: "Open library",
    href: "/account/library",
    description: "Downloads, invoices, and license details.",
  },
  {
    label: "Request removal",
    href: "/privacy/removal",
    description: "Ask Captura to hide or review a public moment.",
  },
  {
    label: "Payment support",
    href: "/support",
    description: "Refund, receipt, and failed payment help.",
  },
];

const PROFILE_EMPTY_STATE: AccountProfilePage["emptyState"] = {
  title: "Your profile is ready enough to search.",
  description:
    "Add a phone number and preferred city when you want faster payment confirmation and local photographer recommendations.",
  ctaLabel: "Find a moment",
  ctaHref: "/explorer",
};

function toAvatarInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);

  if (parts.length === 0) {
    return "·";
  }

  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}

function formatMemberSince(createdAt: number | null | undefined): string {
  if (!createdAt) {
    return "Recently joined";
  }

  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
    new Date(createdAt)
  );
}

function toVerificationState(user: BackendUser): VerificationState {
  if (user.isEmailVerified) {
    return "verified";
  }

  return "pending";
}

function toLinkedAccounts(user: BackendUser): LinkedAccount[] {
  const providers = user.providers ?? [];
  const hasGoogle = providers.includes("google");
  const hasApple = providers.includes("apple");

  return [
    {
      provider: "Google",
      value: hasGoogle ? user.email ?? "Connected" : "Not connected",
      status: hasGoogle ? "Connected" : "Optional",
    },
    {
      provider: "Apple",
      value: hasApple ? "Connected" : "Not connected",
      status: hasApple ? "Connected" : "Optional",
    },
    {
      provider: "Phone",
      value: user.phoneNumber ?? "Not added",
      status: user.isPhoneVerified ? "Verified" : "Optional",
    },
  ];
}

function toProfileUser(user: BackendUser): AccountProfilePage["user"] {
  const name = user.name ?? user.username ?? "Captura member";

  return {
    name,
    email: user.email ?? "—",
    phone: user.phoneNumber ?? "Not added",
    city: user.photographerProfile?.location ?? "—",
    avatarInitials: toAvatarInitials(name),
    memberSince: formatMemberSince(user.createdAt),
    verification: toVerificationState(user),
  };
}

/**
 * Loads the signed-in buyer's identity from `GET /users/me`. A failed request
 * (expired session, unreachable backend) propagates to the route error
 * boundary rather than rendering a placeholder identity.
 */
export async function getAccountProfilePageContent(): Promise<AccountProfilePage> {
  const user = await serverApiRequest<BackendUser>("/users/me", {
    auth: true,
    revalidate: false,
  });

  return {
    user: toProfileUser(user),
    preferences: PROFILE_PREFERENCES,
    privacy: PROFILE_PRIVACY,
    shortcuts: PROFILE_SHORTCUTS,
    linkedAccounts: toLinkedAccounts(user),
    emptyState: PROFILE_EMPTY_STATE,
  };
}

// ─── Library: real data from GET /orders/me ─────────────────────────────────
// Backend shapes mirror OrderEntity with the relations enriched server-side.
// The library never receives a plate (stripped by the backend).

interface BackendLibraryPhotographer {
  artistName?: string | null;
}

interface BackendLibraryMoment {
  id?: string | null;
  caption?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  photographerProfile?: BackendLibraryPhotographer | null;
}

interface BackendLicenseType {
  name?: string | null;
}

interface BackendLibraryLicense {
  licenseType?: BackendLicenseType | null;
}

interface BackendOrder {
  id: string;
  status: string;
  totalAmount: number | string;
  currency: string;
  createdAt: number | null; // Unix ms
  moment?: BackendLibraryMoment | null;
  license?: BackendLibraryLicense | null;
}

interface BackendOrdersResult {
  data: BackendOrder[];
  limit: number;
  offset: number;
  total: number;
}

const PAID_STATUS = "PAID";
const PENDING_STATUS = "PENDING";

const LIBRARY_HEADER: AccountLibraryPage["header"] = {
  title: "Your purchased",
  emphasis: "moments",
  description:
    "Every order keeps its license, invoice, photographer credit, and download status in one account surface.",
};

const LIBRARY_EMPTY_STATE: AccountLibraryPage["emptyState"] = {
  title: "No purchased moments yet.",
  description:
    "When checkout is complete, your downloads, invoices, and license details will appear here automatically.",
  ctaLabel: "Explore photos",
  ctaHref: "/explorer",
};

function formatIdr(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}

function formatPurchaseDate(createdAt: number | null): string {
  if (!createdAt) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(createdAt));
}

function toOrderStatus(status: string): OrderStatus {
  if (status === PAID_STATUS) {
    return "ready";
  }

  if (status === PENDING_STATUS) {
    return "processing";
  }

  return "failed";
}

function toDownloadStatus(status: string): DownloadStatus {
  if (status === PAID_STATUS) {
    return "ready";
  }

  if (status === PENDING_STATUS) {
    return "pending";
  }

  return "failed";
}

function toLibraryItem(order: BackendOrder): LibraryItem {
  const moment = order.moment;
  const momentId = moment?.id ?? null;

  return {
    id: order.id,
    title: moment?.caption ?? moment?.description ?? "Captura moment",
    imageUrl: moment?.thumbnailUrl ?? moment?.imageUrl ?? "/window.svg",
    photographer: moment?.photographerProfile?.artistName ?? "Captura photographer",
    purchaseDate: formatPurchaseDate(order.createdAt),
    license: order.license?.licenseType?.name ?? "Standard license",
    fileType: "Full-resolution",
    totalPaid: formatIdr(Number(order.totalAmount)),
    orderStatus: toOrderStatus(order.status),
    downloadStatus: toDownloadStatus(order.status),
    invoiceHref: "/support",
    momentHref: momentId ? `/explorer/${momentId}` : "/explorer",
    supportHref: "/support",
  };
}

function buildLibraryStats(
  orders: BackendOrder[],
  items: LibraryItem[]
): AccountLibraryPage["stats"] {
  const readyDownloads = items.filter((item) => item.downloadStatus === "ready").length;
  const totalSpent = orders
    .filter((order) => order.status === PAID_STATUS)
    .reduce((sum, order) => sum + Number(order.totalAmount), 0);
  const licenseCount = new Set(items.map((item) => item.license)).size;

  return [
    {
      label: "Ready downloads",
      value: String(readyDownloads),
      helper: "Full-resolution files available",
    },
    {
      label: "Total spent",
      value: formatIdr(totalSpent),
      helper: `Across ${items.length} captured moment${items.length === 1 ? "" : "s"}`,
    },
    { label: "Licenses", value: String(licenseCount), helper: "Across your purchases" },
  ];
}

async function fetchMyOrders(): Promise<BackendOrder[]> {
  try {
    const response = await serverApiRequest<BackendOrdersResult>("/orders/me", {
      auth: true,
      revalidate: false,
    });

    return response.data ?? [];
  } catch {
    return [];
  }
}

/**
 * Loads the buyer's purchased moments from `GET /orders/me`. On error (e.g. an
 * expired session or unreachable backend) it returns an empty library rather
 * than fabricating purchases, so the page shows its honest empty state.
 */
export async function getAccountLibraryPageContent(): Promise<AccountLibraryPage> {
  const orders = await fetchMyOrders();
  const items = orders.map(toLibraryItem);

  return {
    header: LIBRARY_HEADER,
    stats: buildLibraryStats(orders, items),
    items,
    emptyState: LIBRARY_EMPTY_STATE,
  };
}
