"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-[280ms] ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-layout mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <a
            href="/"
            className="font-display font-bold text-2xl text-dark"
            aria-label="Dorza home"
          >
            d<span className="text-primary">o</span>rza
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-text-secondary hover:text-dark font-medium text-sm transition-colors duration-[160ms]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center h-10 px-5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-full transition-all duration-[160ms] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Join the waitlist
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-dark rounded-sm focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-white flex flex-col px-6 pt-20 pb-10">
          <nav aria-label="Mobile navigation">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center py-5 text-2xl font-display font-semibold text-dark border-b border-border"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center h-12 px-5 mt-8 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-colors"
          >
            Join the waitlist
          </a>
        </div>
      )}
    </>
  );
}
