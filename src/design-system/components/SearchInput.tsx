import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "../utils/cn";

export const SearchInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { shortcut?: string }
>(({ className, shortcut, ...props }, ref) => {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
        aria-hidden="true"
      />
      <input
        ref={ref}
        type="search"
        role="searchbox"
        className={cn(
          "h-10 w-full rounded-input border border-border bg-surface pl-9 text-sm text-text-primary placeholder:text-text-muted transition-colors",
          "hover:border-border-strong focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          shortcut ? "pr-14" : "pr-3",
        )}
        {...props}
      />
      {shortcut && (
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 text-[11px] font-medium text-text-muted">
          {shortcut}
        </kbd>
      )}
    </div>
  );
});
SearchInput.displayName = "SearchInput";
