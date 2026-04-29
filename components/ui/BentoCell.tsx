import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

interface BentoCellProps extends HTMLAttributes<HTMLDivElement> {
  colSpan?: number;
  rowSpan?: number;
}

export function BentoCell({
  colSpan = 1,
  rowSpan = 1,
  className,
  children,
  style,
  ...props
}: BentoCellProps) {
  return (
    <div
      className={cn("col-span-2", className)}
      style={{
        ...style,
        gridColumn: `span ${colSpan}`,
        gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
