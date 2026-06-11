import type { SavedSearch } from "@/domains/saved";

/**
 * Builds an /explorer URL that re-applies a saved search's filters and
 * free-text query as recognized query params. ExplorerSearchParamsSync
 * reads these on mount and restores the search via the explorer store.
 */
export function buildExplorerSearchHref(search: SavedSearch): string {
  const params = new URLSearchParams();

  if (search.query) {
    params.set("q", search.query);
  }

  for (const filter of search.filters) {
    params.set(filter.key, filter.value);
  }

  const queryString = params.toString();
  return queryString ? `/explorer?${queryString}` : "/explorer";
}
