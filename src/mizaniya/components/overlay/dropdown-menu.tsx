"use client";

import type { ReactNode } from "react";
import { UIMenuRoot, UIMenuTrigger, UIMenuContent, UIMenuItem } from "../../ui/dropdown-menu";

export interface DropdownMenuItem {
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export type DropdownMenuSection = DropdownMenuItem[];

export function DropdownMenu({
  trigger,
  sections,
  align = "end",
}: {
  trigger: ReactNode;
  sections: DropdownMenuSection[];
  align?: "start" | "end";
}) {
  return (
    <UIMenuRoot>
      <UIMenuTrigger render={<span className="inline-block" />}>{trigger}</UIMenuTrigger>
      <UIMenuContent align={align}>
        {sections.map((section, si) => (
          <div key={si}>
            {si > 0 && <div className="my-1 h-px bg-border" />}
            {section.map((item) => (
              <UIMenuItem key={item.label} disabled={item.disabled} destructive={item.destructive} onClick={item.onSelect}>
                {item.icon}
                {item.label}
              </UIMenuItem>
            ))}
          </div>
        ))}
      </UIMenuContent>
    </UIMenuRoot>
  );
}
