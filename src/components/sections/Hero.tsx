"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { Wordmark } from "@/components/chrome/Wordmark";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { AUTHOR } from "@/content/author";
import { featuredBook, BUY_URL, BUY_LABEL, BUY_IS_EXTERNAL } from "@/content/books";
import { HERO } from "@/content/unplug";

/* The homepage hero.
   ─────────────────────────────────────────────────────────────
   This IS the book's page — there's no separate /books/[slug] to send
   anyone to, so the two buttons are the two real actions: buy it, or
   try it (which jumps to #extras further down this same page).

   There was a drag-the-plug interaction here — a cold blue-grey field
   that cross-faded to sun-yellow once you pulled a plug out of a socket.
   It's gone: it gated the cover behind a puzzle, and the payoff didn't
   justify making a first-time visitor work before seeing the book. The
   field is simply sun-yellow with its dot grid from the first frame.

   The cord metaphor survives where it reads properly — the `CordDivider`
   waves between sections and the footer wave. */

const TAG_POPS = ["blue", "teal", "magenta", "orange"] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const book = featuredBook();

  // Fall back to title + subtitle if a book doesn't declare a display split.
  const title =
    book.displayTitle ?? { mark: book.title, big: "", rest: book.subtitle };

  /* Split a leading numeral off the big line ("101 Ways" → "101" + "Ways")
     so the digits can rotate through the pops the way the cover does.
     Derived, not hardcoded, so a second book saying "52 Weekends" works. */
  const [, bigDigits = "", bigWord = ""] =
    title.big.match(/^(\d+)\s*(.*)$/) ?? [, "", title.big];
  const DIGIT_POPS = ["text-pop-blue", "text-pop-teal", "text-pop-orange"];

  return (
    <section
      aria-labelledby="hero-heading"
      className="dot-grid relative overflow-hidden bg-sun-yellow"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:px-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <p className="font-script text-[30px] md:text-[36px]">{AUTHOR.name}</p>

          {/* The full book title, set the way the cover sets it: the
              wordmark letter-coloured like the artwork, "101 Ways" with
              the marquee numeral in rotating pops (the style tile's
              carve-out — the cream outline, not the fill, does the
              separating), and the rest in navy at reading weight.

              Kept as ONE h1 with real spaces between the parts, so the
              accessible name is the complete title in the right order. */}
          <motion.h1
            id="hero-heading"
            className="mt-1 leading-[0.92] font-extrabold tracking-[-0.02em]"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Wordmark
              className="text-[clamp(50px,8.5vw,96px)]"
              stroke={11}
              drop={5}
            />{" "}
            {title.big && (
              <>
                <span
                  className="outlined outlined-on-yellow block text-[clamp(40px,6.6vw,74px)]"
                  style={{ ["--outline-w" as string]: "11px" }}
                >
                  {/* Digits stay adjacent with no whitespace between them,
                      so assistive tech reads "101", not "one zero one". */}
                  {bigDigits.split("").map((d, i) => (
                    <span key={i} className={DIGIT_POPS[i % DIGIT_POPS.length]}>
                      {d}
                    </span>
                  ))}
                  {bigWord && (
                    <>
                      {" "}
                      <span className="text-pop-magenta">{bigWord}</span>
                    </>
                  )}
                </span>{" "}
              </>
            )}
            <span className="font-body mt-3 block max-w-[22ch] text-[clamp(20px,2.4vw,30px)] leading-[1.2] font-black tracking-normal text-ink-navy">
              {title.rest}
            </span>
          </motion.h1>

          {book.tags.length > 0 && (
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
              {book.tags.map((t, i) => (
                <li key={t}>
                  <Badge pop={TAG_POPS[i % TAG_POPS.length]}>{t}</Badge>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 max-w-[52ch] text-[19px] leading-[1.5] font-bold md:text-[21px] md:leading-[1.45]">
            {HERO.body}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-3.5">
            <ButtonLink
              href={BUY_URL}
              size="hero"
              {...(BUY_IS_EXTERNAL
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {BUY_LABEL}
            </ButtonLink>
            <ButtonLink href="#extras" variant="secondary" size="hero">
              Try it free
            </ButtonLink>
          </div>

          <p className="font-script mt-5 text-[26px] md:text-[30px]">{HERO.aside}</p>
        </div>

        {/* The cover, unlinked — everything it would link to is already
            on this page, further down. */}
        <motion.figure
          className="m-0"
          initial={reduced ? undefined : { opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.42,
            delay: reduced ? 0 : 0.07,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <Image
            src={book.cover as string}
            alt={book.coverAlt}
            width={1500}
            height={1141}
            priority
            className="block h-auto w-full rounded-[22px] shadow-[0_10px_0_var(--color-sun-deep),0_18px_32px_rgb(62_81_99_/_0.2)]"
          />
        </motion.figure>
      </div>
    </section>
  );
}
