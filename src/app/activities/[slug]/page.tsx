import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/chrome/PageShell";
import { ActivityFacts } from "@/components/content/ActivityFacts";
import { ButtonLink } from "@/components/primitives/Button";
import { AUTHOR } from "@/content/author";
import { featuredBook, BUY_URL, BUY_LABEL, BUY_IS_EXTERNAL } from "@/content/books";
import { SITE_URL } from "@/content/site";
import {
  ACTIVITIES,
  bySlug,
  chapterOf,
  pageLabel,
  pathFor,
  slugOf,
} from "@/lib/activities";

/* /activities/<slug> — one page per activity, all 101.
   ─────────────────────────────────────────────────────────────
   For search: someone looking for "how to make a button buzzer" should be
   able to land on a page about the Button Buzzer, from the book that has
   it. That's the whole job of these pages.

   They show EXACTLY what the snapshot dialog shows — the shared
   <ActivityFacts> — and no more: the teaser, what you need, the page, and
   the ★ line pointing at the book. Never the steps, a trick's secret or a
   puzzle's answer. A page that gave the activity away would be a page
   that replaced the book.

   This doesn't break "the homepage IS the book's page": these are pages
   about one activity each, and every one of them sends you back to the
   book (the buy button, and "See all 101").

   All 101 are prerendered; any other slug is a 404 (dynamicParams). */

export const dynamicParams = false;

export function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ slug: slugOf(a) }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = bySlug(slug);
  if (!a) return {};
  const book = featuredBook();
  const title = `${a.name} — activity ${Number(a.n)} from ${book.title}`;
  return {
    title,
    description: a.teaser,
    alternates: { canonical: pathFor(a) },
    openGraph: {
      title,
      description: a.teaser,
      type: "article",
      images: [{ url: "/cover.jpg", width: 1500, height: 1141, alt: book.coverAlt }],
    },
  };
}

export default async function ActivityPage({ params }: Props) {
  const { slug } = await params;
  const a = bySlug(slug);
  if (!a) notFound();

  const book = featuredBook();
  const chapter = chapterOf(a);
  const i = ACTIVITIES.indexOf(a);
  const prev = ACTIVITIES[i - 1];
  const next = ACTIVITIES[i + 1];
  const siblings = ACTIVITIES.filter((x) => x.chapter === a.chapter && x !== a);

  /* Structured data: a part of the book, nothing more. Not a HowTo — a
     HowTo needs steps, and the steps are what we deliberately leave out. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: a.name,
    description: a.teaser,
    url: `${SITE_URL}${pathFor(a)}`,
    isPartOf: {
      "@type": "Book",
      name: `${book.title} ${book.subtitle}`,
      author: { "@type": "Person", name: AUTHOR.name },
      isbn: book.isbn13?.replace(/-/g, ""),
    },
  };

  return (
    <div className="bg-sun-yellow dot-grid pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageHeader
        eyebrow={`From ${book.title} · chapter ${chapter.id}, ${chapter.name}`}
        title={`Activity ${Number(a.n)}`}
        as="h2"
      />

      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,720px)_1fr] lg:items-start">
          <article className="rounded-xl bg-cream p-6 shadow-[0_8px_0_var(--color-sun-deep)] md:p-8">
            <ActivityFacts activity={a} headingAs="h1" />
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink
                href={BUY_URL}
                size="block"
                {...(BUY_IS_EXTERNAL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {BUY_LABEL}
              </ButtonLink>
              <ButtonLink href="/#the-101" variant="secondary" size="block">
                See all 101
              </ButtonLink>
            </div>
            <p className="mt-5 mb-0 text-[18px] font-semibold text-ink-muted">
              The full instructions are on {pageLabel(a)} of {book.title}, by {AUTHOR.name}.
            </p>
          </article>

          <aside aria-labelledby="chapter-heading" className="rounded-xl bg-cream p-6 md:p-7">
            <h2 id="chapter-heading" className="m-0 text-[22px] font-black">
              More from {chapter.name}
            </h2>
            <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
              {siblings.map((s) => (
                <li key={s.n} className="text-[18px] font-bold">
                  <Link href={pathFor(s)}>
                    {Number(s.n)}. {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <nav
          aria-label="Neighboring activities"
          className="mt-8 flex flex-wrap justify-between gap-4 text-[18px] font-black"
        >
          {prev ? (
            <Link href={pathFor(prev)}>
              ← {Number(prev.n)}. {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={pathFor(next)}>
              {Number(next.n)}. {next.name} →
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
