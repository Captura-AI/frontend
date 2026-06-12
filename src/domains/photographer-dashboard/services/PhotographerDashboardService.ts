import { type PhotographerDashboardPage } from "../entities/PhotographerDashboardPage";

/**
 * Returns static mock content for the Photographer Dashboard overview.
 *
 * TODO: When the backend is ready, replace this with IPhotographerDashboardRepository:
 *   import { type IPhotographerDashboardRepository } from "@/infrastructure/repositories/IPhotographerDashboardRepository";
 *   return dashboardRepository.getDashboardPageContent();
 */
export function getPhotographerDashboardPageContent(): PhotographerDashboardPage {
  return {
    photographer: {
      name: "Sari Pradipta",
      area: "Braga · Asia Afrika · Alun-alun",
      handle: "@sari.frames",
      availability: "Open for late-afternoon walks",
    },
    periodLabel: "May 2026 performance",
    nav: [
      { label: "Overview", href: "/dashboard/photographer", status: "Live" },
      { label: "Uploads", href: "/dashboard/photographer/uploads", status: "8 queued" },
      { label: "Moments", href: "/dashboard/photographer/moments", status: "214" },
      { label: "Bookings", href: "/dashboard/photographer/bookings", status: "3 new" },
      { label: "Earnings", href: "/dashboard/photographer/earnings", status: "Rp 8.4m" },
    ],
    stats: [
      {
        label: "Revenue",
        value: "Rp 8.4m",
        helper: "70% photographer share after platform split",
        trend: "+18% vs Apr",
        tone: "accent",
      },
      {
        label: "Sales",
        value: "126",
        helper: "Personal, editorial, and commercial licenses",
        trend: "32 repeat buyers",
        tone: "success",
      },
      {
        label: "Uploads",
        value: "418",
        helper: "Frames processed through AI metadata review",
        trend: "46 awaiting publish",
        tone: "neutral",
      },
      {
        label: "Bookings",
        value: "9",
        helper: "Private walks requested from profile packages",
        trend: "3 need response",
        tone: "warning",
      },
      {
        label: "Review queue",
        value: "18",
        helper: "Frames need metadata confirmation before public search",
        trend: "4 plate masks",
        tone: "danger",
      },
    ],
    alerts: [
      {
        title: "AI review is blocking tonight's Braga batch",
        description:
          "18 frames have partial plate OCR or missing route context. Review them before publishing to keep public metadata safe.",
        actionLabel: "Review metadata",
        actionHref: "/dashboard/photographer/uploads",
        tone: "warning",
      },
      {
        title: "Profile package copy is almost complete",
        description:
          "Add one cancellation note and a sample delivery promise so booking requests arrive with clearer expectations.",
        actionLabel: "Complete profile",
        actionHref: "/photographers/sari-pradipta#booking",
        tone: "neutral",
      },
    ],
    quickActions: [
      {
        label: "Upload batch",
        description: "Start a new street set and route images into AI parsing.",
        href: "/dashboard/photographer/uploads",
        meta: "Studio workflow",
        tone: "accent",
      },
      {
        label: "Review AI metadata",
        description: "Confirm public tags, masked plates, location, and confidence.",
        href: "/dashboard/photographer/uploads",
        meta: "18 waiting",
        tone: "warning",
      },
      {
        label: "Manage moments",
        description: "Edit visibility, license, price, and public story.",
        href: "/dashboard/photographer/moments",
        meta: "214 listed",
        tone: "neutral",
      },
      {
        label: "View bookings",
        description: "Accept, decline, or propose a new session time.",
        href: "/dashboard/photographer/bookings",
        meta: "3 pending",
        tone: "success",
      },
      {
        label: "Check earnings",
        description: "Track payouts, order history, and revenue split.",
        href: "/dashboard/photographer/earnings",
        meta: "Rp 2.1m pending",
        tone: "neutral",
      },
    ],
    recentOrders: [
      {
        id: "ORD-2061",
        title: "Copper awnings after rain",
        buyer: "Ayaka T.",
        license: "Editorial web",
        amount: "Rp 280k",
        status: "Paid",
      },
      {
        id: "ORD-2058",
        title: "Blue scooter, old cinema light",
        buyer: "Nadia P.",
        license: "Personal archive",
        amount: "Rp 190k",
        status: "Ready",
      },
      {
        id: "ORD-2051",
        title: "Family crossing Asia Afrika",
        buyer: "Adit R.",
        license: "Private proofing",
        amount: "Rp 675k",
        status: "Processing",
      },
    ],
    uploadQueue: [
      {
        id: "batch-braga-0519",
        batchName: "Braga after rain",
        status: "needs-review",
        progress: 72,
        frames: "86 / 119 frames",
        helper: "Plate mask and location confidence need approval.",
      },
      {
        id: "batch-alun-0521",
        batchName: "Alun-alun blue hour",
        status: "analyzing",
        progress: 48,
        frames: "44 / 92 frames",
        helper: "AI is parsing vehicle type and public tags.",
      },
      {
        id: "batch-savoy-0517",
        batchName: "Savoy family walk",
        status: "ready",
        progress: 100,
        frames: "38 / 38 frames",
        helper: "Ready to publish with buyer-safe metadata.",
      },
    ],
    bookings: [
      {
        id: "BKG-118",
        client: "Mika & Dimas",
        location: "Jalan Braga",
        schedule: "Jun 12 · 16:45",
        status: "pending",
        packageName: "Personal walk",
      },
      {
        id: "BKG-114",
        client: "Nadia P.",
        location: "Asia Afrika",
        schedule: "Jun 14 · 17:00",
        status: "accepted",
        packageName: "Vehicle story",
      },
      {
        id: "BKG-109",
        client: "Adit R.",
        location: "Alun-alun",
        schedule: "May 30 · Completed",
        status: "completed",
        packageName: "Family archive",
      },
    ],
    recentActivity: [
      {
        id: "act-1",
        kind: "review",
        label: "Metadata reviewed",
        description: "12 Braga frames moved from needs review to ready.",
        time: "18 min ago",
      },
      {
        id: "act-2",
        kind: "booking",
        label: "New booking request",
        description: "Mika & Dimas requested a personal walk next Friday.",
        time: "42 min ago",
      },
      {
        id: "act-3",
        kind: "order",
        label: "License sold",
        description: "Copper awnings after rain sold as editorial web.",
        time: "2 hr ago",
      },
      {
        id: "act-4",
        kind: "upload",
        label: "Batch uploaded",
        description: "Alun-alun blue hour entered AI processing.",
        time: "4 hr ago",
      },
    ],
    profileCompletion: {
      percentage: 82,
      summary:
        "Your public profile converts well. Finish the operational pieces so every booking request lands with fewer manual questions.",
      actionHref: "/photographers/sari-pradipta#booking",
      items: [
        { label: "Portfolio highlights selected", done: true },
        { label: "Three packages visible", done: true },
        { label: "Cancellation note added", done: false },
        { label: "Payout identity ready", done: true },
        { label: "Upload guide acknowledged", done: false },
      ],
    },
  };
}
