import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageShell";
import { ButtonLink } from "@/components/primitives/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/* The 404. Without one, a mistyped URL landed on the framework's grey
   default — the one screen on the site with no yellow, no cord, no way
   back. This keeps the page the page, and points at the only place
   there is to go: the book. */

export default function NotFound() {
  return (
    <div className="bg-sun-yellow dot-grid pb-20">
      <PageHeader
        title="That page isn't here"
        lead="It may have moved, or the link may have a typo. The book, at least, is right where you left it."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/" size="hero">
            Back to the book
          </ButtonLink>
          <ButtonLink href="/#the-101" variant="secondary" size="hero">
            Browse the 101
          </ButtonLink>
        </div>
      </PageHeader>
    </div>
  );
}
