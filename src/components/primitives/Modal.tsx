"use client";

import { useCallback, useEffect, useRef } from "react";

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

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogBehaviour(open, onClose, panelRef);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: "rgb(62 81 99 / 0.55)" }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-[560px] overflow-auto rounded-xl bg-cream p-7 shadow-[0_14px_0_var(--color-sun-deep)]"
      >
        {children}
      </div>
    </div>
  );
}
