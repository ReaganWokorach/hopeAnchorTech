# HopeAnchor Tech — Official Website

> *"Faith without works is dead." — James 2:17*

A professional, fully responsive multi-page website for **HopeAnchor Tech**, a faith-driven social enterprise based in **Gulu, Northern Uganda**, empowering the community through technology training and professional services.

---

## Live Site

> Deployed at: **[https://hopeanchortech.netlify.app](https://hopeanchortech.netlify.app)**
> *(Update this URL after your first Netlify deployment)*

---

## Project Structure

```
hopeanchor-tech/
├── index.html        # Home / Landing page
├── about.html        # About — story, mission, founder
├── services.html     # Services — Bureau + Technical
├── training.html     # Training — all courses + FAQ
├── contact.html      # Contact — Netlify form
├── 404.html          # Custom 404 error page
├── style.css         # Full custom stylesheet
├── script.js         # JS — nav, scroll, form validation
├── netlify.toml      # Netlify config, headers, redirects
└── README.md         # This file
```

---

## Deploying to Netlify

### Option 1 — Drag & Drop (Fastest)
1. Zip all files in this folder
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag the zip onto the Netlify dashboard
4. Your site is live instantly 

### Option 2 — GitHub + Netlify (Recommended for ongoing updates)

**Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit — HopeAnchor Tech website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hopeanchor-tech.git
git push -u origin main
```

**Step 2: Connect to Netlify**
1. Log in to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site" → "Import an existing project"**
3. Choose **GitHub** and select your `hopeanchor-tech` repository
4. Build settings:
   - **Build command:** *(leave blank — static site)*
   - **Publish directory:** `.`
5. Click **"Deploy site"**

**Step 3: Custom Domain (Optional)**
- In Netlify dashboard → **Domain settings → Add custom domain**
- Enter `hopeanchortech.ug` (or your preferred domain)
- Follow DNS configuration instructions

### Automatic Deploys
Once connected to GitHub, every `git push` to `main` will automatically redeploy your site. No manual steps needed.

---

## Pages

| Page | URL | Description |
|---|---|---|
| Home | `/` | Hero, services overview, testimonials, CTA |
| About | `/about.html` | Story, mission/vision/values, founder, social model |
| Services | `/services.html` | Business Bureau + Technical Services |
| Training | `/training.html` | All 4 courses with full curricula + FAQ |
| Contact | `/contact.html` | Netlify-powered contact & enrolment form |
| 404 | `/404.html` | Custom error page |

---

## Netlify Forms

The contact form on `contact.html` uses **Netlify Forms** — no backend required.

- Form submissions appear in your **Netlify dashboard → Forms**
- To enable **email notifications**: Netlify dashboard → Forms → your form → **Form notifications → Add notification → Email**
- The honeypot field (`bot-field`) is included to prevent spam

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--navy` | `#0D1F3C` | Primary brand colour |
| `--teal` | `#00A99D` | Accent / CTA |
| `--gold` | `#F5A623` | Hope accent / highlights |
| `--white` | `#FFFFFF` | Backgrounds |
| Font (Display) | Playfair Display | Headings |
| Font (Body) | DM Sans | Body text |

---

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — No frameworks, no dependencies
- **Google Fonts** — Playfair Display + DM Sans
- **Netlify** — Hosting + Forms (no backend needed)

---

## Customisation Checklist

Before going live, update the following:

- [ ] Phone number: replace `+256 776 815217` in all HTML files
- [ ] Email: replace `wokorachreagan5030@gmail.com` with your real address
- [ ] Location: update exact address in `contact.html` and footer
- [ ] Testimonials: replace sample names/quotes with real ones
- [ ] Netlify site URL: update the Live Site link above
- [ ] Add a `favicon.ico` to the root folder
- [ ] (Optional) Add real photos to replace initials-based avatars

---

## Author

**Reagan Wokorach**
Founder & CEO, HopeAnchor Tech
Gulu Municipality, Northern Uganda 🇺🇬

---

## License

© 2025 HopeAnchor Tech. All rights reserved.
*Built with faith & purpose in Gulu, Uganda.*
