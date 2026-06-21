import { serverApiRequest } from "@/shared/api/serverApi";
import { type PhotographerEarningsPage } from "../entities/PhotographerEarningsPage";

// ─── Backend shapes ───────────────────────────────────────────────────────────

interface BackendUser {
  name?: string | null;
  username?: string | null;
  photographerProfile?: { artistName?: string | null } | null;
}

interface BackendEarningsSummary {
  currency: string;
  orderCount: number;
  photographerShare: number;
  platformFee: number;
  totalRevenue: number;
}

interface BackendOrder {
  id: string;
  status: string;
  totalAmount: number | string;
  currency: string;
  createdAt: number;
}

interface BackendEarningsHistoryResult {
  data: BackendOrder[];
  total: number;
}

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

function formatPurchaseDate(createdAtMs: number): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(createdAtMs));
}

function toEarningsOrder(order: BackendOrder): PhotographerEarningsPage["periods"][number]["orders"][number] {
  return {
    id: order.id,
    title: `Order #${order.id.slice(0, 8).toUpperCase()}`,
    buyer: "—",
    license: "Personal use",
    amount: Number(order.totalAmount),
    status: "paid",
    date: formatPurchaseDate(order.createdAt),
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

export async function getPhotographerEarningsPageContent(): Promise<PhotographerEarningsPage> {
  const [user, summary, history] = await Promise.all([
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
    serverApiRequest<BackendEarningsHistoryResult>(
      "/photographers/me/earnings/history?limit=20&offset=1",
      { auth: true, revalidate: false }
    ).catch((): BackendEarningsHistoryResult => ({ data: [], total: 0 })),
  ]);

  const orders = (history.data ?? []).map(toEarningsOrder);

  return {
    photographer: {
      name: toPhotographerName(user),
      handle: toPhotographerHandle(user),
    },
    nav: [
      { label: "Overview", href: "/dashboard/photographer", status: "Live" },
      { label: "Uploads", href: "/dashboard/photographer/uploads" },
      { label: "Moments", href: "/dashboard/photographer/moments" },
      { label: "Bookings", href: "/dashboard/photographer/bookings" },
      { label: "Earnings", href: "/dashboard/photographer/earnings", status: "—" },
    ],
    splitNote:
      "Kamu menerima 70% dari setiap penjualan. Captura menahan 30% untuk platform, pembayaran, dan support.",
    defaultPeriodId: "all-time",
    periods: [
      {
        id: "all-time",
        label: "Semua waktu",
        trend: `${summary.orderCount} total penjualan`,
        grossSales: summary.totalRevenue,
        photographerShare: summary.photographerShare,
        platformFee: summary.platformFee,
        salesCount: summary.orderCount,
        pendingBalance: 0,
        payout: {
          status: "scheduled",
          amount: 0,
          scheduledDate: "Belum tersedia (Phase 19)",
          method: "—",
        },
        orders,
      },
    ],
  };
}
