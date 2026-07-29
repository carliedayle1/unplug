import type { Metadata } from "next";
import { PageHeader } from "@/components/chrome/PageShell";
import { Section } from "@/components/sections/Section";

export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false },
};

/* Intake §11 says we handle the privacy and terms language, and that no
   action is needed from the author. Until the newsletter provider is
   chosen we can't state who processes reader emails, so this is an
   honest stub rather than a boilerplate policy that might be wrong.

   TODO(legal): once the provider is confirmed (§6), state what's
   collected, who processes it, retention, and how to unsubscribe. */

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
            This site collects one thing: an email address, and only if you type it
            into the checklist form yourself. It is used to send the checklist. There
            is no series, and you can unsubscribe from any email in one click.
          </p>
          <p className="mt-4 text-[19px] leading-[1.6] font-semibold">
            Nothing else is tracked. The activity filters and the sticker chart
            remember your choices in your own browser&apos;s local storage — that data
            never leaves your device and clearing your browser data removes it.
          </p>
          <p className="mt-4 text-[19px] leading-[1.6] font-semibold">
            The full policy will name the email provider once it&apos;s chosen. Until
            then this page deliberately says only what is actually true of the site as
            it stands.
          </p>
        </div>
      </Section>
    </>
  );
}
