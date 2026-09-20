"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export type DropdownSection = DropdownItem[];

export function Dropdown({
  trigger,
  sections,
  align = "end",
}: {
  trigger: ReactNode;
  sections: DropdownSection[];
  align?: "start" | "end";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const first = menuRef.current?.querySelector<HTMLElement>("button:not(:disabled)");
      first?.focus();
    }
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <span onClick={() => setOpen((v) => !v)} aria-haspopup="menu" aria-expanded={open}>
        {trigger}
      </span>
      {open && (
        <div
          ref={menuRef}
          role="menu"
          className={cn(
            "absolute z-40 mt-1.5 min-w-[190px] rounded-[10px] border border-border bg-surface py-1.5 shadow-dropdown",
            align === "end" ? "right-0" : "left-0",
          )}
          style={{ animation: "ds-scale-in 140ms var(--ease-standard)" }}
        >
          {sections.map((section, si) => (
            <div key={si}>
              {si > 0 && <div className="my-1 h-px bg-border" />}
              {section.map((item) => (
                <button
                  key={item.label}
                  role="menuitem"
                  type="button"
                  disabled={item.disabled}
                  onClick={() => {
                    setOpen(false);
                    item.onSelect();
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                    item.destructive
                      ? "text-error hover:bg-error-soft"
                      : "text-text-primary hover:bg-background",
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
