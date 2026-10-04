import { CordDivider } from "@/components/chrome/CordDivider";
import { PageHeader } from "@/components/chrome/PageShell";
import { SnapshotProvider } from "./ActivitySnapshot";
import { ThisMonth } from "./ThisMonth";
import { TheOneOhOne } from "./TheOneOhOne";
import { BoredomButton } from "./BoredomButton";
import { MindReader } from "./MindReader";
import { SecretLanguages } from "./SecretLanguages";
import { ScreenTimeSwap } from "./ScreenTimeSwap";
import { DreamPlanner } from "./DreamPlanner";
import { StickerChart } from "./StickerChart";
import { PeekInside } from "./PeekInside";
import { FaqSection } from "./FaqSection";
import { EXTRAS } from "@/content/unplug";

/* The UNPLUG! book extras.
   ─────────────────────────────────────────────────────────────
   Interactive pieces that let someone try the book before buying it.
   They sit on the homepage — the book's only page — right where a
   visitor lands after "what's in it".

   Everything here runs on the book's real 101 (content/activities.ts).
   There used to be a notice on this page admitting the activities were
   stand-ins; it's gone because they aren't any more. The teasers and the
   tags are still our draft — see DRAFT_CONTENT.md.

   One SnapshotProvider wraps the lot, so any card, chip or label in any
   section can open the same "what's inside" dialog (and #activity-44
   deep-links to it).

   Order is a reading order: what's on now → the whole list → one at
   random → two things to try right here → the toy that shows the
   worksheet → the progress chart → real pages → the questions. */

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
        <PageHeader as="h2" title={EXTRAS.heading} lead={EXTRAS.lead} />
      </div>
      <SnapshotProvider>
        <ThisMonth />
        <TheOneOhOne />
        <BoredomButton />
        <MindReader />
        <SecretLanguages />
        <ScreenTimeSwap />
        <DreamPlanner />
        <StickerChart />
        <PeekInside />
        <FaqSection />
      </SnapshotProvider>
    </div>
  );
}
