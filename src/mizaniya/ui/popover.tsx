"use client";

import type { ComponentPropsWithoutRef } from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { cn } from "@/design-system/utils/cn";

export const UIPopoverRoot = BasePopover.Root;
export const UIPopoverTrigger = BasePopover.Trigger;
export const UIPopoverClose = BasePopover.Close;

export function UIPopoverContent({
  className,
  children,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  ...props
}: ComponentPropsWithoutRef<typeof BasePopover.Popup> & {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner side={side} align={align} sideOffset={sideOffset} className="z-40">
        <BasePopover.Popup
          className={cn(
            "mz-popover-transition min-w-[220px] rounded-popover border border-border bg-surface shadow-dropdown focus:outline-none",
            className,
          )}
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}
