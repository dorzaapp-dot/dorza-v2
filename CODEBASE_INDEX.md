# Codebase Index

> Generated: 2026-04-29 · Refreshed: 2026-05-04 · Run the codebase-onboarding skill again to refresh.

## Overview

This is the Dorza v2 Next.js application — the marketing website for Dorza (an AI-native digital agency for Sydney small businesses) plus two internal tools: a 10-step client intake wizard and a standalone waitlist page. The repo is pre-launch and under active development. The marketing site went through a major design overhaul in early May 2026 — terracotta + sage palette, serif/sans pairing, framer-motion-driven reveals.

## Tech stack

| Layer | Tool | Version | Notes |
|-------|------|---------|-------|
| Language | TypeScript | ^5 | Strict mode |
| Framework | Next.js | ^14.2.0 (App Router) | Static export configured (`next.config.mjs`) |
| Styling | Tailwind CSS | ^3.4.1 | Custom theme in `tailwind.config.ts`, tokens mirrored in `app/globals.css` |
| Animation | framer-motion | ^12.38.0 | Reveal/Stagger/SlideReveal wrappers + count-up hook |
| Icons | lucide-react | ^1.7.0 | Used throughout |
| Fonts | next/font (Google) | — | Plus Jakarta Sans (body) + Instrument Serif (display) |
| Hosting | Vercel (planned) | — | Static export (`output: 'export'`, `images.unoptimized: true`) |

## Architecture at a glance

```
app/page.tsx (homepage)
  └── 9 section components from components/sections/
        Nav · Hero (+ HeroBrowserMockup) · SegmentMarquee · Services
        HowItWorks · Thesis · Pricing · FAQ · WaitlistCTA · Footer

app/onboard/page.tsx (10-step intake wizard — internal tablet tool)
  └── useReducer in page.tsx → 10 StepXxx components (components/onboard/)
  └── lib/types.ts (OnboardState) ↔ lib/generateMarkdown.ts (Step 10 output)
  └── lib/api.ts stub (does nothing real yet)

app/onboarding/page.tsx (DUPLICATE — see Gaps)
  └── components/DorzaOnboarding.tsx (self-contained, inline styles)

app/waitlist/page.tsx (public signup)
  └── lib/api.ts stub → console.log only

lib/api.ts: submitForm() → console.log + 500ms resolved Promise (all forms hit this)
```

## Directory map

| Path | Purpose |
|------|---------|
| `app/page.tsx` | Dorza homepage (public) |
| `app/onboard/page.tsx` | 10-step intake wizard (internal) |
| `app/onboarding/page.tsx` | Duplicate intake (backed by DorzaOnboarding.tsx — see Gaps) |
| `app/waitlist/page.tsx` | Standalone waitlist signup (public) |
| `app/layout.tsx` | Root layout: Plus Jakarta Sans + Instrument Serif via next/font, metadata, JSON-LD Organization schema |
| `app/globals.css` | Design tokens as CSS custom properties, base typography, reduced-motion handling |
| `components/sections/` | Homepage section components (Nav, Hero, HeroBrowserMockup, Services, HowItWorks, Thesis, Pricing, FAQ, SegmentMarquee, WaitlistCTA, Footer) |
| `components/onboard/` | Step components for the 10-step intake wizard |
| `components/ui/` | Shared primitives: Badge, Button, Card, Container, Eyebrow, SectionHeader |
| `components/motion/` | Reveal, Stagger, SlideReveal, useCountUp — framer-motion building blocks; exports `DORZA_EASE` |
| `components/DorzaOnboarding.tsx` | Monolithic alternate onboarding (inline styles — see Gaps) |
| `components/Footer.tsx`, `components/Nav.tsx` | Older duplicates at top level — homepage uses `components/sections/` versions |
| `lib/api.ts` | `submitForm()` stub — console.log + resolves success |
| `lib/types.ts` | Shared TypeScript types: BusinessType, WaitlistFormData, OnboardState, OnboardAction |
| `lib/generateMarkdown.ts` | Pure function: converts OnboardState → intake markdown document |
| `lib/cn.ts` | `cn()` utility for conditional Tailwind classes |
| `tailwind.config.ts` | Design tokens, fonts, radii, shadows, easing, keyframes |
| `next.config.mjs` | Static export config |
| `DORZA_MD_ALL/` | Knowledge base + build prompt docs (not imported by code) |
| `DESIGN.md` | Figma design system analysis (reference/inspiration only — not Dorza's design guide) |

## User flow walkthrough

1. Visitor lands on `/` → [app/page.tsx](dorza-v2/app/page.tsx)
2. Page renders 9 sequential section components from `components/sections/`
3. Hero ([Hero.tsx](dorza-v2/components/sections/Hero.tsx)) shows headline "The whole digital playbook, done for you" with word-by-word framer-motion reveal, mono eyebrow, two pill CTAs, and a `HeroBrowserMockup` to the right
4. Visitor clicks "Join the waitlist →" → smooth-scrolls to `#waitlist` (WaitlistCTA section, dark themed)
5. Fills form: name, email, business type, suburb (controlled inputs, pill-shaped, dark glass styling)
6. Submits → `handleSubmit()` in [WaitlistCTA.tsx](dorza-v2/components/sections/WaitlistCTA.tsx)
7. Calls `submitForm("/api/waitlist", form)` from [lib/api.ts](dorza-v2/lib/api.ts)
8. `submitForm` logs to console and resolves `{ success: true }` after 500ms — **no data is stored anywhere**
9. Success state shown inline

**Gap:** There is no `/api/waitlist` route handler, and static export precludes runtime API routes. Waitlist data is silently dropped in production.

## System / backend flow walkthrough

1. Staff opens `/onboard` on a tablet during a client meeting
2. [app/onboard/page.tsx](dorza-v2/app/onboard/page.tsx) initialises `useReducer(reducer, initialState)`
3. 10 steps rendered one at a time; each step dispatches actions to the shared reducer
4. Step 1 (BusinessBasics) sets business type → reducer calls `getDefaultSections(type)` to auto-toggle website sections
5. Step 9 (Package) → `SELECT_PACKAGE` action → fees pre-filled, founding-client discount applied
6. Step 10 (Review) → [lib/generateMarkdown.ts](dorza-v2/lib/generateMarkdown.ts) converts full `OnboardState` into a markdown document
7. Staff copies markdown or downloads `Dorza_[BusinessName]_Intake.md`
8. Markdown is used as `intake.md` input for Claude Code to build the client's Next.js website

## Where to look — task → location

| I want to... | Look at... |
|--------------|-----------|
| Change homepage copy | `components/sections/` — one file per section |
| Add a new homepage section | Create `components/sections/NewSection.tsx`, add to `app/page.tsx` |
| Change the hero headline | [components/sections/Hero.tsx](dorza-v2/components/sections/Hero.tsx) line 9 |
| Change the hero browser mockup | [components/sections/HeroBrowserMockup.tsx](dorza-v2/components/sections/HeroBrowserMockup.tsx) |
| Change pricing | [components/sections/Pricing.tsx](dorza-v2/components/sections/Pricing.tsx) |
| Edit the waitlist form | [components/sections/WaitlistCTA.tsx](dorza-v2/components/sections/WaitlistCTA.tsx) |
| Wire up a real form endpoint | [lib/api.ts](dorza-v2/lib/api.ts) — replace the stub. Note: static export means use a third-party endpoint (Formspree/webhook), not a Next.js route handler |
| Change design tokens | [tailwind.config.ts](dorza-v2/tailwind.config.ts) **and** mirror in [app/globals.css](dorza-v2/app/globals.css) `:root` |
| Add a new onboarding step field | [lib/types.ts](dorza-v2/lib/types.ts) → `OnboardState` + relevant `StepXxx.tsx` + [lib/generateMarkdown.ts](dorza-v2/lib/generateMarkdown.ts) |
| Change the markdown export format | [lib/generateMarkdown.ts](dorza-v2/lib/generateMarkdown.ts) |
| Add a new page | Create `app/[route]/page.tsx` |
| Add or change scroll-in animation | Wrap content in `<Reveal>` / `<Reveal stagger>` / `<SlideReveal>` from `components/motion/`; respect `useReducedMotion()` |
| Run the dev server | `npm run dev` |
| Build | `npm run build` (produces static `out/`) |
| Lint | `npm run lint` |
| Deploy | Push to Vercel (no CI configured yet) |

## Design system (current)

**Palette** — terracotta + sage editorial, with warm off-whites:
- Primary (terracotta): `#D4845A` · light `#E8A87C` · dark `#B8673F` · tint `#FBEDE3`
- Accent (sage): `#6B8F71` · light `#A4C2A8` · dark `#4A6B4E` · tint `#E8EFE9`
- Dark: `#1A1A2E` (headings, dark sections like WaitlistCTA, footer)
- Surface: `#F9F7F5` · Warm: `#FDFAF7` · Border: `#F0EBE4`
- Text: primary `#1A1A2E` · secondary `#555` · muted `#888`
- Status: `#24CB71`

**Typography:**
- Display: `Instrument Serif` 400 — used for h1–h6, large numerals
- Body: `Plus Jakarta Sans` 400/500/600/700
- Mono: system mono stack (`ui-monospace`, Cascadia Code, etc.) — used for small uppercase eyebrow labels with `tracking-[0.18em]`

**Shape and elevation:**
- Radius: `rounded-card` 20px · `rounded-btn` / `rounded-full` 999px · `rounded-sm` 8px
- Shadows: `shadow-soft` (1px hairline) · `shadow-medium` / `shadow-card` (12px 32px subtle)
- Buttons are pill-shaped (full-radius), height 48px (`h-12`), `font-semibold text-sm`
- Cards: white, `border border-border`, `rounded-card`, `p-6`, hover `shadow-medium hover:-translate-y-1`

**Motion:**
- Custom easing: `ease-dorza` = `cubic-bezier(0.23, 1, 0.32, 1)` (also exported as `DORZA_EASE` in `components/motion/Reveal.tsx`); `ease-out-expo`, `ease-out-quart` also available
- Standard transitions: `duration-300 ease-dorza` for hover; `duration-500 ease-dorza` for layout shifts
- Scroll-in pattern: wrap in `<Reveal>` (default y=24, duration=0.6) or `<Reveal stagger>` for child stagger; uses `whileInView` with `viewport={{ once: true, margin: "-100px" }}`
- Many keyframes available: `float`, `marquee`, `pulse-ring`, `breathe`, `bounce-gentle`, `pulse-subtle`

**Recurring patterns:**
- Eyebrow label: `font-mono text-[11px] uppercase tracking-[0.18em] text-accent` (sometimes `text-text-muted`)
- Section heading: `font-display text-[44px] md:text-[60px] leading-[1.02] tracking-[-0.025em] text-dark`
- Section spacing: `py-20 md:py-[7.5rem]` (use `md:py-[10rem]` for the dark waitlist section)
- Container: `<Container>` from `components/ui/Container` (max width 1200px, px-5)

## Conventions in use

- **Naming:** Components PascalCase, one per file. Step components prefix with `Step`. Section components live in `components/sections/`, primitives in `components/ui/`.
- **Components:** Default exports for pages and section components; named exports for UI primitives (Badge, Container, etc.) and motion wrappers. Props typed inline. No barrel exports — direct imports only.
- **Styling:** Tailwind utility classes with semantic tokens (`bg-primary`, `text-accent`, `border-border`, `rounded-card`, `rounded-full`, `ease-dorza`). Avoid raw hex literals except in `tailwind.config.ts` and `app/globals.css`.
- **State:** `useReducer` for the multi-step onboarding wizard; `useState` for simpler page-level form state. No global state library.
- **Forms:** Controlled inputs. All form submissions go through `submitForm()` in `lib/api.ts`. No validation library — manual field-by-field checks.
- **Errors:** Inline error messages under fields, set on attempted "Next" step. No error boundary components.
- **Tests:** No tests found — zero test files in the codebase.
- **Git:** Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`).

## Gaps and notable findings

1. **Forms still submit nowhere.** `lib/api.ts` console-logs and resolves after 500ms. Because the app is now a static export (`output: 'export'`), a Next.js API route handler won't work — the real fix is to point `submitForm` at a third-party endpoint (Formspree, n8n webhook, etc.) configured per environment. Don't change the function signature; many components call it.

2. **Duplicate onboarding implementations.** `/app/onboard/` is the canonical Tailwind + modular-step build. `/app/onboarding/` renders `components/DorzaOnboarding.tsx`, a self-contained monolith with inline hex colors that bypasses the design system entirely. The alternate should be removed; do not add features to both.

3. **Duplicate top-level components.** `components/Footer.tsx` and `components/Nav.tsx` exist at the top level, but the homepage imports `components/sections/Footer.tsx` and `components/sections/Nav.tsx`. The top-level files appear to be older versions and should be removed.

4. **Design tokens duplicated in two places.** `tailwind.config.ts` and `app/globals.css` `:root` both declare the same color/easing/shadow values. When changing a token, update both — there is no shared source.

5. **`DESIGN.md` is Figma's design system, not Dorza's.** It was used as inspiration. It is not referenced by code; treat as reference-only.

6. **No tests, no CI.** The repo has `lint` only. There is no test framework configured.

## Edit-safety guide

**Safe to edit directly** (low blast radius):
- Individual section components in `components/sections/` — each is independent
- Page-level copy (headings, subheadings, CTA text) within existing components
- `app/waitlist/page.tsx` — self-contained
- `DORZA_MD_ALL/` knowledge base docs

**Edit with care** (affects multiple components):
- `tailwind.config.ts` and `app/globals.css` — token changes ripple across the entire site, **must be updated together**
- `components/ui/` primitives — used by many section components
- `components/motion/` (Reveal, Stagger, SlideReveal, useCountUp) — wraps many animated elements

**Flag for review before changing** (cross-cutting, shared state, or external contracts):
- `lib/types.ts` — `OnboardState` change = update all 10 step components + `generateMarkdown.ts`
- `lib/generateMarkdown.ts` — output is the artifact that feeds the client site build pipeline
- `lib/api.ts` — when the stub is replaced with a real endpoint, ensure all callers still work
- `app/layout.tsx` — affects metadata, fonts, and JSON-LD on every page
- `next.config.mjs` — switching off `output: 'export'` changes deployment story; switching on full optimisation changes hosting requirements

## How to refresh this document

Re-run the codebase-onboarding skill. It will read this file first and propose updates rather than overwriting.
