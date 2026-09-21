"use client";

import type { ReactNode } from "react";
import {
  tableFeatures,
  useTable,
  rowSortingFeature,
  columnVisibilityFeature,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState, ColumnVisibilityState, OnChangeFn, Row } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/design-system/utils/cn";
import { EmptyState, LoadingState } from "./states";

/**
 * The Mizaniya table's fixed feature set: sorting (state/handlers only — no
 * sortedRowModel is registered, since the feature owning the data — date
 * range, filters, pagination — sorts server-/feature-side and hands us
 * already-ordered rows) plus column visibility.
 */
export const dataTableFeatures = tableFeatures({ rowSortingFeature, columnVisibilityFeature });
export type DataTableFeatures = typeof dataTableFeatures;

export function createDataTableColumns<T extends object>() {
  return createColumnHelper<DataTableFeatures, T>();
}

export type DataTableColumnDef<T extends object> = ColumnDef<DataTableFeatures, T, unknown>;

export interface DataTableProps<T extends object> {
  columns: DataTableColumnDef<T>[];
  data: T[];
  getRowId?: (row: T) => string;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  columnVisibility?: ColumnVisibilityState;
  onColumnVisibilityChange?: OnChangeFn<ColumnVisibilityState>;
  loading?: boolean;
  loadingRowCount?: number;
  emptyTitle: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  onRowClick?: (row: T) => void;
  className?: string;
}

/**
 * Toggles a column through the unsorted → asc → desc → unsorted cycle.
 *
 * We compute this ourselves rather than delegating to TanStack's own
 * `column.getToggleSortingHandler()` because that gates on
 * `column.getCanSort()`, which additionally requires an `accessorFn` — but
 * Mizaniya's `DataTable` columns are plain `id`/`cell` definitions (sorting
 * is resolved by the owning feature, not an internal row model), so no
 * column ever has one. Column-level `enableSorting` is the single source of
 * truth for whether a header is sortable here.
 */
function toggleSort(current: SortingState, columnId: string): SortingState {
  const existing = current.find((s) => s.id === columnId);
  if (!existing) return [{ id: columnId, desc: false }];
  if (!existing.desc) return [{ id: columnId, desc: true }];
  return [];
}

export function DataTable<T extends object>({
  columns,
  data,
  getRowId,
  sorting,
  onSortingChange,
  columnVisibility,
  onColumnVisibilityChange,
  loading,
  loadingRowCount = 8,
  emptyTitle,
  emptyDescription,
  emptyAction,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    getRowId,
    state: { sorting, columnVisibility },
    onSortingChange,
    onColumnVisibilityChange,
  });

  const empty = !loading && data.length === 0;
  const colCount = table.getVisibleLeafColumns().length;

  return (
    <div className={cn("overflow-x-auto rounded-card border border-border bg-surface", className)}>
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead className="border-b border-border bg-background">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const align = (header.column.columnDef.meta as { align?: "left" | "right" } | undefined)?.align ?? "left";
                const sortable = header.column.columnDef.enableSorting === true;
                const direction = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    scope="col"
                    className={cn(
                      "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted",
                      align === "right" ? "text-right" : "text-left",
                    )}
                  >
                    {header.isPlaceholder ? null : sortable ? (
                      <button
                        type="button"
                        onClick={() => onSortingChange?.((prev) => toggleSort(prev ?? [], header.column.id))}
                        className={cn(
                          "inline-flex items-center gap-1 transition-colors hover:text-text-primary",
                          align === "right" && "flex-row-reverse",
                          direction && "text-text-primary",
                        )}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {direction === "asc" ? (
                          <ArrowUp className="size-3" aria-hidden="true" />
                        ) : direction === "desc" ? (
                          <ArrowDown className="size-3" aria-hidden="true" />
                        ) : (
                          <ChevronsUpDown className="size-3 text-text-muted" aria-hidden="true" />
                        )}
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        {empty ? (
          <tbody>
            <tr>
              <td colSpan={colCount}>
                <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
              </td>
            </tr>
          </tbody>
        ) : loading ? (
          <LoadingState rows={loadingRowCount} columns={colCount} />
        ) : (
          <tbody>
            {table.getRowModel().rows.map((row: Row<DataTableFeatures, T>) => (
              <tr
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                className={cn(
                  "border-b border-border transition-colors last:border-b-0 hover:bg-background",
                  onRowClick && "cursor-pointer",
                )}
              >
                {row.getVisibleCells().map((cell) => {
                  const align = (cell.column.columnDef.meta as { align?: "left" | "right" } | undefined)?.align ?? "left";
                  return (
                    <td
                      key={cell.id}
                      className={cn("px-4 py-4 align-middle text-text-primary", align === "right" ? "text-right" : "text-left")}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
