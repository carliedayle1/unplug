"use client";

import Link from "next/link";
import { useRef } from "react";
import { NAV_LINKS, NAV_CTA } from "@/content/nav";
import { ButtonLink, IconButton } from "@/components/primitives/Button";
import { useDialogBehaviour } from "@/components/primitives/Modal";
import { Wordmark } from "./Wordmark";
import { isActiveRoute } from "./NavBar";

/* The mobile drawer.
   ─────────────────────────────────────────────────────────────
   Sun-yellow field with an inset navy border, 56px rows, the CTA.
   Shares the Modal's dialog machinery: focus trap, Esc, scroll lock,
   focus returned to the hamburger on close.

   Tapping a link closes it — otherwise the route changes behind an open
   panel with the body still scroll-locked. */

export function MobileDrawer({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogBehaviour(open, onClose, panelRef);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      style={{ background: "rgb(62 81 99 / 0.5)" }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="ml-auto flex h-full w-[min(390px,100%)] flex-col overflow-auto bg-sun-yellow p-5 shadow-[inset_0_0_0_3px_var(--color-ink-navy)]"
      >
        <div className="mb-4 flex items-center">
          <Wordmark className="text-[26px]" outline="yellow" />
          <IconButton label="Close menu" onClick={onClose} className="ml-auto">
            ✕
          </IconButton>
        </div>

        <nav aria-label="Menu">
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {NAV_LINKS.map((l) => {
              const active = isActiveRoute(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-14 items-center rounded-md px-4 text-[21px] font-black no-underline hover:bg-cream ${active ? "bg-cream" : ""}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ButtonLink
          href={NAV_CTA.href}
          onClick={onClose}
          size="block"
          fullWidth
          className="mt-4"
          {...(NAV_CTA.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {NAV_CTA.label}
        </ButtonLink>
      </div>
    </div>
  );
}
