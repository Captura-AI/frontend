import { type HttpClient } from "@/infrastructure/api/HttpClient";
import { type HomePage, type HomeStory, type HomePhotographer } from "@/domains/home";
import { type IHomeRepository } from "./IHomeRepository";

/**
 * Real API implementation of IHomeRepository.
 *
 * Endpoint base path: /home
 * All paths are relative to the HttpClient baseUrl (NEXT_PUBLIC_API_URL).
 *
 * Usage (when backend is ready):
 *   const repo = createHomeRepository(httpClient);
 *   const content = await repo.getHomePageContent();
 */
export function createHomeRepository(http: HttpClient): IHomeRepository {
  async function getHomePageContent(): Promise<HomePage> {
    return http.get<HomePage>("/home");
  }

  async function getStories(page = 1, limit = 10): Promise<HomeStory[]> {
    return http.get<HomeStory[]>(`/home/stories?page=${page}&limit=${limit}`);
  }

  async function getPhotographers(page = 1, limit = 12): Promise<HomePhotographer[]> {
    return http.get<HomePhotographer[]>(`/home/photographers?page=${page}&limit=${limit}`);
  }

  async function search(query: string): Promise<{ redirectUrl: string }> {
    return http.post<{ redirectUrl: string }>("/home/search", { query });
  }

  return { getHomePageContent, getStories, getPhotographers, search };
}
