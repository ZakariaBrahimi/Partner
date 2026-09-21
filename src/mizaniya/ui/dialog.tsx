"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

export const UIDialogRoot = BaseDialog.Root;
export const UIDialogTrigger = BaseDialog.Trigger;
export const UIDialogClose = BaseDialog.Close;

export function UIDialogPortal({ children }: { children: ReactNode }) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="mz-backdrop-transition fixed inset-0 z-50 bg-[#17212B]/40" />
      {children}
    </BaseDialog.Portal>
  );
}

export function UIDialogPopup({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseDialog.Popup>) {
  return (
    <BaseDialog.Popup
      className={cn(
        "mz-dialog-transition fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        "flex max-h-[90vh] w-full flex-col rounded-modal bg-surface shadow-modal focus:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </BaseDialog.Popup>
  );
}

export function UIDialogHeader({
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
        <BaseDialog.Title className="text-base font-semibold text-text-primary">{title}</BaseDialog.Title>
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
