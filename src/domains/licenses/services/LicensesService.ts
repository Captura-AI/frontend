import { type LicensesPage } from "../entities/LicensesPage";

export function getLicensesPageContent(): LicensesPage {
  return {
    hero: {
      eyebrow: "Licenses",
      titlePrefix: "Know exactly ",
      titleEmphasis: "what you're buying",
      lede:
        "Every Captura moment is sold under one of three plain-language licenses. Compare usage rights, restrictions, included files, and credit requirements before you check out.",
    },
    tiers: [
      {
        id: "personal",
        name: "Personal",
        tagline: "For your own walls, albums, and feeds",
        priceLabel: "From Rp 45.000",
        bestFor: "Individuals who want a memory, print, or personal social post.",
        usageRights: [
          "Print for personal display at home or in an album",
          "Share on personal social media with photographer credit",
          "Use as a personal digital wallpaper or keepsake",
        ],
        restrictions: [
          "No commercial or promotional use",
          "No resale or redistribution of the file",
          "No use in branded content or advertising",
        ],
        includedFiles: ["High-resolution JPG", "Print-ready file up to A3"],
        creditRequired: true,
        creditNote: "Tag or credit the photographer when you share publicly.",
        refundPolicy: "7-day no-questions refund if the file hasn't been downloaded yet.",
      },
      {
        id: "editorial",
        name: "Editorial",
        tagline: "For articles, blogs, and news-style storytelling",
        priceLabel: "From Rp 120.000",
        bestFor: "Publishers, journalists, and creators covering real events.",
        usageRights: [
          "Use in articles, blog posts, and editorial newsletters",
          "Use in non-commercial educational material",
          "Crop and color-adjust for layout",
        ],
        restrictions: [
          "No advertising or product promotion",
          "No use that implies a brand endorsement",
          "No standalone resale of the image file",
        ],
        includedFiles: ["High-resolution JPG", "Web-optimized export"],
        creditRequired: true,
        creditNote: "Photographer credit required in caption or byline.",
        refundPolicy: "7-day no-questions refund if the file hasn't been downloaded yet.",
        highlighted: true,
      },
      {
        id: "commercial",
        name: "Commercial",
        tagline: "For brands, campaigns, and paid promotion",
        priceLabel: "From Rp 350.000",
        bestFor: "Businesses using a moment in ads, packaging, or campaigns.",
        usageRights: [
          "Use in advertising, marketing, and paid social campaigns",
          "Use in product packaging and branded merchandise",
          "Modify, composite, and resize for any commercial layout",
        ],
        restrictions: [
          "No reselling the original file as stock",
          "No implying photographer endorsement without written consent",
          "Sub-licensing requires a separate agreement",
        ],
        includedFiles: [
          "High-resolution JPG",
          "Edit-ready export where available",
          "Extended usage certificate",
        ],
        creditRequired: false,
        creditNote: "Credit is appreciated but not required for commercial use.",
        refundPolicy: "7-day no-questions refund if the file hasn't been downloaded yet.",
      },
    ],
    comparisonRows: [
      {
        label: "Best for",
        values: ["Personal use & memories", "Articles & editorial content", "Ads & branded campaigns"],
      },
      {
        label: "Commercial use",
        values: ["Not included", "Not included", "Included"],
      },
      {
        label: "Photographer credit",
        values: ["Required", "Required", "Optional"],
      },
      {
        label: "Resale of original file",
        values: ["Not included", "Not included", "Not included"],
      },
      {
        label: "Refund window",
        values: ["7 days", "7 days", "7 days"],
      },
      {
        label: "Goes to the photographer",
        values: ["70%", "70%", "70%"],
      },
    ],
    faqs: [
      {
        question: "Can I upgrade a license after I've already bought a moment?",
        answer:
          "Yes. Open a request from the support page with your order ID — we'll issue an upgraded license for the price difference between your current and new tier.",
      },
      {
        question: "I'm not sure which license I need. What should I pick?",
        answer:
          "If you're posting for yourself, choose Personal. If you're publishing a story, blog, or newsletter, choose Editorial. If a brand or business will use the image — including in ads or packaging — choose Commercial.",
      },
      {
        question: "What's included in every download?",
        answer:
          "Every license includes a high-resolution file plus a copy of your license terms and the photographer's credit details, so you always know how to attribute the work.",
      },
      {
        question: "Do you offer exclusive or extended licenses?",
        answer:
          "Yes — for campaigns that need exclusivity, longer terms, or sub-licensing rights, contact support and we'll arrange a custom agreement directly with the photographer.",
      },
      {
        question: "What happens if a moment is used outside its license terms?",
        answer:
          "We'll reach out first to help resolve it — usually by upgrading the license. Repeated or willful misuse may result in the license being revoked and the moment being removed from use.",
      },
    ],
    upgrade: {
      eyebrow: "Need something different?",
      title: "Need an extended or exclusive license?",
      description:
        "For campaigns that need exclusivity, multi-year terms, or sub-licensing rights, our support team can put together a custom agreement with the photographer.",
      ctaLabel: "Talk to support",
      ctaHref: "/support",
    },
  };
}
