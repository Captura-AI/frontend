import { type MetadataRoute } from "next";
import { seoConfig } from "@/shared/config/seo.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${seoConfig.baseUrl}/sitemap.xml`,
  };
}
