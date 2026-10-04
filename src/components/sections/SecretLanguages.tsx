"use client";

import { useState } from "react";
import { Section, SectionHeading, Reveal } from "./Section";
import { useSnapshot } from "./ActivitySnapshot";
import { Button } from "@/components/primitives/Button";
import { Pill } from "@/components/primitives/Pill";
import { LANGUAGES } from "@/content/unplug";
import { byNumber } from "@/lib/activities";
import { hogLatin, ope, pigLatin, toText, type Piece, type Translation } from "@/lib/secretLanguages";

/* Say it in secret — Pig Latin, Ope and Hog Latin (pp. 74–76).
   ─────────────────────────────────────────────────────────────
   Type a sentence, pick a language, see it translated with the bits the
   language added picked out, which is the whole rule made visible.

   Everything happens in the browser; nothing typed leaves the device.
   The Hog Latin tab carries the story only this author can tell — it's
   her family's own language, and it's in the book (p. 75). */

const MAX = 140;

/** A translated word can be several syllables (Hog Latin), joined by a
    space. Split there, so each syllable can be kept in one piece and only
    the spaces are allowed to wrap — otherwise "mor-Fookoo" breaks at its
    hyphen and reads as two words. */
function syllables(word: Piece[]): Array<Piece[] | " "> {
  const out: Array<Piece[] | " "> = [];
  let current: Piece[] = [];
  for (const p of word) {
    if (p.text === " " && !p.added) {
      if (current.length) out.push(current);
      out.push(" ");
      current = [];
    } else current.push(p);
  }
  if (current.length) out.push(current);
  return out;
}

const TRANSLATE: Record<string, (t: string) => Translation> = {
  pig: pigLatin,
  ope: ope,
  hog: hogLatin,
};

export function SecretLanguages() {
  const open = useSnapshot();
  const [text, setText] = useState("");
  const [tab, setTab] = useState<(typeof LANGUAGES.tabs)[number]["id"]>("pig");
  const [copied, setCopied] = useState(false);

  const current = LANGUAGES.tabs.find((t) => t.id === tab) ?? LANGUAGES.tabs[0];
  const result = TRANSLATE[tab](text);
  const plain = toText(result);
  const about = LANGUAGES.about[tab as keyof typeof LANGUAGES.about];
  const activity = byNumber(current.activity);

  async function copy() {
    try {
      await navigator.clipboard.writeText(plain);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked — nothing useful to report.
    }
  }

  return (
    <Section id="secret-languages" labelledBy="languages-heading">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <Reveal>
          <SectionHeading id="languages-heading">{LANGUAGES.heading}</SectionHeading>
          <p className="mt-3 max-w-[56ch] text-[18px] font-bold md:text-[21px]">
            {LANGUAGES.intro}
          </p>
          <p className="mt-4 text-[17px] font-bold text-ink-muted md:text-[18px]">
            {LANGUAGES.note}
          </p>
        </Reveal>

        <Reveal>
          <div className="rounded-lg bg-cream p-5 md:p-8">
            <label htmlFor="secret-input" className="block text-[20px] font-black">
              {LANGUAGES.inputLabel}
            </label>
            <input
              id="secret-input"
              type="text"
              maxLength={MAX}
              value={text}
              placeholder={LANGUAGES.placeholder}
              autoComplete="off"
              onChange={(e) => setText(e.target.value)}
              className="mt-2 h-14 w-full rounded-md border-3 border-ink-navy bg-cream px-4 text-[20px] font-bold text-ink-navy placeholder:text-ink-muted"
            />

            <div
              role="group"
              aria-label="Language"
              className="mt-4 flex flex-wrap gap-2"
            >
              {LANGUAGES.tabs.map((t) => (
                <Pill
                  key={t.id}
                  label={t.label}
                  pop="magenta"
                  pressed={tab === t.id}
                  onToggle={() => {
                    setTab(t.id);
                    setCopied(false);
                  }}
                />
              ))}
            </div>

            <p className="mt-4 mb-0 text-[18px] leading-[1.45] font-bold">{about}</p>

            {/* The translation. aria-live so it's announced as you type
                — but polite, so it never interrupts the typing. */}
            <div
              aria-live="polite"
              aria-label={`${current.label} translation`}
              className="mt-4 min-h-[88px] rounded-md bg-sun-deep p-4 text-[24px] leading-[1.35] font-black break-words"
            >
              {text.trim() === "" ? (
                <span className="text-[18px] font-bold text-ink-muted">{LANGUAGES.empty}</span>
              ) : (
                result.map((word, i) => (
                  <span key={i}>
                    {syllables(word).map((part, k) =>
                      part === " " ? (
                        " "
                      ) : (
                        <span key={k} className="whitespace-nowrap">
                          {part.map((p, j) =>
                            p.added ? (
                              // The added bits are the rule, made visible.
                              <mark
                                key={j}
                                className="rounded-sm bg-cream px-0.5 text-ink-navy"
                              >
                                {p.text}
                              </mark>
                            ) : (
                              <span key={j}>{p.text}</span>
                            ),
                          )}
                        </span>
                      ),
                    )}
                  </span>
                ))
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <Button
                variant="secondary"
                size="inline"
                onClick={copy}
                disabled={plain.trim() === ""}
              >
                {copied ? LANGUAGES.copied : LANGUAGES.copy}
              </Button>
              {activity && (
                <Button
                  variant="secondary"
                  size="inline"
                  disabled={!open}
                  onClick={() => open?.(activity.n)}
                >
                  {LANGUAGES.peek(`${activity.name} (p. ${activity.page})`)}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
