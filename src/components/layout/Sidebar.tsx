"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronsLeft, ChevronsRight, HelpCircle } from "lucide-react";
import { cn } from "@/design-system/utils/cn";
import { ACCENT_TINTS } from "@/mizaniya";
import { NAV } from "./nav-config";
import type { NavItem, NavLeaf } from "./nav-config";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  function toggle() {
    setCollapsed((prev) => !prev);
  }

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-surface transition-[width] duration-200 md:flex",
        collapsed ? "w-[72px]" : "w-[248px]",
      )}
    >
      <div
        className={cn(
          "relative flex h-16 items-center overflow-hidden border-b border-border px-4",
          collapsed && "justify-center px-0",
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 -top-10 size-28 rounded-full bg-gradient-to-br from-accent-violet/25 via-primary/20 to-accent-sky/25 blur-2xl"
        />
        {collapsed ? (
          <Image src="/mizaniya-mark.png" alt="Mizaniya" width={36} height={36} className="relative rounded-[8px]" priority />
        ) : (
          <div className="relative flex items-center gap-2.5">
            <Image src="/mizaniya-mark.png" alt="" width={36} height={36} className="shrink-0 rounded-[8px]" priority />
            <div className="leading-tight">
              <p className="text-sm font-bold text-text-primary">Mizaniya</p>
              <p className="text-xs text-text-secondary">Partner Platform</p>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Primary">
        {NAV.map((section, i) => (
          <div key={i} className={cn(i > 0 && "mt-5")}>
            {section.label && !collapsed && (
              <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                {section.label}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {section.items?.map((item) => (
                <SidebarNavItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  collapsed={collapsed}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/help"
          className={cn(
            "flex items-center gap-2.5 rounded-button px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-background hover:text-text-primary",
            collapsed && "justify-center px-0",
          )}
        >
          <HelpCircle className="size-[18px] shrink-0" aria-hidden="true" />
          {!collapsed && "Help & Support"}
        </Link>
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "mt-1 flex w-full items-center gap-2.5 rounded-button px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-background hover:text-text-primary",
            collapsed && "justify-center px-0",
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronsRight className="size-[18px] shrink-0" aria-hidden="true" />
          ) : (
            <>
              <ChevronsLeft className="size-[18px] shrink-0" aria-hidden="true" />
              Collapse
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

function SidebarNavItem({
  item,
  pathname,
  collapsed,
}: {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
}) {
  const active = isActive(pathname, item.href);
  const Icon = item.icon;
  const tint = ACCENT_TINTS[item.accent ?? "primary"];

  return (
    <li>
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        title={collapsed ? item.label : undefined}
        className={cn(
          "relative flex items-center gap-2.5 rounded-button px-3 py-2 text-sm font-medium transition-colors",
          collapsed && "justify-center px-0",
          active
            ? cn(tint.bg, tint.text)
            : "text-text-secondary hover:bg-background hover:text-text-primary",
        )}
      >
        {active && (
          <span
            aria-hidden="true"
            className={cn("absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full", tint.solid)}
          />
        )}
        {Icon && <Icon className="size-[18px] shrink-0" aria-hidden="true" />}
        {!collapsed && <span className="truncate">{item.label}</span>}
      </Link>
      {item.children && !collapsed && (
        <ul className="ml-[30px] mt-0.5 flex flex-col gap-0.5 border-l border-border pl-3">
          {item.children.map((child) => (
            <SidebarChildItem key={child.href} item={child} pathname={pathname} accentText={tint.text} />
          ))}
        </ul>
      )}
    </li>
  );
}

function SidebarChildItem({ item, pathname, accentText }: { item: NavLeaf; pathname: string; accentText: string }) {
  const active = pathname === item.href;
  return (
    <li>
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "block rounded-button px-3 py-1.5 text-sm font-medium transition-colors",
          active ? cn(accentText, "font-semibold") : "text-text-secondary hover:text-text-primary",
        )}
      >
        {item.label}
      </Link>
    </li>
  );
}
