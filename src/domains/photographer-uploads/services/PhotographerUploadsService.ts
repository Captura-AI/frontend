import { type PhotographerUploadsPage } from "../entities/PhotographerUploadsPage";

/**
 * Returns static mock content for the Uploads / AI Review page.
 *
 * TODO: When the backend is ready, replace this with IPhotographerUploadsRepository:
 *   import { type IPhotographerUploadsRepository } from "@/infrastructure/repositories/IPhotographerUploadsRepository";
 *   return uploadsRepository.getUploadsPageContent();
 */
export function getPhotographerUploadsPageContent(): PhotographerUploadsPage {
  return {
    photographer: {
      name: "Sari Pradipta",
      handle: "@sari.frames",
    },
    nav: [
      { label: "Overview", href: "/dashboard/photographer", status: "Live" },
      { label: "Uploads", href: "/dashboard/photographer/uploads", status: "8 queued" },
      { label: "Moments", href: "/dashboard/photographer/moments", status: "214" },
      { label: "Bookings", href: "/dashboard/photographer/bookings", status: "3 new" },
      { label: "Earnings", href: "/dashboard/photographer/earnings", status: "Rp 8.4m" },
    ],
    summary: {
      totalQueued: 8,
      analyzing: 3,
      needsReview: 2,
      ready: 1,
      failed: 2,
    },
    uploadPanel: {
      acceptedFormats: ["JPEG", "PNG", "RAW"],
      maxFileSizeMb: 25,
      maxBatchSize: 60,
      helperText: "Drop frames from a single session — Captura groups by capture time and location automatically.",
    },
    batches: [
      {
        id: "batch-braga-morning",
        name: "Braga Morning Run",
        createdAt: "May 28, 06:40",
        location: "Jl. Braga · Bandung",
        status: "needs-review",
        progress: 100,
        totalFrames: 24,
        processedFrames: 24,
        frames: [
          {
            id: "frame-braga-001",
            fileName: "DSC_4471.NEF",
            thumbnailUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=160&q=70&auto=format&fit=crop",
            status: "needs-review",
            progress: 100,
            ai: {
              vehicleType: "motorcycle",
              plate: { masked: "D 12** **A", full: "D 1284 KZA", confidence: 58 },
              location: { city: "Bandung", district: "Sumur Bandung", capturedAt: "2026-05-28 06:41", camera: "Sony A7 IV · 70mm" },
              tags: [
                { id: "tag-1", label: "Helmet — green", isAi: true },
                { id: "tag-2", label: "Running club jersey", isAi: true },
              ],
              confidence: 58,
            },
            errorMessage: null,
          },
          {
            id: "frame-braga-014",
            fileName: "DSC_4484.NEF",
            thumbnailUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=160&q=70&auto=format&fit=crop",
            status: "needs-review",
            progress: 100,
            ai: {
              vehicleType: "car",
              plate: { masked: "D 88** ***", full: "D 8841 ABC", confidence: 41 },
              location: { city: "Bandung", district: "Sumur Bandung", capturedAt: "2026-05-28 06:52", camera: "Sony A7 IV · 70mm" },
              tags: [{ id: "tag-3", label: "Silver hatchback", isAi: true }],
              confidence: 41,
            },
            errorMessage: null,
          },
        ],
      },
      {
        id: "batch-asia-afrika",
        name: "Asia Afrika Sprint",
        createdAt: "May 27, 17:05",
        location: "Jl. Asia Afrika · Bandung",
        status: "analyzing",
        progress: 62,
        totalFrames: 38,
        processedFrames: 24,
        frames: [
          {
            id: "frame-asia-009",
            fileName: "DSC_5102.NEF",
            thumbnailUrl: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=160&q=70&auto=format&fit=crop",
            status: "analyzing",
            progress: 70,
            ai: null,
            errorMessage: null,
          },
          {
            id: "frame-asia-010",
            fileName: "DSC_5103.NEF",
            thumbnailUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=70&auto=format&fit=crop",
            status: "analyzing",
            progress: 45,
            ai: null,
            errorMessage: null,
          },
        ],
      },
      {
        id: "batch-alun-alun",
        name: "Alun-alun Evening Walk",
        createdAt: "May 26, 18:20",
        location: "Alun-alun Bandung",
        status: "ready",
        progress: 100,
        totalFrames: 19,
        processedFrames: 19,
        frames: [
          {
            id: "frame-alun-002",
            fileName: "DSC_4890.NEF",
            thumbnailUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=160&q=70&auto=format&fit=crop",
            status: "ready",
            progress: 100,
            ai: {
              vehicleType: "bicycle",
              plate: { masked: "—", full: "—", confidence: 0 },
              location: { city: "Bandung", district: "Alun-alun", capturedAt: "2026-05-26 18:22", camera: "Sony A7 IV · 35mm" },
              tags: [
                { id: "tag-4", label: "Family group", isAi: true },
                { id: "tag-5", label: "Sunset light", isAi: false },
              ],
              confidence: 96,
            },
            errorMessage: null,
          },
        ],
      },
      {
        id: "batch-cihampelas",
        name: "Cihampelas Night Ride",
        createdAt: "May 25, 20:10",
        location: "Jl. Cihampelas · Bandung",
        status: "failed",
        progress: 35,
        totalFrames: 16,
        processedFrames: 6,
        frames: [
          {
            id: "frame-cihampelas-003",
            fileName: "DSC_4612.NEF",
            thumbnailUrl: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=160&q=70&auto=format&fit=crop",
            status: "failed",
            progress: 100,
            ai: null,
            errorMessage: "Plate OCR timed out — low light conditions. Retry with enhanced exposure.",
          },
          {
            id: "frame-cihampelas-004",
            fileName: "DSC_4613.NEF",
            thumbnailUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=160&q=70&auto=format&fit=crop",
            status: "failed",
            progress: 100,
            ai: null,
            errorMessage: "Vehicle detection failed — frame too dark to classify.",
          },
        ],
      },
      {
        id: "batch-dago-uploaded",
        name: "Dago Pakar Trail",
        createdAt: "May 28, 09:15",
        location: "Dago Pakar · Bandung",
        status: "uploaded",
        progress: 0,
        totalFrames: 12,
        processedFrames: 0,
        frames: [
          {
            id: "frame-dago-001",
            fileName: "DSC_5210.NEF",
            thumbnailUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=160&q=70&auto=format&fit=crop",
            status: "uploaded",
            progress: 0,
            ai: null,
            errorMessage: null,
          },
        ],
      },
    ],
    studioHref: "/studio",
  };
}
