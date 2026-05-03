import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function Eyebrow({ children, className, light = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-[13px] uppercase tracking-widest",
        light ? "text-accent-light" : "text-accent",
        className
      )}
    >
      {children}
    </p>
  );
}
