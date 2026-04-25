import { type MetadataRoute } from "next";
import { seoConfig } from "@/shared/config/seo.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = seoConfig.baseUrl;

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
