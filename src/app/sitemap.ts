import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { ACTIVITIES, pathFor } from "@/lib/activities";

/* The pages worth indexing. /styleguide, /privacy and /terms are left
   out on purpose — all three are already noindex, and listing a noindex
   page in a sitemap sends search engines mixed signals. No lastModified:
   we don't track real edit dates, and a made-up one is worse than none. */

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/checklist`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.4 },
    // One page per activity — see app/activities/[slug]/page.tsx.
    ...ACTIVITIES.map((a) => ({
      url: `${SITE_URL}${pathFor(a)}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
