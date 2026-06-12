import {
  type PhotographersPage,
  type PhotographerDetail,
} from "@/domains/photographers";

/**
 * Contract for fetching the photographer directory and public profiles.
 * Swap PhotographersPageService / PhotographerDetailService static mocks
 * for this when the API is ready.
 *
 * Future mutation endpoints (not yet implemented):
 *   submitBookingRequest(slug: string, input: BookingRequestInput): Promise<void>
 */
export interface IPhotographersRepository {
  /** Fetch the directory listing: hero, filters, and photographer cards. */
  getPhotographersPageContent(): Promise<PhotographersPage>;

  /** Fetch a single photographer's public profile by slug, or null if not found. */
  getPhotographerDetail(slug: string): Promise<PhotographerDetail | null>;

  /** Fetch all known photographer slugs (for static generation). */
  getPhotographerSlugs(): Promise<string[]>;
}
