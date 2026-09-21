import { X } from "lucide-react";
import type { FilterGroup, FilterValues } from "@/design-system/components/FilterPopover";
import { filterChips } from "./filters";

export function ActiveFilterChips({
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
      {chips.map((chip) => (
        <span
          key={`${chip.groupId}-${chip.value}`}
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
        </span>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-semibold text-primary hover:text-primary-hover"
      >
        Clear all
      </button>
    </div>
  );
}
