import { type DashboardNavItem } from "@/domains/photographer-dashboard";

export type { DashboardNavItem };

export type BookingRequestStatus = "pending" | "accepted" | "declined" | "completed" | "cancelled";
export type BookingFilterId = "all" | BookingRequestStatus;
export type ScheduleStatus = Extract<BookingRequestStatus, "accepted" | "completed">;

export interface BookingRequest {
  id: string;
  client: string;
  packageName: string;
  duration: string;
  location: string;
  scheduleDate: string;
  scheduleTime: string;
  scheduleLabel: string;
  status: BookingRequestStatus;
  price: number;
  notes: string;
  requestedAgo: string;
}

export interface BookingFilterTab {
  id: BookingFilterId;
  label: string;
}

export interface BookingsSummaryStat {
  id: BookingRequestStatus;
  label: string;
  helper: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  client: string;
  packageName: string;
  location: string;
  status: ScheduleStatus;
}

export interface ScheduleDay {
  dateLabel: string;
  items: ScheduleItem[];
}

export interface PackageShortcut {
  id: string;
  name: string;
  price: number;
  description: string;
  bookingsCount: number;
}

export interface PhotographerBookingsPage {
  photographer: { name: string; handle: string };
  nav: DashboardNavItem[];
  summary: BookingsSummaryStat[];
  filters: BookingFilterTab[];
  requests: BookingRequest[];
  schedule: ScheduleDay[];
  packages: PackageShortcut[];
  profileBookingHref: string;
}
