import { serverApiRequest } from "@/shared/api/serverApi";
import {
  type BookingSummaryItem,
  type DashboardNavItem,
  type PhotographerDashboardPage,
} from "../entities/PhotographerDashboardPage";

// ─── Backend shapes ───────────────────────────────────────────────────────────

interface BackendUser {
  name?: string | null;
  username?: string | null;
  photographerProfile?: { location?: string | null; artistName?: string | null } | null;
}

interface BackendEarningsSummary {
  currency: string;
  orderCount: number;
  photographerShare: number;
  platformFee: number;
  totalRevenue: number;
}

interface BackendPackage {
  name?: string | null;
}

interface BackendBooking {
  id: string;
  status: string;
  proposedDate: number;
  location?: string | null;
  package?: BackendPackage | null;
  user?: { name?: string | null; username?: string | null } | null;
}

interface BackendBookingsResult {
  data: BackendBooking[];
  total: number;
}

interface BackendMomentsResult {
  total: number;
}

// ─── Static page fragments (no backend equivalent yet) ────────────────────────

const DASHBOARD_ALERTS: PhotographerDashboardPage["alerts"] = [
  {
    title: "Lengkapi profil publikmu",
    description:
      "Tambahkan paket dan bio agar calon klien bisa langsung booking. Profil lengkap meningkatkan konversi.",
    actionLabel: "Lihat profil publik",
    actionHref: "/photographers",
    tone: "neutral",
  },
];

const DASHBOARD_QUICK_ACTIONS: PhotographerDashboardPage["quickActions"] = [
  {
    label: "Upload batch",
    description: "Mulai set foto baru dan masukkan ke pipeline AI.",
    href: "/dashboard/photographer/uploads",
    meta: "Studio workflow",
    tone: "accent",
  },
  {
    label: "Kelola moments",
    description: "Edit visibilitas, lisensi, harga, dan cerita publik.",
    href: "/dashboard/photographer/moments",
    meta: "Catalog",
    tone: "neutral",
  },
  {
    label: "Lihat bookings",
    description: "Terima, tolak, atau usulkan waktu sesi baru.",
    href: "/dashboard/photographer/bookings",
    meta: "Requests",
    tone: "success",
  },
  {
    label: "Cek earnings",
    description: "Pantau payout, riwayat order, dan revenue split.",
    href: "/dashboard/photographer/earnings",
    meta: "Keuangan",
    tone: "neutral",
  },
];

const PROFILE_COMPLETION: PhotographerDashboardPage["profileCompletion"] = {
  percentage: 60,
  summary: "Lengkapi profil agar buyer bisa menemukan dan memesan sesimu.",
  actionHref: "/photographers",
  items: [
    { label: "Profil publik tersedia", done: true },
    { label: "Satu paket booking tersedia", done: false },
    { label: "Bio fotografer diisi", done: false },
    { label: "Payout identity siap", done: false },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toPhotographerName(user: BackendUser): string {
  return (
    user.photographerProfile?.artistName ??
    user.name ??
    user.username ??
    "Fotografer Captura"
  );
}

function toPhotographerHandle(user: BackendUser): string {
  const base = user.username ?? user.name ?? "photographer";
  return `@${base.toLowerCase().replace(/\s+/g, ".")}`;
}

function formatIdr(amount: number): string {
  if (amount >= 1_000_000) {
    return `Rp ${(amount / 1_000_000).toFixed(1)}jt`;
  }
  if (amount >= 1_000) {
    return `Rp ${(amount / 1_000).toFixed(0)}rb`;
  }

  return `Rp ${amount.toLocaleString("id-ID")}`;
}

function formatUnixSeconds(seconds: number): { date: string; time: string; label: string } {
  const d = new Date(seconds * 1000);
  const date = d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  const time = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  return { date, label: `${date} · ${time}`, time };
}


function toBookingSummaryItem(booking: BackendBooking): BookingSummaryItem {
  const { label: scheduleLabel } = formatUnixSeconds(booking.proposedDate);
  const clientName =
    booking.user?.name ?? booking.user?.username ?? "Klien";

  return {
    id: booking.id,
    client: clientName,
    location: booking.location ?? "—",
    packageName: booking.package?.name ?? "Custom session",
    schedule: scheduleLabel,
    status: booking.status as BookingSummaryItem["status"],
  };
}

function buildNav(
  pendingCount: number,
  totalMoments: number,
  photographerShare: number,
  analysingCount: number,
): DashboardNavItem[] {
  return [
    { label: "Overview", href: "/dashboard/photographer", status: "Live" },
    {
      label: "Uploads",
      href: "/dashboard/photographer/uploads",
      status: analysingCount > 0 ? `${analysingCount} queued` : "—",
    },
    {
      label: "Moments",
      href: "/dashboard/photographer/moments",
      status: totalMoments > 0 ? String(totalMoments) : "—",
    },
    {
      label: "Bookings",
      href: "/dashboard/photographer/bookings",
      status: pendingCount > 0 ? `${pendingCount} pending` : "—",
    },
    {
      label: "Earnings",
      href: "/dashboard/photographer/earnings",
      status: photographerShare > 0 ? formatIdr(photographerShare) : "—",
    },
  ];
}

// ─── Service ──────────────────────────────────────────────────────────────────

export async function getPhotographerDashboardPageContent(): Promise<PhotographerDashboardPage> {
  const [user, earningsSummary, bookingsResult, momentsResult] = await Promise.all([
    serverApiRequest<BackendUser>("/users/me", { auth: true, revalidate: false }),
    serverApiRequest<BackendEarningsSummary>("/photographers/me/earnings", {
      auth: true,
      revalidate: false,
    }).catch((): BackendEarningsSummary => ({
      currency: "IDR",
      orderCount: 0,
      photographerShare: 0,
      platformFee: 0,
      totalRevenue: 0,
    })),
    serverApiRequest<BackendBookingsResult>("/bookings?limit=5", {
      auth: true,
      revalidate: false,
    }).catch((): BackendBookingsResult => ({ data: [], total: 0 })),
    serverApiRequest<BackendMomentsResult>("/photographers/moments?limit=1", {
      auth: true,
      revalidate: false,
    }).catch((): BackendMomentsResult => ({ total: 0 })),
  ]);

  const bookings = bookingsResult.data ?? [];
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const totalMoments = momentsResult.total ?? 0;

  return {
    photographer: {
      name: toPhotographerName(user),
      area: user.photographerProfile?.location ?? "Jakarta",
      handle: toPhotographerHandle(user),
      availability: "Siap menerima request",
    },
    periodLabel: "Semua waktu",
    nav: buildNav(pendingCount, totalMoments, earningsSummary.photographerShare, 0),
    stats: [
      {
        label: "Revenue",
        value: formatIdr(earningsSummary.photographerShare),
        helper: "70% share fotografer setelah platform split",
        trend: `${earningsSummary.orderCount} total penjualan`,
        tone: "accent",
      },
      {
        label: "Sales",
        value: String(earningsSummary.orderCount),
        helper: "Lisensi yang sudah terjual",
        trend: "Lihat riwayat lengkap →",
        tone: "success",
      },
      {
        label: "Moments",
        value: String(totalMoments),
        helper: "Total foto di katalogmu",
        trend: "Kelola di halaman Moments",
        tone: "neutral",
      },
      {
        label: "Bookings",
        value: String(bookingsResult.total ?? 0),
        helper: "Total booking request yang masuk",
        trend: pendingCount > 0 ? `${pendingCount} menunggu respons` : "Semua sudah direspons",
        tone: pendingCount > 0 ? "warning" : "neutral",
      },
    ],
    alerts: DASHBOARD_ALERTS,
    quickActions: DASHBOARD_QUICK_ACTIONS,
    recentOrders: [],
    uploadQueue: [],
    bookings: bookings.slice(0, 3).map(toBookingSummaryItem),
    recentActivity: [],
    profileCompletion: PROFILE_COMPLETION,
  };
}
