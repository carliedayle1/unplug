"use client";

import { useState } from "react";
import { Section, SectionHeading, Reveal } from "./Section";
import { Button, ButtonLink } from "@/components/primitives/Button";
import { OutlineNumeral } from "@/components/primitives/OutlineNumeral";
import { Confetti } from "@/components/art/Confetti";
import { Icon } from "@/components/art/Icon";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { STICKERS } from "@/content/unplug";
import type { Pop } from "@/lib/activities";

/* 05 · Sticker chart — empty → partial → celebration.
   ─────────────────────────────────────────────────────────────
   Ten circles, tapped in any order, persisted to localStorage. Each
   sticker lands with a squash; badges unlock at 3, 6 and 10.

   The tenth is the one place teal takes over the field — the only
   section allowed to change the page colour. Confetti runs 1.2s then
   clears; under reduced motion it's a single static burst. */

const POPS: Pop[] = ["red", "blue", "magenta", "orange", "teal"];
const POP_HEX: Record<Pop, string> = {
  red: "#E8342A",
  blue: "#2B7FD4",
  magenta: "#E5218A",
  orange: "#F6A11F",
  teal: "#3FB68B",
};
/** Teal and orange take navy ticks; the rest take cream. */
const TICK: Record<Pop, string> = {
  red: "#FFFBEF",
  blue: "#FFFBEF",
  magenta: "#FFFBEF",
  orange: "#3E5163",
  teal: "#3E5163",
};

const EMPTY = Array<boolean>(10).fill(false);

export function StickerChart() {
  const reduced = useReducedMotion();
  const [stuck, setStuck] = useLocalStorage<boolean[]>("unplug:stickers", EMPTY);
  const [burst, setBurst] = useState(0);

  const done = stuck.filter(Boolean).length;
  const full = done === 10;

  function toggle(i: number) {
    setStuck((prev) => {
      const next = prev.slice();
      next[i] = !next[i];
      // Fire confetti only on the transition INTO a full chart.
      if (next.filter(Boolean).length === 10 && prev.filter(Boolean).length === 9) {
        setBurst((b) => b + 1);
      }
      return next;
    });
  }

  return (
    <Section
      id="sticker-chart"
      field={full ? "teal" : "yellow"}
      labelledBy="sticker-heading"
      className="relative transition-colors duration-(--duration-field-swap)"
    >
      <Confetti fireKey={burst} />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
        <Reveal>
          {full ? (
            <div className="text-center lg:text-left">
              {/* Teal field: cream halo, sun-yellow numeral and navy
                  heading — the mockup's treatment. */}
              <OutlineNumeral value="10" size={96} pop="orange" on="cream" />
              <SectionHeading id="sticker-heading" on="teal" className="mt-1.5">
                {STICKERS.headingFull}
              </SectionHeading>
              <p className="mt-3 text-[19px] font-extrabold">{STICKERS.fullBody}</p>
            </div>
          ) : (
            <div>
              <SectionHeading id="sticker-heading">
                {done > 0 ? STICKERS.headingPartial : STICKERS.headingEmpty}
              </SectionHeading>
              <p className="mt-2.5 text-[18px] font-bold md:text-[21px]">
                {STICKERS.introEmpty}
              </p>
            </div>
          )}

          {/* Progress. The bar is decorative; the count is text. */}
          <div className="mt-5">
            <p className="m-0 text-[20px] font-black" role="status" aria-live="polite">
              {done} / 10 stickers · {STICKERS.badgeLine(done)}
            </p>
            <div
              className="mt-3 h-4 overflow-hidden rounded-full bg-sun-deep"
              aria-hidden
            >
              <div
                className="h-full rounded-full bg-pop-teal transition-[width] duration-300 ease-(--ease-bounce) motion-reduce:transition-none"
                style={{ width: `${done * 10}%` }}
              />
            </div>
            <p className="mt-2 text-[17px] font-bold text-ink-muted">
              {STICKERS.badgeHint}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {full ? (
              <>
                <Button size="block" onClick={() => window.print()}>
                  {STICKERS.printCertificate}
                </Button>
                <Button
                  variant="secondary"
                  size="block"
                  onClick={() => setStuck(EMPTY)}
                >
                  {STICKERS.startNew}
                </Button>
              </>
            ) : (
              <>
                <ButtonLink href="#boredom-button" size="block">
                  {STICKERS.pickFirst}
                </ButtonLink>
                <Button
                  variant="secondary"
                  size="block"
                  onClick={() => window.print()}
                >
                  {STICKERS.printPaper}
                </Button>
              </>
            )}
          </div>
        </Reveal>

        {/* ── The chart ───────────────────────────────────── */}
        <Reveal>
          <div className="rounded-lg bg-cream p-4.5 md:p-6">
            <ul className="m-0 grid list-none grid-cols-5 gap-3 p-0 lg:grid-cols-10">
              {stuck.map((on, i) => {
                const pop = POPS[i % POPS.length];
                return (
                  <li key={i} className="contents">
                    <button
                      type="button"
                      aria-pressed={on}
                      aria-label={`${on ? "Remove" : "Add"} sticker ${i + 1} of 10`}
                      onClick={() => toggle(i)}
                      className={`flex aspect-square cursor-pointer items-center justify-center rounded-full p-0 ${on ? "border-0" : "border-3 border-dashed border-dash-empty bg-transparent"} ${on && !reduced ? "animate-[stick_.28s_cubic-bezier(.34,1.56,.64,1)]" : ""}`}
                      style={on ? { background: POP_HEX[pop] } : undefined}
                    >
                      {on && (
                        <Icon
                          name="check"
                          size={22}
                          stroke={TICK[pop]}
                          strokeWidth={4}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3.5 text-center text-[17px] font-bold text-ink-muted">
              {done === 0 ? STICKERS.emptyNote : STICKERS.tapHint}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
