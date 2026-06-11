import type { ActivePhotographer, FeedMoment } from "../entities/HotspotPage";
import type { HotspotDetail } from "../entities/HotspotDetail";
import { getHotspotPageData } from "./HotspotPageService";

const PHOTOGRAPHER_POOL: ActivePhotographer[] = [
  {
    id: "1",
    name: "Sari",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=70&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Reza",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=70&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Alya",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=70&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Dimas",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=70&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Putri",
    avatarUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=70&auto=format&fit=crop",
  },
];

interface HotspotDetailExtra {
  description: string;
  heroImageUrl: string;
  bestTimeLabel: string;
  bestTimeWindow: string;
  popularTags: string[];
  photographerIds: string[];
  latestMoments: FeedMoment[];
}

const HOTSPOT_DETAIL_EXTRA: Record<string, HotspotDetailExtra> = {
  braga: {
    description:
      "Colonial-era façades, slow afternoon traffic, and a steady stream of street style — Braga is Captura's busiest corner in Bandung. Photographers favor the awning shade between Jalan Braga and Jalan Naripan, where golden hour bounces off the old shopfronts.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1400&q=80&auto=format&fit=crop",
    bestTimeLabel: "Golden hour",
    bestTimeWindow: "17:00 – 18:30",
    popularTags: ["red jacket", "vespa", "on foot", "colonial facade"],
    photographerIds: ["1", "2", "3"],
    latestMoments: [
      {
        id: "braga-1",
        imageUrl:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&q=80&auto=format&fit=crop",
        timeAgo: "2 min ago",
        caption: "A red jacket pausing under Braga's old colonial awnings.",
        photographerName: "Sari Pradipta",
        time: "17:42",
        tags: ["red", "braga", "on foot"],
      },
      {
        id: "braga-2",
        imageUrl:
          "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80&auto=format&fit=crop",
        timeAgo: "5 min ago",
        caption: "A vintage Vespa parked in the gold light, plate D · 1428 · NA.",
        photographerName: "Reza Ardiansyah",
        time: "17:39",
        tags: ["vespa", "silver", "D·1428"],
      },
      {
        id: "braga-3",
        imageUrl:
          "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400&q=80&auto=format&fit=crop",
        timeAgo: "7 min ago",
        caption: "A cyclist crossing the Braga tracks, almost smiling.",
        photographerName: "Alya Permatasari",
        time: "17:37",
        tags: ["bicycle", "commute"],
      },
    ],
  },
  "asia-afrika": {
    description:
      "Heritage façades and the wide pedestrian boulevard in front of Hotel Savoy Homann make Asia Afrika a steady weekday corridor. Morning light favors the eastern sidewalk; by evening, the strip lights up for the night market crowd.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1400&q=80&auto=format&fit=crop",
    bestTimeLabel: "Early morning",
    bestTimeWindow: "07:00 – 08:30",
    popularTags: ["heritage facade", "motorbike", "crowd", "night market"],
    photographerIds: ["1", "5"],
    latestMoments: [
      {
        id: "asia-afrika-1",
        imageUrl:
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80&auto=format&fit=crop",
        timeAgo: "12 min ago",
        caption: "A red helmet pausing at the Asia Afrika crossing.",
        photographerName: "Sari Pradipta",
        time: "07:58",
        tags: ["helmet", "crossing"],
      },
      {
        id: "asia-afrika-2",
        imageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80&auto=format&fit=crop",
        timeAgo: "18 min ago",
        caption: "Two angkot idling outside Hotel Savoy Homann.",
        photographerName: "Putri Wulandari",
        time: "07:52",
        tags: ["angkot", "heritage"],
      },
      {
        id: "asia-afrika-3",
        imageUrl:
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80&auto=format&fit=crop",
        timeAgo: "24 min ago",
        caption: "A street vendor setting up before the morning crowd.",
        photographerName: "Sari Pradipta",
        time: "07:46",
        tags: ["vendor", "morning"],
      },
    ],
  },
  dago: {
    description:
      "An uphill stretch of cafés and boutiques along Ir. H. Juanda. The late lunch crowd brings a steady flow of motorbikes parked in rows, with soft diffused light filtering through the trees most of the afternoon.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1400&q=80&auto=format&fit=crop",
    bestTimeLabel: "Late lunch",
    bestTimeWindow: "12:30 – 14:00",
    popularTags: ["cafe", "motorbike row", "boutique", "uphill"],
    photographerIds: ["2", "4"],
    latestMoments: [
      {
        id: "dago-1",
        imageUrl:
          "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&q=80&auto=format&fit=crop",
        timeAgo: "9 min ago",
        caption: "A row of motorbikes parked outside a Dago café.",
        photographerName: "Reza Ardiansyah",
        time: "13:14",
        tags: ["motorbike", "cafe"],
      },
      {
        id: "dago-2",
        imageUrl:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80&auto=format&fit=crop",
        timeAgo: "21 min ago",
        caption: "Dappled light across the Ir. H. Juanda sidewalk.",
        photographerName: "Dimas Saputra",
        time: "13:02",
        tags: ["sidewalk", "light"],
      },
      {
        id: "dago-3",
        imageUrl:
          "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80&auto=format&fit=crop",
        timeAgo: "33 min ago",
        caption: "A boutique window display catching the afternoon sun.",
        photographerName: "Reza Ardiansyah",
        time: "12:50",
        tags: ["boutique", "window"],
      },
    ],
  },
  lembang: {
    description:
      "Mountain air and mist drifting off the strawberry fields. The market road fills early with produce trucks and motorbike convoys before the day-trip crowd arrives mid-morning.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1400&q=80&auto=format&fit=crop",
    bestTimeLabel: "Cool morning",
    bestTimeWindow: "06:00 – 08:00",
    popularTags: ["mist", "motorbike convoy", "market road", "strawberry field"],
    photographerIds: ["3"],
    latestMoments: [
      {
        id: "lembang-1",
        imageUrl:
          "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=400&q=80&auto=format&fit=crop",
        timeAgo: "16 min ago",
        caption: "Mist rolling over the Lembang market road at dawn.",
        photographerName: "Alya Permatasari",
        time: "06:22",
        tags: ["mist", "market"],
      },
      {
        id: "lembang-2",
        imageUrl:
          "https://images.unsplash.com/photo-1516382799247-87df95d790b7?w=400&q=80&auto=format&fit=crop",
        timeAgo: "29 min ago",
        caption: "A motorbike convoy heading toward the strawberry fields.",
        photographerName: "Alya Permatasari",
        time: "06:09",
        tags: ["motorbike", "convoy"],
      },
      {
        id: "lembang-3",
        imageUrl:
          "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80&auto=format&fit=crop",
        timeAgo: "41 min ago",
        caption: "A produce truck unloading near the market gate.",
        photographerName: "Alya Permatasari",
        time: "05:57",
        tags: ["truck", "produce"],
      },
    ],
  },
  cihampelas: {
    description:
      "The Cihampelas skywalk under sodium light, with denim shops blinking on as evening sets in. Pedestrian traffic on the bridge picks up sharply after sunset.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1558980664-1ee79b51c4cb?w=1400&q=80&auto=format&fit=crop",
    bestTimeLabel: "Blue hour",
    bestTimeWindow: "18:30 – 19:30",
    popularTags: ["skywalk", "neon", "denim shop", "pedestrian bridge"],
    photographerIds: ["4"],
    latestMoments: [
      {
        id: "cihampelas-1",
        imageUrl:
          "https://images.unsplash.com/photo-1558980664-1ee79b51c4cb?w=400&q=80&auto=format&fit=crop",
        timeAgo: "20 min ago",
        caption: "Sodium light spilling across the Cihampelas skywalk.",
        photographerName: "Dimas Saputra",
        time: "18:47",
        tags: ["skywalk", "neon"],
      },
      {
        id: "cihampelas-2",
        imageUrl:
          "https://images.unsplash.com/photo-1561361398-a8b5b3a3c1d3?w=400&q=80&auto=format&fit=crop",
        timeAgo: "35 min ago",
        caption: "Denim shop signage blinking on for the evening.",
        photographerName: "Dimas Saputra",
        time: "18:32",
        tags: ["denim", "signage"],
      },
      {
        id: "cihampelas-3",
        imageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
        timeAgo: "48 min ago",
        caption: "Pedestrians pacing the bridge as traffic thickens below.",
        photographerName: "Dimas Saputra",
        time: "18:19",
        tags: ["bridge", "traffic"],
      },
    ],
  },
  "kebon-raya": {
    description:
      "Bogor's botanical garden in late afternoon light. The orchid house entrance draws a steady trickle of visitors, with long shadows across the lawns by golden hour.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1400&q=80&auto=format&fit=crop",
    bestTimeLabel: "Golden hour",
    bestTimeWindow: "16:30 – 17:45",
    popularTags: ["orchid house", "garden path", "long shadow", "visitors"],
    photographerIds: ["2", "5"],
    latestMoments: [
      {
        id: "kebon-raya-1",
        imageUrl:
          "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400&q=80&auto=format&fit=crop",
        timeAgo: "11 min ago",
        caption: "Visitors gathering near the orchid house entrance.",
        photographerName: "Putri Wulandari",
        time: "16:51",
        tags: ["orchid", "visitors"],
      },
      {
        id: "kebon-raya-2",
        imageUrl:
          "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400&q=80&auto=format&fit=crop",
        timeAgo: "27 min ago",
        caption: "Long shadows stretching across the garden lawn.",
        photographerName: "Reza Ardiansyah",
        time: "16:35",
        tags: ["garden", "shadow"],
      },
      {
        id: "kebon-raya-3",
        imageUrl:
          "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=80&auto=format&fit=crop",
        timeAgo: "39 min ago",
        caption: "A family pausing along the botanical garden path.",
        photographerName: "Putri Wulandari",
        time: "16:23",
        tags: ["family", "path"],
      },
    ],
  },
  puncak: {
    description:
      "Tea hills along Puncak Pass, with motorbikes coasting through fog as evening settles in. The lookout point gathers a small but steady crowd at sunset.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80&auto=format&fit=crop",
    bestTimeLabel: "Foggy evening",
    bestTimeWindow: "17:30 – 18:30",
    popularTags: ["tea hill", "fog", "lookout", "motorbike"],
    photographerIds: ["1"],
    latestMoments: [
      {
        id: "puncak-1",
        imageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80&auto=format&fit=crop",
        timeAgo: "14 min ago",
        caption: "A motorbike coasting through fog near the tea hills.",
        photographerName: "Sari Pradipta",
        time: "17:48",
        tags: ["fog", "motorbike"],
      },
      {
        id: "puncak-2",
        imageUrl:
          "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&q=80&auto=format&fit=crop",
        timeAgo: "31 min ago",
        caption: "Visitors gathering at the Puncak lookout for sunset.",
        photographerName: "Sari Pradipta",
        time: "17:31",
        tags: ["lookout", "sunset"],
      },
      {
        id: "puncak-3",
        imageUrl:
          "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400&q=80&auto=format&fit=crop",
        timeAgo: "47 min ago",
        caption: "Rows of tea bushes fading into the evening mist.",
        photographerName: "Sari Pradipta",
        time: "17:15",
        tags: ["tea", "mist"],
      },
    ],
  },
  bekasi: {
    description:
      "A handful of frames came in this afternoon from Bekasi Centro. Coverage is thin — worth checking again at dusk when foot traffic picks up around the plaza.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1400&q=80&auto=format&fit=crop",
    bestTimeLabel: "Dusk",
    bestTimeWindow: "18:00 – 19:00",
    popularTags: ["plaza", "foot traffic", "evening"],
    photographerIds: [],
    latestMoments: [
      {
        id: "bekasi-1",
        imageUrl:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80&auto=format&fit=crop",
        timeAgo: "1 hour ago",
        caption: "A quiet afternoon outside Bekasi Centro plaza.",
        photographerName: "Dimas Saputra",
        time: "14:10",
        tags: ["plaza", "afternoon"],
      },
    ],
  },
  cirebon: {
    description:
      "Coastal calm around the kraton — a few frames came in this morning. Cirebon Old Town stays quiet most of the day, with brief activity near the kraton gates.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80&auto=format&fit=crop",
    bestTimeLabel: "Morning",
    bestTimeWindow: "08:00 – 09:30",
    popularTags: ["kraton", "coastal", "old town"],
    photographerIds: [],
    latestMoments: [
      {
        id: "cirebon-1",
        imageUrl:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80&auto=format&fit=crop",
        timeAgo: "3 hours ago",
        caption: "Morning light along the Cirebon kraton gates.",
        photographerName: "Putri Wulandari",
        time: "08:34",
        tags: ["kraton", "morning"],
      },
    ],
  },
  sukabumi: {
    description:
      "Sleepy outskirts — three frames came in this morning, none recent. Sukabumi sees light, irregular coverage along its main road.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1400&q=80&auto=format&fit=crop",
    bestTimeLabel: "Mid-morning",
    bestTimeWindow: "09:00 – 10:30",
    popularTags: ["main road", "outskirts"],
    photographerIds: [],
    latestMoments: [
      {
        id: "sukabumi-1",
        imageUrl:
          "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80&auto=format&fit=crop",
        timeAgo: "5 hours ago",
        caption: "A quiet stretch of Sukabumi's main road.",
        photographerName: "Dimas Saputra",
        time: "09:18",
        tags: ["road", "quiet"],
      },
    ],
  },
  depok: {
    description:
      "Long shadows across the campus blocks along Margonda. A handful of moments came in earlier — weekday afternoons stay hushed compared to Jakarta proper.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1561361398-a8b5b3a3c1d3?w=1400&q=80&auto=format&fit=crop",
    bestTimeLabel: "Late afternoon",
    bestTimeWindow: "15:30 – 16:30",
    popularTags: ["campus", "margonda", "long shadow"],
    photographerIds: [],
    latestMoments: [
      {
        id: "depok-1",
        imageUrl:
          "https://images.unsplash.com/photo-1561361398-a8b5b3a3c1d3?w=400&q=80&auto=format&fit=crop",
        timeAgo: "2 hours ago",
        caption: "Long shadows across the Margonda campus blocks.",
        photographerName: "Putri Wulandari",
        time: "15:48",
        tags: ["campus", "shadow"],
      },
    ],
  },
  tasik: {
    description:
      "Quiet streets near the alun-alun — Tasikmalaya is Captura's farthest edge in Jawa Barat. Coverage is sparse but worth a visit on weekends when the square fills up.",
    heroImageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1400&q=80&auto=format&fit=crop",
    bestTimeLabel: "Weekend morning",
    bestTimeWindow: "07:00 – 09:00",
    popularTags: ["alun-alun", "weekend", "far edge"],
    photographerIds: [],
    latestMoments: [
      {
        id: "tasik-1",
        imageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
        timeAgo: "6 hours ago",
        caption: "A quiet morning near the Tasikmalaya alun-alun.",
        photographerName: "Dimas Saputra",
        time: "07:42",
        tags: ["alun-alun", "morning"],
      },
    ],
  },
};

/**
 * Returns the list of hotspot ids available for `/hotspot/[id]`.
 *
 * TODO: When the backend is ready, replace with a call to HotspotRepository.
 */
export function getHotspotIds(): string[] {
  return getHotspotPageData().hotspots.map((hotspot) => hotspot.id);
}

/**
 * Returns static mock detail content for a single hotspot, or `null` if the id
 * does not match a known hotspot.
 *
 * TODO: When the backend is ready, replace with a call to HotspotRepository:
 *   import { createHotspotRepository } from "@/infrastructure/repositories/HotspotRepository";
 *   const repo = createHotspotRepository(httpClient);
 *   return repo.getHotspotDetail(id);
 */
export function getHotspotDetail(id: string): HotspotDetail | null {
  const page = getHotspotPageData();
  const hotspot = page.hotspots.find((item) => item.id === id);
  const extra = HOTSPOT_DETAIL_EXTRA[id];

  if (!hotspot || !extra) return null;

  return {
    id: hotspot.id,
    name: hotspot.name,
    region: page.region,
    level: hotspot.level,
    title: hotspot.title,
    meta: hotspot.meta,
    description: extra.description,
    heroImageUrl: extra.heroImageUrl,
    stats: {
      active: hotspot.active,
      last15: hotspot.last15,
      total: hotspot.total,
    },
    bestTimeLabel: extra.bestTimeLabel,
    bestTimeWindow: extra.bestTimeWindow,
    popularTags: extra.popularTags,
    activePhotographers: extra.photographerIds
      .map((photographerId) => PHOTOGRAPHER_POOL.find((p) => p.id === photographerId))
      .filter((p): p is ActivePhotographer => Boolean(p)),
    latestMoments: extra.latestMoments,
  };
}
