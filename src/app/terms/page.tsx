import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageShell";
import { Section } from "@/components/sections/Section";
import { AUTHOR } from "@/content/author";

export const metadata: Metadata = {
  title: "Terms",
  robots: { index: false },
};

/* Intake §11. A stub, deliberately: real terms depend on whether the
   site ever sells directly (§10 asks about signed copies and
   merchandise). Writing sales terms for a shop that may not exist would
   be worse than saying so.

   TODO(legal): if direct sales are added, cover orders, delivery,
   returns and the right to cancel. */

export default function TermsPage() {
  return (
    <>
      <div className="bg-sun-yellow dot-grid">
        <PageHeader title="Terms" lead="The short version." />
      </div>
      <Section field="cream">
        <div className="max-w-[68ch]">
          <p className="text-[19px] leading-[1.6] font-semibold">
            The words and illustrations on this site belong to their authors.{" "}
            {AUTHOR.copyright}. The activities are free to use at home, in a
            classroom, or at a club — that&apos;s what they&apos;re for. Please
            don&apos;t republish the text of the book itself.
          </p>
          <p className="mt-4 text-[19px] leading-[1.6] font-semibold">
            Books are bought from the retailers listed on each book&apos;s page, so
            their terms cover your order, delivery and returns — not these.
          </p>
          <p className="mt-4 text-[19px] leading-[1.6] font-semibold">
            The activities involve scissors, water, mess and going outside. Use your
            judgement about what suits your own children.
          </p>
        </div>
      </Section>
    </>
  );
}
