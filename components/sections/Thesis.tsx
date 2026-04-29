import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

const points = [
  {
    eyebrow: "// Speed",
    title: "Live in 24 hours",
    desc: "Traditional agencies take weeks. We ship in a day, then iterate. Your business doesn't wait.",
  },
  {
    eyebrow: "// Price",
    title: "A fraction of the cost",
    desc: "No bloated retainers. Transparent pricing from $199/month. Cancel any time.",
  },
  {
    eyebrow: "// Scale",
    title: "AI that works while you sleep",
    desc: "Our agents handle posts, enquiries, and strategy around the clock. You get a whole digital team.",
  },
];

export default function Thesis() {
  return (
    <section className="py-20 md:py-[7.5rem] bg-warm">
      <Container>
        <Reveal>
          <p className="font-mono text-[13px] uppercase tracking-widest text-primary mb-8">
            {"// Why dorza"}
          </p>
          <p className="font-display font-bold text-[28px] md:text-[40px] lg:text-[48px] leading-[1.06] tracking-[-0.025em] text-dark max-w-3xl">
            Agencies charge $3,000 a month and take six weeks. We charge $349
            and ship in 24 hours.{" "}
            <span className="text-text-muted">Same quality.</span>
          </p>
        </Reveal>

        <Stagger
          delay={0.2}
          staggerDelay={0.08}
          className="mt-16 grid md:grid-cols-3 gap-8 md:gap-12"
        >
          {points.map((p) => (
            <div key={p.title}>
              <p className="font-mono text-[12px] uppercase tracking-widest text-primary mb-3">
                {p.eyebrow}
              </p>
              <h3 className="font-display font-semibold text-[20px] leading-snug tracking-[-0.01em] text-dark mb-2">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">{p.desc}</p>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
