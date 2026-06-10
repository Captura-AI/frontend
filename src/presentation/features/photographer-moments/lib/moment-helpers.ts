import { type LicenseType, type MomentStatus, type VehicleType } from "@/domains/photographer-moments";

export type BadgeTone = "neutral" | "accent" | "warning" | "success" | "danger";

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

export function formatPrice(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}
