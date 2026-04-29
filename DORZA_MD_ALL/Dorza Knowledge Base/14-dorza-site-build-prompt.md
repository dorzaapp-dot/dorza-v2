# Dorza — Site Build Prompt (Opus-Optimised)

> This is the exact prompt to feed to Claude Code to build the Dorza marketing site, onboarding form, and waitlist page. Copy the entire contents below into Claude Code connected to the dorza-site GitHub repo.
>
> Run with: `claude "Read @Dorza_ClaudeCode_Build.md and execute the full build. No questions — build everything in a single pass."`

---

# Dorza — Initial Build

## Context

Dorza is an AI-native digital agency for Sydney local businesses. We build websites, manage social media, set up Google Business profiles, and deploy chatbots — all done-for-you, powered by AI automation. Target: tradies, cafes, salons, fitness studios, retail, professional services. Brand colour: `#E8742A` (warm orange). Dark: `#1A1A2E`. Tone: confident, warm, no-nonsense.

## Task

Build in a single pass. No questions. Commit directly. Use Next.js 14 App Router + Tailwind CSS + TypeScript. Static export (`output: 'export'`).

Create these 4 things:

### 1. CLAUDE.md (project root)

Contents defined in `dorza-claude-md-conventions.md` knowledge base document.

### 2. Homepage (`/app/page.tsx`)

Single-page marketing site. Sections:

**Nav:** Sticky. "dorza" wordmark (lowercase Fraunces 700, "o" is orange). Links: Services, How it works, Pricing → scroll anchors. Right: "Join the waitlist" button → #waitlist. Mobile hamburger.

**Hero:** Left-aligned 60/40 split (text / decorative abstract shape, NOT image). Badge pill: "Up and running in days, not months". Headline (Fraunces 700, ~48px): "Everything your business needs to go digital". Subheadline (DM Sans, #555): "We build your website, run your social media, and get you found on Google — so you can focus on what you do best." CTAs: "Join the waitlist →" (orange) + "See how it works" (ghost). Trust line: "Built for Sydney small businesses · No lock-in contracts · Live in 24 hours".

**Services** (`#services`): "What we do for you". 2×2 card grid:
1. Business website — live in 24 hours (Globe icon, "Most popular" badge). Bullets: Custom-designed website, Google Business setup, Mobile-optimised & SEO-ready, Live within 24 hours.
2. Social media on autopilot (Share2 icon). Bullets: Profile setup & branding, AI-generated content calendar, Automated posting, Performance tracking.
3. Research & strategy (TrendingUp icon). Bullets: Competitor analysis, Market opportunity mapping, Tailored marketing plan, Ongoing trend monitoring.
4. AI agents at your disposal (Bot icon, "New" badge). Bullets: On-demand marketing help, Content creation & copywriting, Campaign management, Always learning your business.

**How it works** (`#how-it-works`): 4-step horizontal timeline (vertical on mobile):
1. "Tell us about your business" / "Fill out a quick form. 5 minutes."
2. "We build everything" / "Website, socials, Google — done in 24-48 hours."
3. "You review and approve" / "We send you a preview. You say go."
4. "Sit back, we run it" / "Posts go out, enquiries get answered, you grow."

**Pricing** (`#pricing`): 3 cards:
- Starter: $499/$199mo. Custom website, Google Business, Mobile-optimised, Basic analytics.
- Growth (orange border, "Most popular"): $799/$349mo. + Social 3x/wk, Chatbot, Review management, Monthly report.
- Pro: $1,299/$549mo. + Social 5x/wk, Ad campaigns, Strategy call, Priority support.
Below: "All plans include a founding client offer — 50% off setup for our first 20 clients."

**Waitlist** (`#waitlist`): Centered. "Get in before we launch" / "We're onboarding our first 20 founding clients in Sydney." Form: name, email, business type dropdown, suburb. Submit → POST JSON to `/api/waitlist` (stub in `/lib/api.ts` that logs + returns success). Success: "You're on the list!"

**Footer:** Dark bg. Logo + "The AI-powered agency for local business." Links. hello@dorza.com.au. Social icons (placeholder hrefs). © 2026 Dorza. Sydney, Australia.

### 3. Onboarding form (`/app/onboard/page.tsx`)

10-step wizard at `/onboard`. Internal tool, not linked from nav. Full specification in `dorza-intake-app-spec.md`. Use `useReducer`. Components in `/components/onboard/`. Fixed bottom nav. Progress dots. "dorza" logo top-left.

### 4. Pre-launch waitlist (`/app/waitlist/page.tsx`)

Standalone at `/waitlist`. Centered, max-w-lg. "dorza" logo. "Get early access" / "We're launching soon in Sydney. Be one of our first 20 founding clients and get 50% off setup." Form: name, email, phone, business type dropdown, suburb, frustration textarea (optional). Submit → POST JSON to `/api/waitlist` (same stub). Success state. Link home.

## Constraints

- One `npm install` — no mid-build installs
- Dependencies: next, react, react-dom, tailwindcss, postcss, autoprefixer, lucide-react, @types/react, @types/node, typescript
- Google Fonts via next/font/google (DM_Sans + Fraunces)
- No external component libraries
- In-memory state only (no localStorage/sessionStorage)
- `/lib/api.ts` exports `submitForm(endpoint, data)` — stub: logs to console, resolves success after 500ms. All forms use this.
- `/lib/generateMarkdown.ts` — pure function: intake state → markdown string
- Commits: (1) scaffold + CLAUDE.md, (2) homepage, (3) onboarding form, (4) waitlist
- Conventional commits: feat:, fix:, chore:, docs:
