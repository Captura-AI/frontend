import { type HomePage, type HomeStory, type HomePhotographer } from "@/domains/home";

/**
 * Contract for fetching Home page data from the backend.
 * Swap HomePageService static mock for this when the API is ready.
 */
export interface IHomeRepository {
  /** Fetch all content for the Home page in one call. */
  getHomePageContent(): Promise<HomePage>;

  /** Fetch a paginated list of stories (for infinite scroll / load-more). */
  getStories(page?: number, limit?: number): Promise<HomeStory[]>;

  /** Fetch a paginated list of photographers. */
  getPhotographers(page?: number, limit?: number): Promise<HomePhotographer[]>;

  /** Submit a search query; returns a redirect/search URL. */
  search(query: string): Promise<{ redirectUrl: string }>;
}
