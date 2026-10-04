"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { Modal } from "@/components/primitives/Modal";
import { ActivityFacts } from "@/components/content/ActivityFacts";
import { Button, ButtonLink } from "@/components/primitives/Button";
import {
  DECK,
  byNumber,
  pathFor,
  type Activity,
} from "@/lib/activities";
import { BUY_URL, BUY_LABEL, BUY_IS_EXTERNAL } from "@/content/books";
import { SNAPSHOT } from "@/content/unplug";

/* The snapshot: what's inside the book, for one activity.
   ─────────────────────────────────────────────────────────────
   A teaser plus the materials list — enough to want it, nothing that
   replaces the page. The steps, a trick's secret and a puzzle's answer
   stay in the book; that is the whole reason to buy it, and the content
   check (scripts/check-activities.mjs) fails the build if a teaser
   leaks one.

   ONE dialog for the whole page. `SnapshotProvider` owns it and hands
   out `open(n)`, so the 101 grid, the Boredom Button, the Swap chips,
   the sticker labels and the This-month strip can all open the same
   thing without each mounting their own.

   Deep link: `#activity-44` opens it on load and on hashchange, so a
   shared link lands on the activity. Opening writes the hash with
   replaceState and closing clears it — replaceState, not assigning
   location.hash, so opening a dialog never adds a Back-button stop and
   never scrolls the page. */

type Open = (n: string) => void;

const SnapshotContext = createContext<Open | null>(null);

/** The opener, or `undefined` outside a provider (a card with no
    `onOpen` is then simply inert — which is how the styleguide shows it). */
export function useSnapshot(): Open | undefined {
  return useContext(SnapshotContext) ?? undefined;
}

const HASH = /^#activity-(\d{1,3})$/;

function writeHash(n: string | null) {
  const url =
    window.location.pathname +
    window.location.search +
    (n === null ? "" : `#activity-${Number(n)}`);
  window.history.replaceState(null, "", url);
}

export function SnapshotProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<string | null>(null);

  const open = useCallback<Open>((n) => {
    setCurrent(n);
    writeHash(n);
  }, []);

  const close = useCallback(() => {
    setCurrent(null);
    writeHash(null);
  }, []);

  // A deep link on load, and in-page links that change the hash.
  useEffect(() => {
    const fromHash = () => {
      const m = HASH.exec(window.location.hash);
      if (m && byNumber(m[1])) setCurrent(byNumber(m[1])!.n);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const activity = current ? byNumber(current) : undefined;

  return (
    <SnapshotContext.Provider value={open}>
      {children}
      <Modal
        open={!!activity}
        onClose={close}
        title={activity ? activity.name : SNAPSHOT.fallbackTitle}
        labelledBy="snapshot-title"
      >
        {/* Keyed so each activity starts with a clean "copied" note. */}
        {activity && <SnapshotBody
            key={activity.n}
            activity={activity}
            onAnother={open}
            onLeave={close}
          />}
      </Modal>
    </SnapshotContext.Provider>
  );
}

function SnapshotBody({
  activity,
  onAnother,
  onLeave,
}: {
  activity: Activity;
  onAnother: Open;
  /** Close the dialog before navigating away from the page. */
  onLeave: () => void;
}) {
  const [copied, setCopied] = useState(false);

  // Picked on press, not on render: a random pick has no business in a
  // render, and the next activity should be a surprise each time.
  function pickAnother() {
    const pool = DECK.filter((a) => a.n !== activity.n);
    onAnother(pool[Math.floor(Math.random() * pool.length)].n);
  }

  async function copyLink() {
    // The activity's own page: a real URL that unfurls with its own title,
    // rather than the homepage with a hash.
    const url = `${window.location.origin}${pathFor(activity)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard blocked — nothing useful to report.
    }
  }

  return (
    <div>
      {/* pr-12 keeps the heading clear of the dialog's close button. */}
      <ActivityFacts activity={activity} headingId="snapshot-title" className="pr-12" />

      <div className="mt-6 flex flex-wrap gap-2.5">
        <ButtonLink
          href={BUY_URL}
          size="inline"
          {...(BUY_IS_EXTERNAL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {BUY_LABEL}
        </ButtonLink>
        <Button variant="secondary" size="inline" onClick={pickAnother}>
          {SNAPSHOT.another}
        </Button>
        <Button variant="secondary" size="inline" onClick={copyLink}>
          {SNAPSHOT.copyLink}
        </Button>
      </div>
      {/* A real link, so the activity's own page is reachable (and
          crawlable) from the dialog, not just via the sitemap. */}
      <p className="mt-3 mb-0 text-[18px] font-bold">
        {/* Close the dialog on the way out, so the scroll lock and the
            #activity- hash don't outlive it. (Landing at the top of the new
            page is the data-scroll-behavior attribute in layout.tsx.) */}
        <Link href={pathFor(activity)} onClick={onLeave}>
          {SNAPSHOT.ownPage}
        </Link>
      </p>
      <p role="status" aria-live="polite" className="mt-2.5 min-h-[1.5em] text-[17px] font-bold">
        {copied ? SNAPSHOT.copied : ""}
      </p>
    </div>
  );
}
