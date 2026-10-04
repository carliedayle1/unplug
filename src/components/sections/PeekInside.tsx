"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Section, SectionHeading, Reveal } from "./Section";
import { useSnapshot } from "./ActivitySnapshot";
import { ButtonLink, IconButton } from "@/components/primitives/Button";
import { PEEK } from "@/content/unplug";
import {
  SPREADS,
  MEDIA_SLOTS,
  ANY_PAGE_APPROVED,
  ANY_PAGE_PENDING,
  type SpreadPage as SpreadPageData,
} from "@/content/media";
import { BUY_URL, BUY_LABEL, BUY_IS_EXTERNAL } from "@/content/books";
import { Slot } from "@/components/content/Slot";
import { byNumber, chapterOf } from "@/lib/activities";

/* 06 · Peek Inside — swipe carousel.
   ─────────────────────────────────────────────────────────────
   Six spreads, no email required — that's the point of the section.

   Each slide is two facing pages, as they sit in the printed book. Each
   page is a button that opens the snapshot of the activity on it.

   CSS scroll-snap does the swiping so touch momentum is native, and
   the ‹ › buttons and arrow keys drive the same scrollTo. An aria-live
   region announces position for anyone who can't see the dots.

   A page's image renders only once it's approved (content/media.ts);
   until then the slide is an honest placeholder with the real caption. */

export function PeekInside() {
  const open = useSnapshot();
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const total = SPREADS.length;

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(total - 1, i));
    const child = track.children[clamped] as HTMLElement | undefined;
    if (child) {
      track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
    setIndex(clamped);
  }, [total]);

  // Keep `index` in sync when the user swipes rather than clicks.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];
        const mid = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let best = Infinity;
        children.forEach((c, i) => {
          const centre = c.offsetLeft - track.offsetLeft + c.offsetWidth / 2;
          const d = Math.abs(centre - mid);
          if (d < best) {
            best = d;
            nearest = i;
          }
        });
        setIndex(nearest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Section id="peek-inside" labelledBy="peek-heading">
      <Reveal>
        <SectionHeading id="peek-heading">{PEEK.heading}</SectionHeading>
        <p className="mt-2.5 text-[18px] font-bold md:text-[21px]">
          {ANY_PAGE_APPROVED ? PEEK.intro : PEEK.introPending}
        </p>
      </Reveal>

      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Spreads from inside the book"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(index + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(index - 1);
          }
        }}
      >
        <ul
          ref={trackRef}
          className="m-0 mt-6 flex list-none snap-x snap-mandatory gap-3.5 overflow-x-auto p-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label={`Spread ${index + 1} of ${total}`}
        >
          {SPREADS.map((s, i) => (
            <li
              key={s.left.page}
              className="w-[300px] shrink-0 snap-start md:w-[640px] lg:w-[740px]"
              aria-current={i === index ? "true" : undefined}
            >
              <div className="rounded-md bg-cream p-4 shadow-[0_6px_0_var(--color-sun-deep)]">
                {/* A spread is two facing pages. Side by side from md up;
                    stacked on a phone, where side by side would make each
                    landscape page about 120px tall. */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-1.5">
                  {[s.left, s.right].map((pg) => (
                    <SpreadPage key={pg.page} page={pg} onOpen={open} />
                  ))}
                </div>
                <div className="mt-3 text-[17px] font-bold text-ink-muted">
                  Pages {s.left.page}–{s.right.page}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Dots are decorative — the live region below carries position. */}
        <div className="mt-4 flex justify-center gap-2" aria-hidden>
          {SPREADS.map((s, i) => (
            <span
              key={s.left.page}
              className={`size-3 rounded-full ${i === index ? "bg-ink-navy" : "bg-ink-navy/30"}`}
            />
          ))}
        </div>
        <p role="status" aria-live="polite" className="sr-only">
          Spread {index + 1} of {total}: pages {SPREADS[index].left.page}–{SPREADS[index].right.page},{" "}
          {byNumber(SPREADS[index].left.activity)?.name} and {byNumber(SPREADS[index].right.activity)?.name}
        </p>

        <div className="mt-4.5 flex gap-3">
          <IconButton
            label="Previous spread"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
          >
            ‹
          </IconButton>
          <IconButton
            label="Next spread"
            onClick={() => goTo(index + 1)}
            disabled={index === total - 1}
          >
            ›
          </IconButton>
          <ButtonLink
            href={BUY_URL}
            size="inline"
            className="flex-1 sm:flex-none"
            {...(BUY_IS_EXTERNAL
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {BUY_LABEL}
          </ButtonLink>
        </div>
      </div>

      {/* Pages are the book itself, so they can't be generated — real
          scans only, and only once approved. The ask goes away when
          there's nothing left to approve. */}
      {ANY_PAGE_PENDING && (
        <div className="mt-7 max-w-[62ch]">
          <Slot slot={MEDIA_SLOTS.spreads} />
        </div>
      )}
    </Section>
  );
}

/** One page of a spread: the scan once approved, an honest placeholder
    until then, and the activity's name under it. */
function SpreadPage({
  page,
  onOpen,
}: {
  page: SpreadPageData;
  onOpen: ((n: string) => void) | undefined;
}) {
  const a = byNumber(page.activity);
  if (!a) return null;
  return (
    <button
      type="button"
      disabled={!onOpen}
      onClick={() => onOpen?.(a.n)}
      aria-label={`Peek inside: ${a.name}, page ${page.page}`}
      className="block w-full cursor-pointer rounded-[14px] border-0 bg-transparent p-0 text-left transition-transform duration-(--duration-lift) ease-(--ease-bounce) hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {page.image ? (
        <Image
          src={page.image}
          alt={`Page ${page.page} of the book: ${a.name}`}
          width={1584}
          height={1224}
          // Without this, next/image assumes 100vw and fetches the 3840px
          // rendition for a slot a few hundred pixels wide.
          sizes="(min-width: 1024px) 350px, (min-width: 768px) 300px, 268px"
          className="aspect-[792/612] w-full rounded-[14px] border-3 border-ink-navy object-cover"
        />
      ) : (
        <div className="flex aspect-[792/612] flex-col items-center justify-center rounded-[14px] border-3 border-dashed border-ink-navy p-3 text-center text-[18px] font-extrabold">
          page {page.page}
          <span className="font-semibold text-ink-muted">scan needed</span>
        </div>
      )}
      <div className="mt-2 text-[19px] font-black">{a.name}</div>
      <div className="text-[16px] font-bold text-ink-muted">{chapterOf(a).name}</div>
    </button>
  );
}
