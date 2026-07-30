import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageShell";
import { Section, SectionHeading, Reveal } from "@/components/sections/Section";
import { CordDivider } from "@/components/chrome/CordDivider";
import { Slot } from "@/components/content/Slot";
import { ButtonLink } from "@/components/primitives/Button";
import { IconDisc } from "@/components/art/Icon";
import { AUTHOR } from "@/content/author";
import { featuredBook, BOOK_URL } from "@/content/books";

export const metadata: Metadata = {
  title: "About",
  description: AUTHOR.shortBio[0],
};

/* /about
   ─────────────────────────────────────────────────────────────
   The calmest page in the site: cream field, one pop (the divider),
   Caveat reserved for the name, 62ch measure. This is where a sceptical
   parent decides, so it stays quiet — no draggable props, no confetti.

   The bio is author-supplied (content/author.ts), not a placeholder —
   see the header comment there for what's confirmed. The mockup's
   invented British-teacher backstory is long gone; this replaced it. */

const PRINCIPLE_ICONS = ["time", "indoor", "prep", "free"] as const;

export default function AboutPage() {
  const book = featuredBook();

  return (
    <>
      <div className="bg-cream">
        <PageHeader field="cream" title="About Wanda" />
      </div>

      <Section field="cream" labelledBy="bio-heading">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12">
          <Reveal>
            <Slot slot={AUTHOR.headshotSlot} />
            <p className="font-script mt-5 text-[36px] leading-[1.05]">
              {AUTHOR.name}
            </p>
            <p className="text-label mt-1.5 text-ink-muted uppercase">{AUTHOR.role}</p>
          </Reveal>

          <Reveal>
            <h2 id="bio-heading" className="sr-only">
              Biography
            </h2>
            <div className="max-w-[62ch]">
              {AUTHOR.longBio.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="mt-4 text-[19px] leading-[1.65] font-semibold first:mt-0"
                >
                  {para}
                </p>
              ))}
            </div>

            <ButtonLink href={BOOK_URL} size="hero" className="mt-7">
              Read the book
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <CordDivider field="cream" />

      {/* ── What the book stands for ─────────────────────── */}
      <Section field="yellow" labelledBy="stands-heading">
        <Reveal>
          <SectionHeading id="stands-heading">What it stands for</SectionHeading>
          <p className="mt-3 max-w-[58ch] text-[19px] font-bold md:text-[21px]">
            Four rules the whole of {book.title} follows.
          </p>
        </Reveal>
        <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
          {AUTHOR.principles.map((p, i) => (
            <li key={p.title}>
              <Reveal>
                <div className="flex h-full items-start gap-4 rounded-lg bg-cream p-5 md:p-6">
                  <IconDisc name={PRINCIPLE_ICONS[i]} size={56} className="shrink-0" />
                  <div>
                    <h3 className="m-0 text-[21px] leading-[1.2] font-black">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[18px] leading-[1.5] font-semibold">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── For the author's review ──────────────────────── */}
      <Section field="cream" labelledBy="review-heading">
        <Reveal>
          <SectionHeading id="review-heading" on="cream">
            Over to you
          </SectionHeading>
          <p className="mt-3 max-w-[58ch] text-[19px] font-bold">
            One thing on this page still needs you.
          </p>
        </Reveal>
        <div className="mt-7 max-w-[420px]">
          <Slot slot={AUTHOR.headshotSlot} />
        </div>
      </Section>
    </>
  );
}
