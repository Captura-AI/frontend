import { type SupportPage } from "@/domains/support";

/**
 * Contract for fetching support content and submitting help requests.
 * Swap SupportService static mock for this when the API is ready.
 *
 * Future mutation endpoints (not yet implemented):
 *   submitContactRequest(input: SupportContactInput): Promise<{ ticketId: string }>
 */
export interface ISupportRepository {
  /** Fetch support categories, FAQ, and contact channels. */
  getSupportPageContent(): Promise<SupportPage>;
}
