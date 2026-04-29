# Dorza — Operational Runbook

> Last updated: March 2026 | The full pipeline: client meeting → everything live.
> Target turnaround: Website live in 24hrs. Google Business within 48hrs. Social media posting within 72hrs.
> Total your time per client: ~3.5 hours across 4 days. Client's time: ~40 minutes.

## Phase overview

| Phase | Your time | Calendar day | What happens |
|-------|-----------|-------------|--------------|
| 1. Client meeting | 30 min | Day 0 | Intake form completed, photos taken, deal closed |
| 2. Domain & hosting | 15 min | Day 0 | Domain registered/configured, hosting project created |
| 3. Website build | 45 min | Day 0 | Claude Code generates site, you swap photos and review |
| 4. Client review & go-live | 15 min | Day 0–1 | Preview sent, feedback actioned, deployed to production |
| 5. Google Business | 30 min | Day 1–2 | Profile created/claimed, optimised, verification initiated |
| 6. Social media setup | 45 min | Day 2–3 | Accounts configured, 2 weeks of content generated and scheduled |
| 7. Chatbot & handoff | 30 min | Day 3–4 | Chatbot deployed, analytics set up, client handoff message sent |

---

## Phase 1 — Client meeting (30 min)

**Before arrival:**
- Google the business. Screenshot current digital presence.
- Open intake app on tablet.

**During meeting:**
- Follow the canvassing pitch (see sales-and-gtm.md).
- Walk through the intake wizard together. Collaborative, not interrogative.
- Take photos: shopfront, interior, team, products/menu.
- Confirm package and pricing.

**Immediately after:**
- Export intake markdown from app.
- Transfer photos to working folder.
- Send confirmation text within 10 minutes:

```
Hey [Name]! Great meeting you today. I'm getting started on
your website now — I'll send you a preview link by [time].
Talk soon! — Mahir, Dorza
```

---

## Phase 2 — Domain & hosting (15 min)

**Domain registration:**
- If client has existing domain: get registrar login, don't change DNS yet.
- If registering new: use Cloudflare Registrar (~$10-12/yr for .com.au).
- Naming convention: `[businessname].com.au` (preferred), `[businessname]sydney.com.au` (if taken), `[businessname].com` (fallback).

**Hosting setup (Vercel — recommended for now):**
```bash
# Each client is a separate Vercel project under Dorza team account
# Deployment happens in Phase 4 after the build
```

**DNS (configure after deployment in Phase 4):**
```
# Cloudflare DNS for Vercel:
CNAME | @ | cname.vercel-dns.com
CNAME | www | cname.vercel-dns.com
```

Store credentials in client folder: domain, registrar, account, registered date, renewal date.

---

## Phase 3 — Website build (45 min hands-on)

**Setup:**
```bash
mkdir -p ~/clients/[client-slug]
cd ~/clients/[client-slug]
cp ~/Downloads/Dorza_[BusinessName]_Intake.md ./intake.md
mkdir photos
# Move client photos into photos/
```

**Build:**
```bash
claude "Read @dorza-website-build-prompt.md and @intake.md — build the full site in ./site/"
```

Claude Code will scaffold the entire Next.js project, build all pages and components, generate SEO metadata, and create placeholder chatbot widget.

**While Claude Code builds (or immediately after):**
1. Drop client logo into `./site/public/images/logo.png`
2. Replace placeholder images with client photos
3. Quick review of AI-generated copy — headlines, service descriptions, about section

**Local preview:**
```bash
cd ./site && npm install && npm run dev
# Check: mobile view, desktop view, links, forms, no placeholder text remaining
```

**QA checklist:**
- [ ] Mobile responsive at 375px width
- [ ] Hero: compelling headline, CTA buttons work
- [ ] Services: all listed correctly
- [ ] Contact: phone is clickable tel: link, map loads
- [ ] Footer: hours, address, social links correct
- [ ] No "TODO" or "Lorem" text remaining
- [ ] Page loads fast

---

## Phase 4 — Client review & go-live (15 min + wait)

**Generate preview:**
```bash
cd ./site && vercel
# Gives a preview URL like https://site-abc123.vercel.app
```

**Send to client:**
```
Hey [Name]! Your new website is ready for a look 🎉
Preview: [url]
Have a look on your phone too. Let me know if you'd
like any changes and I'll sort it straight away.
Once you're happy, I'll get it live on your domain today!
```

**Handle feedback:** Common requests are colour tweaks, photo swaps, wording changes. Feed changes to Claude Code:
```
The client wants these changes: [list]. Please update.
```

**Deploy to production:**
```bash
vercel --prod
# Add custom domain in Vercel dashboard: Settings → Domains
```

**Configure DNS** in Cloudflare (CNAME records from Phase 2).

**Verify:**
- [ ] https://[domain] loads correctly
- [ ] SSL active (padlock in browser)
- [ ] All pages work, mobile works
- [ ] Contact form submits correctly

**Notify client:**
```
Great news [Name] — your website is LIVE! 🚀
Check it out: https://[domain]
Next up, I'm setting up your Google Business profile
and getting your social media rolling!
```

---

## Phase 5 — Google Business Profile (30 min)

**Check:** Search "[Business Name] [Suburb]" on Google. Does a listing exist? Claimed or unclaimed?

**Create or claim:**
1. Go to business.google.com
2. Create listing or claim existing
3. Fill all fields from intake data: name, category, address, service area, phone, website

**Optimise the profile (this is where most businesses leave money on the table):**
- [ ] Business description (750 chars — use Claude to generate from intake data)
- [ ] Hours (from intake)
- [ ] Phone + website
- [ ] Primary + 2–3 secondary categories
- [ ] Upload 10+ photos: shopfront, interior, team, products, logo
- [ ] Add all services with descriptions
- [ ] Enable messaging if client wants it

**Verification:** Phone/SMS preferred (instant). Email same-day. Postcard 5–14 days (last resort).

**Set up review management:**
- Generate direct review link from Google Business dashboard
- Create review request template for client:

```
Thanks for choosing [Business Name]! If you had a great
experience, we'd love a quick Google review — it really
helps small businesses like ours. [Review Link]
```

---

## Phase 6 — Social media setup & first content batch (45 min)

**Account setup:**
- Instagram: business account, username @[businessname][suburb] or @[businessname]_sydney, bio with location + CTA + website link
- Facebook: Page with all About fields filled, CTA button configured

**Connect to Buffer:**
- Connect Instagram + Facebook
- Set posting schedule: Tue 11am, Thu 5pm, Sat 10am (standard) or Mon–Sat (pro)

**Generate 2 weeks of content:**
Create content brief from intake data, feed to Claude:
```
Generate 2 weeks of social media content for [business].
[X] posts per week. Mix: service highlights, tips,
behind the scenes, local content, social proof, promos.
Output: caption + hashtags + image description for each.
```

**Create visuals:** Client photos (preferred), AI-generated graphics for tips/promos, or Canva templates.

**Schedule in Buffer:** Upload images, paste captions, confirm dates. Final read of every caption.

**Client notification:**
- WhatsApp approval clients: send preview of scheduled posts
- Auto-post clients: notify that posting has started

---

## Phase 7 — Chatbot, monitoring & handoff (30 min)

**Chatbot (Growth + Pro clients):**
1. Create knowledge base from intake data (services, hours, FAQs, booking info)
2. Deploy widget on website
3. Test: ask about services, hours, location, edge cases

**Analytics:**
- Google Analytics 4: create property, add measurement ID to site, redeploy
- Google Search Console: add property, verify via DNS, submit sitemap

**Monitoring:**
- Add site to UptimeRobot (free tier, checks every 5 min)

**Client handoff message:**
```
Hey [Name]! Everything is set up and running:

✅ Website: https://[domain]
✅ Google Business: live and verified
✅ Instagram: @[handle] — posts scheduled
✅ Facebook: [page] — posts scheduled
✅ Chatbot: live on your website

WHAT HAPPENS NOW:
📱 Social posts go out [3x/5x] per week
📊 Monthly performance report from me
💬 Chatbot handles common questions 24/7
⭐ I respond to Google reviews for you
📞 Monthly check-in call

YOUR PART:
📸 Send me new photos anytime
💬 Let me know about specials or events
⭐ Encourage happy customers to leave Google reviews

Text me anytime if you need anything!
```

---

## Client folder structure

```
~/clients/
└── [client-slug]/
    ├── intake.md
    ├── site/
    ├── photos/
    ├── content/
    │   ├── calendar-wk01.md
    │   └── ...
    ├── reports/
    ├── chatbot-context.md
    └── notes.md
```
