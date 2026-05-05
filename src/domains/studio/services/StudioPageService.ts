import type { StudioPage } from "../entities/StudioPage";

const STUDIO_DATA: StudioPage = {
  balance: {
    currency: "Rp",
    amount: "2.840.000",
    period: "This month",
    salesCount: 28,
  },
  avatarUrl:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=70&auto=format&fit=crop",
  stats: {
    inQueue: 142,
    aiParsed: 96,
    needReview: 12,
  },
  batch: {
    name: "Batch 04 · tonight",
    processed: 96,
    total: 142,
    platesParsed: 92,
    locationsResolved: 142,
    avgTimePerFrame: "1.4s",
  },
  queue: [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=240&q=70&auto=format&fit=crop",
      status: "active",
      badge: "ai",
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=240&q=70&auto=format&fit=crop",
      status: "scanning",
      badge: "scanning",
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=240&q=70&auto=format&fit=crop",
      status: "done",
      badge: "ok",
    },
    {
      id: "4",
      imageUrl:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=240&q=70&auto=format&fit=crop",
      status: "scanning",
      badge: "scanning",
    },
    {
      id: "5",
      imageUrl:
        "https://images.unsplash.com/photo-1551913902-c92207136625?w=240&q=70&auto=format&fit=crop",
      status: "done",
      badge: "ok",
    },
    {
      id: "6",
      imageUrl:
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=240&q=70&auto=format&fit=crop",
      status: "done",
      badge: "ok",
    },
    {
      id: "7",
      imageUrl:
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=240&q=70&auto=format&fit=crop",
      status: "done",
      badge: "ok",
    },
    {
      id: "8",
      imageUrl:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=240&q=70&auto=format&fit=crop",
      status: "scanning",
      badge: "scanning",
    },
    {
      id: "9",
      imageUrl:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=240&q=70&auto=format&fit=crop",
      status: "done",
      badge: "ok",
    },
  ],
  currentFrame: {
    frameNumber: 32,
    totalFrames: 142,
    fileName: "IMG_4729.jpg",
    fileSizeMb: 18.4,
    imageUrl:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=85&auto=format&fit=crop",
    cameraMeta: "Sony A7 III · 35mm · f/1.8 · 1/640s · ISO 400",
    shootDate: "2026-05-02",
    shootTime: "17:42",
    aiLogChips: [
      {
        id: "1",
        type: "AI",
        status: "done",
        content: "Vehicle detected · motorcycle",
      },
      {
        id: "2",
        type: "AI",
        status: "done",
        content: "Plate · D 1428 NA · 94% confidence",
      },
      {
        id: "3",
        type: "GPS",
        status: "done",
        content: "Bandung · Coblong · Dago",
      },
      {
        id: "4",
        type: "AI",
        status: "thinking",
        content: "Drafting caption",
      },
    ],
    caption: "A vintage Vespa parked in the gold light of Jalan Dago.",
    story:
      "The owner stepped inside the kopi shop just before I lifted the camera. The light was already going. It felt like the kind of street you only get one frame of.",
    capturedAt: "2026-05-02 · 17:42 WIB",
    camera: "Sony A7 III · 35mm f/1.8",
    city: "Bandung",
    district: "Coblong · Dago",
    vehicleType: "motorcycle",
    licensePlate: "D 1428 NA",
    plateConfidence: 94,
    tags: [
      { id: "1", label: "vespa", isAi: true },
      { id: "2", label: "silver", isAi: true },
      { id: "3", label: "golden hour", isAi: true },
      { id: "4", label: "street", isAi: true },
      { id: "5", label: "parked", isAi: true },
      { id: "6", label: "dago", isAi: false },
    ],
    priceTiers: [
      {
        id: "1",
        licenseType: "Personal use",
        description: "Print · social · non-commercial",
        currency: "IDR",
        amount: "35.000",
      },
      {
        id: "2",
        licenseType: "Editorial",
        description: "Press · magazines · books",
        currency: "IDR",
        amount: "120.000",
      },
      {
        id: "3",
        licenseType: "Commercial",
        description: "Ads · brand · merchandise",
        currency: "IDR",
        amount: "450.000",
      },
    ],
  },
};

export function getStudioPageData(): StudioPage {
  return STUDIO_DATA;
}
