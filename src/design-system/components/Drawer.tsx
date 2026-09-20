"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../utils/cn";
import { IconButton } from "./Button";
import { useFocusTrap } from "../utils/useFocusTrap";
import { useBodyScrollLock } from "../utils/useBodyScrollLock";

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = "520px",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = "drawer-title";
  const descId = "drawer-desc";

  useFocusTrap(panelRef, open, onClose);
  useBodyScrollLock(open);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-[#17212B]/40"
        style={{ animation: "ds-fade-in 200ms ease-out" }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className="absolute right-0 top-0 flex h-full flex-col bg-surface shadow-drawer"
        style={{
          width,
          maxWidth: "100vw",
          borderTopLeftRadius: "16px",
          borderBottomLeftRadius: "16px",
          animation: "ds-drawer-in 220ms var(--ease-standard)",
        }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <h2 id={titleId} className="text-lg font-semibold text-text-primary">
              {title}
            </h2>
            {description && (
              <p id={descId} className="mt-1 text-sm text-text-secondary">
                {description}
              </p>
            )}
          </div>
          <IconButton
            icon={<X className="size-5" aria-hidden="true" />}
            label="Close"
            onClick={onClose}
            className="shrink-0"
          />
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        {footer && (
          <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

export function DrawerSection({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("flex flex-col gap-6", className)}>{children}</div>;
}
