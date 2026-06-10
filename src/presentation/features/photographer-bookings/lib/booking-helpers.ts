import { type BookingRequestStatus, type ScheduleStatus } from "@/domains/photographer-bookings";

export type BadgeTone = "neutral" | "accent" | "warning" | "success" | "danger";

export const statusLabels: Record<BookingRequestStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  declined: "Declined",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const statusTone: Record<BookingRequestStatus, BadgeTone> = {
  pending: "warning",
  accepted: "success",
  declined: "danger",
  completed: "accent",
  cancelled: "neutral",
};

export const scheduleStatusLabels: Record<ScheduleStatus, string> = {
  accepted: "Confirmed",
  completed: "Completed",
};

export function formatPrice(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}
