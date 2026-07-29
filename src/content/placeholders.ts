/* The placeholder system.
   ─────────────────────────────────────────────────────────────
   Where content is genuinely still missing, a typed `Slot` says what's
   needed and who supplies it — in plain language, addressed to the
   author. The old "§n" intake references are gone: they were internal
   working notes and had no business on a page anyone else would see.

   Most sections now carry drafted copy instead of a slot. What remains
   is the handful of things nobody can write for her: her own photo, her
   own words about herself, the real back-cover text. */

export type SlotSource =
  /** Only the author can provide it — facts, likenesses, links. */
  | "author"
  /** We can generate it (illustration, decorative art). */
  | "ai"
  /** Either: author supplies, or we draft and they approve. */
  | "either";

export type Slot = {
  /** What is missing, in the author's language. */
  need: string;
  source: SlotSource;
  /** Extra guidance — word counts, resolution, format. */
  note?: string;
  /** For image slots: CSS aspect-ratio, e.g. "4/3". */
  aspect?: string;
  /** A ready-to-paste Midjourney prompt. Never set alongside
      realPhotoOnly. */
  midjourney?: string;
  /** Must be a genuine photograph. Author headshots and book covers:
      generating these fabricates a likeness of a real person or
      misrepresents a real product. */
  realPhotoOnly?: true;
  /** Roughly how much copy will replace this, so the layout doesn't
      jump when it's filled in. */
  lines?: number;
};

/* One shared style suffix so every generated image matches the cover
   art. Appended automatically by `mj()` — don't repeat it per prompt. */
export const MJ_STYLE =
  "flat vector illustration, no outlines on figures, rounded friendly forms, " +
  "dot eyes and simple smiles, sun-yellow #F9DE55 background, " +
  "palette #E8342A #2B7FD4 #3FB68B #E5218A #F6A11F with #3E5163 details, " +
  "visibly diverse cast of skin tones and hair types, one soft ellipse shadow per figure, " +
  "no gradients, no 3D, no photorealism, no text or lettering";

/** Compose a full Midjourney prompt from a subject. */
export function mj(subject: string, ar = "3:2"): string {
  return `${subject}, ${MJ_STYLE} --ar ${ar} --style raw`;
}

/* ── Helpers for the common cases ───────────────────────────── */

export const authorText = (
  need: string,
  opts: { note?: string; lines?: number } = {},
): Slot => ({ need, source: "author", ...opts });

export const authorPhoto = (
  need: string,
  opts: { note?: string; aspect?: string } = {},
): Slot => ({
  need,
  source: "author",
  realPhotoOnly: true,
  aspect: "1/1",
  ...opts,
});

export const aiImage = (
  need: string,
  subject: string,
  opts: { aspect?: string; ar?: string; note?: string } = {},
): Slot => ({
  need,
  source: "ai",
  aspect: opts.aspect ?? "3/2",
  midjourney: mj(subject, opts.ar ?? "3:2"),
  note: opts.note,
});
