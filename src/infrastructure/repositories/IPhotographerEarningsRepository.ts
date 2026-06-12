import { type PhotographerEarningsPage } from "@/domains/photographer-earnings";

/**
 * Contract for fetching photographer earnings, order history, and payout status.
 * Swap PhotographerEarningsService static mock for this when the API is ready.
 */
export interface IPhotographerEarningsRepository {
  /**
   * Fetch earnings page content for a given period (e.g. "2026-06" or
   * "last-30-days"). Defaults to the current period when omitted.
   */
  getEarningsPageContent(period?: string): Promise<PhotographerEarningsPage>;
}
