import { CordDivider } from "@/components/chrome/CordDivider";
import { PageHeader } from "@/components/chrome/PageShell";
import { TheOneOhOne } from "./TheOneOhOne";
import { BoredomButton } from "./BoredomButton";
import { ScreenTimeSwap } from "./ScreenTimeSwap";
import { StickerChart } from "./StickerChart";
import { PeekInside } from "./PeekInside";
import { FaqSection } from "./FaqSection";

/* The UNPLUG! book extras.
   ─────────────────────────────────────────────────────────────
   Interactive pieces that let someone try the book before buying it.
   They sit on the homepage — the book's only page — right where a
   visitor lands after "what's in it".

   HONESTY NOTE, and it matters when showing this to the author:
   the twelve activities behind these features are DEMO DATA. Five came
   from the design mockups and seven we wrote to fill the grid. They are
   not the book's real 101, and their numbers are not its numbering. The
   banner below says so on the page, because the author will spot it
   instantly and shouldn't have to wonder whether we got her book wrong.
   Swap lib/activities.ts for the real list and the note comes out. */

export function UnplugExtras({
  /** The field of whatever section sits directly above this one, so the
      leading cord divider's own background matches it instead of
      defaulting to yellow regardless of context. */
  dividerField = "yellow",
}: {
  dividerField?: "yellow" | "cream";
}) {
  return (
    <div id="extras">
      <CordDivider field={dividerField} />
      <div className="bg-sun-yellow dot-grid">
        {/* h2 — the book page's title already holds the h1. */}
        <PageHeader
          as="h2"
          title="Try it free"
          lead="Five things from the book, playable here. No email, no account — if you never buy it you still get these."
        >
          <p className="mt-5 max-w-[68ch] rounded-lg border-3 border-dashed border-ink-navy/45 bg-cream/70 p-4 text-[17px] leading-[1.5] font-bold">
            <strong>Sample activities.</strong> The activities shown in these
            features are stand-ins so you can see how they work — they aren&apos;t
            from the book, and the numbers aren&apos;t its numbering. Send the real
            list and we&apos;ll load it in.
          </p>
        </PageHeader>
      </div>
      <TheOneOhOne />
      <BoredomButton />
      <ScreenTimeSwap />
      <StickerChart />
      <PeekInside />
      <FaqSection />
    </div>
  );
}
