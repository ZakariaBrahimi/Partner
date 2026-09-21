import type { HTMLAttributes, ReactNode, ThHTMLAttributes, TdHTMLAttributes } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "../utils/cn";

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-card border border-border bg-surface">
      <table className="w-full min-w-[900px] border-collapse text-sm">{children}</table>
    </div>
  );
}

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-border bg-background">
      <tr>{children}</tr>
    </thead>
  );
}

export function Th({
  children,
  align = "left",
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & { align?: "left" | "right" }) {
  return (
    <th
      scope="col"
      className={cn(
        "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted",
        align === "right" ? "text-right" : "text-left",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export type SortDirection = "asc" | "desc" | null;

/** Th variant that toggles sort direction on click — used in place of a
 * separate sort dropdown when the table's own headers can drive sorting. */
export function SortableHeader({
  children,
  align = "left",
  direction,
  onSort,
}: {
  children: ReactNode;
  align?: "left" | "right";
  direction: SortDirection;
  onSort: () => void;
}) {
  return (
    <th scope="col" className={cn("px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted", align === "right" ? "text-right" : "text-left")}>
      <button
        type="button"
        onClick={onSort}
        className={cn(
          "inline-flex items-center gap-1 transition-colors hover:text-text-primary",
          align === "right" && "flex-row-reverse",
          direction && "text-text-primary",
        )}
      >
        {children}
        {direction === "asc" ? (
          <ArrowUp className="size-3" aria-hidden="true" />
        ) : direction === "desc" ? (
          <ArrowDown className="size-3" aria-hidden="true" />
        ) : (
          <ChevronsUpDown className="size-3 text-text-muted" aria-hidden="true" />
        )}
      </button>
    </th>
  );
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function Tr({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("border-b border-border last:border-b-0 transition-colors hover:bg-background", className)}
      {...props}
    >
      {children}
    </tr>
  );
}

export function Td({
  children,
  align = "left",
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & { align?: "left" | "right" }) {
  return (
    <td
      className={cn("px-4 py-4 align-middle text-text-primary", align === "right" ? "text-right" : "text-left", className)}
      {...props}
    >
      {children}
    </td>
  );
}
