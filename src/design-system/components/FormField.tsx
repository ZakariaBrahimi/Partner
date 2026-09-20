import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export function FormField({
  label,
  required,
  htmlFor,
  error,
  helperText,
  counter,
  children,
  className,
}: {
  label?: string;
  required?: boolean;
  htmlFor?: string;
  error?: string;
  helperText?: string;
  counter?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <div className="flex items-baseline justify-between">
          <label htmlFor={htmlFor} className="text-sm font-semibold text-text-primary">
            {label}
            {required && <span className="ml-0.5 text-error">*</span>}
          </label>
          {counter}
        </div>
      )}
      {children}
      {error ? (
        <HelperText tone="error">{error}</HelperText>
      ) : helperText ? (
        <HelperText>{helperText}</HelperText>
      ) : null}
    </div>
  );
}

export function HelperText({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "error";
}) {
  return (
    <p
      className={cn(
        "text-xs",
        tone === "error" ? "text-error" : "text-text-muted",
      )}
      role={tone === "error" ? "alert" : undefined}
    >
      {children}
    </p>
  );
}

export function CharacterCounter({ value, max }: { value: number; max: number }) {
  return (
    <span className="text-xs tabular-nums text-text-muted">
      {value}/{max}
    </span>
  );
}

export function FormSection({
  title,
  description,
  required,
  children,
}: {
  title: string;
  description?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold text-text-primary">
          {title}
          {required && <span className="ml-0.5 text-error">*</span>}
        </h3>
        {description && (
          <p className="mt-0.5 text-xs text-text-secondary">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
