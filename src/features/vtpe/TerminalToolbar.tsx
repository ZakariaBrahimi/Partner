"use client";

import { Plus } from "lucide-react";
import { SearchInput } from "@/design-system/components/SearchInput";
import { Select } from "@/design-system/components/Select";
import { Button } from "@/design-system/components/Button";

export type StatusFilter = "all" | "active" | "pending" | "disabled";
export type CategoryFilter = "all" | "classic" | "business";

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
            onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
            className="w-[140px]"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="disabled">Disabled</option>
          </Select>
          <Select
            aria-label="Filter by category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as CategoryFilter)}
            className="w-[150px]"
          >
            <option value="all">All categories</option>
            <option value="classic">Classic</option>
            <option value="business">Business</option>
          </Select>
        </div>
      </div>
      <Button leadingIcon={<Plus className="size-4" aria-hidden="true" />} onClick={onCreate}>
        Create terminal
      </Button>
    </div>
  );
}
