import { type ExplorerPage } from "../entities/ExplorerPage";

/**
 * Returns static mock content for the Explorer page.
 *
 * TODO: When the backend is ready, replace with a call to ExplorerRepository:
 *   import { createExplorerRepository } from "@/infrastructure/repositories/ExplorerRepository";
 *   const repo = createExplorerRepository(httpClient);
 *   return repo.getExplorerPageContent(filters);
 */
export function getExplorerPageContent(): ExplorerPage {
  return {
    title: {
      eyebrow: "Explorer · a quiet search",
      headlinePart1: "Explore",
      headlineEmphasis: "moments",
      headlinePart2: "Not metadata.",
      description:
        "Trace the outline of a day. A color, a street corner, a motorcycle that passed at dusk. Captura remembers what cameras saw — softly, and only when asked.",
      totalMoments: "2,418,602",
      totalCities: 148,
      lastUpdated: "04:02 UTC",
      todayAdded: "+4,210",
    },

    searchPlaceholder: "A red jacket, Shibuya crossing, just before the rain…",

    facets: [
      {
        key: "location",
        label: "Where",
        displayValue: "Shibuya",
        type: "options",
        optionGroups: [
          {
            heading: "City or district",
            options: [
              { label: "Shibuya, Tokyo", value: "shibuya" },
              { label: "Lisbon", value: "lisbon" },
              { label: "Paris", value: "paris" },
              { label: "Brooklyn", value: "brooklyn" },
              { label: "Berlin", value: "berlin" },
              { label: "Seoul", value: "seoul" },
            ],
          },
          {
            heading: "Context",
            options: [
              { label: "Crosswalk", value: "crosswalk" },
              { label: "Café", value: "cafe" },
              { label: "Subway", value: "subway" },
              { label: "Alley", value: "alley" },
              { label: "Plaza", value: "plaza" },
            ],
          },
        ],
      },
      {
        key: "time",
        label: "When",
        displayValue: "golden hour",
        type: "time",
        optionGroups: [
          {
            heading: "Mood",
            options: [
              { label: "Quiet morning", value: "morning" },
              { label: "Golden hour", value: "golden" },
              { label: "Blue hour", value: "blue" },
              { label: "Rainy evening", value: "rain" },
              { label: "Neon night", value: "neon" },
            ],
          },
        ],
      },
      {
        key: "vehicle",
        label: "Vehicle",
        displayValue: "Motorcycle",
        type: "options",
        optionGroups: [
          {
            heading: "Type",
            options: [
              { label: "Motorcycle", value: "motorcycle" },
              { label: "Bicycle", value: "bicycle" },
              { label: "Car", value: "car" },
              { label: "Tram", value: "tram" },
              { label: "Scooter", value: "scooter" },
              { label: "On foot", value: "walking" },
            ],
          },
        ],
      },
      {
        key: "plate",
        label: "Plate",
        displayValue: "63 · BH · N_",
        type: "plate",
        plateValue: "63 · BH · N_",
        optionGroups: [
          {
            heading: "Match mode",
            options: [
              { label: "Allow partials", value: "partial" },
              { label: "Fuzzy read", value: "fuzzy" },
            ],
          },
        ],
      },
      {
        key: "person",
        label: "Person",
        displayValue: "red · helmet",
        type: "person",
        swatches: [
          { hex: "#C04A2B", label: "Red" },
          { hex: "#D9B26A", label: "Ochre" },
          { hex: "#5B7B6E", label: "Forest" },
          { hex: "#2C3E55", label: "Navy" },
          { hex: "#8B5E3C", label: "Tan" },
          { hex: "#1A1A1A", label: "Black" },
          { hex: "#EDE6D4", label: "Cream" },
          { hex: "#B9B3A8", label: "Stone" },
        ],
        optionGroups: [
          {
            heading: "Hair",
            options: [
              { label: "Short", value: "short" },
              { label: "Long", value: "long" },
              { label: "Curly", value: "curly" },
              { label: "Tied back", value: "tied" },
            ],
          },
          {
            heading: "Accessories",
            options: [
              { label: "Helmet", value: "helmet" },
              { label: "Hat", value: "hat" },
              { label: "Glasses", value: "glasses" },
              { label: "Backpack", value: "backpack" },
              { label: "Umbrella", value: "umbrella" },
            ],
          },
        ],
      },
    ],

    activeFilters: [
      { key: "location", keyLabel: "where",   value: "Shibuya · crosswalk" },
      { key: "time",     keyLabel: "when",     value: "Golden hour" },
      { key: "vehicle",  keyLabel: "vehicle",  value: "Motorcycle" },
      { key: "plate",    keyLabel: "plate",    value: "63 · BH · N_" },
      { key: "person",   keyLabel: "person",   value: "Red · long · helmet" },
    ],

    results: {
      headlinePart1: "Moments that look",
      headlineEmphasis: "a lot like yours",
      count: "482 quiet matches",
      loadMoreLabel: "A few more moments",
      loadMoreCount: "+ 470",
      moments: [
        {
          id: "m-1",
          imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=900&q=80&auto=format&fit=crop",
          city: "Shibuya", time: "18:04",
          match: { type: "match", score: "96%" },
          captionLine1: "Seen near Shibuya, just before dusk.",
          captionLine2: "By Ayaka Mori",
        },
        {
          id: "m-2",
          imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=900&q=80&auto=format&fit=crop",
          city: "Lisbon", time: "19:22",
          match: null,
          captionLine1: "A silver café racer pulled to the curb.",
          captionLine2: "By Tomás Vieira",
        },
        {
          id: "m-3",
          imageUrl: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=900&q=80&auto=format&fit=crop",
          city: "Amsterdam", time: "08:12",
          match: null,
          captionLine1: "Quiet commuters, a bell ringing.",
          captionLine2: "By Rens de Boer",
        },
        {
          id: "m-4",
          imageUrl: "https://images.unsplash.com/photo-1516382799247-87df95d790b7?w=900&q=80&auto=format&fit=crop",
          city: "Paris", time: "09:48",
          match: null,
          captionLine1: "Marais on a Tuesday, walking as if no one was looking.",
          captionLine2: "By Léa Béranger",
        },
        {
          id: "m-5",
          imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&q=80&auto=format&fit=crop",
          city: "Tokyo", time: "21:30",
          match: { type: "match", score: "88%" },
          captionLine1: "A red umbrella threaded through the neon.",
          captionLine2: "By Kenji Aoki",
        },
        {
          id: "m-6",
          imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=80&auto=format&fit=crop",
          city: "Porto", time: "17:51",
          match: { type: "partial", label: "Plate · partial" },
          captionLine1: "A familiar motorcycle, parked where the light was kindest.",
          captionLine2: "By Inês Ribeiro",
        },
        {
          id: "m-7",
          imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=900&q=80&auto=format&fit=crop",
          city: "Hong Kong", time: "20:14",
          match: null,
          captionLine1: "Central in a slow drizzle — the street seemed to be breathing.",
          captionLine2: "By Mei Tsang",
        },
        {
          id: "m-8",
          imageUrl: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=900&q=80&auto=format&fit=crop",
          city: "Brooklyn", time: "14:48",
          match: null,
          captionLine1: "Someone passed this street the same way you did.",
          captionLine2: "By Naomi Hall",
        },
        {
          id: "m-9",
          imageUrl: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=900&q=80&auto=format&fit=crop",
          city: "Kyoto", time: "19:02",
          match: null,
          captionLine1: "A rainy evening in Gion — umbrellas, lanterns, no one in a hurry.",
          captionLine2: "By Hana Ueda",
        },
        {
          id: "m-10",
          imageUrl: "https://images.unsplash.com/photo-1441015401724-70d16b783f5c?w=900&q=80&auto=format&fit=crop",
          city: "Copenhagen", time: "07:58",
          match: null,
          captionLine1: "A commute you probably take too — just, a Tuesday ago.",
          captionLine2: "By Mikkel Sørensen",
        },
        {
          id: "m-11",
          imageUrl: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=900&q=80&auto=format&fit=crop",
          city: "Seoul", time: "18:36",
          match: { type: "match", score: "92%" },
          captionLine1: "Hapjeong, right when the signs began to warm.",
          captionLine2: "By Jiho Park",
        },
        {
          id: "m-12",
          imageUrl: "https://images.unsplash.com/photo-1551913902-c92207136625?w=900&q=80&auto=format&fit=crop",
          city: "Berlin", time: "11:02",
          match: null,
          captionLine1: "Kreuzberg — long hair, red coat, a steady stride.",
          captionLine2: "By Jonas Krieger",
        },
      ],
    },
  };
}
