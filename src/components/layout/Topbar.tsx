import { Bell, HelpCircle } from "lucide-react";
import { SearchInput } from "@/design-system/components/SearchInput";
import { IconButton } from "@/design-system/components/Button";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-surface px-6">
      <div className="max-w-md flex-1">
        <SearchInput
          placeholder="Search transactions, customers, terminals..."
          shortcut="Ctrl K"
          aria-label="Global search"
        />
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <IconButton icon={<HelpCircle className="size-[18px]" aria-hidden="true" />} label="Help" />
        <div className="relative">
          <IconButton icon={<Bell className="size-[18px]" aria-hidden="true" />} label="Notifications" />
          <span
            aria-hidden="true"
            className="absolute right-2 top-2 size-2 rounded-full bg-error ring-2 ring-surface"
          />
        </div>
        <div className="ml-2 flex items-center gap-2.5 border-l border-border pl-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
            ZA
          </span>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-text-primary">Zakaria Abdessamed</p>
            <p className="text-xs text-text-secondary">Partner</p>
          </div>
        </div>
      </div>
    </header>
  );
}
