import { type AccountProfilePage, type AccountLibraryPage } from "@/domains/account";

/**
 * Contract for fetching and updating the authenticated user's account data.
 * Swap AccountPageService static mocks for this when the API is ready.
 *
 * Future mutation endpoints (not yet implemented):
 *   updatePreferences(input: Partial<AccountPreference>[]): Promise<void>
 *   updatePrivacyPreferences(input: Partial<PrivacyPreference>[]): Promise<void>
 *   requestDownload(libraryItemId: string): Promise<{ downloadUrl: string }>
 */
export interface IAccountRepository {
  /** Fetch profile info, preferences, privacy settings, and linked accounts. */
  getProfile(): Promise<AccountProfilePage>;

  /** Fetch purchased moments, license info, and download status. */
  getLibrary(): Promise<AccountLibraryPage>;
}
