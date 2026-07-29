import Link from "next/link";
import { AUTHOR } from "@/content/author";
import { FOOTER_GROUPS, LEGAL_LINKS, SIGNOFF, CREDIT } from "@/content/nav";
import { Wordmark } from "./Wordmark";

/* Footer.
   ─────────────────────────────────────────────────────────────
   A hand-drawn wave divider, the wordmark, a grouped sitemap with 44px
   touch targets, socials, the Caveat sign-off and the copyright line.

   Social links only render once a URL exists — an anchor to nowhere is
   worse than no icon. */

export function Footer() {
  const socials = AUTHOR.socials.filter((s) => s.url !== null);

  return (
    <footer className="bg-sun-yellow dot-grid">
      <svg
        viewBox="0 0 390 26"
        preserveAspectRatio="none"
        className="block h-6.5 w-full"
        aria-hidden
      >
        <path
          d="M0 16c26-14 52 14 78 0s52-14 78 0 52 14 78 0 52-14 78 0 52 14 78 0"
          stroke="#3E5163"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className="mx-auto max-w-[1440px] px-6 pt-2 pb-8 md:px-14 md:pt-6 md:pb-14">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark className="text-[30px]" outline="yellow" />
            <p className="mt-3 max-w-[34ch] text-[17px] font-bold">{AUTHOR.tagline}</p>
            <div className="font-script mt-4 text-[26px]">{SIGNOFF}</div>

            {socials.length > 0 && (
              <ul className="m-0 mt-4 flex list-none gap-2.5 p-0">
                {socials.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.url as string}
                      aria-label={s.label}
                      className="flex size-12 items-center justify-center rounded-full border-3 border-ink-navy bg-cream text-[18px] font-black no-underline hover:bg-sun-deep"
                    >
                      <span aria-hidden>{s.short}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {FOOTER_GROUPS.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-label m-0 text-ink-muted uppercase">
                {group.heading}
              </h2>
              <ul className="m-0 mt-2 flex list-none flex-col p-0 text-[18px] font-extrabold">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="box-border flex min-h-11 items-center no-underline hover:underline hover:decoration-3 hover:underline-offset-4"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-6 text-[16px] leading-[1.5] font-bold text-ink-muted">
          {AUTHOR.copyright}
          {LEGAL_LINKS.map((l) => (
            <span key={l.href}>
              {" · "}
              <Link href={l.href}>{l.label}</Link>
            </span>
          ))}
          <br />
          {CREDIT}
        </p>
      </div>
    </footer>
  );
}
