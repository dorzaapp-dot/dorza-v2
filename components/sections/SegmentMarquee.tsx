const segments = [
  "Tradies",
  "Cafes & Restaurants",
  "Salons & Beauty",
  "Fitness & Wellness",
  "Retail",
  "Professional Services",
  "Tradies",
  "Cafes & Restaurants",
  "Salons & Beauty",
  "Fitness & Wellness",
  "Retail",
  "Professional Services",
];

export default function SegmentMarquee() {
  return (
    <section className="py-6 bg-warm border-y border-border overflow-hidden" aria-hidden="true">
      <div className="marquee-container relative">
        <div
          className="marquee-track flex gap-3 w-max animate-marquee-scroll"
          style={{ willChange: "transform" }}
        >
          {segments.map((seg, i) => (
            <span
              key={i}
              className="inline-flex items-center h-8 px-4 bg-primary-light text-primary font-mono text-[12px] uppercase tracking-wider rounded-full border border-primary/20 whitespace-nowrap shrink-0"
            >
              {seg}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
