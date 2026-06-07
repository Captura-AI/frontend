"use client";

import { type ExplorerPage } from "@/domains/explorer";
import { useExplorerStore } from "./store/useExplorerStore";
import { ExplorerTitleSection } from "./components/ExplorerTitleSection";
import { ExplorerSearchBar } from "./components/ExplorerSearchBar";
import { ExplorerFacetBar } from "./components/ExplorerFacetBar";
import { ExplorerResultsGrid } from "./components/ExplorerResultsGrid";

interface ExplorerPageViewProps {
  content: ExplorerPage;
}

export function ExplorerPageView({ content }: ExplorerPageViewProps) {
  const store = useExplorerStore(content.activeFilters);

  return (
    <>
      <ExplorerTitleSection data={content.title} />

      <ExplorerSearchBar
        value={store.searchQuery}
        onChange={store.setSearchQuery}
        onSearch={store.handleSearch}
        placeholder={content.searchPlaceholder}
      />

      <ExplorerFacetBar
        facets={content.facets}
        activeFilters={store.activeFilters}
        onApplyFilter={store.applyFilter}
        onRemoveFilter={store.removeFilter}
        onClearAll={store.clearFilters}
      />

      <ExplorerResultsGrid
        data={content.results}
        viewMode={store.viewMode}
        onViewChange={store.setViewMode}
      />
    </>
  );
}
