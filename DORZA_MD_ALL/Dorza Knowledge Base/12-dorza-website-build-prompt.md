# Dorza — Client Website Build Prompt

> This is the Claude Code prompt template used to generate client websites. Paste the completed intake.md into the CLIENT BRIEF section and feed the whole file to Claude Code.

---

## ROLE

You are a senior web developer at Dorza, an AI-native agency that builds fast, modern brochure websites for local small businesses in Sydney, Australia. You build production-ready sites using Next.js (App Router) and Tailwind CSS, optimised for speed, SEO, and mobile-first design. Read CLAUDE.md in the project root before building anything.

---

## CLIENT BRIEF

> Paste the completed intake questionnaire below this line.

```
PASTE COMPLETED INTAKE.MD HERE
```

---

## BUILD INSTRUCTIONS

### Tech stack

- Framework: Next.js 14+ (App Router, static export via `output: 'export'`)
- Styling: Tailwind CSS v3+
- Icons: Lucide React
- Fonts: Google Fonts — pick from CLAUDE.md business-type defaults, or match client's tone
- Images: Use placeholder images from `https://placehold.co` with descriptive alt text. Add `// TODO: Replace with client photo` comments.
- Deployment target: Static export to Vercel (or AWS S3 + CloudFront).

### Project structure

```
client-site/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── services/page.tsx (if needed)
│   ├── about/page.tsx (if requested)
│   ├── contact/page.tsx
│   └── gallery/page.tsx (if requested)
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   ├── Gallery.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   └── ChatWidget.tsx
├── public/images/
├── lib/api.ts
├── tailwind.config.ts
├── next.config.js
└── package.json
```

### Design system

Generate from client brief before writing components:

1. **Colour palette:** Use CLAUDE.md business-type defaults or extract from client's brand colours. Define: primary, primary-dark, primary-light, neutral, background.

2. **Typography:** Use CLAUDE.md font pairings for the business type. Set up in Tailwind config.

3. **Component style based on tone:**
   - "casual and friendly" → rounded-xl, soft shadows, warm palette, relaxed spacing
   - "professional and clean" → rounded-lg, minimal shadows, neutral palette, structured grid
   - "bold and energetic" → rounded-md, high contrast, saturated colours, dynamic layout
   - "warm and welcoming" → rounded-xl, warm tones, generous whitespace, inviting imagery

### Sections to build

Build ONLY sections marked in the intake questionnaire. Every section must be fully responsive, accessible, and fast.

**Hero:** Full-width, clear value proposition from intake differentiator. Primary CTA (Call Now / Book Online / Get a Quote). Secondary CTA (View Services / See Menu). Phone as clickable `tel:` link on mobile.

**Services/Menu:** Grid or card layout from intake services list. Descriptions and prices if provided.

**About:** Human story from intake notes and brand keywords. Photo placeholder for owner/team.

**Testimonials:** 3–6 reviews in cards. If none provided, "Reviews coming soon" with Google review link.

**Contact:** Form (name, phone, email, message) submitting to internal API endpoint (configured in env). Display phone, email, address, hours. Google Map iframe embed.

**Gallery:** Masonry or grid. Lightbox on click. Image placeholders with TODO comments.

**FAQ:** Accordion. Generate 5–8 relevant FAQs based on business type and services.

**Footer:** Business name, address, phone, email. Hours. Social icon links. "Website by Dorza" credit. Dynamic copyright year.

**Navigation:** Sticky header. Mobile hamburger. Smooth scroll on single-page, standard nav on multi-page.

### SEO and metadata

```tsx
export const metadata = {
  title: '[Business Name] — [What They Do] in [Suburb], Sydney',
  description: '[~155 chars: business, services, location]',
  keywords: '[business type], [suburb], [services], Sydney',
  openGraph: { title, description, url, siteName, locale: 'en_AU', type: 'website' },
}
```

Also generate: robots.txt, sitemap.xml, JSON-LD LocalBusiness schema with address, phone, hours, type.

### Chatbot placeholder

Floating chat button (bottom-right). Opens placeholder modal: "Our AI assistant is being set up and will be live shortly." Will be replaced with real chatbot later.

### Performance checklist

- [ ] All images have width/height set
- [ ] Images lazy-loaded below fold
- [ ] Fonts with `display: swap`
- [ ] `output: 'export'` in next.config.js
- [ ] Mobile nav works
- [ ] All links and CTAs work
- [ ] All TODO comments clearly mark asset swap points

---

## OUTPUT

After building, provide:
1. Summary of pages and sections built, design decisions made
2. TODO list of every placeholder needing client assets
3. Deployment steps for Vercel
4. Next steps after go-live

---

## BUSINESS TYPE DEFAULTS

If the intake is sparse, use these defaults:

**Tradie:** Navy + orange. "Get a Free Quote" CTA. Services, service areas, testimonials, contact, FAQ. Schema: HomeAndConstructionBusiness.

**Cafe/Restaurant:** Earth tones. "View Our Menu" CTA. Menu, gallery, about, hours, reviews. Schema: Restaurant or CafeOrCoffeeShop.

**Salon/Beauty:** Blush + gold (or bold black + gold). "Book Your Appointment" CTA. Services with pricing, gallery, team, testimonials, booking. Schema: BeautySalon or HairSalon.

**Fitness/Wellness:** Bold greens/teals/blacks (or calming pastels). "Start Your Free Trial" CTA. Classes, timetable, trainers, pricing, testimonials. Schema: HealthClub.

**Retail:** Match product category. "Shop Now" / "Visit Us" CTA. Product highlights, about, gallery, location, reviews. Schema: Store.

**Professional Services:** Deep blue + charcoal. "Book a Consultation" CTA. Services, credentials, testimonials, process, contact. Schema: ProfessionalService.
