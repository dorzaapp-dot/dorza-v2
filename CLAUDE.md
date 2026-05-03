# Dorza — Project Conventions

## Stack
- Next.js 14 (App Router) — static export configured in `next.config.mjs` (`output: 'export'`, `images.unoptimized: true`)
- Tailwind CSS v3 + custom theme in `tailwind.config.ts` (tokens mirrored in `app/globals.css` `:root`)
- TypeScript strict mode
- framer-motion for all motion (no CSS keyframes for elements already wrapped in framer-motion)
- Lucide React for icons
- Google Fonts via `next/font`: Plus Jakarta Sans (body 400/500/600/700) + Instrument Serif (display 400)

## Design tokens (current — terracotta + sage editorial palette)
- Primary (terracotta): `#D4845A` · light `#E8A87C` · dark `#B8673F` · tint `#FBEDE3` — buttons, CTAs, accents
- Accent (sage): `#6B8F71` · light `#A4C2A8` · dark `#4A6B4E` · tint `#E8EFE9` — eyebrow labels, secondary highlights
- Dark: `#1A1A2E` — headings, dark sections (WaitlistCTA), footer
- Surface: `#F9F7F5` · Warm: `#FDFAF7` · Border: `#F0EBE4`
- Text: primary `#1A1A2E` · secondary `#555` · muted `#888`
- Status: `#24CB71`
- Radius: `rounded-card` 20px · `rounded-btn` / `rounded-full` 999px · `rounded-sm` 8px
- Shadows: `shadow-soft` (1px hairline), `shadow-medium` / `shadow-card` (`0 12px 32px rgba(26,26,46,0.08)`)
- Easing: `ease-dorza` = `cubic-bezier(0.23, 1, 0.32, 1)` (also exported as `DORZA_EASE` from `components/motion/Reveal`)

## Component patterns
- All CTAs: pill-shaped (`rounded-full`), `h-12`, `bg-primary hover:bg-primary-dark text-white font-semibold text-sm`, hover `-translate-y-px hover:shadow-medium`
- Secondary buttons: `bg-white border border-border text-dark hover:bg-surface hover:border-[#E5DFD6]`
- Section spacing: `py-20 md:py-[7.5rem]` (use `md:py-[10rem]` for the dark waitlist section)
- Container: `<Container>` from `components/ui/Container` (max width 1200px, px-5)
- Cards: `bg-white border border-border rounded-card p-6` with `hover:shadow-medium hover:-translate-y-1 transition-all duration-500 ease-dorza`
- Headings: `font-display` (Instrument Serif), `text-dark`, tight tracking (`tracking-[-0.02em]` to `-0.03em`)
- Body: `font-body` (Plus Jakarta Sans), `text-text-secondary`, `leading-relaxed`
- Eyebrow label (recurring): `font-mono text-[11px] uppercase tracking-[0.18em] text-accent` — used above section headings
- Section heading (recurring): `font-display text-[44px] md:text-[60px] leading-[1.02] tracking-[-0.025em] text-dark`
- Always pair token changes in `tailwind.config.ts` with the matching CSS variable in `app/globals.css` `:root`

## Motion
- Wrap scroll-in content in `<Reveal>` (or `<Reveal stagger>`) from `components/motion/Reveal.tsx`. Default `y=24`, `duration=0.6`, `ease-dorza`, `viewport={{ once: true, margin: "-100px" }}`
- Use `<SlideReveal>` for horizontal slide-ins, `useCountUp(value, inView)` for animated number reveals
- Always honour `useReducedMotion()` — Hero and Reveal both do this
- Don't introduce CSS keyframe animations for elements already wrapped in framer-motion
- Available named keyframes (for non-framer cases): `float`, `marquee`, `pulse-ring`, `breathe`, `bounce-gentle`, `pulse-subtle`

## File conventions
- Section components in `components/sections/`, primitives in `components/ui/`, motion wrappers in `components/motion/`
- Step components for the intake wizard in `components/onboard/`, prefixed `Step`
- One component per file, PascalCase
- Pages in `app/`, use `page.tsx`
- Shared types in `lib/types.ts`
- All images in `public/images`
- No barrel exports, direct imports only

## Forms and data flow
- All form submissions go through `submitForm(endpoint, data)` in `lib/api.ts`
- The function is currently a stub (console.log + 500ms resolve). When wiring real submission, point at a third-party endpoint (Formspree, n8n webhook) — **Next.js API route handlers won't work because the app is a static export**. Don't change the function signature; many components call it.
- Controlled inputs only. Manual field-by-field validation (no validation library).

## SEO
- Every page needs metadata export with title, description, openGraph
- Use semantic HTML (main, section, article, nav, footer)
- All images need alt text
- Structured data (JSON-LD) for Organization in `app/layout.tsx`; LocalBusiness on homepage when added

## Build, run, deploy
- Dev: `npm run dev`
- Build: `npm run build` (produces static `out/` because of `output: 'export'`)
- Lint: `npm run lint`
- No tests configured
- Deploy: push to Vercel (no CI configured yet)

## Known gaps to be aware of
- `lib/api.ts` is a stub — see Forms section above
- Two onboarding routes exist (`/onboard` and `/onboarding`). The canonical one is `/onboard` (Tailwind + modular step components). `DorzaOnboarding.tsx` and `/onboarding` are an older alternate — do not add features to both.
- `components/Footer.tsx` and `components/Nav.tsx` at the top level are older duplicates; the homepage uses the ones in `components/sections/`
- Design tokens are duplicated in `tailwind.config.ts` and `app/globals.css` — change both together

## Client website builds (future)
- Each client site is a separate repo generated from templates in `/templates`
- Client intake markdown goes in the repo root as `intake.md`
- Claude Code reads `intake.md` + this file to build the site
- Always generate: sitemap.xml, robots.txt, JSON-LD LocalBusiness schema
- Default font pairings by business type:
  - Tradie: Inter + Cabinet Grotesk (clean/tough)
  - Cafe: DM Sans + Fraunces (warm)
  - Salon: Outfit + Playfair Display (elegant)
  - Fitness: Space Grotesk + Syne (bold)
  - Retail: DM Sans + Fraunces (friendly)
  - Professional: Inter + Newsreader (trustworthy)
- Default colour palettes by business type:
  - Tradie: navy `#1B2A4A` + orange `#E8742A`
  - Cafe: warm brown `#5C3D2E` + sage `#7A9E7E`
  - Salon: blush `#E8B4B8` + gold `#C4A35A`
  - Fitness: black `#1A1A1A` + lime `#A8D83A`
  - Retail: charcoal `#2D2D2D` + coral `#E8745A`
  - Professional: navy `#1A2744` + teal `#2A9D8F`
- Mobile-first, test at 375px width
- Lighthouse targets: Performance 90+, Accessibility 95+, SEO 95+
- Phone numbers must be clickable `tel:` links
- Google Maps embed on every contact section

## Prompt patterns for content generation
- When generating website copy, use the intake.md fields directly — don't invent details
- Headlines: short, benefit-driven, max 8 words
- Subheadlines: one sentence, conversational, mentions location
- Service descriptions: 2 sentences max, focus on outcome not process
- CTAs: action-oriented verbs ("Get a free quote", "Book now", "See our menu")

## Git
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Commit after each major component, not one giant commit

## When in doubt
- See `CODEBASE_INDEX.md` for the directory map and "task → location" guide
- For multi-file or cross-cutting changes, propose first, then implement
