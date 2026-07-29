"use client";

import { useRef, useState } from "react";
import { Section, SectionHeading } from "./Section";
import { Button } from "@/components/primitives/Button";
import { ActivityCard, EmptyCardSlot } from "@/components/primitives/ActivityCard";
import { Confetti } from "@/components/art/Confetti";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { DECK, activityLabel, type Activity } from "@/lib/activities";
import { BOREDOM } from "@/content/unplug";

/* 03 · Boredom Button — the shareable.
   ─────────────────────────────────────────────────────────────
   The one navy-field section in the site. That's what makes the red
   button the brightest object on the page and gives the screenshot a
   frame.

   Press → 500ms spinner → card flips in with one overshoot + a
   confetti burst that clears after 1.2s. A repeat press never deals
   the same card twice in a row. */

export function BoredomButton() {
  const reduced = useReducedMotion();
  const [dealt, setDealt] = useState<Activity | null>(null);
  const [dealing, setDealing] = useState(false);
  const [burst, setBurst] = useState(0);
  const [shareMsg, setShareMsg] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function deal() {
    if (timer.current) clearTimeout(timer.current);
    setDealing(true);
    setShareMsg("");
    timer.current = setTimeout(() => {
      // Never the same card twice in a row.
      const pool = dealt ? DECK.filter((a) => a.n !== dealt.n) : DECK;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      setDealt(pick);
      setDealing(false);
      setBurst((b) => b + 1);
    }, 500);
  }

  async function share() {
    if (!dealt) return;
    const text = `${BOOK_SHARE_PREFIX}${dealt.n} — ${dealt.name}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "UNPLUG!", text });
      } else {
        await navigator.clipboard.writeText(text);
        setShareMsg(BOREDOM.shareCopied);
      }
    } catch {
      // User dismissed the share sheet — nothing to report.
    }
  }

  return (
    <Section id="boredom-button" field="navy" labelledBy="boredom-heading">
      <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Confetti fireKey={burst} />

        {/* ── The button ──────────────────────────────────── */}
        <div className="text-center">
          <button
            type="button"
            onClick={deal}
            aria-label={BOREDOM.buttonHint}
            className="pop-red mx-auto flex cursor-pointer flex-col items-center justify-center rounded-full border-8 border-cream bg-(--pop) shadow-[0_12px_0_var(--pop-deep),0_20px_30px_rgb(0_0_0_/_0.35)] transition-transform duration-(--duration-lift) ease-(--ease-bounce) active:translate-y-[9px] active:shadow-[0_3px_0_var(--pop-deep)] motion-reduce:transition-none motion-reduce:active:translate-y-0 lg:border-10"
            style={{ width: "min(340px, 68vw)", height: "min(340px, 68vw)" }}
          >
            <span
              aria-hidden
              className="font-display block leading-none font-extrabold text-cream"
              style={{ fontSize: "clamp(50px, 11vw, 74px)" }}
            >
              {BOREDOM.buttonLine1}
            </span>
            <span
              aria-hidden
              className="font-display block leading-none font-extrabold text-cream"
              style={{ fontSize: "clamp(50px, 11vw, 74px)" }}
            >
              {BOREDOM.buttonLine2}
            </span>
            <span
              aria-hidden
              className="mt-1.5 block font-black tracking-[0.1em] text-cream uppercase"
              style={{ fontSize: "clamp(18px, 3.4vw, 24px)" }}
            >
              {BOREDOM.buttonHint}
            </span>
          </button>
        </div>

        {/* ── The dealt card ──────────────────────────────── */}
        <div className="text-center lg:text-left">
          {/* on="navy" → sun-yellow fill + navy stroke, matching the
              mockup. The previous cream-on-cream made this a colourless
              blob — the outline must always match the field behind it. */}
          <SectionHeading id="boredom-heading" on="navy">
            {BOREDOM.heading}
          </SectionHeading>
          <p className="mt-2 text-[18px] font-bold md:text-[21px]">{BOREDOM.intro}</p>

          <div className="mt-6 flex justify-center lg:justify-start">
            {dealing ? (
              <div
                className="flex h-[210px] w-[280px] items-center justify-center rounded-lg bg-cream shadow-[0_8px_0_var(--color-sun-deep)]"
                role="status"
                aria-label="Dealing an activity"
              >
                <span className="inline-block size-9.5 animate-[spin_0.8s_linear_infinite] rounded-full border-6 border-ink-navy/25 border-t-pop-red" />
              </div>
            ) : dealt ? (
              <div
                key={dealt.n}
                className={`w-[280px] ${reduced ? "animate-[dealfade_.3s_ease-out]" : "animate-[dealin_.5s_cubic-bezier(.34,1.56,.64,1)]"}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <ActivityCard activity={dealt} layout="stack" />
              </div>
            ) : (
              <EmptyCardSlot className="h-[210px] w-[280px] border-cream text-cream">
                {BOREDOM.empty}
              </EmptyCardSlot>
            )}
          </div>

          {/* The dealt activity, announced once per deal. */}
          <p role="status" aria-live="polite" className="sr-only">
            {dealing ? "Dealing…" : dealt ? activityLabel(dealt) : ""}
          </p>

          <div className="mt-4.5 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            <Button variant="secondary" size="inline" onClick={deal}>
              {BOREDOM.dealAnother}
            </Button>
            <Button
              variant="secondary"
              size="inline"
              onClick={share}
              disabled={!dealt}
            >
              {BOREDOM.share}
            </Button>
          </div>
          {shareMsg && (
            <p role="status" aria-live="polite" className="mt-2.5 text-[17px] font-bold">
              {shareMsg}
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}

const BOOK_SHARE_PREFIX = "From UNPLUG! — activity ";
