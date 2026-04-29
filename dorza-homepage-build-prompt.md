# Dorza — Homepage & Design System Build Prompt

> Paste this into Claude Code at the root of the `dorza-site` repo. Place `DESIGN.md` (Figma) and `SKILL.md` (bento) in `/inspiration/` first.
>
> Run with:
> `claude "Read every file referenced in @dorza-homepage-build-prompt.md and execute the build in a single pass. Do not ask clarifying questions. Make decisions, commit incrementally."`

---

## Context

You are building the marketing homepage and refreshing the full design system for **Dorza** — an AI-native digital agency for Sydney local businesses. We do websites, social media, Google Business, and chatbots — done-for-you, powered by AI. Tradies, cafes, salons, fitness studios, retail, professional services.

This is **our own site**. It is the showcase. It must be objectively beautiful, distinctive, and feel like the work of a confident agency. Not a template. Not a generic SaaS landing page.

## Required reading (in this order, before writing a single line of code)

1. **Inspiration files** — these define visual direction, motion, and feel:
   - `@inspiration/DESIGN.md` (Figma's design system — structural foundation, type rigor, button shape, contrast philosophy)
   - `@inspiration/SKILL.md` (Bento — modular grid layout philosophy)

2. **Brand guidelines:** `@03-dorza-brand-guidelines.md` — colours, type scale, tone of voice. **These are constraints.**

3. **Existing conventions:** `@CLAUDE.md` (project root)

4. **Content sources:**
   - `@01-dorza-company-overview.md` — what Dorza is, the thesis
   - `@04-dorza-pricing-and-packages.md` — exact pricing
   - `@06-dorza-sales-and-gtm.md` — voice, objection handling
   - `@14-dorza-site-build-prompt.md` — baseline spec to **exceed**

## The synthesis (read this twice)

The two inspiration files pull in different directions. Your job is to synthesise them, not pick one:

- **From Figma (`DESIGN.md`):** take the **structural rigor** — strong contrast, disciplined grid, geometric (not soft) cards with crisp 1px outlines, mostly-flat elevation, modular section rhythm, type that does real work at every size, monospace as a deliberate accent for tool/code surfaces, pill-shaped buttons (border-radius 999px), categorical accent colours used as **labels not decoration**.
- **From Bento (`SKILL.md`):** take the **modular grid layout** — varied block sizes within a unified grid, scannable hierarchy through size + position rather than through dividers, content blocks that feel "snapped" together like a bento box. This applies most strongly to the Services section and the hero's right-side composition.
- **Reject from both:** Figma's pure-black canvas (we use `#1A1A2E`), Figma's multi-coloured categorical accents (we have ONE accent colour, orange), Bento's pastel palette (we don't use pastels), Bento's `Inter` everywhere (we use Fraunces for display).

The result should feel like: **the structural confidence of a design tool's marketing site, expressed through a bento-modular layout, with the warmth of Fraunces display type and Dorza's single-accent orange system.** Editorial, precise, and unmistakably Dorza.

---

## Hard constraints (non-negotiable)

- **Stack:** Next.js 14 App Router, TypeScript strict, Tailwind CSS v3, static export (`output: 'export'`)
- **Brand colours (these win over any inspiration):**
  - Accent: orange `#E8742A`, accent-hover `#C45D1E`, accent-soft `#FFF0E5`
  - Dark surface: `#1A1A2E` (used as Figma uses black — for high-contrast sections, footer, waitlist band)
  - Canvas: `#FFFFFF` and `#FDFAF7` (alternating)
  - Surface: `#F9F7F5`, border: `#F0EBE4`
  - Text: `#1A1A2E` / `#555` / `#888`
  - **Never** pure black `#000`, **never** pure grey, **never** the multi-colour Figma accent palette.
- **Type:** Fraunces (display, 600/700) + DM Sans (body, 400/500/600) + a system mono stack for code/token surfaces, all via `next/font/google` where available. Headings always Fraunces. Body always DM Sans. Mono only on tool/code surfaces.
- **Logo:** "dorza" lowercase, Fraunces 700, "o" in orange `#E8742A`, rest in `#1A1A2E` (or white on dark).
- **Voice rules:** No buzzwords ("leverage", "synergy"). No AI jargon ("LLM", "agentic"). Use contractions. Lead with benefit. Max one exclamation mark on the whole page.
- **Animation libraries allowed:** Framer Motion, CSS transitions, View Transitions API, IntersectionObserver. **No** Lottie, GSAP, three.js.
- **Performance:** LCP < 2.5s. No infinite-running animations above the fold. `prefers-reduced-motion` respected on every animation.
- **Accessibility (per Bento's WCAG 2.2 AA standard):** keyboard-reachable, visible focus rings (2px solid `#E8742A` with 2px offset), alt text on every image, semantic HTML, contrast ratios verified.

---

## Translated design tokens

Use the Figma `DESIGN.md` token *structure*, but with Dorza values. Define these as CSS variables in `globals.css` and Tailwind extensions.

### Type scale (adapted from DESIGN.md §3, in Fraunces + DM Sans)

| Element | Size (desktop) | Size (mobile) | Family | Weight | Line-height | Tracking |
|---|---|---|---|---|---|---|
| Hero display | 72px | 40px | Fraunces | 700 | 1.0 | -0.03em |
| Page title | 56px | 32px | Fraunces | 700 | 1.02 | -0.025em |
| Section title | 40px | 28px | Fraunces | 700 | 1.08 | -0.02em |
| Card title | 24px | 20px | Fraunces | 600 | 1.18 | -0.01em |
| Subsection | 18px | 16px | DM Sans | 600 | 1.35 | -0.01em |
| Body large | 18px | 16px | DM Sans | 400 | 1.55 | 0 |
| Body | 16px | 15px | DM Sans | 400 | 1.6 | 0 |
| Small | 14px | 13px | DM Sans | 400 | 1.5 | 0 |
| Label | 13px | 12px | DM Sans | 500 | 1.3 | 0.02em |
| Mono | 13px | 12px | system-mono | 400 | 1.4 | 0 |

### Spacing & layout (adapted from DESIGN.md §5)

```css
--section-padding-tight: 5rem;     /* 80px */
--section-padding-default: 7.5rem; /* 120px — desktop default */
--section-padding-large: 10rem;    /* 160px — for hero & finale */

--layout-max-width: 1200px;
--layout-gutter: 24px;

--bento-gap: 16px;        /* gap between bento cells */
--bento-radius: 20px;     /* card radius — geometric, not soft */
```

Mobile section padding: `py-16` (64px). Never less.

### Elevation (adapted from DESIGN.md §6 — mostly flat)

```css
--shadow-none: none;
--shadow-soft: 0 1px 0 rgba(26, 26, 46, 0.06);
--shadow-medium: 0 12px 32px rgba(26, 26, 46, 0.08);
```

Cards at rest: outlined only (`1px solid #F0EBE4`). Shadow only on hover, only `--shadow-medium`.

### Motion tokens

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--duration-fast: 160ms;
--duration-base: 280ms;
--duration-slow: 480ms;
```

---

## Deliverables

### 1. Design system refresh

Update `tailwind.config.ts`, `app/globals.css`, and `CLAUDE.md` with the synthesised system above. Build these primitives in `/components/ui/` (and only these — resist adding more):

- `Button` — pill-shaped per Figma (`border-radius: 999px`), 48px min-height. Variants: `primary` (orange bg, white text), `secondary` (white bg, dark text, 1px border), `ghost` (transparent, dark text). Active state: `transform: scale(0.98)`. Hover on primary: bg → `#C45D1E`, trailing arrow translates 4px right.
- `Badge` — pill, 28px min-height, `bg-[#FFF0E5] text-[#E8742A]`, `border: 1px solid rgba(232, 116, 42, 0.16)`.
- `Card` — `bg-white`, `border: 1px solid #F0EBE4`, `border-radius: 20px`, no shadow at rest. Hover: `translateY(-4px)` + `--shadow-medium` + border darkens to `#E5DFD6`.
- `Container` — `max-w-[1200px] mx-auto px-6 lg:px-8`.
- `SectionHeader` — eyebrow (mono, 13px, uppercase, tracking-wider, orange) + title (Fraunces) + optional kicker (DM Sans body large).
- `Eyebrow` — small mono label, used to introduce sections (per Figma's tool-like aesthetic).
- `BentoGrid` and `BentoCell` — the modular grid system. `BentoCell` accepts a `span` prop (e.g. `span={{ col: 2, row: 1 }}`) and renders within a CSS grid parent. Default grid: `grid-template-columns: repeat(6, 1fr)` on desktop, `repeat(2, 1fr)` on mobile.

### 2. Homepage (`app/page.tsx`)

Build the following sections in order. **Interpret each through the synthesis above.** Section rhythm matters — alternate canvas (`#FFFFFF`), warm canvas (`#FDFAF7`), and the dark moment (`#1A1A2E`) at the waitlist band. No two adjacent sections share a background colour.

**1. Sticky nav.** Wordmark left. Centre/right anchor links: Services, How it works, Pricing. Right: pill primary CTA "Join the waitlist". Mobile: full-screen overlay menu. On scroll past 40px: gain `backdrop-blur-md`, white-with-90%-opacity bg, 1px bottom border.

**2. Hero.** This is the most important section. Asymmetric, NOT centred. Per Figma's structural rigor + Bento's modular impulse:

- Left column (60% width): mono eyebrow ("DIGITAL AGENCY · SYDNEY"), Fraunces display headline ("Everything your business needs to go digital" — but rewrite if a stronger version emerges; consider variants like "The whole digital playbook, done for you" or "We get Sydney's small businesses online — fast"), DM Sans subhead, two pill CTAs (primary + secondary), trust strip.
- Right column (40% width): a **bespoke bento mini-composition** — a 2×3 mini grid of small cards showing fragments of what Dorza delivers: a stylised browser frame with a tiny website mock, a fake Instagram post tile with orange accents, a Google Business "5.0 ★★★★★" review card, a chatbot bubble snippet, a tiny analytics chart with one orange line trending up, and a clock card showing "Live in 24h". These mini cards animate in with a stagger on load, and gently float (max 4px y-translation, 8s loop, paused on `prefers-reduced-motion`).
- Below the hero, a thin mono-typed strip: `"// SERVING TRADIES · CAFES · SALONS · FITNESS · RETAIL · PROFESSIONAL SERVICES"` — quietly continues the tool/code aesthetic from Figma without overdoing it.

**3. Proof strip / segment marquee.** A horizontally-scrolling marquee of the six business segments, each as a small chip (`#FFF0E5` bg, orange text, mono font, geometric pill). Marquee pauses on hover. This replaces a generic "trusted by" logos row, since we're pre-launch.

**4. Services — THE BENTO MOMENT.** This is where the Bento influence lands hardest. Build a 6-column × 4-row CSS grid with four cells of varying sizes:

- **Website (largest cell, col-span-4 row-span-2):** Card title "Custom websites, live in 24 hours." Inside the card, a styled mock browser frame showing a simplified version of a client site. Bullet list below. Uses warm canvas `#FDFAF7` as cell bg.
- **Social Media (col-span-2 row-span-2):** Tall card. Card title "Social media on autopilot." Inside, three stacked mock Instagram post tiles. Uses `#FFF0E5` (orange-soft) bg.
- **Research & Strategy (col-span-3 row-span-2):** Wide card. Title "Research & strategy." Inside, a stylised mono-text "scratchpad" showing competitor analysis bullet points (mono font, like a designer's notes). Uses `#1A1A2E` dark bg with white text — the Figma-style high-contrast moment.
- **AI Agents (col-span-3 row-span-2):** Card title "AI agents at your disposal." Inside, a stylised chat conversation between a business owner and an AI agent ("Owner: Can you reschedule next week's posts to Monday?" / "Agent: Done. Moved 3 posts to Mon 11am."). Uses `#F9F7F5` surface bg.

Mobile: collapse to single column, all cells full-width, maintain order.

**5. How it works.** Sticky-scroll horizontal storytelling on desktop, vertical stack on mobile. 4 steps. Each step has: a numbered eyebrow ("01" in mono orange), a Fraunces title, a DM Sans description, and a small visual element (could be a stylised UI fragment matching the step). On desktop, as the user scrolls, the steps reveal one at a time with the step number sliding into a sticky position on the left.

**6. Why Dorza / The thesis.** Editorial-feeling, NOT a card grid. Lead with a large Fraunces statement spanning most of the column width: "Agencies charge $3,000 a month and take six weeks. We charge $349 and ship in 24 hours. Same quality." Then three supporting points laid out in a 3-column row beneath, each with a mono eyebrow, short Fraunces sub-title, and 2-line DM Sans explanation. Background: warm canvas. Sub-points cover speed / price / scale, drawn from `01-dorza-company-overview.md`.

**7. Pricing.** Three plans. Bento-modular, but unified row: 3 equal cells in a 3-column grid. Growth plan (middle) has subtle orange tint and a mono-typed `// MOST POPULAR` ribbon at the top. Each card: plan name (Fraunces card title), price (Fraunces 56px), monthly modifier in DM Sans small, full feature list, primary CTA pill. Founding client offer mentioned as a tiny mono-typed footnote below the row: `// FOUNDING CLIENT OFFER · 50% OFF SETUP FOR THE FIRST 20 SYDNEY CLIENTS`.

**8. FAQ.** 6 questions (use the objection-handling content from `06-dorza-sales-and-gtm.md`):
- "How much does it cost?"
- "I've been burned by agencies before — why is this different?"
- "I don't have time for this."
- "How fast is 'live in 24 hours' really?"
- "What if I want to cancel?"
- "Can I just get one piece — say, only social media?"

Native `<details>`/`<summary>` accordion. Custom chevron rotates 180° on open. Content height animates via the CSS grid `grid-template-rows: 0fr → 1fr` trick. Items separated by 1px borders, no card chrome.

**9. Waitlist CTA — THE DARK MOMENT.** Full-bleed band, `#1A1A2E` bg, white text. Per Figma's high-contrast section philosophy. Centred-aligned content within a max-width container. Mono eyebrow ("// FOUNDING CLIENT OFFER"), Fraunces 56px headline ("Get in before we launch"), DM Sans subhead about the 20 spots. Inline form: name, email, business type select, suburb. Submit button: orange pill on dark bg — high contrast. Inputs use `rgba(255,255,255,0.08)` bg with white text per Figma's dark-mode form pattern.

**10. Footer.** Dark `#1A1A2E`, three-column grid. Left: wordmark + tagline + Sydney address line. Middle: 2 link columns (Services / Company). Right: contact email + social icons. Bottom strip: mono-typed `// © 2026 dorza · made in sydney` and "All systems operational" status pill (per Figma's tool-like footer pattern). Use the green `#24CB71` from Figma for the status dot — this is the **one** non-orange accent allowed on the page, and only here.

### 3. Interactivity & motion (this is half the brief)

Every animation respects `prefers-reduced-motion`.

- **Scroll reveals on every section:** elements fade up + translate-y 16px, staggered 60ms between siblings. Use Framer Motion `whileInView` with `once: true` and `amount: 0.2`.
- **Hero load:** wordmark scales in (1.0 from 0.96, 400ms `--ease-out-expo`), then headline animates word-by-word with 30ms stagger, then subhead, CTAs, trust strip, then bento mini-grid cells stagger in (80ms between). Total intro: under 1.2s.
- **Hero bento mini-cards:** subtle floating idle animation — translateY between -2px and +2px on a 6-8s loop, each card offset in phase. Hover any card: scale 1.02, soft shadow appears. Click: nothing (these are decorative).
- **Nav scroll state:** at scrollY > 40, animate to backdrop-blur + white/90 bg + 1px border, 280ms.
- **Buttons:**
  - Primary: hover → bg `#C45D1E`, trailing icon translateX 4px. Active → scale 0.98. Focus visible → 2px orange ring with 2px offset.
  - Secondary: hover → bg `#F9F7F5`, border darkens to `#E5DFD6`.
- **Cards (services, pricing):** hover → translateY -4px, shadow-medium fades in (200ms), border colour shifts darker.
- **Pricing "Most popular":** on entering viewport, a one-time pulse — orange ring (1px solid orange) expands from card edge outward by 6px and fades to 0 over 800ms. Once only.
- **How-it-works sticky scroll (desktop only):** as user scrolls past the section, the step number on the left stays sticky and updates as each step enters the viewport. Use `position: sticky` + IntersectionObserver to swap the active step.
- **FAQ accordion:** chevron rotates 180° (200ms `--ease-out-quart`). Content reveals via grid-rows trick.
- **Marquee strip:** infinite horizontal scroll at constant speed (~40s per loop), pauses on hover or on `prefers-reduced-motion`.
- **No custom cursor.** No splash screen. No full-page loaders.

### 4. File structure

```
app/
  layout.tsx          # fonts, metadata, JSON-LD
  page.tsx            # composes the homepage
  globals.css         # CSS vars, base resets
components/
  ui/
    Button.tsx
    Badge.tsx
    Card.tsx
    Container.tsx
    SectionHeader.tsx
    Eyebrow.tsx
    BentoGrid.tsx
    BentoCell.tsx
  sections/
    Nav.tsx
    Hero.tsx
    HeroBento.tsx        # the right-side bento mini-composition
    SegmentMarquee.tsx
    Services.tsx          # the main bento section
    HowItWorks.tsx
    Thesis.tsx
    Pricing.tsx
    FAQ.tsx
    WaitlistCTA.tsx
    Footer.tsx
  motion/
    Reveal.tsx        # IntersectionObserver wrapper
    Stagger.tsx
lib/
  api.ts              # submitForm stub
  cn.ts               # className merge helper
tailwind.config.ts
CLAUDE.md             # update with new tokens
```

One component per file. PascalCase. Direct imports, no barrels.

### 5. SEO & metadata

```ts
export const metadata = {
  title: 'Dorza — The AI agency for Sydney small business',
  description: 'We build your website, run your social media, and get you found on Google. Done-for-you, live in 24 hours. From $199/month. No lock-in.',
  openGraph: {
    title: 'Dorza',
    description: 'We build your website, run your social media, and get you found on Google. Done-for-you, live in 24 hours.',
    url: 'https://dorza.app',
    siteName: 'dorza',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}
```

Add a JSON-LD `Organization` block in `layout.tsx` (not LocalBusiness — Dorza serves multiple locations, ranking goal is "AI agency Sydney").

---

## Things to actively avoid

- **Centred-everything layouts.** The hero and all bento sections are asymmetric. Bento implies varied cell sizes — use them.
- **Three-column-card-grid syndrome.** Pricing is the only equal-3-column section. Services is bento-irregular. How-it-works is sticky-scroll. Vary the rhythm.
- **Soft pastel-y feel.** Bento's pastel palette is rejected. Stay in the warm-orange-on-warm-canvas + dark-moment system.
- **Multi-coloured accents.** Figma uses many. Dorza uses one (orange). The green status dot in the footer is the only exception.
- **Gradients as a crutch.** No purple-to-pink hero. Solid colours. Type carries the weight.
- **Stock-photo people.** Banned per brand guidelines.
- **Emoji-as-icons.** Lucide icons only. Fall back to inline SVG, not emoji.
- **Generic SaaS copy.** "Empower your business" → burn it. Read the brand voice section.
- **Floating chatbots / cookie banners on first build.** Skip.
- **Dark mode toggle.** Skip. The waitlist + footer provide the dark moment.
- **Heavy shadows.** Outline-first per Figma. Shadow only on hover, only `--shadow-medium`.
- **Over-rounded cards.** Per Figma do/don't: keep cards geometric (`border-radius: 20px`), not bubbly. No `rounded-3xl`+ anywhere.
- **Mono everywhere.** Mono is an accent for tool/code surfaces (eyebrows, code-feel cards, footer status). Body copy is always DM Sans.

---

## Output process

Work in **four commits**, push after each:

1. `feat: design system — tokens, primitives, bento grid, motion utilities`
2. `feat: nav + hero with bento mini-composition`
3. `feat: services bento + how-it-works + thesis + pricing + faq`
4. `feat: waitlist cta + footer + final polish pass`

After commit 4, do a self-review pass against this prompt and the inspiration files. Specifically check:

- [ ] Does the hero feel asymmetric and editorial, with the bento mini-composition pulling its weight?
- [ ] Is the Services section a true bento (varied cell sizes) and not a 2×2 grid?
- [ ] Does the orange stay an accent (≤15% of visible page area)?
- [ ] Is mono used deliberately on tool/code surfaces only?
- [ ] Are buttons pill-shaped per Figma (border-radius: 999px)?
- [ ] Are cards geometric (1px outline, no shadow at rest)?
- [ ] Does at least one section feel scroll-driven and storytelling-led (how-it-works)?
- [ ] Would a senior designer ship this?

If any answer is "no", iterate before declaring done. Print a summary of: what you built, what you'd improve given more time, and any TODOs (image swaps, OG images, missing illustration assets).

---

## A note on judgement

You will encounter many small decisions this prompt doesn't cover. Make them. Don't ask. The combination of inspiration files + brand guidelines + voice rules + content sources is sufficient to make every micro-decision. When in doubt: **what would a confident senior designer who studied Figma's marketing site and the bento layout philosophy do here?** Do that.
