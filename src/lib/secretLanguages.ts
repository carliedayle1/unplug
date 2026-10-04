/* The book's secret languages — Pig Latin, Ope, Hog Latin (pp. 74–76).
   ─────────────────────────────────────────────────────────────
   Pure functions, no React, so they can be checked against the
   examples the book prints.

   Each returns PIECES rather than a string: the letters that were in the
   word (added: false) and the bits the language put there (added: true).
   The UI highlights the added bits, which is the whole of how these
   languages work — you can see the rule by looking at the output.

   Pig Latin is done as the book states it: the first letter of every
   word moves to the end, then "ay". Every word ends the same, including
   the ones that start with a vowel. (Other Pig Latins treat vowels
   differently; this one is the book's.)

   Hog Latin is the hard one, and honestly it's an approximation. The
   book says to think in SYLLABLES, and that it's "easier to pick up by
   ear than by trying to read it". Splitting English into syllables is a
   job for a dictionary; this uses a vowel-group heuristic that gets
   ordinary words right (cat, pencil, lipstick, hotdog, base) and will
   split a compound like "baseball" more finely than a person would. */

export type Piece = { text: string; added: boolean };
export type Translation = Piece[][];

const LETTERS = /[A-Za-z’']+/g;
const ALPHA = /[A-Za-z]/;

const isAllCaps = (w: string) => w.length > 1 && w === w.toUpperCase();
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s);
const shout = (s: string, caps: boolean) => (caps ? s.toUpperCase() : s);

/** Walk a sentence, handing each word to `fn` and keeping everything
    else (spaces, punctuation, digits) exactly as typed. */
function mapWords(text: string, fn: (word: string) => Piece[]): Piece[][] {
  const out: Piece[][] = [];
  let last = 0;
  for (const m of text.matchAll(LETTERS)) {
    const at = m.index ?? 0;
    if (at > last) out.push([{ text: text.slice(last, at), added: false }]);
    out.push(ALPHA.test(m[0]) ? fn(m[0]) : [{ text: m[0], added: false }]);
    last = at + m[0].length;
  }
  if (last < text.length) out.push([{ text: text.slice(last), added: false }]);
  return out;
}

/** Is this last vowel group an "e" that isn't a syllable of its own?
    "like" and "base", and the -es / -ed endings of "grapes", "makes" and
    "named". Words like "boxes", "pages" and "wanted" keep theirs. */
function silentTail(
  word: string,
  start: number,
  end: number,
  isVowel: (i: number) => boolean,
): boolean {
  if (word.slice(start, end).toLowerCase() !== "e") return false;
  if (start === 0 || isVowel(start - 1)) return false; // needs a consonant before it
  const tail = word.slice(end).toLowerCase();
  const prev = word[start - 1].toLowerCase();
  if (tail === "") return true;
  if (tail === "s") return !"sxzcgh".includes(prev);
  if (tail === "d") return !"td".includes(prev);
  return false;
}

/* ── Pig Latin ────────────────────────────────────────────── */

export function pigLatin(text: string): Translation {
  return mapWords(text, (word) => {
    const caps = isAllCaps(word);
    const first = word[0];
    const rest = word.slice(1);
    // One-letter words ("I", "a") have nothing left to keep.
    if (rest === "") return [{ text: shout(`${first.toUpperCase()}ay`, caps), added: true }];
    return [
      { text: shout(rest.toLowerCase(), caps), added: false },
      { text: shout(`-${first.toUpperCase()}ay`, caps), added: true },
    ];
  });
}

/* ── Ope ──────────────────────────────────────────────────── */

export function ope(text: string): Translation {
  return mapWords(text, (word) => {
    const caps = isAllCaps(word);
    const pieces: Piece[] = [];
    // A run of vowels is one syllable's worth, so it gets one "ope".
    const groups = [...word.matchAll(/[aeiou]+/gi)];
    // A silent final e ("like", "base", "grapes") isn't a syllable of its own.
    const last = groups[groups.length - 1];
    const silentE =
      groups.length > 1 &&
      last !== undefined &&
      silentTail(word, last.index ?? 0, (last.index ?? 0) + last[0].length, (k) =>
        /[aeiou]/i.test(word[k]),
      );
    const use = silentE ? groups.slice(0, -1) : groups;

    let at = 0;
    for (const g of use) {
      const i = g.index ?? 0;
      if (i > at) pieces.push({ text: word.slice(at, i), added: false });
      pieces.push({ text: shout("ope", caps), added: true });
      at = i;
    }
    pieces.push({ text: word.slice(at), added: false });
    return pieces.filter((p) => p.text !== "");
  });
}

/* ── Hog Latin ────────────────────────────────────────────── */

/** Split one word into syllables, as [start, end) offsets. */
function syllableSpans(word: string): Array<[number, number]> {
  const isV = (i: number) =>
    /[aeiou]/i.test(word[i]) ||
    // Y is a vowel unless it opens a word and is followed by one ("you").
    (/y/i.test(word[i]) && !(i === 0 && /[aeiou]/i.test(word[1] ?? "")));

  const groups: Array<[number, number]> = [];
  for (let i = 0; i < word.length; ) {
    if (isV(i)) {
      let j = i;
      while (j < word.length && isV(j)) j++;
      groups.push([i, j]);
      i = j;
    } else i++;
  }
  if (groups.length === 0) return [[0, word.length]];

  // Silent final e.
  const [ls, le] = groups[groups.length - 1];
  if (groups.length > 1 && silentTail(word, ls, le, isV)) groups.pop();

  // Between two vowel groups: one consonant goes with the NEXT syllable
  // (ba-by); two or more split after the first (pen-cil, lip-stick).
  const cuts: number[] = [];
  for (let g = 0; g < groups.length - 1; g++) {
    const after = groups[g][1];
    const gap = groups[g + 1][0] - after;
    cuts.push(gap <= 1 ? after : after + 1);
  }
  const spans: Array<[number, number]> = [];
  let from = 0;
  for (const c of cuts) {
    spans.push([from, c]);
    from = c;
  }
  spans.push([from, word.length]);
  return spans;
}

export function hogLatin(text: string): Translation {
  return mapWords(text, (word) => {
    const caps = isAllCaps(word);
    const lower = word.toLowerCase();
    const isV = (i: number) =>
      /[aeiou]/.test(lower[i]) ||
      (lower[i] === "y" && !(i === 0 && /[aeiou]/.test(lower[1] ?? "")));

    const pieces: Piece[] = [];
    syllableSpans(word).forEach(([s, e], n) => {
      // The first sound of the syllable is everything before its vowel.
      let v = s;
      while (v < e && !isV(v)) v++;
      let onset = lower.slice(s, v);
      const body = lower.slice(v, e);
      // A soft c says "s" (pen-cil → "Sookoo"), as the book spells it.
      if (onset === "c" && /^[eiy]/.test(body)) onset = "s";
      if (n > 0) pieces.push({ text: " ", added: false });
      pieces.push({ text: shout("m", caps), added: true });
      pieces.push({ text: shout(body, caps), added: false });
      pieces.push({ text: shout(`-${cap(onset)}ookoo`, caps), added: true });
    });
    return pieces;
  });
}

/** Flatten a translation to plain text, for copying. */
export function toText(t: Translation): string {
  return t.map((word) => word.map((p) => p.text).join("")).join("");
}
