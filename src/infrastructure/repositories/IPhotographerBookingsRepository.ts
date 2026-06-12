import { type PhotographerBookingsPage } from "@/domains/photographer-bookings";

/**
 * Contract for fetching and managing photographer booking requests.
 * Swap PhotographerBookingsService static mock for this when the API is ready.
 *
 * Future mutation endpoints (not yet implemented):
 *   acceptBooking(bookingId: string): Promise<void>
 *   declineBooking(bookingId: string, reason?: string): Promise<void>
 *   proposeNewTime(bookingId: string, proposedAt: string): Promise<void>
 */
export interface IPhotographerBookingsRepository {
  /** Fetch booking requests, schedule, summary stats, and package shortcuts. */
  getBookingsPageContent(): Promise<PhotographerBookingsPage>;
}
