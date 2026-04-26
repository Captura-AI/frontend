import { useState, useCallback } from "react";

/**
 * Local UI state for the Home page.
 *
 * TODO: When the backend is ready, inject HomeRepository here and call
 *   repo.search(query) inside handleSearch, then navigate to the results page.
 */
export function useHomeStore() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) return;
      setIsSearching(true);
      try {
        // TODO: replace with real API call via HomeRepository
        // const result = await homeRepo.search(query);
        // router.push(result.redirectUrl);
        console.info("[HomeStore] search triggered:", query);
      } finally {
        setIsSearching(false);
      }
    },
    []
  );

  return {
    isLoading,
    setIsLoading,
    searchQuery,
    setSearchQuery,
    isSearching,
    handleSearch,
  };
}
