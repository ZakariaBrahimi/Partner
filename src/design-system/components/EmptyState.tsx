import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      {icon && (
        <span className="flex size-12 items-center justify-center rounded-full bg-background text-text-muted">
          {icon}
        </span>
      )}
      <div>
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        {description && (
          <p className="mt-1 max-w-sm text-sm text-text-secondary">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
