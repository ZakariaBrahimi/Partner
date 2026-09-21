"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { cn } from "../utils/cn";
import { Popover } from "./Popover";
import { Checkbox } from "./Checkbox";
import { Radio } from "./Radio";
import { Button } from "./Button";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: "single" | "multi";
  options: FilterOption[];
}

export type FilterValues = Record<string, string[]>;

function countActive(groups: FilterGroup[], values: FilterValues) {
  return groups.reduce((total, group) => total + (values[group.id]?.length ?? 0), 0);
}

/** Generic filter builder: a set of single/multi-select groups rendered in a
 * popover, with a badge showing the active filter count. Reusable across any
 * data table in the platform — the caller supplies groups + current values. */
export function FilterPopover({
  groups,
  values,
  onApply,
}: {
  groups: FilterGroup[];
  values: FilterValues;
  onApply: (values: FilterValues) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<FilterValues>(values);

  function toggleOpen() {
    if (!open) setDraft(values);
    setOpen((v) => !v);
  }

  const activeCount = countActive(groups, values);
  const draftCount = countActive(groups, draft);

  function toggleValue(groupId: string, value: string, type: "single" | "multi") {
    setDraft((prev) => {
      const current = prev[groupId] ?? [];
      if (type === "single") {
        return { ...prev, [groupId]: current[0] === value ? [] : [value] };
      }
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [groupId]: next };
    });
  }

  return (
    <Popover
      open={open}
      onClose={() => setOpen(false)}
      width="300px"
      trigger={
        <Button
          variant="secondary"
          leadingIcon={<Filter className="size-4" aria-hidden="true" />}
          onClick={toggleOpen}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          Filters
          {activeCount > 0 && (
            <span className="ml-1 flex size-5 items-center justify-center rounded-badge bg-primary text-[11px] font-semibold text-white">
              {activeCount}
            </span>
          )}
        </Button>
      }
    >
      <div className="max-h-[420px] overflow-y-auto p-4">
        {groups.map((group, i) => (
          <div key={group.id} className={cn("flex flex-col gap-2.5", i > 0 && "mt-5")}>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              {group.label}
            </p>
            <div className="flex flex-col gap-2">
              {group.options.map((option) => {
                const checked = (draft[group.id] ?? []).includes(option.value);
                const inputId = `${group.id}-${option.value}`;
                return group.type === "single" ? (
                  <Radio
                    key={option.value}
                    id={inputId}
                    name={group.id}
                    label={option.label}
                    checked={checked}
                    onChange={() => toggleValue(group.id, option.value, "single")}
                  />
                ) : (
                  <Checkbox
                    key={option.value}
                    id={inputId}
                    label={option.label}
                    checked={checked}
                    onChange={() => toggleValue(group.id, option.value, "multi")}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <Button
          variant="tertiary"
          size="compact"
          disabled={draftCount === 0}
          onClick={() => setDraft({})}
        >
          Reset
        </Button>
        <Button
          size="compact"
          onClick={() => {
            onApply(draft);
            setOpen(false);
          }}
        >
          Apply filters
        </Button>
      </div>
    </Popover>
  );
}
