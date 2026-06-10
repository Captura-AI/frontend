import { type DashboardNavItem } from "@/domains/photographer-dashboard";
import { type LicenseType, type VehicleType } from "@/domains/studio";

export type { DashboardNavItem, LicenseType, VehicleType };

export type MomentStatus = "draft" | "published" | "hidden" | "sold" | "needs-metadata";
export type MomentFilterId = "all" | MomentStatus;

export interface MomentPlate {
  masked: string;
  full: string;
}

export interface Moment {
  id: string;
  thumbnailUrl: string;
  title: string;
  story: string;
  tags: string[];
  location: string;
  capturedDate: string;
  capturedTime: string;
  dateLabel: string;
  vehicleType: VehicleType;
  plate: MomentPlate;
  price: number;
  license: LicenseType;
  status: MomentStatus;
}

export interface MomentFilterTab {
  id: MomentFilterId;
  label: string;
}

export interface MomentsSummaryStat {
  id: MomentStatus;
  label: string;
  helper: string;
}

export interface PhotographerMomentsPage {
  photographer: {
    name: string;
    handle: string;
  };
  nav: DashboardNavItem[];
  catalogTotal: number;
  summary: MomentsSummaryStat[];
  filters: MomentFilterTab[];
  moments: Moment[];
  explorerBaseHref: string;
}
