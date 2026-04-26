import { type HomePage } from "../entities/HomePage";

/**
 * Returns static mock content for the Home page.
 *
 * TODO: When the backend is ready, replace this with a call to HomeRepository:
 *   import { createHomeRepository } from "@/infrastructure/repositories/HomeRepository";
 *   const repo = createHomeRepository(httpClient);
 *   return repo.getHomePageContent();
 */
export function getHomePageContent(): HomePage {
  return {
    hero: {
      eyebrow: "Street photography · discovery",
      headlinePart1: "Find your",
      headlineEmphasis: "moments",
      headlineSuffix: "street",
      description:
        "Somewhere, on a sidewalk in Shibuya or a coastal road in Lisbon, a photographer caught you in motion. Search by place, time, vehicle, or how you looked that day.",
      primaryCtaLabel: "Search photos",
      primaryCtaHref: "#search",
      secondaryCtaLabel: "How it works",
      secondaryCtaHref: "#search",
      stats: [
        { value: "2.4M", label: "photos indexed" },
        { value: "148", label: "cities worldwide" },
        { value: "3,200+", label: "photographers" },
      ],
    },

    search: {
      headlinePart1: "One search,",
      headlineEmphasis: "many ways",
      headlinePart2: "to find you.",
      description:
        "Type a place. Pick a date. Describe a jacket, a bike, a plate. The results are you — before the algorithm tells you they are.",
      searchPlaceholder: "Silver motorcycle, Lisbon, sunset…",
      filters: [
        { icon: "map-pin", label: "Location", value: "Lisbon, Alfama" },
        { icon: "clock", label: "Time & Date", value: "Sun · 18:00 – 19:30" },
        { icon: "credit-card", label: "License plate", value: "63·BH·NK" },
        { icon: "bike", label: "Vehicle", value: "Café racer · silver" },
        { icon: "shirt", label: "Appearance", value: "Linen · tan tote" },
      ],
      figureLabel: "Fig. 01 — Five ways to find yourself",
      figureNote: "Works in any combination",
    },

    stories: {
      eyebrow: "Real moments",
      bodyPart1: "You were there —",
      bodyEmphasis: "someone captured it",
      bodyPart2: ". The evening you ran past the bakery. The ride you took alone. The quiet drive home.",
      stories: [
        {
          id: "story-1",
          timestamp: "Sat · 07:14 · Shibuya",
          titleLine1: "Running past",
          titleLine2: "Shibuya",
          photoCount: 42,
          photographerCount: 7,
        },
        {
          id: "story-2",
          timestamp: "Fri · 19:28 · Algarve coast",
          titleLine1: "Motorcycle ride",
          titleLine2: "at sunset",
          photoCount: 18,
          photographerCount: 3,
        },
        {
          id: "story-3",
          timestamp: "Sun · 14:02 · Brooklyn",
          titleLine1: "City drive",
          titleLine2: "on Sunday",
          photoCount: 26,
          photographerCount: 5,
        },
      ],
    },

    photographers: {
      eyebrow: "The people behind the lens",
      headlinePart1: "Photos are uploaded",
      headlineEmphasis: "real photographers",
      description:
        "Captura is a home for street photographers who love their craft. Every image is shared by a human, credited to a human, and licensed clearly.",
      photographers: [
        { id: "p-1", name: "Ayaka Mori", city: "Tokyo", locationTime: "Shibuya · 04:12", photoCount: "412" },
        { id: "p-2", name: "Tomás Vieira", city: "Lisbon", locationTime: "Alfama · 19:02", photoCount: "1.2k" },
        { id: "p-3", name: "Naomi Hall", city: "New York", locationTime: "Brooklyn · 14:48", photoCount: "809" },
        { id: "p-4", name: "Léa Béranger", city: "Paris", locationTime: "Marais · 09:30", photoCount: "560" },
        { id: "p-5", name: "Jonas Krieger", city: "Berlin", locationTime: "Kreuzberg · 22:15", photoCount: "324" },
        { id: "p-6", name: "Daniel Cho", city: "San Francisco", locationTime: "Mission · 17:06", photoCount: "688" },
      ],
      stats: {
        verifiedPhotographers: "3,247",
        citiesWorldwide: "148",
        momentsArchived: "2.4M",
        humanUploaded: "100%",
      },
    },

    cta: {
      eyebrow: "Your moment is waiting",
      headlinePart1: "Someone already",
      headlinePart2: "took the",
      headlineEmphasis: "photo of you",
      primaryCtaLabel: "Start searching",
      primaryCtaHref: "#search",
      secondaryCtaLabel: "Browse cities",
      secondaryCtaHref: "#",
    },
  };
}

