import type { HTMLAttributes, ReactNode } from "react";
import { UICard } from "../../ui/card";
import { cn } from "@/design-system/utils/cn";

export type CardVariant = "default" | "interactive" | "outlined" | "muted";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({ variant = "default", className, ...props }: CardProps) {
  return <UICard variant={variant} className={className} {...props} />;
}

export function CardHeader({ title, description, action }: { title: ReactNode; description?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 p-5 pb-0">
      <div>
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        {description && <p className="mt-0.5 text-xs text-text-secondary">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}
