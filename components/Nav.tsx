"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <a href="/" className="font-display font-bold text-2xl text-dark">
          d<span className="text-primary">o</span>rza
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-text-secondary hover:text-dark font-medium text-sm transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center h-10 px-5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-btn transition-colors"
          >
            Join the waitlist
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-dark"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white px-5 pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-text-secondary hover:text-dark font-medium text-sm transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center h-10 px-5 mt-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-btn transition-colors"
          >
            Join the waitlist
          </a>
        </div>
      )}
    </nav>
  );
}
