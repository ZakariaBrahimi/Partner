"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { FilterGroup, FilterValues } from "./filter-popover";

export function filterChips(groups: FilterGroup[], values: FilterValues) {
  const chips: { groupId: string; value: string; label: string }[] = [];
  for (const group of groups) {
    for (const value of values[group.id] ?? []) {
      const option = group.options.find((o) => o.value === value);
      if (option) chips.push({ groupId: group.id, value, label: `${group.label}: ${option.label}` });
    }
  }
  return chips;
}

/** Removable filter chips with a layout-animated add/remove (Motion), plus a
 * "Clear all" action. */
export function ActiveFilters({
  groups,
  values,
  onRemove,
  onClearAll,
}: {
  groups: FilterGroup[];
  values: FilterValues;
  onRemove: (groupId: string, value: string) => void;
  onClearAll: () => void;
}) {
  const chips = filterChips(groups, values);
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence initial={false}>
        {chips.map((chip) => (
          <motion.span
            key={`${chip.groupId}-${chip.value}`}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5 rounded-badge border border-border bg-background py-1 pl-3 pr-1.5 text-xs font-medium text-text-secondary"
          >
            {chip.label}
            <button
              type="button"
              onClick={() => onRemove(chip.groupId, chip.value)}
              aria-label={`Remove filter ${chip.label}`}
              className="flex size-4 items-center justify-center rounded-full text-text-muted hover:bg-border hover:text-text-primary"
            >
              <X className="size-3" aria-hidden="true" />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
      <button type="button" onClick={onClearAll} className="text-xs font-semibold text-primary hover:text-primary-hover">
        Clear all
      </button>
    </div>
  );
}
