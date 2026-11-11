/**
 * The Mizaniya "energy" accent system: a shared palette of vivid, non-semantic
 * identity colors (violet/sky/teal/orange/pink) alongside the existing
 * semantic tones (success/warning/error/info) and the brand primary.
 *
 * Generic components (MetricCard, RadioCard, badges) accept an `accent` prop
 * typed against this single map so every feature draws from the same
 * palette — no feature should invent its own one-off color classes.
 */
export type AccentKey =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "violet"
  | "sky"
  | "teal"
  | "orange"
  | "pink"
  | "neutral";

export interface AccentTint {
  /** Soft tint background, e.g. for an icon chip or active nav item. */
  bg: string;
  /** Saturated foreground, e.g. for an icon or active text. */
  text: string;
  /** Saturated border color. */
  border: string;
  /** Fully saturated background, e.g. for a solid indicator bar. */
  solid: string;
}

export const ACCENT_TINTS: Record<AccentKey, AccentTint> = {
  primary: { bg: "bg-primary-soft", text: "text-primary", border: "border-primary", solid: "bg-primary" },
  success: { bg: "bg-success-soft", text: "text-success", border: "border-success", solid: "bg-success" },
  warning: { bg: "bg-warning-soft", text: "text-warning", border: "border-warning", solid: "bg-warning" },
  error: { bg: "bg-error-soft", text: "text-error", border: "border-error", solid: "bg-error" },
  info: { bg: "bg-info-soft", text: "text-info", border: "border-info", solid: "bg-info" },
  violet: { bg: "bg-accent-violet-soft", text: "text-accent-violet", border: "border-accent-violet", solid: "bg-accent-violet" },
  sky: { bg: "bg-accent-sky-soft", text: "text-accent-sky", border: "border-accent-sky", solid: "bg-accent-sky" },
  teal: { bg: "bg-accent-teal-soft", text: "text-accent-teal", border: "border-accent-teal", solid: "bg-accent-teal" },
  orange: { bg: "bg-accent-orange-soft", text: "text-accent-orange", border: "border-accent-orange", solid: "bg-accent-orange" },
  pink: { bg: "bg-accent-pink-soft", text: "text-accent-pink", border: "border-accent-pink", solid: "bg-accent-pink" },
  neutral: { bg: "bg-background", text: "text-text-secondary", border: "border-border", solid: "bg-text-muted" },
};
