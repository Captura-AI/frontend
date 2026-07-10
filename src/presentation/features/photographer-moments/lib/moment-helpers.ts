import { type LicenseType, type MomentStatus, type VehicleType } from "@/domains/photographer-moments";
import { type BadgeTone, formatPrice } from "@/presentation/lib/utils";

export type { BadgeTone };
export { formatPrice };

export const vehicleLabels: Record<VehicleType, string> = {
  bicycle: "Bicycle",
  bus: "Bus",
  car: "Car",
  motorcycle: "Motorcycle",
  truck: "Truck",
  other: "Other",
};

export const statusLabels: Record<MomentStatus, string> = {
  draft: "Draft",
  published: "Published",
  hidden: "Hidden",
  sold: "Sold",
  "needs-metadata": "Needs metadata",
};

export const statusTone: Record<MomentStatus, BadgeTone> = {
  draft: "neutral",
  published: "success",
  hidden: "neutral",
  sold: "accent",
  "needs-metadata": "warning",
};

export const LICENSE_OPTIONS: LicenseType[] = ["Personal use", "Editorial", "Commercial", "Exclusive"];
