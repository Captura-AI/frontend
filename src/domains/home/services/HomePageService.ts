import { type HomePage } from "../entities/HomePage";

export function getHomePageContent(): HomePage {
  return {
    hero: {
      headline: "Build Faster. Rank Higher.",
      subheadline:
        "A modern Next.js frontend base with built-in DDD architecture and SEO generation — ready for production from day one.",
      ctaLabel: "Get Started",
      ctaHref: "#features",
    },
    features: [
      {
        icon: "⚡",
        title: "Optimised SEO",
        description:
          "Structured metadata, Open Graph, Twitter Cards, and JSON-LD generated automatically per page.",
      },
      {
        icon: "🏗️",
        title: "Domain-Driven Design",
        description:
          "Clean separation of domain, application, infrastructure, and presentation layers.",
      },
      {
        icon: "🎨",
        title: "Tailwind CSS v4",
        description:
          "Utility-first styling with a consistent design system and no configuration overhead.",
      },
    ],
  };
}

