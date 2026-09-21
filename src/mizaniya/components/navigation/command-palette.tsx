"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { Command } from "cmdk";
import { cn } from "@/design-system/utils/cn";

export interface CommandPaletteItem {
  id: string;
  label: string;
  icon?: ReactNode;
  keywords?: string[];
  onSelect: () => void;
}

export interface CommandPaletteGroup {
  heading: string;
  items: CommandPaletteItem[];
}

/** Global Ctrl+K command palette, built on cmdk. The catalog of searchable
 * destinations is supplied by the app shell — this component owns only the
 * open/keyboard-shortcut/rendering behavior so any feature can extend it. */
export function CommandPalette({
  open,
  onOpenChange,
  groups,
  placeholder = "Search transactions, customers, terminals...",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: CommandPaletteGroup[];
  placeholder?: string;
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Command palette"
      className="fixed left-1/2 top-[18vh] z-50 w-full max-w-[560px] -translate-x-1/2 overflow-hidden rounded-modal border border-border bg-surface shadow-modal"
      overlayClassName="fixed inset-0 z-50 bg-[#17212B]/40"
      contentClassName={cn("mz-dialog-transition")}
    >
      <div className="flex items-center gap-2 border-b border-border px-4">
        <Command.Input
          placeholder={placeholder}
          className="h-12 w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[11px] font-medium text-text-muted">Esc</kbd>
      </div>
      <Command.List className="max-h-[360px] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-8 text-center text-sm text-text-muted">No results found.</Command.Empty>
        {groups.map((group) => (
          <Command.Group
            key={group.heading}
            heading={group.heading}
            className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted [&_[cmdk-group-items]]:mt-1"
          >
            {group.items.map((item) => (
              <Command.Item
                key={item.id}
                keywords={item.keywords}
                onSelect={() => {
                  item.onSelect();
                  onOpenChange(false);
                }}
                className="flex cursor-pointer items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-sm text-text-primary data-[selected=true]:bg-background"
              >
                {item.icon}
                {item.label}
              </Command.Item>
            ))}
          </Command.Group>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
