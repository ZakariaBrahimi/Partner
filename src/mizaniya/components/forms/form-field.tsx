import type { ReactNode } from "react";
import { cn } from "@/design-system/utils/cn";

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
      {error ? <ErrorMessage>{error}</ErrorMessage> : helperText ? <HelperText>{helperText}</HelperText> : null}
    </div>
  );
}

export function HelperText({ children }: { children: ReactNode }) {
  return <p className="text-xs text-text-muted">{children}</p>;
}

export function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs text-error" role="alert">
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
        {description && <p className="mt-0.5 text-xs text-text-secondary">{description}</p>}
      </div>
      {children}
    </div>
  );
}
