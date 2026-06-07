import { useState, useCallback } from "react";
import { type ExplorerActiveFilter } from "@/domains/explorer";

export type ViewMode = "grid" | "map" | "timeline";

/**
 * Local UI state for the Explorer page.
 *
 * TODO: When the backend is ready, wire activeFilters + searchQuery into
 *   ExplorerRepository.search({ filters, query }) and update results.
 */
export function useExplorerStore(initialFilters: ExplorerActiveFilter[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<ExplorerActiveFilter[]>(initialFilters);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isSearching, setIsSearching] = useState(false);

  const removeFilter = useCallback((key: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.key !== key));
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters([]);
  }, []);

  const applyFilter = useCallback((filter: ExplorerActiveFilter) => {
    setActiveFilters((prev) => {
      const existingIndex = prev.findIndex((item) => item.key === filter.key);

      if (existingIndex === -1) {
        return [...prev, filter];
      }

      return prev.map((item) => (item.key === filter.key ? filter : item));
    });
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      // TODO: replace with real API call via ExplorerRepository
      console.info("[ExplorerStore] search triggered:", query);
    } finally {
      setIsSearching(false);
    }
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    activeFilters,
    applyFilter,
    removeFilter,
    clearFilters,
    viewMode,
    setViewMode,
    isSearching,
    handleSearch,
  };
}
