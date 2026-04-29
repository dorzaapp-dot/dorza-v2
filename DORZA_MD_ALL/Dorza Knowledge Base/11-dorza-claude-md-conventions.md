# Dorza — CLAUDE.md Conventions

> This is the content of the CLAUDE.md file that lives in the root of every Dorza code repository. It governs how Claude Code builds websites, generates content, and maintains code quality. Update this as conventions evolve.

---

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

## Client website builds
- Each client site is a separate repo generated from templates in /templates
- Client intake markdown goes in the repo root as intake.md
- Claude Code reads intake.md + this file to build the site
- Always generate: sitemap.xml, robots.txt, JSON-LD LocalBusiness schema
- Contact forms submit to our internal API (endpoint configured per client in env vars)
- Phone numbers must be clickable tel: links
- Google Maps embed on every contact section
- Mobile-first, test at 375px width
- Lighthouse targets: Performance 90+, Accessibility 95+, SEO 95+

## Default font pairings by business type
- Tradie: Inter + Cabinet Grotesk (clean/tough)
- Cafe: DM Sans + Fraunces (warm)
- Salon: Outfit + Playfair Display (elegant)
- Fitness: Space Grotesk + Syne (bold)
- Retail: DM Sans + Fraunces (friendly)
- Professional: Inter + Newsreader (trustworthy)

## Default colour palettes by business type
- Tradie: navy #1B2A4A + orange #E8742A
- Cafe: warm brown #5C3D2E + sage #7A9E7E
- Salon: blush #E8B4B8 + gold #C4A35A
- Fitness: black #1A1A1A + lime #A8D83A
- Retail: charcoal #2D2D2D + coral #E8745A
- Professional: navy #1A2744 + teal #2A9D8F

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

---

## How this file is used

1. **Dorza main site build:** The CLAUDE.md is created as part of the initial repo scaffold. Claude Code reads it before building any component.

2. **Client website builds:** When generating a client site, Claude Code reads both `CLAUDE.md` (for conventions) and `intake.md` (for client-specific data). The conventions ensure consistency across all client sites while allowing per-client customisation through the intake data.

3. **Ongoing maintenance:** When making changes to any site, Claude Code should read CLAUDE.md first to ensure edits follow established conventions.

## Updating conventions

When a convention changes (e.g., a new font pairing is added, a component pattern is refined), update both:
1. This knowledge base document (the reference)
2. The actual CLAUDE.md file in the repository (the working copy)

Keep them in sync. This knowledge base document is the canonical source.
