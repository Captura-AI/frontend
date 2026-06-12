import {
  type PhotographerDetail,
} from "../entities/PhotographersPage";
import { getPhotographersPageContent } from "./PhotographersPageService";

type PhotographerDetailSeed = Omit<PhotographerDetail, "rating" | "ratingMeta" | "stats">;

const DETAIL_BY_SLUG: Record<string, PhotographerDetailSeed> = {
  "sari-pradipta": {
    slug: "sari-pradipta",
    name: "Sari Pradipta",
    city: "Bandung",
    area: "Braga · Asia Afrika · Alun-Alun",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
    heroImageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1400&q=85&auto=format&fit=crop",
    specialties: ["Heritage streets", "Golden hour", "Documentary sessions", "Family archive"],
    headline: "Frames that make Braga feel like a remembered room.",
    bio:
      "Sari works the colonial corridor between Braga and Asia Afrika, mostly in the late afternoon when shutters, awnings, and old shop signs throw long warm lines across the street.",
    philosophy:
      "Her sessions are quiet walks, not photoshoots. She lets families, couples, riders, and solo travelers move through familiar corners until the city starts giving them back to themselves.",
    searchHref: "/explorer?photographer=sari-pradipta",
    bookingAnchor: "#booking",
    portfolio: [
      {
        id: "sari-01",
        title: "Copper awnings after rain",
        imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=900&q=85&auto=format&fit=crop",
        location: "Jalan Braga",
        time: "17:36",
        category: "Heritage",
        momentHref: "/explorer/m-1",
      },
      {
        id: "sari-02",
        title: "A family crossing Asia Afrika",
        imageUrl: "https://images.unsplash.com/photo-1551913902-c92207136625?w=900&q=85&auto=format&fit=crop",
        location: "Asia Afrika",
        time: "16:58",
        category: "Family",
        momentHref: "/explorer/m-5",
      },
      {
        id: "sari-03",
        title: "Parked scooter, old cinema light",
        imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&q=85&auto=format&fit=crop",
        location: "Braga Selatan",
        time: "18:12",
        category: "Vehicle",
        momentHref: "/explorer/m-7",
      },
      {
        id: "sari-04",
        title: "Two friends under the Savoy sign",
        imageUrl: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=900&q=85&auto=format&fit=crop",
        location: "Savoy Homann",
        time: "17:04",
        category: "Portrait",
        momentHref: "/explorer/m-9",
      },
      {
        id: "sari-05",
        title: "Market edge before Maghrib",
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=900&q=85&auto=format&fit=crop",
        location: "Alun-Alun",
        time: "17:52",
        category: "Street",
        momentHref: "/explorer/m-11",
      },
      {
        id: "sari-06",
        title: "A small ceremony in passing",
        imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=900&q=85&auto=format&fit=crop",
        location: "Naripan",
        time: "08:20",
        category: "Editorial",
        momentHref: "/explorer/m-12",
      },
    ],
    hotspots: [
      { name: "Braga north walk", area: "Jalan Braga", cadence: "4 active windows / week", bestTime: "16:45-18:10" },
      { name: "Savoy corner", area: "Asia Afrika", cadence: "Weekend sessions", bestTime: "17:00-17:50" },
      { name: "Old market edge", area: "Alun-Alun", cadence: "Morning documentary", bestTime: "07:00-09:00" },
    ],
    packages: [
      {
        name: "Personal walk",
        price: "Rp 450k",
        duration: "60 minutes",
        description: "A quiet route for one person, couple, or small memory walk.",
        includes: ["18 edited frames", "Private proofing link", "Personal license"],
      },
      {
        name: "Family archive",
        price: "Rp 675k",
        duration: "90 minutes",
        description: "Documentary family session around streets with personal history.",
        includes: ["32 edited frames", "Print-ready exports", "Removal/privacy review"],
      },
      {
        name: "Vehicle story",
        price: "Rp 820k",
        duration: "2 hours",
        description: "For bikes, scooters, and classic cars moving through heritage streets.",
        includes: ["Rolling shots", "Masked plate metadata", "Commercial add-on option"],
      },
    ],
    reviews: [
      {
        quote:
          "She made the whole walk feel ordinary in the best way. No posing, no pressure, just frames that looked like our parents' stories.",
        author: "Adit R.",
        context: "Family archive · March 2026",
      },
      {
        quote:
          "Sari knew exactly when Braga would soften. My motorcycle photos look like stills from an old Bandung film.",
        author: "Nadia P.",
        context: "Vehicle story · April 2026",
      },
    ],
    latestMoments: [
      {
        id: "lm-1",
        title: "Cream shirt near Naripan",
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=700&q=80&auto=format&fit=crop",
        meta: "Naripan · 17:18 · match-ready",
        href: "/explorer/m-14",
      },
      {
        id: "lm-2",
        title: "Red helmet, parked under awning",
        imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=700&q=80&auto=format&fit=crop",
        meta: "Braga · 18:02 · vehicle metadata",
        href: "/explorer/m-15",
      },
      {
        id: "lm-3",
        title: "Two silhouettes by the old cinema",
        imageUrl: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=700&q=80&auto=format&fit=crop",
        meta: "Asia Afrika · 16:44 · editorial",
        href: "/explorer/m-16",
      },
    ],
  },
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Returns static mock slugs/profile data for the Photographer Detail page.
 *
 * TODO: When the backend is ready, replace these with IPhotographersRepository:
 *   import { type IPhotographersRepository } from "@/infrastructure/repositories/IPhotographersRepository";
 *   const slugs = await photographersRepository.getPhotographerSlugs();
 *   const detail = await photographersRepository.getPhotographerDetail(slug);
 */
export function getPhotographerSlugs(): string[] {
  return getPhotographersPageContent().photographers.map((photographer) => photographer.slug);
}

export function getPhotographerDetail(slug: string): PhotographerDetail | null {
  const directoryProfile = getPhotographersPageContent().photographers.find(
    (photographer) => photographer.slug === slug || slugify(photographer.name) === slug
  );

  if (!directoryProfile) return null;

  const detail = DETAIL_BY_SLUG[slug] ?? DETAIL_BY_SLUG["sari-pradipta"];
  if (!detail) return null;

  return {
    ...detail,
    slug: directoryProfile.slug,
    name: directoryProfile.name,
    avatarUrl: directoryProfile.avatarUrl,
    rating: directoryProfile.ratingStars,
    ratingMeta: directoryProfile.ratingMeta,
    stats: [
      { value: directoryProfile.momentsCaptured, label: "Moments captured", emphasized: true },
      { value: directoryProfile.sessionsBooked, label: "Sessions booked" },
      { value: directoryProfile.hourlyRate, label: "Starting rate" },
      { value: directoryProfile.ratingMeta.split(" · ")[0] ?? "4.9", label: "Average rating" },
    ],
  };
}
