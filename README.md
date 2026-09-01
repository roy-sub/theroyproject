# Subhradip Roy — portfolio site

A plain multi-page static site (HTML/CSS/vanilla JS, no build step, no
framework) rebuilt from the Claude Design prototype in `../project/`. See
`../chats/chat1.md` for the design intent this implements.

## Structure

```
site/
├── index.html              Home
├── about.html               About
├── contact.html              Contact
├── dump.html                  Dump (photo/music page)
├── work/
│   ├── index.html            Work — sticky-left / scrolling-right list
│   ├── raceos.html            Project detail
│   ├── sora.html               Project detail
│   └── appeal.html              Project detail
├── journal/
│   ├── index.html              Journal — post list (EN/DE), auto-generated between BUILD:POSTS markers
│   ├── template.html            Manual-fallback post template (bilingual) — see journal-guide.md
│   ├── build.py                  Generates journal/posts/*.html from journal/posts-md/*.md
│   ├── posts-md/                 Write your blog posts here, as Markdown — see journal-guide.md
│   │   ├── 2026-06-18-agents-are-loops-with-good-taste.md
│   │   ├── 2026-05-02-evals-before-models.md
│   │   └── 2026-03-21-the-freelance-stack-i-actually-use.md
│   └── posts/                    Generated HTML — do not hand-edit, edit posts-md/ and rerun build.py
│       ├── 2026-06-18-agents-are-loops-with-good-taste.html
│       ├── 2026-05-02-evals-before-models.html
│       └── 2026-03-21-the-freelance-stack-i-actually-use.html
├── css/style.css              One shared stylesheet, all pages
├── js/
│   ├── main.js                 Clock, decode headings, reveal-on-scroll, counters, work scrollspy, dump player
│   └── i18n.js                  EN/DE dictionary + toggle
├── images/                      See IMAGES.md for every slot + required dimensions
├── favicon.png
├── IMAGES.md
└── journal-guide.md            How to add or delete a blog post
```

### Language toggle scope

EN/DE is wired site-wide, including every individual journal post
(`journal/posts/*.html`) — every post is written and generated in both
languages. Chrome (nav, buttons, footer, the post title/lede/read-time) is
translated the same way as the rest of the site, via the `data-i18n`
dictionary in `js/i18n.js`. A post's actual body (the paragraphs) is
handled differently on purpose: `journal/build.py` writes out both the
English and German body once each per post, and CSS shows/hides whichever
one matches `<html lang="…">` — see the comment at the top of
`js/i18n.js` for why (keeping full post text out of the shared,
site-wide dictionary keeps every other page's payload small). See
`journal-guide.md` for how to write a post in both languages.

### Adding or deleting a journal post

Full walkthrough: **`journal-guide.md`**. Short version — write a Markdown
file in `journal/posts-md/`, then run:

```bash
python3 journal/build.py
```

This generates the post's HTML page and updates the Journal list on
`journal/index.html` in one step. Delete a post the same way, in
reverse: remove its `.md` file from `journal/posts-md/`, run the same
command — the generated page and its listing row both disappear.

## Test locally

No build step — any static file server works. From this `site/` folder:

```bash
python3 -m http.server 8000
# or: npx serve .
```

Then open `http://localhost:8000`. Check:
- Every nav link and footer link across all pages
- The EN/DE toggle (persists via `localStorage`, so reload to confirm)
- The Work page's independently-scrolling right column
- Reduced-motion: enable "prefers-reduced-motion" in devtools and confirm
  headings/counters render instantly instead of animating

## Deploy to Hostinger

This is a static site — no Node/PHP/database needed, so it works on any
Hostinger shared-hosting plan.

1. **Zip the contents of `site/`** (not the `site` folder itself — the zip
   root should contain `index.html` directly), or connect via FTP/SFTP.
2. In **hPanel → Files → File Manager** (or an FTP client like FileZilla
   using the credentials under hPanel → Files → FTP Accounts), open
   `public_html/` for your domain.
3. Clear out any placeholder `index.html` Hostinger put there by default,
   then upload everything from `site/` into `public_html/` so `index.html`
   sits at the domain root (`public_html/index.html`,
   `public_html/css/style.css`, `public_html/work/index.html`, etc.).
4. Visit your domain — it should load immediately, no further
   configuration needed. If you added a domain to Hostinger recently, DNS
   propagation can take up to ~24h before it resolves.
5. **HTTPS:** hPanel → Websites → your domain → SSL — Hostinger issues a
   free Let's Encrypt certificate; turn on "Force HTTPS" once it's active.

### Before you go live

- Replace the placeholder images under `images/` with real photos — see
  `IMAGES.md` for the exact dimensions each slot needs.
- Update the 5 placeholder client logos in `images/home/logos/`.
- Double-check `mailto:subhrastien@gmail.com` and the Calendly link in
  every page are still the ones you want live.
