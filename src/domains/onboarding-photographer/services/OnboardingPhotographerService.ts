import { type OnboardingPhotographerPage } from "../entities/OnboardingPhotographerPage";

export function getOnboardingPhotographerPageContent(): OnboardingPhotographerPage {
  return {
    hero: {
      eyebrow: "Join Captura",
      titlePrefix: "Turn your ",
      titleEmphasis: "street eye",
      lede:
        "Set up your photographer profile, tell us where you shoot, and let our AI handle the tagging — so you can focus on the frame.",
    },
    steps: [
      {
        id: "profile",
        label: "Profile",
        title: "Profile setup",
        description: "Tell people who you are and where to find your work.",
      },
      {
        id: "area",
        label: "Area & specialty",
        title: "Area & specialty",
        description: "Pick the streets you cover and the moments you're best at.",
      },
      {
        id: "portfolio",
        label: "Portfolio & AI",
        title: "Sample portfolio & AI workflow",
        description: "Share a few sample frames and see how AI prepares them for publishing.",
      },
      {
        id: "pricing",
        label: "Pricing & payout",
        title: "Pricing & payout readiness",
        description: "Set a starting rate per session type and check your payout status.",
      },
      {
        id: "review",
        label: "Review",
        title: "Review & complete",
        description: "Confirm your details and understand how revenue is split.",
      },
    ],
    areaOptions: [
      { id: "braga-bandung", label: "Braga, Bandung", city: "Bandung" },
      { id: "asia-afrika", label: "Asia Afrika", city: "Bandung" },
      { id: "dago", label: "Dago", city: "Bandung" },
      { id: "lembang", label: "Lembang", city: "Bandung" },
      { id: "cihampelas", label: "Cihampelas", city: "Bandung" },
      { id: "kebun-raya-bogor", label: "Kebun Raya, Bogor", city: "Bogor" },
      { id: "puncak-pass", label: "Puncak Pass", city: "Puncak" },
      { id: "margonda-depok", label: "Margonda, Depok", city: "Depok" },
    ],
    specialtyOptions: [
      {
        id: "street-portrait",
        label: "Street & candid portraits",
        description: "Catching people mid-stride, mid-laugh, mid-thought.",
      },
      {
        id: "vehicle-motorsport",
        label: "Vehicle & motorsport",
        description: "Plates, liveries, convoys, and weekend rides.",
      },
      {
        id: "running-marathon",
        label: "Running & marathon events",
        description: "Race day bibs, finish lines, and pace groups.",
      },
      {
        id: "motorcycle-community",
        label: "Motorcycle community rides",
        description: "Group rides, meetups, and touring convoys.",
      },
      {
        id: "family-outing",
        label: "Family & kids outings",
        description: "Weekend strolls, parks, and everyday family moments.",
      },
      {
        id: "event-coverage",
        label: "Event & community gatherings",
        description: "Festivals, bazaars, and neighborhood celebrations.",
      },
    ],
    aiWorkflow: [
      {
        title: "Auto plate & vehicle detection",
        description:
          "YOLO and EasyOCR scan every frame for vehicles and plates so subjects can find themselves by what they were driving.",
      },
      {
        title: "Visual tag & description matching",
        description:
          "CLIP generates tags for clothing, activity, and scene so search queries like \"runner in red jacket\" surface the right frame.",
      },
      {
        title: "Privacy masking before publish",
        description:
          "Full plate numbers and other sensitive details are masked in public listings automatically.",
      },
      {
        title: "Review queue before going live",
        description:
          "Every AI result lands in your uploads queue for a quick review — fix, confirm, or retry before it's published.",
      },
    ],
    packageBaselines: [
      {
        id: "personal",
        label: "Personal session",
        description: "Solo portraits or a quick street session for one person.",
        placeholder: "e.g. Rp 350.000",
      },
      {
        id: "family",
        label: "Family session",
        description: "Small groups, families, or friends out together.",
        placeholder: "e.g. Rp 550.000",
      },
      {
        id: "vehicle",
        label: "Vehicle / motorsport",
        description: "Convoys, meetups, and vehicle-focused sessions.",
        placeholder: "e.g. Rp 450.000",
      },
      {
        id: "event",
        label: "Event coverage",
        description: "Half-day or full-day coverage for community events.",
        placeholder: "e.g. Rp 1.200.000",
      },
    ],
    payoutChecklist: [
      {
        id: "bank-account",
        label: "Bank account details",
        description: "Add your payout bank account once your profile is approved.",
        status: "pending",
      },
      {
        id: "tax-info",
        label: "Tax information (NPWP)",
        description: "Optional for now — required before your first payout over the threshold.",
        status: "optional",
      },
      {
        id: "payout-schedule",
        label: "Payout schedule preference",
        description: "Choose weekly or monthly payouts after your first sale.",
        status: "pending",
      },
    ],
    revenueSplit: {
      photographerShare: "70%",
      platformShare: "30%",
      description:
        "You keep 70% of every sale. Captura retains 30% to cover platform processing, payments, and support — the same split shown at checkout.",
    },
    completion: {
      title: "You're all set",
      description:
        "Your photographer profile is ready. Upload your first batch and our AI will start tagging it right away.",
      nextSteps: [
        "Upload your first batch from the dashboard.",
        "Watch the AI review queue for plate, vehicle, and tag suggestions.",
        "Publish your moments once metadata looks right.",
      ],
      primaryCtaLabel: "Go to dashboard",
      primaryCtaHref: "/dashboard/photographer",
      secondaryCtaLabel: "Back to home",
      secondaryCtaHref: "/",
    },
  };
}
