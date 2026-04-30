# Codebase Index

> Generated: 2026-04-29 · Run the codebase-onboarding skill again to refresh.

## Overview

This is the Dorza v2 Next.js application — the marketing website for Dorza (an AI-native digital agency for Sydney small businesses) plus two internal tools: a 10-step client intake wizard and a standalone waitlist page. The repo is pre-launch and under active development; there is one commit in git history. Real backend integrations (form submission, social scheduling, content generation) are all stubs or planned.

## Tech stack

| Layer | Tool | Version | Notes |
|-------|------|---------|-------|
| Language | TypeScript | ^5 | Strict mode |
| Framework | Next.js | ^14 (App Router) | **package.json says `^9.3.3` — likely a typo, see Gaps** |
| Styling | Tailwind CSS | ^3.4.1 | Custom theme in `tailwind.config.ts` |
| Animation | framer-motion | ^12.38.0 | Used in Hero and Reveal/Stagger motion wrappers |
| Icons | lucide-react | ^1.7.0 | Used throughout |
| Fonts | Google Fonts via next/font | — | DM Sans (body) + Fraunces (display) |
| Hosting | Vercel (planned) | — | Static export intended but not yet configured |
| DNS | Cloudflare | — | Planned |

## Architecture at a glance

```
app/page.tsx (homepage)
  └── 9 section components from components/sections/
        Nav · Hero · SegmentMarquee · Services · HowItWorks
        Thesis · Pricing · FAQ · WaitlistCTA · Footer

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
| `app/` | Next.js App Router pages |
| `app/page.tsx` | Dorza homepage (public) |
| `app/onboard/page.tsx` | 10-step intake wizard (internal) |
| `app/onboarding/page.tsx` | Duplicate intake (backed by DorzaOnboarding.tsx — see Gaps) |
| `app/waitlist/page.tsx` | Standalone waitlist signup (public) |
| `app/layout.tsx` | Root layout: Google Fonts, metadata, JSON-LD Organization schema |
| `app/globals.css` | Global CSS resets |
| `components/sections/` | Homepage section components (Nav, Hero, Services, etc.) |
| `components/onboard/` | Step components for the 10-step intake wizard |
| `components/ui/` | Shared primitives: Badge, Button, Card, Container, Eyebrow, SectionHeader, BentoCell, BentoGrid |
| `components/motion/` | Animation wrappers: Reveal, Stagger (framer-motion) |
| `components/DorzaOnboarding.tsx` | Monolithic alternate onboarding (inline styles — see Gaps) |
| `components/Footer.tsx` | Duplicate Footer (top-level — see Gaps) |
| `components/Nav.tsx` | Duplicate Nav (top-level — see Gaps) |
| `lib/api.ts` | `submitForm()` stub — console.log + resolves success |
| `lib/types.ts` | Shared TypeScript types: BusinessType, WaitlistFormData, OnboardState, OnboardAction |
| `lib/generateMarkdown.ts` | Pure function: converts OnboardState → intake markdown document |
| `lib/cn.ts` | `cn()` utility for conditional Tailwind classes |
| `tailwind.config.ts` | Design tokens, fonts, animations, radii, shadows |
| `DORZA_MD_ALL/` | Knowledge base + build prompt docs (not imported by code) |
| `DESIGN.md` | Figma design system analysis (used as reference/inspiration — not Dorza's own design guide) |

## User flow walkthrough

1. Visitor lands on `/` → [app/page.tsx](app/page.tsx)
2. Page renders 9 sequential section components from `components/sections/`
3. Hero section shows CTA "Join the waitlist →" (anchors to `#waitlist`)
4. Visitor scrolls or clicks → arrives at WaitlistCTA section
5. Fills form: name, email, business type, suburb
6. Submits → `handleSubmit()` in [WaitlistCTA.tsx](components/sections/WaitlistCTA.tsx)
7. Calls `submitForm("/api/waitlist", form)` from [lib/api.ts](lib/api.ts)
8. `submitForm` logs to console and resolves `{ success: true }` after 500ms — **no data is stored anywhere**
9. Success state shown: "You're on the list. We'll be in touch soon."

**Gap:** There is no `/api/waitlist` route handler. Forms resolve as success locally but drop data in production.

## System / backend flow walkthrough

1. Staff opens `/onboard` on a tablet during a client meeting
2. [app/onboard/page.tsx](app/onboard/page.tsx) initialises `useReducer(reducer, initialState)`
3. 10 steps rendered one at a time; each step dispatches actions to the shared reducer
4. Step 1 (BusinessBasics) sets business type → reducer calls `getDefaultSections(type)` to auto-toggle website sections
5. Step 9 (Package) → `SELECT_PACKAGE` action → fees pre-filled, founding client discount applied
6. Step 10 (Review) → [lib/generateMarkdown.ts](lib/generateMarkdown.ts) converts full `OnboardState` into a markdown document
7. Staff copies markdown or downloads `Dorza_[BusinessName]_Intake.md`
8. Markdown is used as `intake.md` input for Claude Code to build the client's Next.js website

## Where to look — task → location

| I want to... | Look at... |
|--------------|-----------|
| Change homepage copy | `components/sections/` — one file per section |
| Add a new homepage section | Create `components/sections/NewSection.tsx`, add to `app/page.tsx` |
| Change the hero headline | [components/sections/Hero.tsx](components/sections/Hero.tsx) line 8 |
| Change pricing | [components/sections/Pricing.tsx](components/sections/Pricing.tsx) |
| Edit the waitlist form | [components/sections/WaitlistCTA.tsx](components/sections/WaitlistCTA.tsx) |
| Wire up a real form endpoint | [lib/api.ts](lib/api.ts) — replace the stub |
| Change design tokens (colors, radii) | [tailwind.config.ts](tailwind.config.ts) |
| Add a new onboarding step field | [lib/types.ts](lib/types.ts) → `OnboardState` + relevant `StepXxx.tsx` + [lib/generateMarkdown.ts](lib/generateMarkdown.ts) |
| Change the markdown export format | [lib/generateMarkdown.ts](lib/generateMarkdown.ts) |
| Add a new page | Create `app/[route]/page.tsx` |
| Run the dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Deploy | Push to Vercel (no CI configured yet) |

## Conventions in use

- **Naming:** Components PascalCase, one per file. Step components prefix with `Step`. Section components live in `components/sections/`, primitives in `components/ui/`.
- **Components:** Default exports for pages and sections; named exports for UI primitives (Badge, Container, etc.). Props typed inline. No barrel exports — direct imports only.
- **Styling:** Tailwind utility classes with design tokens from `tailwind.config.ts`. Use semantic token names (`text-dark`, `bg-primary`, `border-border`, `rounded-card`, `rounded-btn`) not raw hex. Motion wrappers (Reveal, Stagger) wrap content that should animate in.
- **State:** `useReducer` for the multi-step onboarding wizard; `useState` for simpler page-level form state. No global state library.
- **Forms:** Controlled inputs. All form submissions go through `submitForm()` in `lib/api.ts`. No validation library — manual field-by-field checks.
- **Errors:** Inline error messages under fields, set on attempted "Next" step. No error boundary components.
- **Tests:** No tests found — zero test files in the codebase.
- **Git:** Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`). One commit so far ("Init commit").

## Gaps and notable findings

1. **Duplicate onboarding implementations:** `/app/onboard/` uses Tailwind + modular step components (the canonical build per the spec). `/app/onboarding/` renders `DorzaOnboarding.tsx`, a self-contained monolith with inline hex colors that bypasses the Tailwind design system entirely. Clarify which is canonical; the other should be removed.

2. **No `next.config.*` file:** The architecture doc and CLAUDE.md both say static export (`output: 'export'`), but there is no `next.config.ts` or `next.config.js`. The app currently builds as a server-rendered Next.js app, not a static site. This needs to be added before deploying to Vercel as a static export.

3. **`package.json` version mismatch:** `"next": "^9.3.3"` in `package.json` resolves to Next.js 9.x, which does not have the App Router. The project uses App Router features throughout. This should be `"next": "^14"`. Check the installed version in `node_modules` and align `package.json`.

4. **Forms submit nowhere:** `lib/api.ts` is a stub that logs to console and resolves after 500ms. All waitlist and onboarding submissions are silently dropped. No `/api/waitlist` route handler exists.

5. **Duplicate top-level components:** `components/Footer.tsx` and `components/Nav.tsx` exist at the top level, but `components/sections/Footer.tsx` and `components/sections/Nav.tsx` are what the homepage actually uses. The top-level duplicates appear to be older versions.

6. **`DESIGN.md` is Figma's design system**, not Dorza's. It appears to have been used as inspiration while building the Dorza look-and-feel. It is not referenced by code and can be treated as reference-only.

7. **`framer-motion` in use but undocumented in CLAUDE.md.** The Hero section and `components/motion/` (Reveal, Stagger) depend on it. The original build spec said no external component libraries; this has since been added.

## Edit-safety guide

**Safe to edit directly** (low blast radius):
- Individual section components in `components/sections/` — each is independent
- Page-level copy (headings, subheadings, CTA text) within existing components
- `app/waitlist/page.tsx` — self-contained
- `DORZA_MD_ALL/` knowledge base docs

**Edit with care** (affects multiple components):
- `tailwind.config.ts` — token changes ripple across the entire site
- `components/ui/` primitives — used by many section components
- `components/motion/Reveal.tsx` and `Stagger.tsx` — wraps many animated elements

**Flag for review before changing** (cross-cutting, shared state):
- `lib/types.ts` — `OnboardState` change = update all 10 step components + `generateMarkdown.ts`
- `lib/generateMarkdown.ts` — output is the artifact that feeds the client site build pipeline
- `lib/api.ts` — when the stub is replaced with a real endpoint, ensure all callers still work
- `app/layout.tsx` — affects metadata, fonts, and JSON-LD on every page

## How to refresh this document

Re-run the codebase-onboarding skill. It will read this file first and propose updates rather than overwriting.
