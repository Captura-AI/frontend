import { type BookingRequestStatus, type ScheduleStatus } from "@/domains/photographer-bookings";
import { type BadgeTone, formatPrice } from "@/presentation/lib/utils";

export type { BadgeTone };
export { formatPrice };

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
