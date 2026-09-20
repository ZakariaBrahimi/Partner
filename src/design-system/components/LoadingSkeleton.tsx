import { cn } from "../utils/cn";

export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded bg-background", className)} />;
}

export function TableRowSkeleton({ columns = 8 }: { columns?: number }) {
  return (
    <tr className="border-b border-border">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <LoadingSkeleton className="h-4 w-full max-w-24" />
        </td>
      ))}
    </tr>
  );
}
