"use client";

import { useState } from "react";
import type { Slot as SlotType, SlotSource } from "@/content/placeholders";

/* Renders a content gap as an on-brand dashed card.
   ─────────────────────────────────────────────────────────────
   Says what's needed and who supplies it, addressed to the author in
   plain language. Image slots carry a copyable Midjourney prompt.

   Slots marked `realPhotoOnly` never render a prompt — a generated
   author portrait or event photo would be a fabricated likeness or a
   fake record. The card says so, so nobody wonders why. */

const SOURCE_LABEL: Record<SlotSource, string> = {
  author: "from author",
  ai: "we can generate",
  either: "author or we draft",
};

const SOURCE_POP: Record<SlotSource, string> = {
  author: "pop-red",
  ai: "pop-blue",
  either: "pop-orange",
};

export function Slot({ slot, className = "" }: { slot: SlotType; className?: string }) {
  const isImage = Boolean(slot.aspect);
  return (
    <div
      /* w-full + max-w-full are load-bearing: in an auto-width grid
         column, `aspect-ratio` otherwise resolves width FROM content
         height, so a tall card grew to 509px inside a 350px column and
         broke the page horizontally at 390. Making the width definite
         forces the ratio to drive height instead. min-height rather than
         a hard ratio so long labels can't be clipped. */
      className={`w-full max-w-full rounded-lg border-3 border-dashed border-ink-navy/45 bg-cream/70 p-4 md:p-5 ${className}`}
      style={isImage ? { minHeight: 0, aspectRatio: slot.aspect } : undefined}
    >
      {/* Source chip only. The intake "§n" reference that used to sit
          beside it was an internal working note and is gone. */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`${SOURCE_POP[slot.source]} rounded-full bg-(--pop) px-3 py-1 text-[15px] font-black tracking-[0.06em] text-(--on-pop) uppercase`}
        >
          {SOURCE_LABEL[slot.source]}
        </span>
      </div>

      <p className="mt-2.5 text-[18px] leading-[1.35] font-black text-ink-navy">
        {slot.need}
      </p>

      {slot.note && (
        <p className="mt-1.5 text-[16px] font-semibold text-ink-muted">{slot.note}</p>
      )}

      {slot.realPhotoOnly && (
        <p className="mt-2.5 text-[16px] font-bold text-ink-muted">
          Needs a real photograph — we won&apos;t generate this one.
        </p>
      )}

      {/* Text slots reserve roughly the height of the copy that will
          replace them, so filling them in doesn't reflow the page. */}
      {!isImage && slot.lines ? (
        <div className="mt-3 flex flex-col gap-2" aria-hidden>
          {Array.from({ length: slot.lines }, (_, i) => (
            <div
              key={i}
              className="h-3 rounded-full bg-ink-navy/12"
              style={{ width: i === slot.lines! - 1 ? "62%" : "100%" }}
            />
          ))}
        </div>
      ) : null}

      {slot.midjourney && <PromptDisclosure prompt={slot.midjourney} />}
    </div>
  );
}

function PromptDisclosure({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked — the prompt is selectable in the <pre>.
    }
  }

  return (
    <details className="mt-3">
      <summary className="flex min-h-11 cursor-pointer items-center text-[16px] font-black underline decoration-3 underline-offset-4">
        Midjourney prompt
      </summary>
      <pre className="mt-2 max-h-40 overflow-auto rounded-md bg-sun-yellow p-3 text-[14px] leading-[1.45] font-semibold whitespace-pre-wrap">
        {prompt}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="mt-2 inline-flex min-h-11 cursor-pointer items-center rounded-full border-3 border-ink-navy bg-cream px-4 text-[16px] font-black hover:bg-sun-deep"
      >
        {copied ? "Copied" : "Copy prompt"}
      </button>
    </details>
  );
}

/** Inline variant for a single missing value in running text. */
export function SlotInline({ slot }: { slot: SlotType }) {
  return (
    <span className="rounded-sm border-2 border-dashed border-ink-navy/45 bg-cream/70 px-2 py-0.5 text-[0.95em] font-extrabold text-ink-muted">
      {slot.need}
    </span>
  );
}
