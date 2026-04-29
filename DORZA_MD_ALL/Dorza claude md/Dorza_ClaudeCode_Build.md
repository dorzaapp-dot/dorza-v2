# Dorza — Initial Build

## Context

Dorza is an AI-native digital agency for Sydney local businesses. We build websites, manage social media, set up Google Business profiles, and deploy chatbots — all done-for-you, powered by AI automation. Target: tradies, cafes, salons, fitness studios, retail, professional services. Brand colour: `#E8742A` (warm orange). Dark: `#1A1A2E`. Tone: confident, warm, no-nonsense.

## Task

Build in a single pass. No questions. Commit directly. Use Next.js 14 App Router + Tailwind CSS + TypeScript. Static export (`output: 'export'`).

Create these 4 things:

### 1. CLAUDE.md (project root)

```markdown
# Dorza — Project Conventions

## Stack
- Next.js 14 (App Router, static export)
- Tailwind CSS v3 + custom theme in tailwind.config.ts
- TypeScript strict mode
- Lucide React for icons
- Google Fonts: DM Sans (body 400/500/600), Fraunces (display 600/700)

## Design tokens
- Primary: #E8742A (orange) — buttons, accents, links, CTAs
- Primary dark: #C45D1E — hover states
- Primary light: #FFF0E5 — light backgrounds, badges
- Dark: #1A1A2E — headings, nav, footer bg
- Text: #1A1A2E (primary), #555 (secondary), #888 (muted)
- Background: #FFFFFF (main), #FDFAF7 (warm off-white sections), #F9F7F5 (surface)
- Border: #F0EBE4
- Radius: 12px (cards), 10px (buttons/inputs), 8px (small elements)
- Shadows: none except subtle card hover (0 2px 12px rgba(0,0,0,0.06))

## Component patterns
- All CTAs use primary orange bg, white text, 48px height, font-weight 600
- Section spacing: py-20 on desktop, py-14 on mobile
- Max content width: max-w-6xl mx-auto px-5
- Cards: white bg, 1px border-[#F0EBE4], rounded-xl, p-6, hover:shadow transition
- Headings: Fraunces font, text-[#1A1A2E]
- Body: DM Sans, text-[#555], leading-relaxed
- Badge/pill: bg-[#FFF0E5] text-[#E8742A] text-sm font-medium px-4 py-1.5 rounded-full

## File conventions
- Components in /components, one per file, PascalCase
- Pages in /app, use page.tsx
- Shared types in /lib/types.ts
- All images in /public/images
- No barrel exports, direct imports only

## SEO
- Every page needs metadata export with title, description, openGraph
- Use semantic HTML (main, section, article, nav, footer)
- All images need alt text
- Structured data (JSON-LD) for LocalBusiness on homepage

## Client website builds (future)
- Each client site is a separate repo generated from templates in /templates
- Client intake markdown goes in the repo root as intake.md
- Claude Code reads intake.md + this file to build the site
- Always generate: sitemap.xml, robots.txt, JSON-LD LocalBusiness schema
- Default font pairings by business type:
  - Tradie: Inter + Cabinet Grotesk (clean/tough)
  - Cafe: DM Sans + Fraunces (warm)
  - Salon: Outfit + Playfair Display (elegant)
  - Fitness: Space Grotesk + Syne (bold)
  - Retail: DM Sans + Fraunces (friendly)
  - Professional: Inter + Newsreader (trustworthy)
- Default colour palettes by business type:
  - Tradie: navy #1B2A4A + orange #E8742A
  - Cafe: warm brown #5C3D2E + sage #7A9E7E
  - Salon: blush #E8B4B8 + gold #C4A35A
  - Fitness: black #1A1A1A + lime #A8D83A
  - Retail: charcoal #2D2D2D + coral #E8745A
  - Professional: navy #1A2744 + teal #2A9D8F
- Mobile-first, test at 375px width
- Lighthouse targets: Performance 90+, Accessibility 95+, SEO 95+
- Contact forms submit to our internal API (endpoint configured per client in env vars)
- Phone numbers must be clickable tel: links
- Google Maps embed on every contact section

## Prompt patterns for content generation
- When generating website copy, use the intake.md fields directly — don't invent details
- Headlines: short, benefit-driven, max 8 words
- Subheadlines: one sentence, conversational, mentions location
- Service descriptions: 2 sentences max, focus on outcome not process
- CTAs: action-oriented verbs ("Get a free quote", "Book now", "See our menu")

## Git
- Conventional commits: feat:, fix:, chore:, docs:
- Commit after each major component, not one giant commit
```

### 2. Homepage (`/app/page.tsx`)

Single-page marketing site for Dorza itself (not a client site). Sections in this order:

**Nav:** Sticky. Logo text "dorza" (lowercase, Fraunces 700, dark — the "o" in dorza is orange). Links: Services, How it works, Pricing, scroll-to anchors. Right side: "Join the waitlist" button (links to #waitlist). Mobile hamburger menu.

**Hero:** Left-aligned text on desktop (60/40 split with a decorative element or abstract shape on right — NOT an image). Badge above headline: "Up and running in days, not months" in pill style. Headline (Fraunces 700, ~48px): "Everything your business needs to go digital". Subheadline (DM Sans, #555): "We build your website, run your social media, and get you found on Google — so you can focus on what you do best." Two CTAs: "Join the waitlist →" (primary orange) and "See how it works" (ghost/outline). Below CTAs: small trust line: "Built for Sydney small businesses · No lock-in contracts · Live in 24 hours".

**Services section** (`#services`): Section heading: "What we do for you". 4 cards in a 2x2 grid:

1. **Business website — live in 24 hours** (icon: Globe). "We build you a professional, mobile-friendly website and get you listed on Google — fast. No tech skills needed." Bullets: Custom-designed website, Google Business setup, Mobile-optimised & SEO-ready, Live within 24 hours. Badge: "Most popular".

2. **Social media on autopilot** (icon: Share2). "We set up your profiles on Facebook, Instagram & more, then automate posting so you stay visible without lifting a finger." Bullets: Profile setup & branding, AI-generated content calendar, Automated posting across platforms, Performance tracking.

3. **Research & strategy** (icon: TrendingUp). "Our AI analyses your market, competitors, and audience to create a tailored digital marketing strategy that actually works." Bullets: Competitor analysis, Market opportunity mapping, Tailored marketing plan, Ongoing trend monitoring.

4. **AI agents at your disposal** (icon: Bot). "Think of them as your personal marketing team. Our AI agents handle tasks, answer questions, and help your business succeed — 24/7." Bullets: On-demand marketing help, Content creation & copywriting, Campaign management, Always learning your business. Badge: "New".

**How it works** (`#how-it-works`): 4 steps in a horizontal timeline (vertical on mobile):
1. "Tell us about your business" — "Fill out a quick form. 5 minutes."
2. "We build everything" — "Website, socials, Google — done in 24-48 hours."
3. "You review and approve" — "We send you a preview. You say go."
4. "Sit back, we run it" — "Posts go out, enquiries get answered, you grow."

**Pricing section** (`#pricing`): 3 tier cards side by side:
- Starter: $499 setup / $199 per month. Website + Google Business. Features: Custom website, Google Business setup, Mobile-optimised & SEO-ready, Basic analytics. CTA: "Get started".
- Growth (highlighted, orange border): $799 setup / $349 per month. Website + Social + Chatbot. Features: Everything in Starter, Social media (3 posts/wk), AI customer service chatbot, Review management, Monthly report. Badge: "Most popular". CTA: "Get started".
- Pro: $1,299 setup / $549 per month. Full service. Features: Everything in Growth, Social media (5 posts/wk), Paid ad campaigns, Monthly strategy call, Priority support. CTA: "Get started".

Below pricing: "All plans include a founding client offer — 50% off setup for our first 20 clients."

**Waitlist section** (`#waitlist`): Centered. Heading: "Get in before we launch". Subheading: "We're onboarding our first 20 founding clients in Sydney. Join the waitlist and be first in line." Form: name input, email input, business type dropdown (Tradie, Cafe/Restaurant, Salon/Beauty, Fitness/Wellness, Retail, Professional Services, Other), suburb input, submit button "Join the waitlist →". On submit, POST JSON to `/api/waitlist` (create a stub handler in `/lib/api.ts` that logs to console and returns success — our native workflow handles the real endpoint). Show success state: "You're on the list! We'll be in touch soon."

**Footer:** Dark bg (#1A1A2E). Logo, tagline "The AI-powered agency for local business." Links: Services, How it works, Pricing, Contact. Contact: hello@dorza.com.au (placeholder). Social icons (Instagram, LinkedIn, Twitter/X — placeholder hrefs). "© 2026 Dorza. All rights reserved." and "Sydney, Australia".

### 3. Onboarding form (`/app/onboard/page.tsx`)

Multi-step wizard form at `/onboard`. This is the internal intake tool used on a tablet during client meetings. Not linked from main nav — accessed directly via URL.

**10 steps exactly as defined below.** Use `useReducer` for state. Each step is a component in `/components/onboard/`. Fixed bottom nav with back/next. Progress dots at top. "dorza" logo top-left.

**Step 1 — Business basics:** business name (required), owner name (required), business type (button grid: Tradie, Cafe/Restaurant, Salon/Beauty, Fitness/Wellness, Retail, Professional Services, Other — if Other show custom input), niche (text, placeholder adapts to selected type), ABN (optional), street address, suburb, phone (required), email, opening hours (textarea).

**Step 2 — Digital presence:** existing website URL, Google Business (3-toggle: Yes/No/Not sure), Instagram handle, Facebook page, other platforms, biggest frustration (textarea).

**Step 3 — Services:** dynamic list of text inputs (start with 4, add/remove, max 10, min 1 required), differentiator (textarea), price range (text, optional).

**Step 4 — Target customers:** typical customer (text), service area (text), discovery channels (multi-select chips: Word of mouth, Google Search, Instagram, Facebook, Walk-ins, Referrals, Other).

**Step 5 — Brand & style:** has logo (toggle Yes/No), brand colours (text), tone (single-select cards: Casual & friendly / Professional & clean / Bold & energetic / Warm & welcoming — each with one-line description), inspiration sites (textarea), brand keywords (text).

**Step 6 — Photos & assets:** logo status (3-select: Received / Client will send / No logo), photos status (4-select: Received / Client will send / Use stock / Pull from Instagram), menu/service doc status (3-select: Received / Client will send / N/A), testimonials (3-select: Have specific ones / Pull from Google / None yet — if specific, show textarea), photo notes (textarea).

**Step 7 — Website sections:** iOS-style toggles for: Hero (default ON), Services/menu (ON), About us (ON), Photo gallery (OFF), Contact form (ON), Google Map (ON), Testimonials (ON), Online booking (OFF — if ON show text input for booking link), Social feed embed (OFF), FAQ (OFF), Blog future (OFF), E-commerce (OFF — if ON show text input for platform). Smart defaults: pre-toggle based on business type selected in step 1.

**Step 8 — Social media:** platforms (multi-select chips: Instagram, Facebook, TikTok, LinkedIn), frequency (single-select: 3x/week standard, 5x/week pro), content types (multi-select chips: Promos, Tips & education, Behind the scenes, Seasonal, Customer reviews, Local area), approval process (single-select cards: Auto-post / WhatsApp approval / Dashboard review), avoid topics (text).

**Step 9 — Package:** 3 package cards (Starter $499/$199, Growth $799/$349 with "Most popular" badge, Pro $1299/$549), founding client toggle (when ON, show struck-through original prices with 50% calc), agreed setup fee (number, pre-filled), agreed monthly fee (number, pre-filled), payment method (3-select: Invoice / Card / Direct debit), start date (date input, default today).

**Step 10 — Review & export:** notes textarea, completed by (text). Below: scrollable markdown preview (mono font, light bg) showing the complete generated intake document. Two buttons: "Copy markdown" (copies to clipboard, shows toast) and "Download .md" (downloads as `Dorza_[BusinessName]_Intake.md`).

**Markdown output** must follow the exact template format from the questionnaire (tables for sections 1/2/4/5/6/9, numbered list for services, checklist for website sections).

**Validation:** Step 1 requires business name + owner name + phone. Step 3 requires at least 1 service. Step 9 requires package selection. All else optional. Show inline error under field on attempted next.

### 4. Pre-launch waitlist page (`/app/waitlist/page.tsx`)

Standalone page at `/waitlist`. Simpler than the onboarding form — this is for interested businesses to sign up before launch.

Centered layout, max-w-lg. "dorza" logo. Heading: "Get early access". Subheadline: "We're launching soon in Sydney. Be one of our first 20 founding clients and get 50% off setup." Form: name, email, phone, business type (dropdown), suburb, "What's your biggest frustration with your current online presence?" (textarea, optional). Submit button: "Join the waitlist →". On submit, POST JSON to `/api/waitlist` (same stub handler). Success state. Link back to homepage.

## Constraints

- One `npm install` at the start — no mid-build installs
- Dependencies: next, react, react-dom, tailwindcss, postcss, autoprefixer, lucide-react, @types/react, @types/node, typescript
- Google Fonts via next/font/google (DM_Sans + Fraunces)
- No external component libraries (no shadcn, no headless UI, no radix)
- No localStorage or sessionStorage — in-memory state only for the onboarding form
- All form state in a single useReducer
- generateMarkdown.ts as a pure function in /lib
- `/lib/api.ts` exports a `submitForm(endpoint: string, data: Record<string, any>)` helper that POSTs JSON and returns `{ success: boolean }`. Stub implementation logs to console + resolves success after 500ms delay. All forms (waitlist, contact, onboard export) use this single helper. We'll wire the real endpoints later.
- Commit after: (1) project scaffold + CLAUDE.md, (2) homepage, (3) onboarding form, (4) waitlist page
- Conventional commit messages
