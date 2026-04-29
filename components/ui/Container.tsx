import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

export function Container({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("max-w-layout mx-auto px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
