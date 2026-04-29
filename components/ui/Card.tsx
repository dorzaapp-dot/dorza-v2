import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover = true, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-border rounded-card",
        hover &&
          "transition-all duration-[200ms] hover:-translate-y-1 hover:shadow-medium hover:border-[#E5DFD6]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
