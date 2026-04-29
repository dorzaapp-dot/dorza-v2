# Dorza — Intake App Specification

> The client intake wizard app. Used internally on a tablet during client meetings. Outputs a filled markdown questionnaire ready to feed into Claude Code.

## Overview

- URL: `/onboard` (not linked from main nav — accessed directly)
- Framework: Next.js 14, App Router, Tailwind CSS, TypeScript
- State: Single `useReducer`, in-memory only (no localStorage/sessionStorage)
- Output: Markdown file matching the client intake template format
- Design: Dorza brand (orange #E8742A, dark #1A1A2E, DM Sans + Fraunces)

## 10-step wizard

### Step 1 — Business basics
- Business name (text, **required**)
- Owner name (text, **required**)
- Business type (button grid: Tradie, Cafe/Restaurant, Salon/Beauty, Fitness/Wellness, Retail, Professional Services, Other)
- If Other: custom type text input
- Niche (text, placeholder adapts to business type)
- ABN (text, optional)
- Street address (text)
- Suburb (text)
- Phone (tel, **required**)
- Email (email)
- Opening hours (textarea, 3 rows)

### Step 2 — Digital presence
- Website URL (text, placeholder "https://... or none")
- Google Business (3-toggle: Yes / No / Not sure)
- Instagram handle (text)
- Facebook page (text)
- Other platforms (text)
- Biggest frustration (textarea, 3 rows)

### Step 3 — Services
- Dynamic list of text inputs (start with 4, add/remove, max 10, **min 1 required**)
- Differentiator (textarea, 3 rows)
- Price range (text, optional)

### Step 4 — Target customers
- Typical customer (text)
- Service area (text)
- Discovery channels (multi-select chips: Word of mouth, Google Search, Instagram, Facebook, Walk-ins, Referrals, Other)

### Step 5 — Brand & style
- Has logo (toggle: Yes / No)
- Brand colours (text)
- Tone (single-select cards with descriptions):
  - Casual & friendly — "Relaxed, approachable, like chatting with a mate"
  - Professional & clean — "Trustworthy, polished, no-nonsense"
  - Bold & energetic — "High-energy, confident, stands out"
  - Warm & welcoming — "Inviting, personal, community-focused"
- Inspiration sites (textarea, 2 rows)
- Brand keywords (text)

### Step 6 — Photos & assets
- Logo status (3-select: Received / Client will send / No logo)
- Photos status (4-select: Received / Client will send / Use stock / Pull from Instagram)
- Menu/service doc (3-select: Received / Client will send / N/A)
- Testimonials (3-select: Have specific ones / Pull from Google / None yet)
  - If "Have specific ones": show textarea
- Photo notes (textarea, 2 rows)

### Step 7 — Website sections
iOS-style toggles. Smart defaults pre-set by business type from Step 1.

| Section | Tradie | Cafe | Salon | Fitness | Retail | Professional |
|---------|--------|------|-------|---------|--------|-------------|
| Hero | ON | ON | ON | ON | ON | ON |
| Services/menu | ON | ON | ON | ON | ON | ON |
| About us | OFF | ON | ON | ON | ON | ON |
| Photo gallery | OFF | ON | ON | OFF | ON | OFF |
| Contact form | ON | ON | ON | ON | ON | ON |
| Google Map | ON | ON | ON | ON | ON | ON |
| Testimonials | ON | ON | ON | ON | OFF | ON |
| Online booking | OFF | OFF | ON | OFF | OFF | OFF |
| Social feed | OFF | OFF | OFF | OFF | OFF | OFF |
| FAQ | ON | OFF | OFF | OFF | OFF | ON |
| Blog | OFF | OFF | OFF | OFF | OFF | OFF |
| E-commerce | OFF | OFF | OFF | OFF | OFF | OFF |

If Online booking toggled ON: show text input "Booking platform / link"
If E-commerce toggled ON: show text input "Platform / link"

### Step 8 — Social media
- Platforms (multi-select chips: Instagram, Facebook, TikTok, LinkedIn)
- Frequency (single-select: 3x/week standard / 5x/week pro)
- Content types (multi-select chips: Promos, Tips & education, Behind the scenes, Seasonal, Customer reviews, Local area)
- Approval process (single-select cards: Auto-post / WhatsApp approval / Dashboard review)
- Avoid topics (text)

### Step 9 — Package
- 3 package cards (tap to select, **required**):
  - Starter: $499 setup / $199/mo
  - Growth: $799 setup / $349/mo (badge: "Most popular")
  - Pro: $1,299 setup / $549/mo
- Founding client toggle (yes/no)
  - When ON: show struck-through prices with 50% discounts
- Setup fee agreed (number, pre-filled from package + founding toggle, editable)
- Monthly fee agreed (number, pre-filled, editable)
- Payment method (3-select: Invoice / Card / Direct debit)
- Start date (date input, default today)

### Step 10 — Review & export
- Notes (textarea, 5 rows)
- Completed by (text)
- Scrollable markdown preview (monospace, #F9F7F5 bg, max-height 400px)
- "Copy markdown" button → clipboard + toast "Copied!"
- "Download .md" button → file named `Dorza_[BusinessName]_Intake.md`

## Validation

| Step | Required fields |
|------|----------------|
| 1 | Business name, owner name, phone |
| 3 | At least 1 service |
| 9 | Package selected |
| All others | No required fields |

Show inline error under the field (red text, 13px) on attempted next. Never block backward navigation.

## State shape

```typescript
type IntakeState = {
  businessName: string; ownerName: string; businessType: string;
  customBusinessType: string; niche: string; abn: string;
  address: string; suburb: string; phone: string; email: string; hours: string;
  websiteUrl: string; googleBusiness: string; instagram: string;
  facebook: string; otherPlatforms: string; frustration: string;
  services: string[]; differentiator: string; priceRange: string;
  typicalCustomer: string; serviceArea: string; discoveryChannels: string[];
  hasLogo: boolean; brandColours: string; tone: string;
  inspirationSites: string; brandKeywords: string;
  logoFileStatus: string; photosStatus: string; menuStatus: string;
  testimonialsStatus: string; testimonialsList: string; photoNotes: string;
  sections: Record<string, boolean>; bookingPlatform: string; ecommercePlatform: string;
  socialPlatforms: string[]; postFrequency: string; contentTypes: string[];
  approvalProcess: string; avoidTopics: string;
  selectedPackage: string; foundingClient: boolean;
  setupFee: number; monthlyFee: number; paymentMethod: string; startDate: string;
  notes: string; completedBy: string;
}
```

## Markdown generation

`/lib/generateMarkdown.ts` — pure function mapping state to the exact intake template format. Tables for sections 1/2/4/5/6/9. Numbered list for services. Checklist with `[x]`/`[ ]` for website sections. Multi-select fields joined with ", ".
