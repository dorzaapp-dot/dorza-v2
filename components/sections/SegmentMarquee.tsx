const segments = [
  "Cafes",
  "Tradies",
  "Salons",
  "Gyms",
  "Retail",
  "Restaurants",
  "Accountants",
  "Physios",
  "Dentists",
  "Florists",
];

export default function SegmentMarquee() {
  // Duplicate the list once so the -50% translate loops seamlessly.
  const items = [...segments, ...segments];

  return (
    <section
      className="relative py-10 bg-warm border-y border-border overflow-hidden"
      aria-hidden="true"
    >
      <div className="marquee-container relative">
        <div
          className="marquee-track flex w-max items-center animate-marquee"
          style={{ willChange: "transform" }}
        >
          {items.map((seg, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="font-display italic font-medium text-[20px] md:text-[22px] uppercase tracking-[0.08em] text-dark/40 px-8 whitespace-nowrap">
                {seg}
              </span>
              <span
                aria-hidden
                className="h-1 w-1 rounded-full bg-accent/70"
              />
            </span>
          ))}
        </div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-warm to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-warm to-transparent" />
      </div>

      {/* Scroll nudge */}
      <div className="mt-6 flex flex-col items-center gap-1.5 text-text-muted">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
          Keep scrolling
        </span>
        <span
          aria-hidden
          className="block h-4 w-px bg-text-muted/40 animate-bounce-gentle"
        />
      </div>
    </section>
  );
}
