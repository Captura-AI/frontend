import { serverApiRequest } from "@/shared/api/serverApi";
import { type PhotographerBookingsPage } from "../entities/PhotographerBookingsPage";

// ─── Backend shapes ───────────────────────────────────────────────────────────

interface BackendUser {
  name?: string | null;
  username?: string | null;
}

interface BackendPackage {
  name?: string | null;
  price?: number | null;
}

interface BackendBooking {
  id: string;
  status: string;
  proposedDate: number;
  counterProposedDate?: number | null;
  location?: string | null;
  message?: string | null;
  agreedPrice?: number | null;
  currency: string;
  createdAt: number;
  user?: BackendUser | null;
  package?: BackendPackage | null;
}

interface BackendBookingsResult {
  data: BackendBooking[];
  total: number;
}

interface BackendPhotographerUser {
  name?: string | null;
  username?: string | null;
  photographerProfile?: { artistName?: string | null } | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatUnixSeconds(seconds: number): { date: string; time: string; label: string } {
  const d = new Date(seconds * 1000);
  const date = d.toISOString().slice(0, 10);
  const time = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateLabel = d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return { date, label: `${dateLabel} · ${time}`, time };
}

function formatCreatedAgo(createdAtMs: number): string {
  const diffMs = Date.now() - createdAtMs;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    return "Baru saja";
  }

  if (diffHours < 24) {
    return `${diffHours} jam lalu`;
  }

  const diffDays = Math.floor(diffHours / 24);

  if (diffDays === 1) {
    return "Kemarin";
  }

  return `${diffDays} hari lalu`;
}

function toBookingRequest(booking: BackendBooking): PhotographerBookingsPage["requests"][number] {
  const { date, time, label: scheduleLabel } = formatUnixSeconds(booking.proposedDate);
  const clientName = booking.user?.name ?? booking.user?.username ?? "Klien";

  return {
    id: booking.id,
    client: clientName,
    duration: "TBD",
    location: booking.location ?? "—",
    notes: booking.message ?? "—",
    packageName: booking.package?.name ?? "Custom session",
    price: booking.package?.price ?? booking.agreedPrice ?? 0,
    requestedAgo: formatCreatedAgo(booking.createdAt),
    scheduleDate: date,
    scheduleLabel,
    scheduleTime: time,
    status: booking.status as PhotographerBookingsPage["requests"][number]["status"],
  };
}

function toPhotographerName(user: BackendPhotographerUser): string {
  return (
    user.photographerProfile?.artistName ??
    user.name ??
    user.username ??
    "Fotografer Captura"
  );
}

function toPhotographerHandle(user: BackendPhotographerUser): string {
  const base = user.username ?? user.name ?? "photographer";
  return `@${base.toLowerCase().replace(/\s+/g, ".")}`;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export async function getPhotographerBookingsPageContent(): Promise<PhotographerBookingsPage> {
  const [user, bookingsResult] = await Promise.all([
    serverApiRequest<BackendPhotographerUser>("/users/me", { auth: true, revalidate: false }),
    serverApiRequest<BackendBookingsResult>("/bookings?limit=50", {
      auth: true,
      revalidate: false,
    }).catch((): BackendBookingsResult => ({ data: [], total: 0 })),
  ]);

  const bookings = bookingsResult.data ?? [];
  const requests = bookings.map(toBookingRequest);
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return {
    photographer: {
      name: toPhotographerName(user),
      handle: toPhotographerHandle(user),
    },
    nav: [
      { label: "Overview", href: "/dashboard/photographer", status: "Live" },
      { label: "Uploads", href: "/dashboard/photographer/uploads" },
      { label: "Moments", href: "/dashboard/photographer/moments" },
      {
        label: "Bookings",
        href: "/dashboard/photographer/bookings",
        status: pendingCount > 0 ? `${pendingCount} pending` : "—",
      },
      { label: "Earnings", href: "/dashboard/photographer/earnings" },
    ],
    summary: [
      { id: "pending", label: "Pending", helper: "Menunggu responsmu" },
      { id: "accepted", label: "Accepted", helper: "Terkonfirmasi di jadwalmu" },
      { id: "declined", label: "Declined", helper: "Tidak dilanjutkan" },
      { id: "completed", label: "Completed", helper: "Selesai dan diarsipkan" },
      { id: "cancelled", label: "Cancelled", helper: "Dibatalkan oleh klien atau kamu" },
    ],
    filters: [
      { id: "all", label: "Semua" },
      { id: "pending", label: "Pending" },
      { id: "accepted", label: "Accepted" },
      { id: "declined", label: "Declined" },
      { id: "completed", label: "Completed" },
      { id: "cancelled", label: "Cancelled" },
    ],
    requests,
    schedule: [],
    packages: [],
    profileBookingHref: "/photographers",
  };
}
