"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, HelpCircle, Search } from "lucide-react";
import { CommandPalette, IconButton } from "@/mizaniya";
import type { CommandPaletteGroup } from "@/mizaniya";
import { NAV } from "./nav-config";

function useNavCommandGroups(): CommandPaletteGroup[] {
  const router = useRouter();

  return useMemo(() => {
    return NAV.map((section) => ({
      heading: section.label ?? "Navigate",
      items: (section.items ?? []).flatMap((item) => {
        const Icon = item.icon;
        const leaf = {
          id: item.href,
          label: item.label,
          icon: Icon ? <Icon className="size-4" aria-hidden="true" /> : undefined,
          onSelect: () => router.push(item.href),
        };
        const children = (item.children ?? []).map((child) => ({
          id: child.href,
          label: `${item.label} — ${child.label}`,
          icon: Icon ? <Icon className="size-4" aria-hidden="true" /> : undefined,
          onSelect: () => router.push(child.href),
        }));
        return [leaf, ...children];
      }),
    }));
  }, [router]);
}

export function Topbar() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const groups = useNavCommandGroups();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-surface px-6">
      <div className="max-w-md flex-1">
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          aria-label="Search transactions, customers, terminals"
          className="flex h-10 w-full items-center gap-2 rounded-input border border-border bg-surface pl-9 pr-3 text-left text-sm text-text-muted transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 relative"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
          <span className="flex-1 truncate">Search transactions, customers, terminals...</span>
          <kbd className="pointer-events-none rounded border border-border bg-background px-1.5 py-0.5 text-[11px] font-medium text-text-muted">
            Ctrl K
          </kbd>
        </button>
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

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} groups={groups} />
    </header>
  );
}
