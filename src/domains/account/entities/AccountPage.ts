export type DownloadStatus = "ready" | "processing" | "pending" | "failed" | "refunded";
export type OrderStatus = "paid" | "processing" | "ready" | "refunded" | "failed";
export type VerificationState = "verified" | "pending" | "incomplete";

export interface AccountShortcut {
  label: string;
  href: string;
  description: string;
}

export interface AccountPreference {
  label: string;
  value: string;
  helper: string;
}

export interface PrivacyPreference {
  label: string;
  enabled: boolean;
  description: string;
}

export interface LinkedAccount {
  provider: string;
  value: string;
  status: string;
}

export interface AccountProfilePage {
  user: {
    name: string;
    email: string;
    phone: string;
    city: string;
    avatarInitials: string;
    memberSince: string;
    verification: VerificationState;
  };
  preferences: AccountPreference[];
  privacy: PrivacyPreference[];
  shortcuts: AccountShortcut[];
  linkedAccounts: LinkedAccount[];
  emptyState: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export interface LibraryItem {
  id: string;
  title: string;
  imageUrl: string;
  photographer: string;
  purchaseDate: string;
  license: string;
  fileType: string;
  totalPaid: string;
  orderStatus: OrderStatus;
  downloadStatus: DownloadStatus;
  invoiceHref: string;
  momentHref: string;
  supportHref: string;
}

export interface AccountLibraryPage {
  header: {
    title: string;
    emphasis: string;
    description: string;
  };
  stats: Array<{
    label: string;
    value: string;
    helper: string;
  }>;
  items: LibraryItem[];
  emptyState: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
}
