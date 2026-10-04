"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "./Button";

/* Focus trap + Esc + scroll lock, shared by the Modal and the Drawer.
   ─────────────────────────────────────────────────────────────
   Both are the only two places in the site that need real dialog
   machinery, so the logic lives once here.

   On close, focus returns to whatever opened it — otherwise a
   keyboard user is dumped at the top of the document. */

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useDialogBehaviour(
  open: boolean,
  onClose: () => void,
  panelRef: React.RefObject<HTMLElement | null>,
) {
  const restoreTo = useRef<HTMLElement | null>(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      // Wrap in both directions, and pull focus back in if it escaped.
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    },
    [open, onClose, panelRef],
  );

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;

    const { overflow, paddingRight } = document.body.style;
    // Compensate for the scrollbar so the page doesn't jump on lock.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    document.addEventListener("keydown", onKeyDown);

    // Move focus into the panel synchronously. The DOM is committed by
    // the time this effect runs, so there's nothing to wait for — and
    // deferring to requestAnimationFrame would strand focus outside the
    // dialog whenever frames aren't being produced (backgrounded tab).
    const panel = panelRef.current;
    const target = panel?.querySelector<HTMLElement>(FOCUSABLE) ?? panel;
    target?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      restoreTo.current?.focus();
    };
  }, [open, onKeyDown, panelRef]);
}

/* The dialog.
   ─────────────────────────────────────────────────────────────
   Rendered through a portal into <body>. A `position: fixed` element is
   positioned against the nearest ANCESTOR THAT HAS A TRANSFORM, not the
   viewport — and on this site that's nearly everything: `Reveal`, the
   grid's `motion.li`, and the activity card's own hover lift. Opened
   from inside a card, an in-place dialog would have been clipped to the
   card. The portal makes where it's opened from irrelevant.

   A visible close button is part of the dialog, not left to Esc and the
   backdrop — a touch user has neither. The content scrolls under it
   rather than the button scrolling away. Pass `labelledBy` (the id of
   the visible heading) so the heading names the dialog; `title` is the
   fallback label when there isn't one.

   The fade is an opacity change only, so it's right for both motion
   states — reduced motion's global rule shortens it to nothing. */

export function Modal({
  open,
  onClose,
  title,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  /** id of the heading inside `children` that names this dialog. */
  labelledBy?: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogBehaviour(open, onClose, panelRef);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex animate-[dealfade_.18s_ease-out] items-center justify-center bg-scrim p-4 md:p-5"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        {...(labelledBy ? { "aria-labelledby": labelledBy } : { "aria-label": title })}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[88vh] w-full max-w-[640px] flex-col rounded-xl bg-cream shadow-[0_14px_0_var(--color-sun-deep)]"
      >
        <IconButton
          label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 z-10"
        >
          ✕
        </IconButton>
        <div className="overflow-auto rounded-xl p-6 md:p-8">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
