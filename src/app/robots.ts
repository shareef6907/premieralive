import type { MetadataRoute } from "next";
import { BRAND } from "@/content/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/agency", "/api", "/u", "/_next"],
      },
    ],
    sitemap: `${BRAND.domain}/sitemap.xml`,
  };
}
