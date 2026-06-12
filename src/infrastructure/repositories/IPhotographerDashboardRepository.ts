import { type PhotographerDashboardPage } from "@/domains/photographer-dashboard";

/**
 * Contract for fetching the photographer dashboard overview.
 * Swap PhotographerDashboardService static mock for this when the API is ready.
 */
export interface IPhotographerDashboardRepository {
  /**
   * Fetch dashboard overview content for the authenticated photographer:
   * stats, alerts, quick actions, recent activity, upload queue, booking
   * summary, and profile completion.
   */
  getDashboardPageContent(): Promise<PhotographerDashboardPage>;
}
