import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cn } from "@/design-system/utils/cn";

export function UISeparator({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={cn(
        "bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}
