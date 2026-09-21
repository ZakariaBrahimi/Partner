"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/design-system/utils/cn";
import { NAV } from "./nav-config";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="border-b border-border bg-surface md:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <Image src="/mizaniya-mark.png" alt="Mizaniya" width={32} height={32} className="rounded-[8px]" />
          <p className="text-sm font-bold text-text-primary">Mizaniya</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex size-10 items-center justify-center rounded-button text-text-secondary hover:bg-background"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav className="max-h-[70vh] overflow-y-auto border-t border-border px-4 py-3" aria-label="Primary">
          {NAV.map((section, i) => (
            <div key={i} className={cn(i > 0 && "mt-4")}>
              {section.label && (
                <p className="px-1 pb-1 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                  {section.label}
                </p>
              )}
              <ul className="flex flex-col gap-0.5">
                {section.items?.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-button px-3 py-2 text-sm font-medium",
                          active ? "bg-primary-soft text-primary" : "text-text-secondary",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      )}
    </div>
  );
}
