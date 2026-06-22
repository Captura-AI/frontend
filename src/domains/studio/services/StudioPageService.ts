import { serverApiRequest } from "@/shared/api/serverApi";
import { resolveImageUrl } from "@/shared/api/resolveImageUrl";
import type {
  AiLogChip,
  FrameData,
  QueueBadgeType,
  QueueItem,
  QueueItemStatus,
  StudioPage,
  VehicleType,
} from "../entities/StudioPage";

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
}

interface BackendMomentsResult {
  data: BackendMoment[];
  total: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toVehicleType(raw: string | null | undefined): VehicleType {
  const v = (raw ?? "").toLowerCase();

  if (v === "bicycle") return "bicycle";
  if (v === "bus") return "bus";
  if (v === "car") return "car";
  if (v === "motorcycle") return "motorcycle";
  if (v === "truck") return "truck";

  return "other";
}

function formatTime(tsSeconds: number | null | undefined): string {
  if (!tsSeconds) return "—";

  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(tsSeconds * 1000));
}

function formatDate(tsSeconds: number | null | undefined): string {
  if (!tsSeconds) return "—";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(tsSeconds * 1000));
}

function toQueueBadge(moment: BackendMoment, isFirst: boolean): QueueBadgeType {
  if (isFirst) return "ai";
  if (!moment.aiAnalysis || moment.aiAnalysis["error"]) return "scanning";
  return "ok";
}

function toQueueStatus(moment: BackendMoment, isFirst: boolean): QueueItemStatus {
  if (isFirst) return "active";
  if (!moment.aiAnalysis || moment.aiAnalysis["error"]) return "scanning";
  return "done";
}

function toAiLogChips(moment: BackendMoment, plateConf: number): AiLogChip[] {
  const chips: AiLogChip[] = [];

  if (moment.vehicleType) {
    chips.push({
      id: "v",
      type: "AI",
      status: "done",
      content: `Vehicle detected · ${moment.vehicleType.toLowerCase()}`,
    });
  }

  if (moment.licensePlate) {
    chips.push({
      id: "p",
      type: "AI",
      status: "done",
      content: `Plate · ${moment.licensePlate} · ${plateConf}% confidence`,
    });
  }

  if (moment.city) {
    chips.push({
      id: "g",
      type: "GPS",
      status: "done",
      content: [moment.city, moment.district].filter(Boolean).join(" · "),
    });
  }

  return chips;
}

function toFrameData(moment: BackendMoment, index: number, total: number): FrameData {
  const ai = moment.aiAnalysis as Record<string, unknown> | null;
  const hasAi = ai != null && !ai["error"];

  const plateConf =
    hasAi && typeof ai["plate_confidence"] === "number"
      ? Math.round((ai["plate_confidence"] as number) * 100)
      : 0;

  return {
    aiLogChips: hasAi ? toAiLogChips(moment, plateConf) : [],
    camera: moment.cameraInfo ?? "—",
    cameraMeta: moment.cameraInfo ?? "—",
    capturedAt: moment.capturedAt
      ? `${formatDate(moment.capturedAt)} · ${formatTime(moment.capturedAt)} WIB`
      : "—",
    caption: moment.caption ?? "",
    city: moment.city ?? "—",
    district: moment.district ?? "—",
    fileSizeMb: 0,
    fileName: moment.caption ?? `moment-${moment.id.slice(0, 8)}`,
    frameNumber: index + 1,
    imageUrl: resolveImageUrl(moment.imageUrl) ?? "/window.svg",
    licensePlate: moment.licensePlate ?? "—",
    plateConfidence: plateConf,
    priceTiers: [],
    shootDate: formatDate(moment.capturedAt),
    shootTime: formatTime(moment.capturedAt),
    story: "",
    tags: (moment.tags ?? []).map((label, i) => ({ id: `t-${i}`, isAi: true, label })),
    totalFrames: total,
    vehicleType: toVehicleType(moment.vehicleType),
  };
}

const EMPTY_FRAME: FrameData = {
  aiLogChips: [],
  camera: "—",
  cameraMeta: "—",
  capturedAt: "—",
  caption: "",
  city: "—",
  district: "—",
  fileSizeMb: 0,
  fileName: "Tidak ada foto",
  frameNumber: 0,
  imageUrl: "/window.svg",
  licensePlate: "—",
  plateConfidence: 0,
  priceTiers: [],
  shootDate: "—",
  shootTime: "—",
  story: "",
  tags: [],
  totalFrames: 0,
  vehicleType: "other",
};

// ─── Service ──────────────────────────────────────────────────────────────────

export async function getStudioPageData(fromDate?: string): Promise<StudioPage> {
  const result = await serverApiRequest<BackendMomentsResult>(
    "/photographers/moments?limit=50&offset=1",
    { auth: true, revalidate: false },
  ).catch((): BackendMomentsResult => ({ data: [], total: 0 }));

  const allMoments = result.data ?? [];

  const moments = fromDate
    ? allMoments.filter((m) => {
        const ts = m.capturedAt ? m.capturedAt * 1000 : null;
        return ts ? new Date(ts).toISOString().slice(0, 10) === fromDate : false;
      })
    : allMoments;

  const displayMoments = moments.length > 0 ? moments : allMoments;
  const total = displayMoments.length;

  const aiParsed = displayMoments.filter((m) => m.aiAnalysis && !m.aiAnalysis["error"]).length;
  const needReview = displayMoments.filter(
    (m) =>
      m.aiAnalysis &&
      !m.aiAnalysis["error"] &&
      typeof m.aiAnalysis["vehicle_confidence"] === "number" &&
      (m.aiAnalysis["vehicle_confidence"] as number) < 0.5,
  ).length;

  const queue: QueueItem[] = displayMoments.map((m, i) => ({
    badge: toQueueBadge(m, i === 0),
    id: m.id,
    imageUrl: resolveImageUrl(m.thumbnailUrl) ?? resolveImageUrl(m.imageUrl) ?? "/window.svg",
    status: toQueueStatus(m, i === 0),
  }));

  const firstMoment = displayMoments[0];
  const currentFrame = firstMoment ? toFrameData(firstMoment, 0, total) : EMPTY_FRAME;

  const batchName = fromDate
    ? `Sesi ${new Date(fromDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}`
    : "Semua sesi";

  return {
    avatarUrl: "/window.svg",
    balance: {
      amount: "—",
      currency: "Rp",
      period: "This month",
      salesCount: 0,
    },
    batch: {
      avgTimePerFrame: "—",
      locationsResolved: displayMoments.filter((m) => m.city).length,
      name: batchName,
      platesParsed: displayMoments.filter((m) => m.licensePlate).length,
      processed: aiParsed,
      total,
    },
    currentFrame,
    queue,
    stats: {
      aiParsed,
      inQueue: total - aiParsed,
      needReview,
    },
  };
}
