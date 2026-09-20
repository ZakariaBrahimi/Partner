"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { isTopOverlay, popOverlay, pushOverlay } from "./overlayStack";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onClose: () => void,
) {
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const overlayId = useRef(Symbol("overlay"));

  useEffect(() => {
    if (!active) return;

    const id = overlayId.current;
    pushOverlay(id);
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const container = ref.current;
    const focusFirst = () => {
      const focusable = container?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      (focusable?.[0] ?? container)?.focus();
    };
    const raf = requestAnimationFrame(focusFirst);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (!isTopOverlay(id)) return;
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !container || !isTopOverlay(id)) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKeyDown, true);
      popOverlay(id);
      previouslyFocused.current?.focus();
    };
  }, [active, onClose, ref]);
}
