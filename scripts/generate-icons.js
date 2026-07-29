/* Regenerates src/app/apple-icon.png from the pinwheel mark.
   ─────────────────────────────────────────────────────────────
   Next.js serves app/icon.svg directly, but `apple-icon` only accepts
   .png/.jpg — an SVG there is silently ignored and the touch icon 404s.
   So the PNG has to be rasterised, and this keeps that reproducible
   rather than a one-off binary nobody can regenerate.

   iOS applies its own rounded mask, so this variant is full-bleed square
   with no corner radius of its own.

   Run:  node scripts/generate-icons.js
   (sharp comes in with Next; no extra dependency.) */

const sharp = require("sharp");
const path = require("path");

const OUT = path.join(__dirname, "..", "src", "app", "apple-icon.png");

const BLADES = [
  ["M50 50 50 6a26 26 0 0 1 26 26z", "#E8342A"],
  ["M50 50 94 50a26 26 0 0 1-26 26z", "#F6A11F"],
  ["M50 50 50 94a26 26 0 0 1-26-26z", "#3FB68B"],
  ["M50 50 6 50a26 26 0 0 1 26-26z", "#E5218A"],
];

const svg = `<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="#F9DE55"/>
  <g transform="translate(90 90) scale(1.55) translate(-50 -50)">
    ${BLADES.map(([d, fill]) => `<path d="${d}" fill="${fill}"/>`).join("\n    ")}
    <circle cx="50" cy="50" r="9" fill="#3E5163"/>
  </g>
</svg>`;

sharp(Buffer.from(svg), { density: 384 })
  .resize(180, 180)
  .png()
  .toFile(OUT)
  .then((i) => console.log(`apple-icon.png ${i.width}x${i.height}, ${i.size} bytes`))
  .catch((e) => {
    console.error("FAILED:", e.message);
    process.exit(1);
  });
