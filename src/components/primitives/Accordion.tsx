"use client";

import { useId, useState } from "react";

/* FAQ accordion.
   ─────────────────────────────────────────────────────────────
   56px rows, navy chevron rotates 180°, and the open panel takes a
   sun-yellow fill so the boundary is obvious without a hairline
   border. One row open at a time; clicking the open row closes it. */

export function Accordion({ rows }: { rows: readonly (readonly [string, string])[] }) {
  const [open, setOpen] = useState(0);
  const base = useId();

  return (
    <div className="flex flex-col gap-2.5">
      {rows.map(([question, answer], i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;
        return (
          <div
            key={question}
            className={`overflow-hidden rounded-[20px] border-3 border-ink-navy ${isOpen ? "bg-sun-yellow" : "bg-cream"}`}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-14 w-full cursor-pointer items-center gap-3 border-0 bg-transparent px-4 py-3.5 text-left text-[19px] font-black text-ink-navy"
              >
                <span className="flex-1">{question}</span>
                <span
                  aria-hidden
                  className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3E5163"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
            </h3>
            {isOpen && (
              <p
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="m-0 px-4 pb-[18px] text-body"
              >
                {answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
