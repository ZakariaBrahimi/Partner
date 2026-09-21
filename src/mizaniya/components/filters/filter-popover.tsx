"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { cn } from "@/design-system/utils/cn";
import { UIPopoverRoot, UIPopoverTrigger, UIPopoverContent } from "../../ui/popover";
import { Checkbox } from "../forms/checkbox";
import { Radio, RadioGroup } from "../forms/radio";
import { Button } from "../core/button";

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

/** Generic filter builder: single/multi-select groups in a popover, with a
 * badge showing the active count. Reusable across any data table in the
 * platform — the caller supplies groups + current values. */
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

  function toggleOpen(next: boolean) {
    if (next) setDraft(values);
    setOpen(next);
  }

  const activeCount = countActive(groups, values);
  const draftCount = countActive(groups, draft);

  function toggleMultiValue(groupId: string, value: string) {
    setDraft((prev) => {
      const current = prev[groupId] ?? [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [groupId]: next };
    });
  }

  return (
    <UIPopoverRoot open={open} onOpenChange={toggleOpen}>
      <UIPopoverTrigger
        render={
          <Button variant="secondary" leadingIcon={<Filter className="size-4" aria-hidden="true" />}>
            Filters
            {activeCount > 0 && (
              <span className="ml-1 flex size-5 items-center justify-center rounded-badge bg-primary text-[11px] font-semibold text-white">
                {activeCount}
              </span>
            )}
          </Button>
        }
      />
      <UIPopoverContent align="start" style={{ width: "300px" }}>
        <div className="max-h-[420px] overflow-y-auto p-4">
          {groups.map((group, i) => (
            <div key={group.id} className={cn("flex flex-col gap-2.5", i > 0 && "mt-5")}>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{group.label}</p>
              {group.type === "single" ? (
                <RadioGroup
                  name={group.label}
                  value={draft[group.id]?.[0] ?? ""}
                  onValueChange={(v) => setDraft((prev) => ({ ...prev, [group.id]: v ? [v] : [] }))}
                  className="flex flex-col gap-2"
                >
                  {group.options.map((option) => (
                    <Radio key={option.value} id={`${group.id}-${option.value}`} value={option.value} label={option.label} />
                  ))}
                </RadioGroup>
              ) : (
                <div className="flex flex-col gap-2">
                  {group.options.map((option) => {
                    const checked = (draft[group.id] ?? []).includes(option.value);
                    return (
                      <Checkbox
                        key={option.value}
                        id={`${group.id}-${option.value}`}
                        label={option.label}
                        checked={checked}
                        onCheckedChange={() => toggleMultiValue(group.id, option.value)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
          <Button variant="tertiary" size="compact" disabled={draftCount === 0} onClick={() => setDraft({})}>
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
      </UIPopoverContent>
    </UIPopoverRoot>
  );
}
