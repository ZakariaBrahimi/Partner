"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cn } from "@/design-system/utils/cn";

export const UIMenuRoot = BaseMenu.Root;
export const UIMenuTrigger = BaseMenu.Trigger;

export function UIMenuContent({
  className,
  children,
  side = "bottom",
  align = "end",
  sideOffset = 6,
}: {
  className?: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner side={side} align={align} sideOffset={sideOffset} className="z-40">
        <BaseMenu.Popup
          className={cn(
            "mz-popover-transition min-w-[190px] rounded-dropdown border border-border bg-surface py-1.5 shadow-dropdown focus:outline-none",
            className,
          )}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export function UIMenuGroup({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function UIMenuSeparator() {
  return <div className="my-1 h-px bg-border" role="separator" />;
}

export function UIMenuItem({
  className,
  destructive,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseMenu.Item> & { destructive?: boolean }) {
  return (
    <BaseMenu.Item
      className={cn(
        "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors focus:outline-none",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40",
        destructive
          ? "text-error data-[highlighted]:bg-error-soft"
          : "text-text-primary data-[highlighted]:bg-background",
        className,
      )}
      {...props}
    >
      {children}
    </BaseMenu.Item>
  );
}
