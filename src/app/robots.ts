import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/* Crawl everything public; keep the design-system page and the legal
   stubs out of the index (their own metadata says noindex too — this is
   belt and braces, and stops crawlers spending time there). */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/styleguide"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
