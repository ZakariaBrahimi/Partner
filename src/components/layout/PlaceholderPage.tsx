import type { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EmptyState } from "@/design-system/components/EmptyState";
import type { Crumb } from "@/components/layout/Breadcrumbs";

export function PlaceholderPage({
  icon: Icon,
  title,
  description,
  breadcrumbs,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  breadcrumbs: Crumb[];
}) {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
      <Breadcrumbs items={breadcrumbs} />
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
        <p className="mt-0.5 text-sm text-text-secondary">{description}</p>
      </div>
      <div className="rounded-card border border-border bg-surface">
        <EmptyState
          icon={<Icon className="size-5" aria-hidden="true" />}
          title="This area is under construction"
          description="This page is not part of the current build scope. Check back soon."
        />
      </div>
    </div>
  );
}
