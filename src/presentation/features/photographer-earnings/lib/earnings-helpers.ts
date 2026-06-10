import { type OrderStatus, type PayoutStatus } from "@/domains/photographer-earnings";

export type BadgeTone = "neutral" | "accent" | "warning" | "success" | "danger";

export const orderStatusLabels: Record<OrderStatus, string> = {
  paid: "Paid",
  ready: "Ready",
  processing: "Processing",
  refunded: "Refunded",
};

export const orderStatusTone: Record<OrderStatus, BadgeTone> = {
  paid: "success",
  ready: "accent",
  processing: "warning",
  refunded: "danger",
};

export const payoutStatusLabels: Record<PayoutStatus, string> = {
  scheduled: "Scheduled",
  processing: "Processing",
  paid: "Paid",
};

export const payoutStatusTone: Record<PayoutStatus, BadgeTone> = {
  scheduled: "neutral",
  processing: "warning",
  paid: "success",
};

export function formatPrice(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}
