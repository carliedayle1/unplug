"""Render the Peek Inside pages, and build the free printables, from the manuscript PDF.

    python scripts/render-spreads.py "path/to/UNPLUG manuscript.pdf"

WHY THIS IS A SCRIPT, NOT PART OF THE BUILD
  A page of the book is the author's and publisher's to put on a public
  site. So this only ever writes to .pending/ — a git-ignored folder — and
  nothing in public/ changes until a person decides it should.

  To publish a page or a printable:
    1. run this script
    2. look at the output; get Wanda's OK (and the publisher's, if their
       layout is on the page)
    3. copy the approved file into public/spreads/ or public/printables/
    4. add it to APPROVED_PAGES or APPROVED_PRINTABLES in
       src/content/media.ts

WHICH PAGES
  Read from PEEK_SPREADS and BOOK_PRINTABLES in src/content/activities.ts,
  so the choice lives in one place. The spread pages were picked because
  none of them is a trick page or a puzzle page (scripts/check-activities.mjs
  enforces it). The printables are copied as real PDF pages, not images, so
  they print as sharp as the book.

Needs PyMuPDF and Pillow:  pip install pymupdf pillow
"""

import re
import sys
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "content" / "activities.ts"
OUT = ROOT / ".pending" / "spreads"
PRINT_OUT = ROOT / ".pending" / "printables"

DPI = 150          # 792x612pt page -> 1650x1275
WIDTH = 1584       # saved width; the site shows a page at ~350px, so 2x+ for retina

PAGE_RE = r'\{\s*page:\s*(\d+),\s*activity:\s*"(\d+)"\s*\}'
NAME_RE = r'act\((\d+),\s*\d+,\s*\d+,\s*"([^"]+)"'
PRINTABLE_RE = r'\{\s*id:\s*"([^"]+)",\s*title:\s*"[^"]+",\s*activity:\s*"\d+",\s*pages:\s*\[([\d,\s]+)\]\s*\}'


def norm(s: str) -> str:
    """Compare names ignoring case, punctuation and apostrophe style."""
    return re.sub(r"[^a-z0-9]+", "", s.lower())


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 2

    pdf = Path(sys.argv[1])
    if not pdf.exists():
        print(f"No such file: {pdf}")
        return 2

    src = DATA.read_text(encoding="utf-8")
    pages = [(int(p), a) for p, a in re.findall(PAGE_RE, src)]
    names = {f"{int(k):02d}": v for k, v in re.findall(NAME_RE, src)}
    printables = [(pid, [int(x) for x in nums.split(",")]) for pid, nums in re.findall(PRINTABLE_RE, src)]
    if not pages:
        print("Couldn't find PEEK_SPREADS in", DATA)
        return 1

    doc = pymupdf.open(pdf)
    problems = 0

    # ── Spread pages, as images ─────────────────────────────────
    OUT.mkdir(parents=True, exist_ok=True)
    for page, activity in pages:
        pg = doc[page - 1]  # PDF index == printed page number in this manuscript
        want = names.get(activity, "")
        if want and norm(want) not in norm(pg.get_text()):
            print(f"  ! page {page}: expected to find {want!r} on it and didn't. "
                  "The PDF page index may not match the printed page numbers.")
            problems += 1

        pix = pg.get_pixmap(dpi=DPI)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        height = round(img.height * WIDTH / img.width)
        img = img.resize((WIDTH, height), Image.LANCZOS)
        dest = OUT / f"page-{page:03d}.webp"
        img.save(dest, "WEBP", quality=82, method=6)
        print(f"  page {page:>3}  {want or activity:<26} -> {dest.relative_to(ROOT)}  ({dest.stat().st_size // 1024} KB)")
    print(f"Wrote {len(pages)} pages to {OUT.relative_to(ROOT)}/ (git-ignored; nothing is live).\n")

    # ── Printables, as real PDF pages ───────────────────────────
    PRINT_OUT.mkdir(parents=True, exist_ok=True)
    for pid, nums in printables:
        out = pymupdf.open()
        for n in nums:
            out.insert_pdf(doc, from_page=n - 1, to_page=n - 1)
        out.set_metadata({"title": f"UNPLUG! — {pid.replace('-', ' ')}", "author": "Wanda Kanten Hartfield"})
        dest = PRINT_OUT / f"{pid}.pdf"
        out.save(dest, garbage=4, deflate=True)
        print(f"  printable {pid:<26} pages {','.join(map(str, nums)):<7} -> {dest.relative_to(ROOT)}  ({dest.stat().st_size // 1024} KB)")
    print(f"Wrote {len(printables)} printables to {PRINT_OUT.relative_to(ROOT)}/ (git-ignored; nothing is live).")

    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
