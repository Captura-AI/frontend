import { type PhotographerEarningsPage } from "../entities/PhotographerEarningsPage";

const PAYOUT_METHOD = "Bank transfer · BCA •••• 4821";

/**
 * Returns static mock content for the Earnings page.
 *
 * TODO: When the backend is ready, replace getPhotographerEarningsPageContent
 * (below) with IPhotographerEarningsRepository:
 *   import { type IPhotographerEarningsRepository } from "@/infrastructure/repositories/IPhotographerEarningsRepository";
 *   return earningsRepository.getEarningsPageContent(period);
 */

export function getPhotographerEarningsPageContent(): PhotographerEarningsPage {
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
    splitNote:
      "You keep 70% of every sale. Captura retains 30% to cover platform processing, payments, and support.",
    defaultPeriodId: "2026-05",
    periods: [
      {
        id: "2026-05",
        label: "May 2026",
        trend: "+18% vs Apr",
        grossSales: 12000000,
        photographerShare: 8400000,
        platformFee: 3600000,
        salesCount: 126,
        pendingBalance: 2100000,
        payout: {
          status: "processing",
          amount: 2100000,
          scheduledDate: "5 Jun 2026",
          method: PAYOUT_METHOD,
        },
        orders: [
          {
            id: "ORD-2061",
            title: "Copper awnings after rain",
            buyer: "Ayaka T.",
            license: "Editorial",
            amount: 280000,
            status: "paid",
            date: "28 May 2026",
          },
          {
            id: "ORD-2058",
            title: "Blue scooter, old cinema light",
            buyer: "Nadia P.",
            license: "Personal use",
            amount: 190000,
            status: "ready",
            date: "27 May 2026",
          },
          {
            id: "ORD-2051",
            title: "Family crossing Asia Afrika",
            buyer: "Adit R.",
            license: "Personal use",
            amount: 675000,
            status: "processing",
            date: "25 May 2026",
          },
          {
            id: "ORD-2045",
            title: "Vintage Vespa, Jl. Braga",
            buyer: "Reza K.",
            license: "Commercial",
            amount: 850000,
            status: "paid",
            date: "22 May 2026",
          },
          {
            id: "ORD-2038",
            title: "Morning joggers, Alun-alun",
            buyer: "Studio Marlow",
            license: "Commercial",
            amount: 1200000,
            status: "paid",
            date: "18 May 2026",
          },
        ],
      },
      {
        id: "2026-04",
        label: "April 2026",
        trend: "+11% vs Mar",
        grossSales: 10000000,
        photographerShare: 7000000,
        platformFee: 3000000,
        salesCount: 108,
        pendingBalance: 0,
        payout: {
          status: "paid",
          amount: 7000000,
          scheduledDate: "5 May 2026",
          method: PAYOUT_METHOD,
        },
        orders: [
          {
            id: "ORD-1998",
            title: "Vintage Vespa under string lights",
            buyer: "Farah N.",
            license: "Commercial",
            amount: 950000,
            status: "paid",
            date: "29 Apr 2026",
          },
          {
            id: "ORD-1985",
            title: "Dago Pakar morning mist",
            buyer: "Yusuf H.",
            license: "Editorial",
            amount: 320000,
            status: "paid",
            date: "24 Apr 2026",
          },
          {
            id: "ORD-1971",
            title: "Cihampelas street portrait",
            buyer: "Maya S.",
            license: "Personal use",
            amount: 175000,
            status: "paid",
            date: "18 Apr 2026",
          },
          {
            id: "ORD-1960",
            title: "Alun-alun weekend crowd",
            buyer: "Studio Lintas",
            license: "Commercial",
            amount: 1100000,
            status: "paid",
            date: "10 Apr 2026",
          },
        ],
      },
      {
        id: "2026-03",
        label: "March 2026",
        trend: "+6% vs Feb",
        grossSales: 9000000,
        photographerShare: 6300000,
        platformFee: 2700000,
        salesCount: 96,
        pendingBalance: 0,
        payout: {
          status: "paid",
          amount: 6300000,
          scheduledDate: "5 Apr 2026",
          method: PAYOUT_METHOD,
        },
        orders: [
          {
            id: "ORD-1902",
            title: "Braga rain reflections",
            buyer: "Putri A.",
            license: "Editorial",
            amount: 290000,
            status: "paid",
            date: "27 Mar 2026",
          },
          {
            id: "ORD-1888",
            title: "Stasiun Bandung departure",
            buyer: "Dimas R.",
            license: "Personal use",
            amount: 210000,
            status: "paid",
            date: "20 Mar 2026",
          },
          {
            id: "ORD-1875",
            title: "Asia Afrika vintage car parade",
            buyer: "Klasik Otomotif",
            license: "Commercial",
            amount: 1450000,
            status: "paid",
            date: "14 Mar 2026",
          },
          {
            id: "ORD-1860",
            title: "Cihampelas evening walk",
            buyer: "Sinta W.",
            license: "Personal use",
            amount: 165000,
            status: "paid",
            date: "6 Mar 2026",
          },
        ],
      },
    ],
  };
}
