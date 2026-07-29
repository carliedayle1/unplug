import type { Metadata } from "next";
import { StyleTile } from "@/components/styleguide/StyleTile";
import { ComponentLibrary } from "@/components/styleguide/ComponentLibrary";

export const metadata: Metadata = {
  title: "UNPLUG! — Design system v0.1",
  robots: { index: false, follow: false },
};

/* The regression surface.
   ─────────────────────────────────────────────────────────────
   Deliverable A (style tile) and B (component library) rendered from
   the real components, so a token change shows up here before it
   shows up on the site. Compare side by side against
   `Style Tile.dc.html` and `Components.dc.html`. */

export default function Styleguide() {
  return (
    // The root layout owns <main id="main"> — nesting another here gave
    // two main landmarks and a duplicate id.
    <div className="dot-grid min-h-screen">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-18 px-6 py-16 md:px-14">
        <header className="max-w-[760px]">
          <span className="text-label inline-block rounded-full bg-ink-navy px-4 py-2 text-cream uppercase">
            Design system v0.1
          </span>
          <h1
            className="outlined outlined-on-yellow mt-5 text-[clamp(56px,10vw,104px)] leading-[0.92] font-extrabold tracking-[-0.02em] text-pop-red"
            style={{ ["--outline-w" as string]: "12px" }}
          >
            UNPLUG!
          </h1>
          <p className="mt-5 max-w-[62ch] text-[20px] font-semibold">
            Everything here is sampled from the book cover — nothing invented.{" "}
            <strong>Playful surface, substantive spine:</strong> candy-bright and
            pokeable for the kid over the shoulder, straight-talking and legible for
            the parent holding the phone at 9pm.
          </p>
          <p className="font-script mt-3 text-[34px] font-semibold">
            for Wanda Kanten Hartfield
          </p>
        </header>

        <StyleTile />
        <ComponentLibrary />
      </div>
    </div>
  );
}
