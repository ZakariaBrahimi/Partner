"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

/** Generic anchored overlay panel. Unlike Dropdown (a fixed menu-item list),
 * Popover renders arbitrary content and is controlled by the caller — used for
 * filter builders, date-range pickers, and similar interactive panels. */
export function Popover({
  open,
  onClose,
  trigger,
  children,
  align = "start",
  width = "320px",
}: {
  open: boolean;
  onClose: () => void;
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "end";
  width?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <div ref={rootRef} className="relative inline-block">
      {trigger}
      {open && (
        <div
          role="dialog"
          className={cn(
            "absolute z-40 mt-1.5 rounded-[10px] border border-border bg-surface shadow-dropdown",
            align === "end" ? "right-0" : "left-0",
          )}
          style={{ width, animation: "ds-scale-in 140ms var(--ease-standard)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
