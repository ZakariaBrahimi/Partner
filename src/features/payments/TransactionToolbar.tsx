"use client";

import { useState } from "react";
import { Columns3, Download } from "lucide-react";
import { SearchInput } from "@/design-system/components/SearchInput";
import { FilterPopover } from "@/design-system/components/FilterPopover";
import type { FilterGroup, FilterValues } from "@/design-system/components/FilterPopover";
import { Popover } from "@/design-system/components/Popover";
import { Checkbox } from "@/design-system/components/Checkbox";
import { Button } from "@/design-system/components/Button";
import { Dropdown } from "@/design-system/components/Dropdown";

export type ColumnId =
  | "customer"
  | "source"
  | "method"
  | "amount"
  | "status"
  | "date"
  | "fees"
  | "terminal"
  | "settlement"
  | "refundStatus";

export const DEFAULT_COLUMNS: ColumnId[] = ["customer", "source", "method", "amount", "status", "date"];
export const OPTIONAL_COLUMNS: { id: ColumnId; label: string }[] = [
  { id: "fees", label: "Fees" },
  { id: "terminal", label: "Terminal" },
  { id: "settlement", label: "Settlement" },
  { id: "refundStatus", label: "Refund status" },
];
const REQUIRED_LABEL: { id: ColumnId; label: string }[] = [
  { id: "customer", label: "Customer" },
  { id: "source", label: "Source" },
  { id: "method", label: "Payment method" },
  { id: "amount", label: "Amount" },
  { id: "status", label: "Status" },
  { id: "date", label: "Date" },
];

export function TransactionToolbar({
  search,
  onSearchChange,
  filterGroups,
  filterValues,
  onFilterApply,
  columns,
  onColumnsChange,
  onExport,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  filterGroups: FilterGroup[];
  filterValues: FilterValues;
  onFilterApply: (values: FilterValues) => void;
  columns: ColumnId[];
  onColumnsChange: (columns: ColumnId[]) => void;
  onExport: () => void;
}) {
  const [columnsOpen, setColumnsOpen] = useState(false);

  function toggleColumn(id: ColumnId) {
    onColumnsChange(columns.includes(id) ? columns.filter((c) => c !== id) : [...columns, id]);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          placeholder="Search by transaction ID, customer, or terminal"
          aria-label="Search transactions"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="sm:max-w-sm"
        />
        <FilterPopover groups={filterGroups} values={filterValues} onApply={onFilterApply} />
      </div>
      <div className="flex items-center gap-2">
        <Popover
          open={columnsOpen}
          onClose={() => setColumnsOpen(false)}
          align="end"
          width="220px"
          trigger={
            <Button
              variant="secondary"
              leadingIcon={<Columns3 className="size-4" aria-hidden="true" />}
              onClick={() => setColumnsOpen((v) => !v)}
              aria-expanded={columnsOpen}
              aria-haspopup="dialog"
            >
              Columns
            </Button>
          }
        >
          <div className="p-3">
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-text-muted">Visible columns</p>
            <div className="flex flex-col gap-2">
              {REQUIRED_LABEL.map((col) => (
                <Checkbox
                  key={col.id}
                  id={`col-${col.id}`}
                  label={col.label}
                  checked={columns.includes(col.id)}
                  onChange={() => toggleColumn(col.id)}
                />
              ))}
            </div>
            <div className="my-2.5 h-px bg-border" />
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-text-muted">Optional</p>
            <div className="flex flex-col gap-2">
              {OPTIONAL_COLUMNS.map((col) => (
                <Checkbox
                  key={col.id}
                  id={`col-${col.id}`}
                  label={col.label}
                  checked={columns.includes(col.id)}
                  onChange={() => toggleColumn(col.id)}
                />
              ))}
            </div>
          </div>
        </Popover>

        <Dropdown
          trigger={
            <Button variant="secondary" leadingIcon={<Download className="size-4" aria-hidden="true" />}>
              Export
            </Button>
          }
          sections={[[{ label: "Export CSV", onSelect: onExport }]]}
        />
      </div>
    </div>
  );
}
