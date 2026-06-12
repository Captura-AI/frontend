import { type PhotographerMomentsPage } from "@/domains/photographer-moments";

/**
 * Contract for fetching and managing the photographer's moment catalog.
 * Swap PhotographerMomentsService static mock for this when the API is ready.
 *
 * Future mutation endpoints (not yet implemented):
 *   updateMomentMetadata(momentId: string, input: Partial<Moment>): Promise<void>
 *   bulkUpdateStatus(momentIds: string[], status: MomentStatus): Promise<void>
 *   bulkUpdatePrice(momentIds: string[], price: string): Promise<void>
 *   bulkUpdateLicense(momentIds: string[], license: LicenseType): Promise<void>
 */
export interface IPhotographerMomentsRepository {
  /**
   * Fetch the moment catalog: filter tabs, summary stats, and a page of
   * moments. Pagination params are included for the catalog table/grid.
   */
  getMomentsPageContent(page?: number, limit?: number): Promise<PhotographerMomentsPage>;
}
