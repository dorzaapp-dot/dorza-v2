"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "default", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-[160ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98]",
          size === "default" && "h-12 px-6 text-sm rounded-full",
          size === "sm" && "h-9 px-4 text-sm rounded-full",
          variant === "primary" &&
            "bg-primary hover:bg-primary-dark text-white [&_svg.arrow]:translate-x-0 hover:[&_svg.arrow]:translate-x-1 [&_svg.arrow]:transition-transform [&_svg.arrow]:duration-[160ms]",
          variant === "secondary" &&
            "bg-white border border-border text-dark hover:bg-surface hover:border-[#E5DFD6]",
          variant === "ghost" && "bg-transparent text-dark hover:bg-surface",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
