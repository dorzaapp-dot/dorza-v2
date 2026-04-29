import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  kicker?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  kicker,
  align = "center",
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <Eyebrow light={light} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "font-display font-bold text-[28px] md:text-[40px] leading-[1.08] tracking-[-0.02em]",
          light ? "text-white" : "text-dark",
          align === "center" && "mx-auto max-w-2xl"
        )}
      >
        {title}
      </h2>
      {kicker && (
        <p
          className={cn(
            "mt-4 text-[16px] md:text-[18px] leading-[1.55]",
            light ? "text-white/70" : "text-text-secondary",
            align === "center" && "mx-auto max-w-xl"
          )}
        >
          {kicker}
        </p>
      )}
    </div>
  );
}
