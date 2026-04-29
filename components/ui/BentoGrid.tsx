import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

export function BentoGrid({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-6 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
