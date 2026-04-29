import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center min-h-[28px] px-3 text-[13px] font-medium leading-none",
        "bg-primary-light text-primary rounded-full border border-primary/20",
        className
      )}
    >
      {children}
    </span>
  );
}
