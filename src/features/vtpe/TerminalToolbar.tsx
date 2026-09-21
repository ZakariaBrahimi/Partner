"use client";

import { Plus } from "lucide-react";
import { Button, SearchInput, Select } from "@/mizaniya";

export type StatusFilter = "all" | "active" | "pending" | "disabled";
export type CategoryFilter = "all" | "classic" | "business";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "disabled", label: "Disabled" },
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "All categories" },
  { value: "classic", label: "Classic" },
  { value: "business", label: "Business" },
];

export function TerminalToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  onCreate,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  category: CategoryFilter;
  onCategoryChange: (value: CategoryFilter) => void;
  onCreate: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          placeholder="Search terminals..."
          aria-label="Search terminals"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex items-center gap-2">
          <Select
            aria-label="Filter by status"
            value={status}
            onValueChange={(v) => onStatusChange(v as StatusFilter)}
            options={STATUS_OPTIONS}
            className="w-[140px]"
          />
          <Select
            aria-label="Filter by category"
            value={category}
            onValueChange={(v) => onCategoryChange(v as CategoryFilter)}
            options={CATEGORY_OPTIONS}
            className="w-[150px]"
          />
        </div>
      </div>
      <Button leadingIcon={<Plus className="size-4" aria-hidden="true" />} onClick={onCreate}>
        Create terminal
      </Button>
    </div>
  );
}
