"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import HeroBento from "./HeroBento";

const headline = "The whole digital playbook, done for you";
const words = headline.split(" ");

export default function Hero() {
  const shouldReduce = useReducedMotion();

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const fadeUp = (delay: number) => ({
    initial: shouldReduce ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease },
  });

  const wordContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.03, delayChildren: 0.15 },
    },
  };

  const wordVariant = {
    hidden: shouldReduce ? {} : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease },
    },
  };

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-white overflow-hidden">
      <Container>
        <div className="grid md:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left — 60% */}
          <div className="md:col-span-3">
            <motion.p
              {...fadeUp(0)}
              className="font-mono text-[13px] uppercase tracking-widest text-primary mb-6"
            >
              Digital Agency · Sydney
            </motion.p>

            <h1 className="font-display font-bold text-[40px] md:text-[64px] lg:text-[72px] leading-[1.0] tracking-[-0.03em] text-dark overflow-hidden">
              <motion.span
                variants={wordContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-x-[0.22em] gap-y-1"
                aria-label={headline}
              >
                {words.map((word, i) => (
                  <motion.span key={i} variants={wordVariant} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            <motion.p
              {...fadeUp(0.45)}
              className="mt-6 text-[16px] md:text-[18px] leading-[1.55] text-text-secondary max-w-md"
            >
              We build your website, run your social media, and get you found on
              Google — so you can focus on what you do best.
            </motion.p>

            <motion.div
              {...fadeUp(0.55)}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center h-12 px-6 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-full transition-all duration-[160ms] active:scale-[0.98] group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Join the waitlist{" "}
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform duration-[160ms] group-hover:translate-x-1 arrow"
                />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center h-12 px-6 bg-white border border-border text-dark font-semibold text-sm rounded-full hover:bg-surface hover:border-[#E5DFD6] transition-all duration-[160ms] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                See how it works
              </a>
            </motion.div>

            <motion.p
              {...fadeUp(0.65)}
              className="mt-6 font-mono text-[12px] text-text-muted uppercase tracking-wider"
            >
              No lock-in contracts · Live in 24 hours · Built for Sydney
            </motion.p>
          </div>

          {/* Right — 40% */}
          <div className="hidden md:block md:col-span-2">
            <HeroBento />
          </div>
        </div>
      </Container>

      {/* Mono strip */}
      <motion.div
        {...fadeUp(0.8)}
        className="mt-16 border-t border-border"
      >
        <Container>
          <p className="py-4 font-mono text-[12px] text-text-muted uppercase tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">
            {"// Serving tradies · cafes · salons · fitness · retail · professional services"}
          </p>
        </Container>
      </motion.div>
    </section>
  );
}
