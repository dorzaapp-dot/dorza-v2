"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { useCountUp } from "@/components/motion/useCountUp";

type Stat = {
  prefix?: string;
  suffix?: string;
  target: number;
  decimals?: number;
  label: string;
};

const stats: Stat[] = [
  { suffix: "h", target: 24, label: "From signup to live website" },
  { suffix: "%", target: 85, label: "Cheaper than a traditional agency" },
  { prefix: "$", target: 199, label: "Starting from, per month" },
];

export default function Thesis() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-[7.5rem] bg-warm relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent pointer-events-none"
      />
      <Container>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary mb-8">
            {"// Why dorza"}
          </p>
        </Reveal>

        <div ref={ref} className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <p className="font-display italic text-[30px] md:text-[44px] lg:text-[52px] leading-[1.06] tracking-[-0.035em] text-dark">
              Traditional agencies charge $3,000 a month and take six weeks.
              <span className="text-text-muted">
                {" "}
                Your customers can&rsquo;t tell the difference.
              </span>
            </p>
          </Reveal>

          <div className="lg:col-span-5 space-y-8 md:space-y-10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.2 + i * 0.1}>
                <StatBlock stat={s} trigger={inView} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatBlock({ stat, trigger }: { stat: Stat; trigger: boolean }) {
  const value = useCountUp(stat.target, trigger, { duration: 1.6 });
  const display = stat.decimals
    ? value.toFixed(stat.decimals)
    : Math.round(value).toLocaleString();

  return (
    <div className="border-t border-border pt-5">
      <p className="font-display font-bold text-[44px] md:text-[56px] leading-none tracking-[-0.04em] text-dark tabular-nums">
        {stat.prefix}
        {display}
        {stat.suffix}
      </p>
      <p className="mt-3 text-[15px] text-text-secondary leading-relaxed max-w-xs">
        {stat.label}
      </p>
    </div>
  );
}
