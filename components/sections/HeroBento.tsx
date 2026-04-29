"use client";

import { motion, useReducedMotion } from "framer-motion";

const floatClasses = [
  "animate-float",
  "animate-float-delay-1",
  "animate-float-delay-2",
  "animate-float-delay-3",
  "animate-float-delay-4",
  "animate-float-delay-5",
];

function BrowserMockCard() {
  return (
    <div className="h-full flex flex-col">
      <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2">Website</p>
      {/* Browser chrome */}
      <div className="flex-1 rounded-[10px] border border-border overflow-hidden bg-white">
        <div className="bg-surface border-b border-border px-2 py-1.5 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#F0EBE4]" />
          <span className="w-2 h-2 rounded-full bg-[#F0EBE4]" />
          <span className="w-2 h-2 rounded-full bg-[#F0EBE4]" />
          <div className="flex-1 mx-2 h-3 bg-border rounded-full" />
        </div>
        <div className="p-2 space-y-1.5">
          <div className="h-3 bg-primary/20 rounded-full w-3/4" />
          <div className="h-2 bg-border rounded-full w-full" />
          <div className="h-2 bg-border rounded-full w-5/6" />
          <div className="h-5 w-20 bg-primary rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
}

function InstagramCard() {
  return (
    <div className="h-full flex flex-col">
      <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2">Social</p>
      <div className="flex-1 rounded-[10px] border border-border overflow-hidden bg-white">
        <div className="h-14 bg-gradient-to-br from-primary-light to-[#FFE0C8]" />
        <div className="p-2">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-4 h-4 rounded-full bg-primary/30" />
            <div className="h-2 bg-border rounded-full w-16" />
          </div>
          <div className="h-2 bg-border rounded-full w-full mb-1" />
          <div className="h-2 bg-border rounded-full w-4/5" />
        </div>
      </div>
    </div>
  );
}

function ReviewCard() {
  return (
    <div className="h-full flex flex-col justify-between">
      <p className="font-mono text-[10px] text-primary uppercase tracking-widest">Google</p>
      <div>
        <div className="flex gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[#FBBC04] text-sm">★</span>
          ))}
        </div>
        <p className="font-display font-bold text-[22px] text-dark leading-none mt-1">5.0</p>
        <p className="font-mono text-[10px] text-text-muted mt-1">12 reviews</p>
      </div>
    </div>
  );
}

function ChatbotCard() {
  return (
    <div className="h-full flex flex-col justify-between">
      <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2">Chatbot</p>
      <div className="space-y-1.5">
        <div className="flex justify-end">
          <span className="bg-primary text-white text-[10px] px-2 py-1 rounded-full rounded-br-none max-w-[80%]">
            Any appts Fri?
          </span>
        </div>
        <div className="flex justify-start">
          <span className="bg-surface text-dark text-[10px] px-2 py-1 rounded-full rounded-bl-none max-w-[80%] border border-border">
            3pm is free ✓
          </span>
        </div>
      </div>
    </div>
  );
}

function AnalyticsCard() {
  return (
    <div className="h-full flex flex-col justify-between">
      <p className="font-mono text-[10px] text-primary uppercase tracking-widest">Growth</p>
      <div>
        <svg viewBox="0 0 80 32" className="w-full h-8 overflow-visible">
          <polyline
            points="0,28 15,22 30,24 45,16 60,10 80,4"
            fill="none"
            stroke="#E8742A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="80" cy="4" r="3" fill="#E8742A" />
        </svg>
        <p className="font-display font-bold text-[18px] text-dark mt-1">+42%</p>
      </div>
    </div>
  );
}

function ClockCard() {
  return (
    <div className="h-full flex flex-col justify-between bg-primary rounded-[10px] p-0 -m-0">
      <p className="font-mono text-[10px] text-white/80 uppercase tracking-widest">Live in</p>
      <div>
        <p className="font-display font-bold text-[22px] text-white leading-none">24h</p>
        <p className="font-mono text-[10px] text-white/60 mt-0.5">from now</p>
      </div>
    </div>
  );
}

const cards = [
  { id: "browser", component: BrowserMockCard, span: "col-span-2 row-span-2", bg: "bg-surface" },
  { id: "review", component: ReviewCard, span: "col-span-1", bg: "bg-white" },
  { id: "clock", component: ClockCard, span: "col-span-1", bg: "bg-primary" },
  { id: "instagram", component: InstagramCard, span: "col-span-1 row-span-2", bg: "bg-white" },
  { id: "chatbot", component: ChatbotCard, span: "col-span-1 row-span-1", bg: "bg-surface" },
  { id: "analytics", component: AnalyticsCard, span: "col-span-1", bg: "bg-white" },
];

export default function HeroBento() {
  const shouldReduce = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.08, delayChildren: 0.7 },
    },
  };

  const itemVisible = {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  const item = shouldReduce
    ? { hidden: {}, visible: itemVisible }
    : { hidden: { opacity: 0, y: 12, scale: 0.96 }, visible: itemVisible };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3 grid-rows-3 gap-3 h-[360px]"
      aria-hidden="true"
    >
      {cards.map((card, i) => {
        const Component = card.component;
        const isClockCard = card.id === "clock";
        return (
          <motion.div
            key={card.id}
            variants={item}
            className={`${card.span} ${card.bg} ${isClockCard ? "bg-primary" : ""} rounded-card border border-border p-3 ${floatClasses[i]} cursor-default select-none`}
            style={{
              borderColor: isClockCard ? "transparent" : undefined,
            }}
          >
            <Component />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
