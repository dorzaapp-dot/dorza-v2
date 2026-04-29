# Go Digital — Operational Runbook

## The Full Pipeline: Client Meeting → Everything Live

> **Target turnaround:** Website live in 24hrs. Google Business within 48hrs. Social media posting within 72hrs.
>
> **Your tools:** Intake app (tablet), Claude Code (terminal), AWS/Vercel (hosting), Cloudflare (DNS), Google Business Profile, Buffer (social scheduling), Claude API (content generation).

---

## Overview: The 7 Phases

```
PHASE 1 — The meeting (30 min)
    ↓
PHASE 2 — Domain & hosting setup (15 min)
    ↓
PHASE 3 — Website build (45 min hands-on, Claude Code does the work)
    ↓
PHASE 4 — Client review & go-live (same day)
    ↓
PHASE 5 — Google Business Profile (30 min, day 1-2)
    ↓
PHASE 6 — Social media setup & first content batch (45 min, day 2-3)
    ↓
PHASE 7 — Chatbot, monitoring & handoff (30 min, day 3-4)
```

**Total your time per client: ~3.5 hours across 4 days**
**Total client's time: ~40 minutes (meeting + review + approvals)**

---

---

## PHASE 1 — The Client Meeting

**Duration:** 20–30 minutes
**Location:** Their business (ideal) or video call
**Bring:** Tablet with intake app loaded, business card, one-page flyer

### Before you arrive

- [ ] Google the business — check if they have a website, Google listing, Instagram, Facebook
- [ ] Screenshot their current digital presence (or lack thereof) — useful for before/after case studies later
- [ ] Have the intake app open and ready on your tablet

### The conversation flow

**Open (2 min):** Small talk. Compliment something genuine about their business. Establish that you're local and understand their world.

**Pain (3 min):** Ask "How do customers usually find you?" and "Are you happy with how your business shows up online?" Let them talk. They'll tell you their frustration — no website, terrible website, never post on social, losing customers to competitors who show up on Google.

**Solution (3 min):** "What if I told you I could have a professional website live for you by tomorrow, your Google listing sorted, and social media posts going out every week — and you don't have to do anything? That's what we do."

**Demo (2 min):** Show them an example site on your tablet for a similar business type. "This is what we built for [example] last week. Yours would be customised to your brand."

**Intake (15 min):** "Let me grab a few details so we can get started." Open the intake app. Walk through the wizard together. This feels collaborative, not like a form. Tips:
- Take photos of their shopfront, interior, menu board, team while you're there
- Ask to see their Instagram/Facebook on their phone — note the handles
- Don't stress about getting every field — you can fill gaps from their existing online presence later

**Close (5 min):** Confirm the package. Explain founding client offer if applicable. "I'll have a draft website for you to look at by tonight / tomorrow morning. I'll send it via text. You tell me if you want any changes and we go live."

### Immediately after the meeting

- [ ] Export the completed markdown from the intake app
- [ ] Transfer any photos taken to your working folder
- [ ] Send client a confirmation text:

```
Hey [Name]! Great meeting you today. I'm getting started on
your website now — I'll send you a preview link by [time].
Talk soon! — [Your name], Go Digital
```

---

---

## PHASE 2 — Domain & Hosting Setup

**Duration:** 10–15 minutes
**When:** Immediately after the meeting, before starting the build

### 2A — Domain registration

**Option 1: Client has a domain already**
- Get their registrar login (GoDaddy, Crazy Domains, VentraIP, etc.)
- You'll point DNS to your hosting later — don't touch anything yet

**Option 2: Register a new domain (most common)**

Use Cloudflare Registrar (cheapest, no markup, includes DNS + SSL):

```bash
# Recommended domain format for local businesses:
# [businessname].com.au (preferred)
# [businessname]sydney.com.au (if taken)
# [businessname].com (fallback)
```

1. Go to https://dash.cloudflare.com → Registrar → Register domain
2. Search for the domain, register it (~$10-12/yr for .com.au)
3. Domain is now managed in Cloudflare with DNS ready to configure

**Store credentials in your client record:**
```
Domain: example.com.au
Registrar: Cloudflare
Account: your-godigital-cloudflare-account
Registered: [date]
Renewal: [date + 1yr]
```

### 2B — Hosting setup

**Option A: Vercel (simplest, recommended for starting out)**

```bash
# Install Vercel CLI if not already
npm i -g vercel

# You'll deploy later after the build — just noting the workflow here
# Each client site is a separate Vercel project under your Go Digital team account
```

Vercel free tier supports 100 deployments/day, custom domains, auto-SSL. Plenty for your first 50+ clients. Upgrade to Pro ($20/mo) when you hit limits.

**Option B: AWS S3 + CloudFront (cheaper at scale, more control)**

```bash
# Create S3 bucket for static hosting
aws s3 mb s3://[clientname]-godigital --region ap-southeast-2

# Enable static website hosting
aws s3 website s3://[clientname]-godigital \
  --index-document index.html \
  --error-document 404.html

# Create CloudFront distribution (use a reusable script)
# → See PHASE 2 automation prompt below
```

**Recommendation:** Start with Vercel. Move to AWS later when you want to optimise costs at 50+ clients. The Next.js static export works identically on both.

### 2C — DNS configuration (do this after deployment in Phase 4)

```
# In Cloudflare DNS dashboard for the domain:

# For Vercel:
Type: CNAME | Name: @ | Target: cname.vercel-dns.com
Type: CNAME | Name: www | Target: cname.vercel-dns.com

# For AWS CloudFront:
Type: CNAME | Name: @ | Target: [distribution-id].cloudfront.net
Type: CNAME | Name: www | Target: [distribution-id].cloudfront.net
```

---

---

## PHASE 3 — Website Build

**Duration:** 10 min setup + Claude Code does the rest (~20-40 min build time)
**When:** Same day as client meeting

### 3A — Prepare the build

```bash
# Create client workspace
mkdir -p ~/clients/[client-slug]
cd ~/clients/[client-slug]

# Save the intake markdown from the app
# (paste or copy the downloaded .md file)
cp ~/Downloads/GoDigital_[BusinessName]_Intake.md ./intake.md

# Create a photos directory and move client photos in
mkdir photos
# Move/copy photos from your phone transfer or camera roll
```

### 3B — Run the website build prompt

```bash
# Open Claude Code
claude

# Feed it the build prompt with the client intake data
```

In Claude Code, send the following (or reference the file):

```
I need you to read two files:

1. The website build prompt template: @GoDigital_ClaudeCode_BuildPrompt.md
2. The client intake data: @intake.md

Paste the intake data into the CLIENT BRIEF section of the build prompt,
then follow all the build instructions to create the full website.

Put the project in ./site/
```

Claude Code will now:
- Read the intake data
- Match the business type to design defaults
- Generate the colour palette, typography, and design system
- Scaffold the Next.js project
- Build every page and component
- Generate SEO metadata, structured data, sitemap
- Create placeholder chatbot widget
- Output a TODO list of remaining items

### 3C — Asset swap (5–10 min manual work)

While Claude Code builds, or immediately after:

1. **Logo:** If client provided one, drop it in `./site/public/images/logo.png`. If not, create a simple text-based logo using the business name + brand colours (Claude Code can do this too).

2. **Photos:** Replace placeholder images with client photos:
```bash
# Copy client photos into the site
cp ./photos/* ./site/public/images/

# Ask Claude Code to update the image references
```
In Claude Code:
```
Update all placeholder images in the site to use the actual client photos
in ./site/public/images/. Match photos to appropriate sections
(hero, gallery, about, services) based on the filenames and content.
```

3. **Review generated copy:** Quickly scan the homepage headline, service descriptions, and about section. The AI-generated copy is usually 90% there — tweak anything that doesn't sound like the client.

### 3D — Local preview

```bash
cd ./site
npm install
npm run dev

# Open http://localhost:3000 in browser
# Check: mobile view, desktop view, all links work, forms work
```

Quick QA checklist:
- [ ] Mobile responsive — looks good on phone-width
- [ ] Hero section — compelling headline, CTA buttons work
- [ ] Services — all listed correctly with descriptions
- [ ] Contact — phone number is clickable `tel:` link, map loads
- [ ] Footer — hours, address, social links all correct
- [ ] No placeholder text remaining (search for "TODO" or "Lorem")
- [ ] Page load feels fast

---

---

## PHASE 4 — Client Review & Go-Live

**Duration:** 15 min your time + waiting for client response
**When:** Same day or next morning

### 4A — Generate preview link

**Vercel (easiest):**
```bash
cd ./site
vercel

# Vercel gives you a preview URL like:
# https://site-abc123.vercel.app
# Send this to the client
```

**Alternative — use ngrok for quick local sharing:**
```bash
npm run dev &
ngrok http 3000
# Gives you a public URL to share
```

### 4B — Send to client for review

Text message (keep it simple and visual):

```
Hey [Name]! Your new website is ready for a look 🎉

Preview it here: [preview-url]

Have a look on your phone too — it's fully mobile-friendly.

Let me know if you'd like any changes to colours, wording,
or photos and I'll sort it straight away.

Once you're happy, I'll get it live on your domain today!
```

### 4C — Handle feedback

Common client feedback and how to action it:

| Client says | What to do |
|---|---|
| "Can we change the colour?" | Update Tailwind theme config, redeploy preview |
| "That photo isn't great" | Swap the image, redeploy |
| "Can you change the wording on X?" | Quick text edit in the component |
| "Love it, go live!" | → Proceed to deployment |
| "Can we add [feature]?" | If simple, add it. If complex, note for v2 |

For changes, tell Claude Code:
```
The client wants the following changes to the site:
1. [change 1]
2. [change 2]
Please make these updates.
```

### 4D — Deploy to production

**Vercel:**
```bash
cd ./site

# Build the static export
npm run build

# Deploy to production with custom domain
vercel --prod

# Add custom domain in Vercel dashboard:
# Settings → Domains → Add [client-domain.com.au]
```

**AWS S3:**
```bash
# Build static export
npm run build

# Sync to S3
aws s3 sync ./out s3://[clientname]-godigital --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id [DIST_ID] \
  --paths "/*"
```

### 4E — Configure DNS (if not done yet)

Go to Cloudflare dashboard → DNS for the client's domain → add the records from Phase 2C.

SSL is automatic with both Cloudflare + Vercel and Cloudflare + CloudFront.

### 4F — Verify everything is live

- [ ] https://[domain.com.au] loads correctly
- [ ] https://www.[domain.com.au] redirects to apex (or vice versa)
- [ ] SSL certificate is active (padlock shows in browser)
- [ ] All pages load, images appear, links work
- [ ] Mobile view works
- [ ] Contact form submits correctly (check Formspree dashboard)
- [ ] Google can crawl it: https://search.google.com/search-console → add property

### 4G — Notify client

```
Great news [Name] — your website is LIVE! 🚀

Check it out: https://[domain.com.au]

It's also showing up on Google already. Next up, I'm setting
up your Google Business profile and getting your social media
rolling — I'll keep you posted!
```

---

---

## PHASE 5 — Google Business Profile

**Duration:** 20–30 minutes
**When:** Day 1–2 (can run in parallel with website review)

### 5A — Check existing listing

Search Google for "[Business Name] [Suburb]" and check:
- Do they already have a Google Business listing?
- Is it claimed or unclaimed?
- Is the info accurate?

### 5B — Create or claim the listing

**If no listing exists:**

1. Go to https://business.google.com
2. Log in with the Go Digital management Google account (or create a dedicated one per client — better for handoff later)
3. Click "Add your business"
4. Fill in from the intake form:
   - Business name (exactly as the client uses it)
   - Business category (choose the most specific option)
   - Address
   - Service area (if they serve a region, not just one location)
   - Phone number
   - Website URL (their new domain!)

**If listing exists but unclaimed:**
1. Search for the business on Google
2. Click "Claim this business"
3. Verification options: phone call, postcard, email, or video
4. Phone/email verification is instant — always try this first

**If listing exists and is claimed by client:**
1. Ask client to add your Google account as a manager
2. Google Business → Settings → Managers → Add [your email]

### 5C — Optimise the profile

This is where most businesses leave money on the table. A fully optimised profile ranks significantly higher in local search.

**Essential setup (do immediately):**

```
Business description:
Write 750 characters using the intake form data. Include:
- What they do
- Where they're located
- What makes them different
- Key services
- Call to action
```

Use Claude to generate this:
```
Write a Google Business Profile description for [business name],
a [business type] in [suburb], Sydney. They specialise in
[services]. Their customers say [differentiator]. Keep it under
750 characters, natural tone, include the suburb name and key
services for SEO. No hashtags, no emojis, no ALL CAPS.
```

**Complete the profile:**
- [ ] Business hours (from intake form)
- [ ] Phone number (verified)
- [ ] Website URL (new site)
- [ ] Business description (AI-generated, reviewed)
- [ ] Business category — primary + 2-3 secondary categories
- [ ] Service area (if applicable)
- [ ] Upload 10+ photos: shopfront, interior, team, work/products, logo
- [ ] Add all services with descriptions
- [ ] Enable messaging (if client wants it)
- [ ] Add "From the business" section
- [ ] Set up booking link (if they have one)
- [ ] Add menu/services/products (depending on business type)

### 5D — Verification

Google may require verification before the listing goes fully live:

| Method | Timeline | Notes |
|---|---|---|
| Phone call | Instant | Preferred. Client gets a code via phone. |
| SMS | Instant | Same — code via text. |
| Email | Same day | Code sent to business email. |
| Postcard | 5–14 days | Last resort. Mailed to business address. |
| Video | 1–3 days | Record a video showing the storefront + signage. |

**Action after verification:**
```
[Name], your Google Business profile is now live! When someone
searches "[Business Name]" or "[service] in [suburb]" on Google,
your business shows up with your new website, phone number,
hours, and photos.

If any customers leave you a Google review, I'll make sure it's
responded to. Reviews are gold for local search ranking!
```

### 5E — Set up review management

- Enable Google review notifications to your Go Digital email
- For Growth/Pro clients: set up a review response workflow
  - Positive reviews: respond within 24hrs with a personalised thank-you
  - Negative reviews: flag to client immediately, draft a professional response together
- Create a review request template the client can share:

```
Thanks for choosing [Business Name]! If you had a great
experience, we'd love a quick Google review — it really
helps small businesses like ours.

[Google Review Link]
```

To get the direct review link:
1. Google Business → Home → "Get more reviews" → Copy link
2. Or construct it: `https://search.google.com/local/writereview?placeid=[PLACE_ID]`

---

---

## PHASE 6 — Social Media Setup & First Content Batch

**Duration:** 30–45 minutes
**When:** Day 2–3

### 6A — Account setup

**Instagram:**
- If client has existing account: get login credentials, convert to Business account if not already
- If creating new: use client's email, set up as Business account
  - Username: `@[businessname][suburb]` or `@[businessname]_sydney`
  - Profile photo: logo or shopfront
  - Bio: "[What they do] in [Suburb] 📍 [Key selling point] 👇 [CTA]"
  - Link in bio: new website URL
  - Contact buttons: phone + email + directions

**Facebook:**
- If client has existing page: get admin access
- If creating new: create Page under Go Digital's Facebook Business account
  - Page name: [Business Name]
  - Category: match Google Business category
  - Fill all "About" fields from intake form
  - Profile photo: logo
  - Cover photo: best shopfront/interior photo
  - CTA button: "Call Now" or "Book Now" or "Send Message"
  - Link to website

### 6B — Connect to Buffer (scheduling tool)

1. Log into Buffer (https://buffer.com) with Go Digital account
2. Connect client's Instagram Business account + Facebook Page
3. Set posting schedule:
   - Standard (3x/week): Tue 11am, Thu 5pm, Sat 10am
   - Pro (5x/week): Mon 11am, Tue 5pm, Wed 11am, Fri 5pm, Sat 10am
4. These times work well for Sydney local businesses — adjust based on the client's audience

### 6C — Generate the first 2 weeks of content

This is where the AI pipeline shines. Use Claude to batch-generate content.

Create a file called `content-brief.md`:

```markdown
# Social Media Content Brief

## Business
- Name: [from intake]
- Type: [from intake]
- Location: [suburb]
- Services: [from intake]
- Differentiator: [from intake]
- Tone: [from intake]
- Target customer: [from intake]

## Content requirements
- Platform: Instagram + Facebook
- Frequency: [3x or 5x] per week
- Duration: 2 weeks (generate [6 or 10] posts)
- Format: Mix of single image posts and carousel ideas
- Avoid: [from intake avoid topics]

## Content mix
Each batch should include a variety:
- 1-2x Service/product highlight (what they offer)
- 1-2x Behind the scenes / team / process
- 1x Customer tip or educational content
- 1x Local area / community content
- 1x Social proof (review, testimonial, before/after)
- 1x Promotional (offer, seasonal, CTA)

## Output format
For each post provide:
1. Post number and date (starting from [start date])
2. Caption (150-250 words, natural tone, include 1 CTA)
3. Hashtag set (15-20 hashtags: 5 broad, 5 niche, 5 local)
4. Image description (what photo/graphic to use)
5. Alt text for accessibility
```

Feed to Claude:
```bash
claude

# In Claude Code:
Read @content-brief.md and generate the full 2-week content
calendar. Output as a markdown file called content-calendar.md
with each post clearly separated.
```

### 6D — Create visuals

For each post, you need an image. Three approaches:

**1. Use client's own photos (best):**
- Shopfront, team, products, work in progress, happy customers
- Crop and optimise for Instagram (1080x1080 or 1080x1350)

**2. AI-generated graphics for tips/promos:**
Use Claude Code + a design template:
```
Create a set of Instagram post templates (1080x1080px) for
[Business Name] using their brand colours [colours] and tone.

Templates needed:
1. Service highlight (title + short description + CTA)
2. Customer tip (tip text + icon)
3. Review/testimonial quote
4. Promotional offer
5. "Did you know?" educational fact

Output as HTML files I can screenshot, or SVG files.
Use the brand fonts and colours from the website build.
```

**3. Canva templates (manual fallback):**
- Create a Canva Brand Kit with client's colours + fonts
- Duplicate and customise templates for each post type
- Save to a shared folder for future content batches

### 6E — Schedule the first batch

1. Open Buffer dashboard
2. For each post:
   - Upload the image
   - Paste the caption
   - Add hashtags (in first comment for Instagram, in post for Facebook)
   - Confirm the scheduled date/time
3. Do a final review — read every caption out loud. Does it sound like the business?

### 6F — Client approval (if required)

For "WhatsApp approval" clients:
```
Hey [Name]! I've got your first 2 weeks of social media posts
ready to go. Here's a preview of what we'll be posting:

[Screenshot of Buffer queue / or send each post as a WhatsApp image]

Happy for these to start going out, or any tweaks?
```

For "auto-post" clients:
```
Hey [Name]! Just a heads up — your social media is now live!
Your first post goes out [day]. I'll send you a weekly summary
of how things are performing. 📊
```

---

---

## PHASE 7 — Chatbot, Monitoring & Handoff

**Duration:** 20–30 minutes
**When:** Day 3–4

### 7A — Deploy customer service chatbot (Growth + Pro clients)

Use Claude API to create a business-specific chatbot.

**Step 1: Create the chatbot knowledge base**

Create a file `chatbot-context.md`:
```markdown
You are a helpful customer service assistant for [Business Name],
a [business type] located at [address], [suburb].

## Key information
- Phone: [phone]
- Email: [email]
- Opening hours: [hours]
- Website: [url]

## Services
[list all services from intake with descriptions and prices]

## Common questions
[generate 15-20 FAQs specific to this business type and their services]

## Booking
[if they have online booking: direct to booking link]
[if no online booking: suggest calling or messaging]

## Tone
[tone from intake]. You represent a local Sydney business.
Be helpful, concise, and friendly. If you can't answer
something, suggest the customer call [phone] during business
hours.

## Rules
- Never make up services or prices not listed above
- Never share information about other businesses
- Always offer to connect the customer with the team for complex queries
- Keep responses under 3 sentences where possible
```

**Step 2: Embed on the website**

Update the ChatWidget.tsx component in the client's site to connect to your chatbot API endpoint. The simplest approach:

```bash
# In Claude Code:
Update the ChatWidget.tsx in the client site to be a functional
chat widget that sends messages to our chatbot API endpoint at
[your-api-url]/chat. It should:
- Float in bottom-right corner
- Open on click with a friendly greeting
- Send messages and display responses
- Show business hours and phone number in the header
- Have a "Talk to a human" button that shows the phone number
```

**Step 3: Test the chatbot**
- Ask it about services, hours, location, pricing
- Ask it something it shouldn't know — confirm it deflects gracefully
- Test on mobile — chat widget should be usable on small screens

### 7B — Set up monitoring and alerts

**Website monitoring:**
- Add the site to UptimeRobot (free, checks every 5 min)
- Set up email/SMS alerts if the site goes down
- URL: https://[domain.com.au]

**Google Business monitoring:**
- Enable email notifications for new reviews
- Set up a weekly check to ensure listing info is still correct
- Monitor for Q&A submissions

**Social media monitoring:**
- Buffer sends weekly email summaries of post performance
- Check Instagram DMs and Facebook messages daily (or set up forwarding)
- For Pro clients: weekly analytics screenshot shared via WhatsApp

### 7C — Set up analytics

**Google Analytics 4:**
1. Go to https://analytics.google.com
2. Create a new property for the client
3. Get the measurement ID (G-XXXXXXXXXX)
4. Add to the site's layout.tsx:

```bash
# In Claude Code:
Add Google Analytics 4 tracking to the site with measurement
ID [G-XXXXXXXXXX]. Use the next/script component with
strategy="afterInteractive". Also add Google Search Console
verification meta tag: [verification-code].
```

5. Redeploy the site
6. Verify data is flowing in GA4 dashboard

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Add property → URL prefix → https://[domain.com.au]
3. Verify via DNS (add TXT record in Cloudflare) or HTML tag
4. Submit the sitemap: https://[domain.com.au]/sitemap.xml

### 7D — Client handoff

Send the client a "welcome pack" message:

```
Hey [Name]! Everything is now set up and running for
[Business Name]. Here's a summary of what's live:

✅ Website: https://[domain.com.au]
✅ Google Business: live and verified
✅ Instagram: @[handle] — posts scheduled
✅ Facebook: [page name] — posts scheduled
✅ Chatbot: live on your website

WHAT HAPPENS FROM HERE:
📱 Social media posts go out [3x/5x] per week — automated
📊 I'll send you a monthly performance report
💬 The chatbot handles common questions 24/7
⭐ I'll respond to Google reviews on your behalf
📞 Monthly check-in call to discuss what's working

YOUR PART:
📸 Send me new photos anytime (products, team, events)
💬 Let me know about specials, events, or seasonal promos
⭐ Encourage happy customers to leave Google reviews

If you ever need anything, just text me. I'm here to help!
```

---

---

## PHASE 8 — Ongoing Operations (Weekly/Monthly)

### Weekly tasks per client (15 min)

- [ ] Generate next week's social media content batch using Claude
- [ ] Review and schedule posts in Buffer
- [ ] Check and respond to Google reviews
- [ ] Monitor chatbot conversations for issues
- [ ] Check Instagram/Facebook DMs — respond or flag to client

### Monthly tasks per client (30 min)

- [ ] Generate monthly performance report:
  - Website: page views, top pages, traffic sources (from GA4)
  - Social: followers gained, engagement rate, top posts (from Buffer)
  - Google: search impressions, profile views, calls, directions (from GBP)
- [ ] Monthly check-in call/text with client (10 min)
- [ ] Review and refresh website content if needed
- [ ] Update Google Business with any new photos/services
- [ ] Adjust social media strategy based on what's performing

### Monthly report template

Use Claude to auto-generate from raw data:
```
Generate a client-friendly monthly performance report for
[Business Name], [Month Year].

Website (from GA4):
- Sessions: [X]
- Page views: [X]
- Top pages: [list]
- Traffic sources: [breakdown]

Social media (from Buffer):
- New followers: Instagram [X], Facebook [X]
- Posts published: [X]
- Total engagement: [X]
- Top performing post: [description]

Google Business (from GBP dashboard):
- Profile views: [X]
- Search appearances: [X]
- Phone calls: [X]
- Direction requests: [X]
- Website clicks: [X]
- New reviews: [X], average rating [X]

Format as a clean, simple summary with 3 key wins and
1 recommendation for next month. Keep it to 1 page.
Tone: professional but warm. End with a positive note.
```

---

---

## Quick Reference: Time Per Phase

| Phase | Your time | Calendar time | Blocking? |
|---|---|---|---|
| 1. Client meeting | 30 min | Day 0 | You + client |
| 2. Domain & hosting | 15 min | Day 0 | Just you |
| 3. Website build | 45 min | Day 0 | Claude Code does most |
| 4. Review & go-live | 15 min | Day 0–1 | Waiting on client |
| 5. Google Business | 30 min | Day 1–2 | May wait for verification |
| 6. Social media setup | 45 min | Day 2–3 | Just you |
| 7. Chatbot & handoff | 30 min | Day 3–4 | Just you |
| **Total** | **~3.5 hrs** | **~4 days** | |

**At 3.5 hours per client setup:**
- 1 client/day = 5 clients/week = 20 clients/month
- At Growth tier ($349/mo) = $6,980 MRR from one month of onboarding
- Your ongoing time per client after setup: ~1 hour/month

---

---

## Automation Targets (Build These Over Time)

As you scale past 20 clients, automate these manual steps:

| Task | Current | Automated via |
|---|---|---|
| Content generation | Prompt Claude manually | Cron job + Claude API → Buffer API |
| Social scheduling | Copy-paste into Buffer | API integration, auto-schedule |
| Review responses | Check manually, draft reply | Claude API monitors + drafts, you approve |
| Monthly reports | Pull data manually | GA4 API + Buffer API + GBP API → Claude → PDF |
| Website updates | Open code, edit, redeploy | Client dashboard → triggers rebuild |
| Chatbot tuning | Manual review of conversations | Auto-flag low-confidence responses for review |
| Invoicing | Manual | Stripe recurring billing, auto-invoice |

**The first 10 clients should be semi-manual.** Learn what works, refine the process, then automate. Premature automation locks in bad processes.

---

---

## Client Folder Structure

Keep every client organised the same way:

```
~/clients/
└── [client-slug]/
    ├── intake.md              # Completed questionnaire
    ├── site/                  # Next.js website source
    ├── photos/                # Raw client photos
    ├── content/
    │   ├── calendar-wk01.md   # Weekly content calendars
    │   ├── calendar-wk02.md
    │   └── ...
    ├── reports/
    │   ├── 2026-03-report.md  # Monthly reports
    │   └── ...
    ├── chatbot-context.md     # Chatbot knowledge base
    └── notes.md               # Ongoing notes, client preferences
```

---

---

## Checklist: Client #1

Your first client is the most important. Use this to make sure nothing falls through:

### Day 0 (Meeting day)
- [ ] Complete intake questionnaire via the app
- [ ] Take photos of the business (shopfront, interior, team, products)
- [ ] Confirm package and pricing
- [ ] Send confirmation text to client
- [ ] Register/confirm domain
- [ ] Run Claude Code website build
- [ ] Swap in real photos and review copy
- [ ] Send preview link to client

### Day 1
- [ ] Action any client feedback on preview
- [ ] Deploy to production, configure DNS
- [ ] Verify site is live on the real domain
- [ ] Send "you're live!" text to client
- [ ] Start Google Business setup
- [ ] Submit sitemap to Search Console

### Day 2
- [ ] Complete Google Business profile
- [ ] Initiate verification if needed
- [ ] Set up Instagram and Facebook accounts/access
- [ ] Connect accounts to Buffer
- [ ] Generate first 2 weeks of social content
- [ ] Create visuals for each post

### Day 3
- [ ] Schedule all posts in Buffer
- [ ] Get client approval if required
- [ ] Deploy chatbot on website
- [ ] Test chatbot thoroughly
- [ ] Set up analytics (GA4 + Search Console)
- [ ] Set up UptimeRobot monitoring

### Day 4
- [ ] Send client the full handoff message
- [ ] Verify first social post went out correctly
- [ ] Check Google Business listing is appearing in search
- [ ] Add client to your tracking spreadsheet
- [ ] Set reminder for first monthly check-in
- [ ] Celebrate — you've delivered! 🎉
