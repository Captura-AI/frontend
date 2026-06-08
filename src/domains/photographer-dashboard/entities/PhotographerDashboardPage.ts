export type DashboardTone = "neutral" | "accent" | "success" | "warning" | "danger";
export type ActivityKind = "order" | "upload" | "booking" | "review";
export type UploadQueueStatus = "uploaded" | "analyzing" | "needs-review" | "ready" | "failed";
export type BookingStatus = "pending" | "accepted" | "completed";

export interface DashboardNavItem {
  label: string;
  href: string;
  status?: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  helper: string;
  trend: string;
  tone: DashboardTone;
}

export interface DashboardAlert {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  tone: DashboardTone;
}

export interface DashboardQuickAction {
  label: string;
  description: string;
  href: string;
  meta: string;
  tone: DashboardTone;
}

export interface RecentOrder {
  id: string;
  title: string;
  buyer: string;
  license: string;
  amount: string;
  status: string;
}

export interface UploadQueueItem {
  id: string;
  batchName: string;
  status: UploadQueueStatus;
  progress: number;
  frames: string;
  helper: string;
}

export interface BookingSummaryItem {
  id: string;
  client: string;
  location: string;
  schedule: string;
  status: BookingStatus;
  packageName: string;
}

export interface RecentActivity {
  id: string;
  kind: ActivityKind;
  label: string;
  description: string;
  time: string;
}

export interface ProfileCompletionItem {
  label: string;
  done: boolean;
}

export interface PhotographerDashboardPage {
  photographer: {
    name: string;
    area: string;
    handle: string;
    availability: string;
  };
  periodLabel: string;
  nav: DashboardNavItem[];
  stats: DashboardStat[];
  alerts: DashboardAlert[];
  quickActions: DashboardQuickAction[];
  recentOrders: RecentOrder[];
  uploadQueue: UploadQueueItem[];
  bookings: BookingSummaryItem[];
  recentActivity: RecentActivity[];
  profileCompletion: {
    percentage: number;
    summary: string;
    items: ProfileCompletionItem[];
    actionHref: string;
  };
}
