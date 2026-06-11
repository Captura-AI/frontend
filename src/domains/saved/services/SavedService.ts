import type { AccountSavedPage, AccountSavedSearchesPage } from "../entities/SavedPage";

/**
 * Returns static mock content for the /account/saved page.
 *
 * TODO: When the backend is ready, replace with a call to SavedRepository:
 *   import { createSavedRepository } from "@/infrastructure/repositories/SavedRepository";
 *   const repo = createSavedRepository(httpClient);
 *   return repo.getSavedMoments();
 */
export function getAccountSavedPageContent(): AccountSavedPage {
  return {
    header: {
      title: "Moments you wanted to",
      emphasis: "remember",
      description:
        "Frames you flagged from Explorer or a moment detail page, kept here until you're ready to license or revisit them.",
    },
    stats: [
      { label: "Saved moments", value: "6", helper: "Across 4 cities" },
      { label: "Newest save", value: "2 hours ago", helper: "Braga, Bandung" },
      { label: "Avg. price", value: "$38", helper: "Personal license tier" },
    ],
    items: [
      {
        id: "m-1",
        imageUrl:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80&auto=format&fit=crop",
        title: "Seen near Shibuya, just before dusk",
        photographerName: "Ayaka Mori",
        city: "Tokyo",
        time: "17:42 · Apr 12",
        savedAt: "2 hours ago",
        priceUsd: 42,
        momentHref: "/explorer/m-1",
      },
      {
        id: "m-2",
        imageUrl:
          "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80&auto=format&fit=crop",
        title: "A vintage Vespa parked in the gold light",
        photographerName: "Reza Ardiansyah",
        city: "Bandung",
        time: "17:39 · Apr 12",
        savedAt: "2 hours ago",
        priceUsd: 35,
        momentHref: "/explorer/m-2",
      },
      {
        id: "m-3",
        imageUrl:
          "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&q=80&auto=format&fit=crop",
        title: "A cyclist crossing the Braga tracks, almost smiling",
        photographerName: "Alya Permatasari",
        city: "Bandung",
        time: "17:37 · Apr 12",
        savedAt: "Yesterday",
        priceUsd: 32,
        momentHref: "/explorer/m-3",
      },
      {
        id: "m-4",
        imageUrl:
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&q=80&auto=format&fit=crop",
        title: "An angkot exhaling its passengers into the warm afternoon",
        photographerName: "Sari Pradipta",
        city: "Bandung",
        time: "17:34 · Apr 12",
        savedAt: "Yesterday",
        priceUsd: 28,
        momentHref: "/explorer/m-4",
      },
      {
        id: "m-7",
        imageUrl:
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80&auto=format&fit=crop",
        title: "A red helmet pausing at the Asia Afrika crossing",
        photographerName: "Sari Pradipta",
        city: "Bandung",
        time: "07:58 · Apr 11",
        savedAt: "3 days ago",
        priceUsd: 45,
        momentHref: "/explorer/m-7",
      },
      {
        id: "m-9",
        imageUrl:
          "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80&auto=format&fit=crop",
        title: "Braga's slow breath between passing cars",
        photographerName: "Alya Permatasari",
        city: "Bandung",
        time: "17:29 · Apr 12",
        savedAt: "5 days ago",
        priceUsd: 38,
        momentHref: "/explorer/m-9",
      },
    ],
    emptyState: {
      title: "Nothing saved yet.",
      description:
        "Tap the bookmark icon on any Explorer result or moment detail page to keep it here for later.",
      ctaLabel: "Open Explorer",
      ctaHref: "/explorer",
    },
  };
}

/**
 * Returns static mock content for the /account/saved-searches page.
 *
 * TODO: When the backend is ready, replace with a call to SavedRepository:
 *   import { createSavedRepository } from "@/infrastructure/repositories/SavedRepository";
 *   const repo = createSavedRepository(httpClient);
 *   return repo.getSavedSearches();
 */
export function getAccountSavedSearchesPageContent(): AccountSavedSearchesPage {
  return {
    header: {
      title: "Searches worth",
      emphasis: "running again",
      description:
        "Saved parameters — location, time window, vehicle, plate partial, and visual description — ready to rerun the moment new frames come in.",
    },
    items: [
      {
        id: "s-1",
        label: "Silver Vespa near Braga, golden hour",
        summary: "Vehicle + location + time window saved from Explorer.",
        createdAt: "2 hours ago",
        resultCount: 34,
        query: "silver vespa golden hour",
        filters: [
          { key: "location", keyLabel: "where", value: "Braga, Bandung" },
          { key: "time", keyLabel: "when", value: "Golden hour, 17:00–18:00" },
          { key: "vehicle", keyLabel: "vehicle", value: "Vespa · Silver" },
        ],
      },
      {
        id: "s-2",
        label: "Plate D · 1428 · ** around Asia Afrika",
        summary: "Partial plate read saved from a moment detail page.",
        createdAt: "Yesterday",
        resultCount: 6,
        query: "plate D 1428",
        filters: [
          { key: "location", keyLabel: "where", value: "Asia Afrika, Bandung" },
          { key: "plate", keyLabel: "plate", value: "D · 1428 · **" },
        ],
      },
      {
        id: "s-3",
        label: "Red jacket, on foot, Braga afternoons",
        summary: "Visual description + location saved from Explorer.",
        createdAt: "3 days ago",
        resultCount: 18,
        query: "red jacket on foot",
        filters: [
          { key: "location", keyLabel: "where", value: "Braga, Bandung" },
          { key: "vehicleType", keyLabel: "type", value: "On foot" },
        ],
      },
      {
        id: "s-4",
        label: "Lembang mornings, motorbike convoy",
        summary: "Location + time + vehicle type saved from Explorer.",
        createdAt: "1 week ago",
        resultCount: 11,
        query: "motorbike convoy",
        filters: [
          { key: "location", keyLabel: "where", value: "Lembang" },
          { key: "time", keyLabel: "when", value: "Morning, 06:00–08:00" },
          { key: "vehicleType", keyLabel: "type", value: "Motorbike" },
        ],
      },
    ],
    emptyState: {
      title: "No saved searches yet.",
      description:
        "Save a search from Explorer to keep its location, time, vehicle, plate, and visual filters ready for next time.",
      ctaLabel: "Open Explorer",
      ctaHref: "/explorer",
    },
  };
}
