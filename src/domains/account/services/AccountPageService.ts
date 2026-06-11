import {
  type AccountLibraryPage,
  type AccountProfilePage,
} from "../entities/AccountPage";

export function getAccountProfilePageContent(): AccountProfilePage {
  return {
    user: {
      name: "Ayaka Tan",
      email: "ayaka@captura.studio",
      phone: "+62 812 3456 7890",
      city: "Jakarta Selatan",
      avatarInitials: "AT",
      memberSince: "Apr 2026",
      verification: "verified",
    },
    preferences: [
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
    ],
    privacy: [
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
    ],
    shortcuts: [
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
    ],
    linkedAccounts: [
      { provider: "Google", value: "ayaka@captura.studio", status: "Connected" },
      { provider: "WhatsApp", value: "+62 812 3456 7890", status: "Receipt alerts" },
      { provider: "Apple", value: "Not connected", status: "Optional" },
    ],
    emptyState: {
      title: "Your profile is ready enough to search.",
      description:
        "Add a phone number and preferred city when you want faster payment confirmation and local photographer recommendations.",
      ctaLabel: "Find a moment",
      ctaHref: "/explorer",
    },
  };
}

export function getAccountLibraryPageContent(): AccountLibraryPage {
  const items = [
    {
      id: "ord-01428",
      title: "Seen near Shibuya, just before dusk",
      imageUrl:
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=900&q=80&auto=format&fit=crop",
      photographer: "Ayaka Mori",
      purchaseDate: "Apr 12, 2026",
      license: "Personal print",
      fileType: "TIFF + web JPG",
      totalPaid: "USD 53.90",
      orderStatus: "ready",
      downloadStatus: "ready",
      invoiceHref: "/invoices/ord-01428",
      momentHref: "/explorer/m-1",
      supportHref: "/support/orders/ord-01428",
    },
    {
      id: "ord-01631",
      title: "Morning riders on Jalan Sudirman",
      imageUrl:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80&auto=format&fit=crop",
      photographer: "Sari Wirawan",
      purchaseDate: "May 02, 2026",
      license: "Editorial web",
      fileType: "JPG export",
      totalPaid: "USD 34.40",
      orderStatus: "processing",
      downloadStatus: "processing",
      invoiceHref: "/invoices/ord-01631",
      momentHref: "/explorer/m-7",
      supportHref: "/support/orders/ord-01631",
    },
    {
      id: "ord-01702",
      title: "Blue coupe at golden hour",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80&auto=format&fit=crop",
      photographer: "Rafi Pradana",
      purchaseDate: "May 20, 2026",
      license: "Personal archive",
      fileType: "HEIC + JPG",
      totalPaid: "USD 28.00",
      orderStatus: "failed",
      downloadStatus: "failed",
      invoiceHref: "/invoices/ord-01702",
      momentHref: "/explorer/m-9",
      supportHref: "/support/orders/ord-01702",
    },
  ] satisfies AccountLibraryPage["items"];

  return {
    header: {
      title: "Your purchased",
      emphasis: "moments",
      description:
        "Every order keeps its license, invoice, photographer credit, and download status in one account surface.",
    },
    stats: [
      { label: "Ready downloads", value: "1", helper: "Full-resolution files available" },
      { label: "Total spent", value: "USD 116.30", helper: "Across 3 captured moments" },
      { label: "Licenses", value: "3", helper: "Personal and editorial usage" },
    ],
    items,
    emptyState: {
      title: "No purchased moments yet.",
      description:
        "When checkout is complete, your downloads, invoices, and license details will appear here automatically.",
      ctaLabel: "Explore photos",
      ctaHref: "/explorer",
    },
  };
}
