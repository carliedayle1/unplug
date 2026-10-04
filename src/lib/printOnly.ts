/* Print one thing, not the whole page.
   ─────────────────────────────────────────────────────────────
   The sticker chart, the checklist and the dream planner all say "print
   it", and they used to call window.print() — which printed the nav, the
   hero, the Boredom Button and everything else with it.

   The fix is a hook for CSS, not a second page. Printable areas carry
   data-printable="stickers" (etc). This sets data-print on <body> for the
   duration of the print, and the @media print rules in globals.css hide
   everything that isn't that area, an ancestor of it, or inside it.

   `afterprint` clears it, so a cancelled print can't leave the site
   stuck in print mode. */

export type Printable = "stickers" | "checklist" | "planner";

export function printOnly(what: Printable) {
  const body = document.body;
  body.dataset.print = what;

  const clear = () => {
    delete body.dataset.print;
    window.removeEventListener("afterprint", clear);
  };
  window.addEventListener("afterprint", clear);

  window.print();
}
