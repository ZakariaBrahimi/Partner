import type { ReactNode } from "react";
import { cn } from "@/design-system/utils/cn";

export function ShowcaseSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 border-t border-border py-10 first:border-t-0 first:pt-0">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        {description && <p className="mt-1 text-sm text-text-secondary">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function ShowcaseRow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap items-center gap-3", className)}>{children}</div>;
}

export function SwatchCard({
  name,
  variable,
  hex,
}: {
  name: string;
  variable: string;
  hex: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-card border border-border bg-surface p-3">
      <div
        className="h-14 w-full rounded-[8px] border border-border"
        style={{ background: `var(${variable})` }}
      />
      <div>
        <p className="text-xs font-semibold text-text-primary">{name}</p>
        <p className="text-[11px] text-text-muted">{hex}</p>
      </div>
    </div>
  );
}
