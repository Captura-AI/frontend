import { serverApiRequest } from "@/shared/api/serverApi";
import { type PhotographerMomentsPage } from "../entities/PhotographerMomentsPage";

// ─── Backend shapes ───────────────────────────────────────────────────────────

interface BackendUser {
  name?: string | null;
  username?: string | null;
  photographerProfile?: { artistName?: string | null } | null;
}

interface BackendMoment {
  id: string;
  caption?: string | null;
  story?: string | null;
  tags?: string[] | null;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  city?: string | null;
  district?: string | null;
  capturedAt?: number | null;
  vehicleType?: string | null;
  licensePlate?: string | null;
  aiAnalysis?: Record<string, unknown> | null;
}

interface BackendMomentsResult {
  data: BackendMoment[];
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

function maskPlate(plate: string): string {
  const parts = plate.trim().split(/\s+/);

  if (parts.length < 2) {
    return `${plate.slice(0, 2)}** ***`;
  }

  const [prefix, ...rest] = parts;
  const masked = rest.map((part, i) => (i === 0 ? `${part.slice(0, 2)}**` : "***"));

  return `${prefix} ${masked.join(" ")}`;
}

function deriveMomentStatus(
  moment: BackendMoment,
): PhotographerMomentsPage["moments"][number]["status"] {
  if (!moment.aiAnalysis) {
    return "draft";
  }

  if (moment.aiAnalysis["error"]) {
    return "needs-metadata";
  }

  return "published";
}

function formatCapturedDate(capturedAtSeconds: number | null | undefined): {
  date: string;
  time: string;
} {
  if (!capturedAtSeconds) {
    return { date: "—", time: "—" };
  }

  const d = new Date(capturedAtSeconds * 1000);

  return {
    date: d.toISOString().slice(0, 10),
    time: d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }),
  };
}

function toMoment(m: BackendMoment): PhotographerMomentsPage["moments"][number] {
  const plate = m.licensePlate ?? null;
  const { date, time } = formatCapturedDate(m.capturedAt);

  return {
    id: m.id,
    capturedDate: date,
    capturedTime: time,
    dateLabel: date !== "—" ? `${date} · ${time}` : "Waktu tidak tersedia",
    license: "Personal use",
    location: [m.district, m.city].filter(Boolean).join(", ") || "—",
    plate: {
      full: plate ?? "—",
      masked: plate ? maskPlate(plate) : "—",
    },
    price: 0,
    status: deriveMomentStatus(m),
    story: m.story ?? "",
    tags: m.tags ?? [],
    thumbnailUrl: m.thumbnailUrl ?? m.imageUrl ?? "/window.svg",
    title: m.caption ?? "Moment tanpa judul",
    vehicleType: (m.vehicleType?.toLowerCase() ?? "other") as PhotographerMomentsPage["moments"][number]["vehicleType"],
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

export async function getPhotographerMomentsPageContent(): Promise<PhotographerMomentsPage> {
  const [user, result] = await Promise.all([
    serverApiRequest<BackendUser>("/users/me", { auth: true, revalidate: false }),
    serverApiRequest<BackendMomentsResult>("/photographers/moments?limit=20&offset=1", {
      auth: true,
      revalidate: false,
    }).catch((): BackendMomentsResult => ({ data: [], total: 0 })),
  ]);

  const moments = (result.data ?? []).map(toMoment);
  const totalMoments = result.total ?? 0;

  return {
    photographer: {
      name: toPhotographerName(user),
      handle: toPhotographerHandle(user),
    },
    nav: [
      { label: "Overview", href: "/dashboard/photographer", status: "Live" },
      { label: "Uploads", href: "/dashboard/photographer/uploads" },
      {
        label: "Moments",
        href: "/dashboard/photographer/moments",
        status: totalMoments > 0 ? String(totalMoments) : "—",
      },
      { label: "Bookings", href: "/dashboard/photographer/bookings" },
      { label: "Earnings", href: "/dashboard/photographer/earnings" },
    ],
    catalogTotal: totalMoments,
    summary: [
      { id: "draft", label: "Draft", helper: "Belum terlihat oleh buyer" },
      { id: "published", label: "Published", helper: "Live di explorer search" },
      { id: "hidden", label: "Hidden", helper: "Tersimpan tapi tidak muncul di search" },
      { id: "sold", label: "Sold", helper: "Sudah dilisensikan ke buyer" },
      { id: "needs-metadata", label: "Needs metadata", helper: "Perlu detail publik yang aman" },
    ],
    filters: [
      { id: "all", label: "Semua" },
      { id: "draft", label: "Draft" },
      { id: "published", label: "Published" },
      { id: "hidden", label: "Hidden" },
      { id: "sold", label: "Sold" },
      { id: "needs-metadata", label: "Needs metadata" },
    ],
    explorerBaseHref: "/explorer",
    moments,
  };
}
