"use client";

import type { ReactNode } from "react";
import { toast as sonnerToast } from "sonner";
import { AlertTriangle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

export type ToastTone = "success" | "error" | "warning" | "info";

const icons: Record<ToastTone, ReactNode> = {
  success: <CheckCircle2 className="size-5 text-success" aria-hidden="true" />,
  error: <AlertTriangle className="size-5 text-error" aria-hidden="true" />,
  warning: <TriangleAlert className="size-5 text-warning" aria-hidden="true" />,
  info: <Info className="size-5 text-info" aria-hidden="true" />,
};

export interface ShowToastOptions {
  tone: ToastTone;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

/** Mizaniya's toast system. Uses Sonner internally — feature code calls
 * `useToast().showToast(...)` and never imports `sonner` directly. */
export function useToast() {
  function showToast({ tone, title, description, action }: ShowToastOptions) {
    sonnerToast(title, {
      description,
      icon: icons[tone],
      duration: 4500,
      action: action ? { label: action.label, onClick: action.onClick } : undefined,
    });
  }

  return { showToast };
}
