import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { Section, SectionHeading, Reveal } from "@/components/sections/Section";
import { CordDivider } from "@/components/chrome/CordDivider";
import { PropPlayground } from "@/components/chrome/PropPlayground";
import { UnplugExtras } from "@/components/sections/UnplugExtras";
import { Slot } from "@/components/content/Slot";
import { AuthorPhoto } from "@/components/content/AuthorPhoto";
import { ButtonLink } from "@/components/primitives/Button";
import { IconDisc } from "@/components/art/Icon";
import { AUTHOR } from "@/content/author";
import { featuredBook, BUY_URL } from "@/content/books";
import { SITE_URL } from "@/content/site";
import { ACTIVITIES, CHAPTERS } from "@/lib/activities";

/* The homepage is the book's page, so the book's title is the page's
   title. Without this it inherited the author-only default, and the one
   thing a search result needs to say — what the book is called — never
   appeared. `absolute` skips the "· Wanda Kanten Hartfield" template,
   because the author's name is already in this one. */
const book0 = featuredBook();
export const metadata: Metadata = {
  title: { absolute: `${book0.title} ${book0.subtitle} — ${AUTHOR.name}` },
  description: book0.blurb ?? AUTHOR.tagline,
  openGraph: {
    title: `${book0.title} ${book0.subtitle}`,
    description: book0.blurb ?? AUTHOR.tagline,
    type: "book",
    images: [{ url: "/cover.jpg", width: 1500, height: 1141, alt: book0.coverAlt }],
  },
};

/* The homepage — and the book's only page.
   ─────────────────────────────────────────────────────────────
   There was a separate /books/[slug] here, and it was redundant with
   this page: both showed the title, the cover and a Boredom Button. One
   book doesn't need two pages saying so. Everything the book page had —
   the buy links, the excerpt slot, the full set of interactive extras —
   now lives here, in reading order:

     hero (title + buy/try) → what's in it → try it free (#extras: this
     month, the real 101 with click-to-peek, the Boredom Button, the
     mind-reader, the secret languages, the Swap, the dream planner, the
     sticker chart, Peek Inside, FAQ) → read a bit / what's still needed
     → who wrote it → the free checklist.

   The praise / events / latest-news teasers are gone with their pages —
   there was nothing real to put in them. */

const PRINCIPLE_ICONS = ["prep", "group", "free", "favourite"] as const;

export default function Home() {
  const book = featuredBook();

  /* Structured data for the one book. Only facts from the verified
     record in books.ts; no price (the retailer shows the current one),
     no ratings, no reviews. The paperback is a workExample so we can
     name its ISBN and buy page without claiming a price. `<` is escaped
     because this is injected as raw HTML (see Next's JSON-LD guide). */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: `${book.title} ${book.subtitle}`,
    url: SITE_URL,
    description: book.blurb ?? AUTHOR.tagline,
    image: book.cover ? `${SITE_URL}${book.cover}` : undefined,
    inLanguage: "en",
    numberOfPages: book.pages ?? undefined,
    datePublished: book.publishedIso ?? undefined,
    author: { "@type": "Person", name: AUTHOR.name },
    publisher: book.publisher
      ? { "@type": "Organization", name: book.publisher }
      : undefined,
    workExample: {
      "@type": "Book",
      bookFormat: "https://schema.org/Paperback",
      isbn: book.isbn13?.replace(/-/g, ""),
      url: BUY_URL,
    },
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PropPlayground />

      <Hero />

      {/* ── What's actually in it ────────────────────────── */}
      <Section field="cream" labelledBy="inside-heading">
        <Reveal>
          <SectionHeading id="inside-heading" on="cream">
            What&apos;s in it
          </SectionHeading>
          <p className="mt-3 max-w-[58ch] text-[19px] font-bold md:text-[21px]">
            {book.pages} pages, {ACTIVITIES.length} activities, {CHAPTERS.length}{" "}
            chapters. {book.editionNote}
          </p>
        </Reveal>

        <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
          {AUTHOR.principles.map((p, i) => (
            <li key={p.title}>
              <Reveal>
                <div className="flex h-full items-start gap-4 rounded-lg bg-sun-yellow p-5 md:p-6">
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

      {/* ── Try it free: the five interactive features + FAQ ── */}
      <UnplugExtras dividerField="cream" />

      {/* ── Read a bit / what's still needed ─────────────── */}
      {(book.excerptSlot || book.slots.length > 0) && (
        <>
          <CordDivider />
          <Section field="cream" labelledBy="needed-heading">
            <Reveal>
              <SectionHeading id="needed-heading" on="cream">
                Read a bit
              </SectionHeading>
              <p className="mt-3 max-w-[58ch] text-[19px] font-bold">
                A page or two of the real thing does more than any description.
              </p>
            </Reveal>
            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {book.excerptSlot && <Slot slot={book.excerptSlot} />}
              {book.slots.map((s) => (
                <Slot key={s.need} slot={s} />
              ))}
            </div>
          </Section>
        </>
      )}

      {/* ── Who wrote it ─────────────────────────────────── */}
      <Section field="yellow" labelledBy="who-heading">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
          <Reveal>
            <AuthorPhoto className="w-[200px] md:w-[240px]" />
          </Reveal>
          <Reveal>
            <SectionHeading id="who-heading">Who wrote it</SectionHeading>
            <p className="font-script mt-3 text-[34px] leading-[1.05]">
              {AUTHOR.name}
            </p>
            <div className="mt-4 max-w-[62ch]">
              {AUTHOR.shortBio.map((para) => (
                <p
                  key={para.slice(0, 20)}
                  className="mt-3 text-[19px] leading-[1.6] font-semibold"
                >
                  {para}
                </p>
              ))}
            </div>
            <ButtonLink
              href="/about"
              variant="secondary"
              size="block"
              className="mt-5"
            >
              More about Wanda
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* ── The free checklist ───────────────────────────── */}
      <Section field="cream" labelledBy="checklist-heading">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
          <Reveal>
            <SectionHeading id="checklist-heading" on="cream">
              {AUTHOR.checklist.heading}
            </SectionHeading>
            <p className="mt-3 max-w-[52ch] text-[19px] font-bold md:text-[21px]">
              {AUTHOR.checklist.blurb}
            </p>
            {/* No email asked for: the checklist page prints, or saves as a
                PDF, straight from the browser. */}
            <ButtonLink href="/checklist" size="hero" className="mt-6">
              Get the checklist
            </ButtonLink>
          </Reveal>
          <Reveal>
            <Image
              src="/newsletter.png"
              alt="A checklist pinned to a fridge, next to crayons and a paper plane"
              width={1024}
              height={1024}
              className="h-auto w-full rounded-lg"
            />
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
