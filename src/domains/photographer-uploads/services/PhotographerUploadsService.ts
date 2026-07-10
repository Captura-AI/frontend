import { serverApiRequest } from "@/shared/api/serverApi";
import { resolveImageUrl } from "@/shared/api/resolveImageUrl";
import { type BackendMomentsResult, type BackendUser } from "@/shared/types/common";
import { maskPlate } from "@/shared/utils/plate.utils";
import { toPhotographerHandle, toPhotographerName } from "@/shared/utils/photographer.utils";
import { type PhotographerUploadsPage, type UploadQueueStatus } from "../entities/PhotographerUploadsPage";

// ─── Backend shapes ───────────────────────────────────────────────────────────

interface BackendMoment {
  id: string;
  caption?: string | null;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  city?: string | null;
  district?: string | null;
  capturedAt?: number | null;
  vehicleType?: string | null;
  licensePlate?: string | null;
  cameraInfo?: string | null;
  tags?: string[] | null;
  aiAnalysis?: Record<string, unknown> | null;
  createdAt?: number | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function deriveUploadStatus(
  aiAnalysis: Record<string, unknown> | null | undefined,
  imageUrl: string | null | undefined,
): UploadQueueStatus {
  if (!imageUrl) {
    return "uploaded";
  }

  if (aiAnalysis == null) {
    return "analyzing";
  }

  if (aiAnalysis["error"]) {
    return "failed";
  }

  const confidence =
    typeof aiAnalysis["vehicle_confidence"] === "number"
      ? aiAnalysis["vehicle_confidence"]
      : 1;

  return confidence < 0.5 ? "needs-review" : "ready";
}

function formatDate(tsMs: number | null | undefined): string {
  if (!tsMs) return "—";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(tsMs));
}

function toUploadFrame(moment: BackendMoment): PhotographerUploadsPage["batches"][number]["frames"][number] {
  const status = deriveUploadStatus(moment.aiAnalysis, moment.imageUrl);
  const plate = moment.licensePlate ?? null;
  const ai = moment.aiAnalysis;
  const hasAi = ai != null && !ai["error"];

  return {
    id: moment.id,
    errorMessage: ai?.["error"] ? String(ai["error"]) : null,
    fileName: moment.caption ?? `moment-${moment.id.slice(0, 8)}`,
    progress: hasAi ? 100 : status === "analyzing" ? 50 : 0,
    status,
    thumbnailUrl: resolveImageUrl(moment.thumbnailUrl) ?? resolveImageUrl(moment.imageUrl) ?? "/window.svg",
    ai: hasAi
      ? {
          confidence: typeof ai["vehicle_confidence"] === "number" ? Math.round(ai["vehicle_confidence"] * 100) : 80,
          location: {
            capturedAt: moment.capturedAt
              ? new Date(moment.capturedAt * 1000).toLocaleString("id-ID")
              : "—",
            camera: moment.cameraInfo ?? "—",
            city: moment.city ?? "—",
            district: moment.district ?? "—",
          },
          plate: {
            confidence: typeof ai["plate_confidence"] === "number" ? Math.round(ai["plate_confidence"] * 100) : 0,
            full: plate ?? "—",
            masked: plate ? maskPlate(plate) : "—",
          },
          tags: (moment.tags ?? []).map((tag, i) => ({ id: `tag-${i}`, isAi: true, label: tag })),
          vehicleType:
            (moment.vehicleType?.toLowerCase() ?? "other") as NonNullable<PhotographerUploadsPage["batches"][number]["frames"][number]["ai"]>["vehicleType"],
        }
      : null,
  };
}

// Converts any raw timestamp (number or string, seconds or ms) to safe milliseconds.
// Postgres bigint columns are sometimes serialised as strings in JSON — Number()
// coercion handles that. The < 1e12 heuristic distinguishes Unix-seconds from
// Unix-ms (1e12 ms ≈ year 2001, so any seconds-based 2020+ date is < 1e12).
function toMs(ts: number | string | null | undefined): number | null {
  if (ts == null) return null;

  const n = Number(ts);

  if (!isFinite(n) || n <= 0) return null;

  return n < 1e12 ? n * 1000 : n;
}

function toDateKey(ts: number | string | null | undefined): string | null {
  const ms = toMs(ts);

  if (!ms) return null;

  const d = new Date(ms);

  return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

function groupByDate(moments: BackendMoment[]): BackendMoment[][] {
  const groups = new Map<string, BackendMoment[]>();

  for (const m of moments) {
    const key = toDateKey(m.capturedAt) ?? toDateKey(m.createdAt) ?? "unknown";

    const group = groups.get(key) ?? [];
    group.push(m);
    groups.set(key, group);
  }

  return Array.from(groups.values());
}

function toBatch(
  moments: BackendMoment[],
  index: number,
): PhotographerUploadsPage["batches"][number] {
  const frames = moments.map(toUploadFrame);
  const processedFrames = frames.filter((f) => f.status !== "uploaded" && f.status !== "analyzing").length;

  const statusPriority: UploadQueueStatus[] = [
    "failed",
    "needs-review",
    "analyzing",
    "uploaded",
    "ready",
  ];
  const worstStatus =
    statusPriority.find((s) => frames.some((f) => f.status === s)) ?? "ready";

  const firstMoment = moments[0];
  const batchMs = toMs(firstMoment?.capturedAt) ?? toMs(firstMoment?.createdAt) ?? null;
  const batchDateIso = batchMs ? new Date(batchMs).toISOString().slice(0, 10) : null;

  return {
    id: `batch-${index}-${firstMoment?.id?.slice(0, 8) ?? index}`,
    createdAt: formatDate(batchMs),
    frames: frames.slice(0, 5),
    location: [firstMoment?.district, firstMoment?.city].filter(Boolean).join(", ") || "—",
    name: `Sesi ${new Date(batchMs ?? Date.now()).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}`,
    processedFrames,
    progress: frames.length > 0 ? Math.round((processedFrames / frames.length) * 100) : 0,
    status: worstStatus,
    studioHref: batchDateIso ? `/studio?from=${batchDateIso}` : "/studio",
    totalFrames: moments.length,
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

const UPLOAD_PANEL: PhotographerUploadsPage["uploadPanel"] = {
  acceptedFormats: ["JPEG", "PNG", "RAW"],
  helperText: "Drop frames dari satu sesi — Captura mengelompokkan berdasarkan waktu capture dan lokasi.",
  maxBatchSize: 60,
  maxFileSizeMb: 25,
};

export async function getPhotographerUploadsPageContent(): Promise<PhotographerUploadsPage> {
  const [user, result] = await Promise.all([
    serverApiRequest<BackendUser>("/users/me", { auth: true, revalidate: false }),
    serverApiRequest<BackendMomentsResult<BackendMoment>>("/photographers/moments?limit=50&offset=1", {
      auth: true,
      revalidate: false,
    }).catch((): BackendMomentsResult<BackendMoment> => ({ data: [], total: 0 })),
  ]);

  const moments = result.data ?? [];
  const groups = groupByDate(moments);
  const batches = groups.map(toBatch);

  const allFrames = batches.flatMap((b) => b.frames);
  const summary: PhotographerUploadsPage["summary"] = {
    analyzing: allFrames.filter((f) => f.status === "analyzing").length,
    failed: allFrames.filter((f) => f.status === "failed").length,
    needsReview: allFrames.filter((f) => f.status === "needs-review").length,
    ready: allFrames.filter((f) => f.status === "ready").length,
    totalQueued: allFrames.filter((f) => f.status === "uploaded" || f.status === "analyzing").length,
  };

  return {
    photographer: {
      name: toPhotographerName(user),
      handle: toPhotographerHandle(user),
    },
    nav: [
      { label: "Overview", href: "/dashboard/photographer", status: "Live" },
      {
        label: "Uploads",
        href: "/dashboard/photographer/uploads",
        status: summary.totalQueued > 0 ? `${summary.totalQueued} queued` : "—",
      },
      { label: "Moments", href: "/dashboard/photographer/moments" },
      { label: "Bookings", href: "/dashboard/photographer/bookings" },
      { label: "Earnings", href: "/dashboard/photographer/earnings" },
    ],
    summary,
    uploadPanel: UPLOAD_PANEL,
    batches,
    studioHref: "/studio",
  };
}
