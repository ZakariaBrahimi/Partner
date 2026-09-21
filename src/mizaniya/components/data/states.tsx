import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/design-system/utils/cn";
import { Button } from "../core/button";

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
      {icon && <span className="flex size-12 items-center justify-center rounded-full bg-background text-text-muted">{icon}</span>}
      <div>
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        {description && <p className="mt-1 max-w-sm text-sm text-text-secondary">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description,
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-error-soft text-error">
        <AlertTriangle className="size-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        {description && <p className="mt-1 max-w-sm text-sm text-text-secondary">{description}</p>}
      </div>
      {onRetry && (
        <Button variant="secondary" size="compact" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded bg-background", className)} />;
}

export function LoadingState({ rows = 6, columns = 6 }: { rows?: number; columns?: number }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="border-b border-border">
          {Array.from({ length: columns }).map((__, c) => (
            <td key={c} className="px-4 py-4">
              <LoadingSkeleton className="h-4 w-full max-w-24" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
