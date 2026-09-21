"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

export const UISheetRoot = BaseDialog.Root;
export const UISheetTrigger = BaseDialog.Trigger;
export const UISheetClose = BaseDialog.Close;

export function UISheetPortal({ children }: { children: ReactNode }) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="mz-backdrop-transition fixed inset-0 z-50 bg-[#17212B]/40" />
      {children}
    </BaseDialog.Portal>
  );
}

export function UISheetPopup({
  className,
  children,
  width = "520px",
  ...props
}: ComponentPropsWithoutRef<typeof BaseDialog.Popup> & { width?: string }) {
  return (
    <BaseDialog.Popup
      className={cn(
        "mz-drawer-transition fixed right-0 top-0 z-50 flex h-full flex-col bg-surface shadow-drawer focus:outline-none",
        "max-w-[100vw] rounded-l-drawer",
        className,
      )}
      style={{ width }}
      {...props}
    >
      {children}
    </BaseDialog.Popup>
  );
}

export function UISheetHeader({
  title,
  description,
  onCloseLabel = "Close",
}: {
  title: string;
  description?: string;
  onCloseLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
      <div>
        <BaseDialog.Title className="text-lg font-semibold text-text-primary">{title}</BaseDialog.Title>
        {description && (
          <BaseDialog.Description className="mt-1 text-sm text-text-secondary">
            {description}
          </BaseDialog.Description>
        )}
      </div>
      <BaseDialog.Close
        aria-label={onCloseLabel}
        className="flex size-10 shrink-0 items-center justify-center rounded-button text-text-secondary transition-colors hover:bg-background hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <X className="size-5" aria-hidden="true" />
      </BaseDialog.Close>
    </div>
  );
}
