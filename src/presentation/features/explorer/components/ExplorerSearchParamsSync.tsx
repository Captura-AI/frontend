"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { type ExplorerActiveFilter } from "@/domains/explorer";

interface ExplorerSearchParamsSyncProps {
  onApplyFilter: (filter: ExplorerActiveFilter) => void;
  onSetSearchQuery: (query: string) => void;
}

const FILTER_KEY_LABELS: Record<string, string> = {
  location: "where",
  time: "when",
  vehicle: "vehicle",
  vehicleType: "type",
  plate: "plate",
};

/**
 * Restores filters and free-text query from the URL on first load — the
 * counterpart to buildExplorerSearchHref, used by saved searches and
 * hotspot "Search this area" links to deep-link into Explorer.
 */
export function ExplorerSearchParamsSync({
  onApplyFilter,
  onSetSearchQuery,
}: ExplorerSearchParamsSyncProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      onSetSearchQuery(query);
    }

    for (const [key, keyLabel] of Object.entries(FILTER_KEY_LABELS)) {
      const value = searchParams.get(key);
      if (value) {
        onApplyFilter({ key, keyLabel, value });
      }
    }
  }, [searchParams, onApplyFilter, onSetSearchQuery]);

  return null;
}
