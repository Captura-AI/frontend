import { type DashboardNavItem, type UploadQueueStatus } from "@/domains/photographer-dashboard";
import { type VehicleType } from "@/domains/studio";

export type { UploadQueueStatus, VehicleType };

export interface PlateInfo {
  masked: string;
  full: string;
  confidence: number;
}

export interface CaptureLocation {
  city: string;
  district: string;
  capturedAt: string;
  camera: string;
}

export interface AiTag {
  id: string;
  label: string;
  isAi: boolean;
}

export interface AiReviewSummary {
  vehicleType: VehicleType;
  plate: PlateInfo;
  location: CaptureLocation;
  tags: AiTag[];
  confidence: number;
}

export interface UploadFrame {
  id: string;
  fileName: string;
  thumbnailUrl: string;
  status: UploadQueueStatus;
  progress: number;
  ai: AiReviewSummary | null;
  errorMessage: string | null;
}

export interface UploadBatch {
  id: string;
  name: string;
  createdAt: string;
  location: string;
  status: UploadQueueStatus;
  progress: number;
  totalFrames: number;
  processedFrames: number;
  frames: UploadFrame[];
}

export interface UploadPanelConfig {
  acceptedFormats: string[];
  maxFileSizeMb: number;
  maxBatchSize: number;
  helperText: string;
}

export interface UploadsSummary {
  totalQueued: number;
  analyzing: number;
  needsReview: number;
  ready: number;
  failed: number;
}

export interface PhotographerUploadsPage {
  photographer: {
    name: string;
    handle: string;
  };
  nav: DashboardNavItem[];
  summary: UploadsSummary;
  uploadPanel: UploadPanelConfig;
  batches: UploadBatch[];
  studioHref: string;
}
