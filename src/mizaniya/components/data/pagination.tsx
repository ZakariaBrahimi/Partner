"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

export function Pagination({
  page,
  pageCount,
  onPageChange,
  totalLabel,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  totalLabel?: string;
}) {
  const pages = getPageList(page, pageCount);

  return (
    <div className="flex items-center justify-between gap-4 px-1 py-1">
      {totalLabel && <p className="text-sm text-text-secondary">{totalLabel}</p>}
      <nav className="ml-auto flex items-center gap-1" aria-label="Pagination">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
          className="flex size-8 items-center justify-center rounded-button border border-border bg-surface text-text-secondary transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="px-1.5 text-sm text-text-muted">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              aria-current={p === page ? "page" : undefined}
              onClick={() => onPageChange(p)}
              className={cn(
                "flex size-8 items-center justify-center rounded-button border text-sm font-medium transition-colors",
                p === page ? "border-primary bg-primary text-white" : "border-border bg-surface text-text-secondary hover:bg-background",
              )}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
          className="flex size-8 items-center justify-center rounded-button border border-border bg-surface text-text-secondary transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}

function getPageList(page: number, pageCount: number): (number | "…")[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1);
  const pages = new Set<number>([1, pageCount, page, page - 1, page + 1]);
  const sorted = Array.from(pages).filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);
  const result: (number | "…")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("…");
    result.push(p);
    prev = p;
  }
  return result;
}
