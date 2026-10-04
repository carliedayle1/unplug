/* Where the site lives.
   ─────────────────────────────────────────────────────────────
   One definition for everything that needs an absolute URL: the Open
   Graph base in layout.tsx, the sitemap, robots.txt and the homepage's
   structured data. Set NEXT_PUBLIC_SITE_URL at deploy time.

   TODO(deploy): until there's a real domain this falls back to the dev
   server, which means a sitemap and JSON-LD that point at localhost.
   That's harmless in development and wrong in production, so don't ship
   without setting the variable. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4310"
).replace(/\/$/, "");
