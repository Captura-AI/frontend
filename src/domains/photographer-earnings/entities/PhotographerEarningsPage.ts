import { type DashboardNavItem } from "@/domains/photographer-dashboard";
import { type LicenseType } from "@/domains/studio";

export type { DashboardNavItem, LicenseType };

export type OrderStatus = "paid" | "ready" | "processing" | "refunded";
export type PayoutStatus = "scheduled" | "processing" | "paid";

export interface EarningsOrder {
  id: string;
  title: string;
  buyer: string;
  license: LicenseType;
  amount: number;
  status: OrderStatus;
  date: string;
}

export interface EarningsPayout {
  status: PayoutStatus;
  amount: number;
  scheduledDate: string;
  method: string;
}

export interface EarningsPeriod {
  id: string;
  label: string;
  trend: string;
  grossSales: number;
  photographerShare: number;
  platformFee: number;
  salesCount: number;
  pendingBalance: number;
  orders: EarningsOrder[];
  payout: EarningsPayout;
}

export interface PhotographerEarningsPage {
  photographer: { name: string; handle: string };
  nav: DashboardNavItem[];
  splitNote: string;
  defaultPeriodId: string;
  periods: EarningsPeriod[];
}
