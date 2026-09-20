import type { HTMLAttributes, ReactNode, ThHTMLAttributes, TdHTMLAttributes } from "react";
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
