# Dorza — Brand Guidelines

> Last updated: March 2026 | This document governs all visual and written output for Dorza.

## Brand name

**dorza** — always lowercase. Never "Dorza" in body text (capitalise only at the start of a sentence or in formal legal contexts). Never "DORZA".

## Logo treatment

Text-based wordmark: "dorza" in Fraunces 700.
- The letters "d", "r", "z", "a" are #1A1A2E (dark)
- The letter "o" is #E8742A (orange)
- Minimum size: 18px in digital, 10pt in print
- Clear space: at least the width of the "o" on all sides
- No tagline lockup yet — used standalone

Usage:
- On white/light backgrounds: dark text + orange "o" (default)
- On dark backgrounds (#1A1A2E): white text + orange "o"
- Never place the logo on busy backgrounds or photos without a solid backing

## Colour palette

### Primary colours

| Name | Hex | Usage |
|------|-----|-------|
| Orange (primary) | `#E8742A` | Buttons, CTAs, accents, links, badges, the "o" in dorza |
| Orange dark | `#C45D1E` | Hover states on orange elements |
| Orange light | `#FFF0E5` | Light backgrounds, badge/pill backgrounds, highlights |
| Dark | `#1A1A2E` | Headings, nav, footer background, primary text |

### Neutral colours

| Name | Hex | Usage |
|------|-----|-------|
| Text primary | `#1A1A2E` | Headings, important body text |
| Text secondary | `#555555` | Body text, descriptions |
| Text muted | `#888888` | Captions, placeholders, meta text |
| Background | `#FFFFFF` | Main page background |
| Background warm | `#FDFAF7` | Alternating section backgrounds |
| Surface | `#F9F7F5` | Cards, input backgrounds on focus, code blocks |
| Border | `#F0EBE4` | Card borders, dividers, input borders |

### Colour usage rules

- Orange is an accent colour, not a background colour. Never use #E8742A as a full-section background.
- The warm off-white (#FDFAF7) alternates with white (#FFFFFF) between sections to create visual rhythm.
- Dark (#1A1A2E) is used sparingly for high-impact areas: nav, footer, hero badges.
- Never use pure black (#000000) for text. Always #1A1A2E.
- Never use pure grey backgrounds. Use the warm-tinted neutrals above.

## Typography

### Font families

| Role | Font | Weight | Source |
|------|------|--------|--------|
| Display / headings | Fraunces | 600, 700 | Google Fonts |
| Body / UI | DM Sans | 400, 500, 600 | Google Fonts |
| Code / monospace | System mono stack | 400 | Native |

### Type scale

| Element | Font | Size | Weight | Colour | Line height |
|---------|------|------|--------|--------|-------------|
| Hero headline | Fraunces | 48px (desktop), 32px (mobile) | 700 | #1A1A2E | 1.1 |
| Section heading | Fraunces | 36px (desktop), 28px (mobile) | 700 | #1A1A2E | 1.2 |
| Card heading | Fraunces | 20px | 600 | #1A1A2E | 1.3 |
| Body text | DM Sans | 16px | 400 | #555555 | 1.6 (relaxed) |
| Small text / captions | DM Sans | 14px | 400 | #888888 | 1.5 |
| Button text | DM Sans | 16px | 600 | #FFFFFF (on orange) | 1.0 |
| Badge / pill | DM Sans | 14px | 500 | #E8742A | 1.0 |
| Nav links | DM Sans | 15px | 500 | #1A1A2E | 1.0 |

### Typography rules

- Headings always use Fraunces. Body always uses DM Sans. Never mix.
- No all-caps except the logo in legal documents. Use sentence case everywhere.
- No italic text in headings. Italic is reserved for emphasis within body text, used sparingly.
- Minimum font size: 14px in digital. Never go below this for readability.

## Tone of voice

### Personality

Dorza speaks like a **confident, friendly tradesperson** — someone who knows their craft, explains things plainly, and doesn't oversell. We're the mate who happens to be really good at digital marketing.

### Tone attributes

| Attribute | What it means | Example |
|-----------|---------------|---------|
| Confident | We know what we're doing. No hedging. | "Your website will be live tomorrow." NOT "We'll try to get your website done as soon as possible." |
| Warm | Approachable, human, never corporate | "Let's get you sorted." NOT "We'd be delighted to assist with your requirements." |
| No-nonsense | Direct, clear, no jargon | "We handle your social media." NOT "We leverage AI-driven content orchestration." |
| Local | We're Sydney. We understand local business. | "Built for businesses on King St and beyond." NOT "Serving the global SMB market." |

### Writing do's and don'ts

**Do:**
- Use contractions (we'll, you'll, it's, don't)
- Address the reader as "you" and "your"
- Use specific, concrete language ("live in 24 hours" not "fast turnaround")
- Keep sentences short. One idea per sentence.
- Lead with the benefit, then explain how.

**Don't:**
- Use buzzwords: "leverage", "synergy", "disrupt", "ecosystem", "paradigm"
- Use AI jargon: "large language models", "agentic workflows", "prompt engineering"
- Overpromise: don't claim we'll 10x their revenue
- Use exclamation marks more than once per page
- Say "we're passionate about" anything

### Voice examples by context

**Homepage headline:** "Everything your business needs to go digital"
**Service description:** "We build you a professional, mobile-friendly website and get you listed on Google — fast. No tech skills needed."
**CTA button:** "Join the waitlist →" / "Get started" / "See how it works"
**Client text message:** "Hey Sarah! Your new website is ready for a look. Preview it here: [link]. Let me know if you'd like any changes."
**Error message:** "Something went wrong. Try again, or text us and we'll sort it out."

## Component design patterns

### Buttons

| Type | Style |
|------|-------|
| Primary | bg: #E8742A, text: white, height: 48px, radius: 10px, font-weight: 600, hover: #C45D1E |
| Secondary / ghost | bg: transparent, border: 1px solid #E0EBE4, text: #1A1A2E, hover: bg #F9F7F5 |
| Disabled | bg: #E0E0E0, text: #AAA, cursor: not-allowed |

### Cards

- Background: white (#FFFFFF)
- Border: 1px solid #F0EBE4
- Border radius: 12px
- Padding: 24px
- Hover: subtle shadow (0 2px 12px rgba(0,0,0,0.06)), transition 200ms
- No shadows in default/resting state

### Badges and pills

- Background: #FFF0E5
- Text: #E8742A
- Font: DM Sans 14px, weight 500
- Padding: 6px 16px
- Border radius: 20px (full pill)

### Form inputs

- Height: 48px
- Border: 1px solid #E0EBE4
- Border radius: 10px
- Background: white, focus: #F9F7F5
- Placeholder: #AAAAAA
- Font: DM Sans 16px
- Focus ring: 2px solid #E8742A (with 2px offset)

### Section layout

- Max content width: max-w-6xl (1152px) with mx-auto px-5
- Section vertical padding: py-20 desktop, py-14 mobile
- Alternating backgrounds: white → warm off-white → white
- Section headings centred with 16px subheading below in muted text

## Imagery direction

- No stock photos of people in suits shaking hands
- No generic "person on laptop" imagery
- Prefer: real Sydney streetscapes, shopfronts, local business environments
- Abstract geometric shapes (using brand colours) are preferred over photography for the Dorza site itself
- Client site photography should be real photos of the actual business wherever possible
- Fallback: high-quality stock that feels authentic and local, never corporate

## Social media brand application

- Profile photo: "d" lettermark in orange on dark circle, or full "dorza" wordmark
- Bio format: "We get Sydney businesses online. Website in 24hrs. Social on autopilot. [link]"
- Post aesthetic: clean, warm, plenty of whitespace. Orange accents. No busy templates.
- Hashtag style: #dorza #sydneybusiness #localdigital #godigital
