export type QueueItemStatus = "active" | "scanning" | "done";
export type QueueBadgeType = "ai" | "scanning" | "ok";

export interface QueueItem {
  id: string;
  imageUrl: string;
  status: QueueItemStatus;
  badge: QueueBadgeType;
}

export interface BatchStats {
  name: string;
  processed: number;
  total: number;
  platesParsed: number;
  locationsResolved: number;
  avgTimePerFrame: string;
}

export interface StudioHeaderStats {
  inQueue: number;
  aiParsed: number;
  needReview: number;
}

export type AiChipStatus = "done" | "thinking";

export interface AiLogChip {
  id: string;
  type: "AI" | "GPS";
  status: AiChipStatus;
  content: string;
}

export type VehicleType = "bicycle" | "bus" | "car" | "motorcycle" | "truck" | "other";

export interface FrameTag {
  id: string;
  label: string;
  isAi: boolean;
}

export type LicenseType = "Personal use" | "Editorial" | "Commercial" | "Exclusive";

export interface PriceTier {
  id: string;
  licenseType: LicenseType;
  description: string;
  currency: string;
  amount: string;
}

export interface FrameData {
  momentId: string;
  frameNumber: number;
  totalFrames: number;
  fileName: string;
  fileSizeMb: number;
  imageUrl: string;
  cameraMeta: string;
  shootDate: string;
  shootTime: string;
  aiLogChips: AiLogChip[];
  caption: string;
  story: string;
  capturedAt: string;
  camera: string;
  city: string;
  district: string;
  vehicleType: VehicleType;
  licensePlate: string;
  plateConfidence: number;
  tags: FrameTag[];
  priceTiers: PriceTier[];
}

export interface PhotographerBalance {
  currency: string;
  amount: string;
  period: string;
  salesCount: number;
}

export interface StudioPage {
  balance: PhotographerBalance;
  avatarUrl: string;
  stats: StudioHeaderStats;
  batch: BatchStats;
  queue: QueueItem[];
  frames: FrameData[];
}
