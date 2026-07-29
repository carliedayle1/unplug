"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Section, SectionHeading, Reveal } from "./Section";
import { ButtonLink, IconButton } from "@/components/primitives/Button";
import { PEEK } from "@/content/unplug";
import { SPREADS, MEDIA_SLOTS } from "@/content/media";
import { BUY_URL, BUY_LABEL, BUY_IS_EXTERNAL } from "@/content/books";
import { Slot } from "@/components/content/Slot";

/* 06 · Peek Inside — swipe carousel.
   ─────────────────────────────────────────────────────────────
   Six spreads, no email required — that's the point of the section.

   CSS scroll-snap does the swiping so touch momentum is native, and
   the ‹ › buttons and arrow keys drive the same scrollTo. An aria-live
   region announces position for anyone who can't see the dots.

   Spread images are placeholder slots until the scans arrive. */

export function PeekInside() {
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
        <p className="mt-2.5 text-[18px] font-bold md:text-[21px]">{PEEK.intro}</p>
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
              key={s.pages}
              className="w-[270px] shrink-0 snap-start md:w-[380px]"
              aria-current={i === index ? "true" : undefined}
            >
              <div className="rounded-md bg-cream p-4 shadow-[0_6px_0_var(--color-sun-deep)]">
                {/* TODO(assets): replace with the real spread scans. */}
                <div className="flex aspect-4/3 flex-col items-center justify-center rounded-[14px] border-3 border-dashed border-ink-navy p-3 text-center text-[17px] font-extrabold">
                  {s.pages}
                  <span className="font-semibold text-ink-muted">
                    scan from the book
                  </span>
                </div>
                <div className="mt-3 text-[19px] font-black">{s.chapter}</div>
              </div>
            </li>
          ))}
        </ul>

        {/* Dots are decorative — the live region below carries position. */}
        <div className="mt-4 flex justify-center gap-2" aria-hidden>
          {SPREADS.map((s, i) => (
            <span
              key={s.pages}
              className={`size-3 rounded-full ${i === index ? "bg-ink-navy" : "bg-ink-navy/30"}`}
            />
          ))}
        </div>
        <p role="status" aria-live="polite" className="sr-only">
          Spread {index + 1} of {total}: {SPREADS[index].chapter}
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

      {/* The spreads are the book itself, so they can't be generated —
          real scans only. */}
      <div className="mt-7 max-w-[62ch]">
        <Slot slot={MEDIA_SLOTS.spreads} />
      </div>
    </Section>
  );
}
