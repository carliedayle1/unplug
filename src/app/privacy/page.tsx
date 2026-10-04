import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageShell";
import { Section } from "@/components/sections/Section";

export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false },
};

/* Privacy — what's actually true of the site.
   ─────────────────────────────────────────────────────────────
   The site collects nothing. There's no form, no account, no analytics
   and no cookies of ours. (An email form used to be here; it was removed,
   so this page no longer has a provider to name.) The interactive extras
   remember a few choices in the visitor's own browser, and that's all.

   If anything that collects data is ever added — an email list,
   analytics — this page has to change in the same commit. */

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-sun-yellow dot-grid">
        <PageHeader
          title="Privacy"
          lead="What this site collects, and what it doesn't."
        />
      </div>
      <Section field="cream">
        <div className="max-w-[68ch]">
          <p className="text-[19px] leading-[1.6] font-semibold">
            This site doesn&apos;t collect anything about you. There are no forms, no
            accounts, no tracking and no cookies of ours, and nothing you type is sent
            anywhere.
          </p>
          <p className="mt-4 text-[19px] leading-[1.6] font-semibold">
            A few things remember your choices in your own browser&apos;s local storage:
            the activity filters, the sticker chart and the dream planner. That data
            never leaves your device, and clearing your browser data removes it. The
            secret-language translator works entirely in your browser and keeps nothing.
          </p>
          <p className="mt-4 text-[19px] leading-[1.6] font-semibold">
            The &ldquo;Buy on Amazon&rdquo; buttons take you to Amazon, whose own
            privacy policy applies there.
          </p>
        </div>
      </Section>
    </>
  );
}
