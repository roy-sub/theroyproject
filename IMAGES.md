# Image guide

Every image slot on the site, where its file lives, and the exact aspect
ratio + recommended pixel dimensions to shoot or export at. Placeholder
PNGs/SVGs already sit in each path below (solid-color, no baked-in text) so
the site previews correctly before real photography goes in — just
overwrite the file in place (same filename, same folder) and nothing else
needs to change.

General rules:
- **Aspect ratio is load-bearing.** Every slot below is cropped with CSS
  `aspect-ratio` + `object-fit: cover`, so an image with the wrong ratio
  gets cropped, not distorted — but the crop may cut off what you wanted
  visible. Match the ratio and you control the framing.
- **Dimensions are "@2x" already** — sized for retina screens at the
  slot's largest real-world display size. It's fine to ship larger; the
  browser downscales. Don't ship smaller than listed or it'll visibly
  soften on a retina display.
- **Format:** JPEG or WebP for photos (WebP is smaller at equal quality —
  prefer it if you're comfortable exporting it); SVG or transparent PNG
  for the logo marks. Keep individual photo files under ~400KB so pages
  stay fast on mobile.
- **Filenames are fixed** — the HTML references these exact paths. Replace
  the file in place rather than renaming, unless you also update the
  matching `<img src>` in the HTML.

---

## Home (`index.html`)

| Slot | File | Ratio | Recommended size |
|---|---|---|---|
| Trusted-by logo × 5 | `images/home/logos/logo-1.svg` … `logo-5.svg` | ~3.47:1 (contain, not cropped) | Vector (SVG) preferred; displays at 104×30 CSS px |
| Selected Work — RaceOS AI cover | `images/home/work-preview/raceos.png` | 4:3 | 1200×900 |
| Selected Work — SORA Copilot cover | `images/home/work-preview/sora.png` | 4:3 | 1200×900 |
| Selected Work — Appeal Architect cover | `images/home/work-preview/appeal.png` | 4:3 | 1200×900 |

Logos render with `object-fit: contain` (not cropped), so any reasonable
logo aspect ratio works — SVG with a transparent background is ideal since
it never shows a colored box around the mark.

## Work (`work/index.html`, `work/raceos.html`, `work/sora.html`, `work/appeal.html`)

Each of the three projects has two image slots — the list card and a
single hero shot on its own detail page (each detail page ships with just
one image, by design, so it can't compete with the "try the live app"
button):

| Slot | File pattern | Ratio | Recommended size |
|---|---|---|---|
| Work-list hero shot | `images/work/<project>/list-cover.png` | 16:10 | 1600×1000 |
| Project-detail hero banner (clickable, links to the live app) | `images/work/<project>/hero.png` | 16:9 | 2400×1350 |

`<project>` is one of `raceos`, `sora`, `appeal`. `list-cover.png` shows on
the Work index page; `hero.png` is the single image on that project's own
detail page — it's wrapped in a link straight to the live product, so
prefer a real product screenshot over an abstract/branded cover here.

## About (`about.html`)

| Slot | File | Ratio | Recommended size |
|---|---|---|---|
| Portrait | `images/about/portrait.png` | 4:5 (portrait) | 1200×1500 |

## Dump (`dump.html`)

| Slot | File | Ratio | Recommended size |
|---|---|---|---|
| Photo 01 — "Somewhere green" | `images/dump/01.png` | 3:4 (portrait) | 900×1200 |
| Photo 02 — "Desk at 3am" | `images/dump/02.png` | 3:4 | 900×1200 |
| Photo 03 — "Golden hour" | `images/dump/03.png` | 3:4 | 900×1200 |
| Photo 04 — "First server rack" | `images/dump/04.png` | 3:4 | 900×1200 |
| Photo 05 — "Monsoon window" | `images/dump/05.png` | 3:4 | 900×1200 |
| Photo 06 — "Sticker haul" | `images/dump/06.png` | 3:4 | 900×1200 |
| Now-playing album art | `images/dump/spotify-art.png` | 1:1 (square) | 480×480 |

The six photo captions/dates/places are hardcoded in `dump.html` next to
each `<img>` — update the caption text there if you swap in a different
photo than the one described.

**Audio (not an image, but lives alongside the album art in the same
folder):** the Now-playing card plays a real file in-page —

| Slot | File | Notes |
|---|---|---|
| Now-playing track | `images/dump/spotify-audio.mp3` | MP3, keep it under a few MB (192kbps is plenty for a background loop) so the page stays light. |

The play button (`js/main.js`, `setupDumpPlayer()`) toggles this file
directly — nothing is embedded from Spotify. The track/artist text next to
it ("Everything In Its Right Place" / "Radiohead — Kid A") is still the
prototype's placeholder copy — update the two `.player-track` /
`.player-artist` lines in `dump.html` to match whatever's actually in the
MP3.

## Journal (`journal/index.html`, `journal/template.html`, `journal/posts/*.html`)

No image slots by design — matches the source prototype, which keeps
Journal to type only (date, title, dek, read time). If you want a cover
image per post later, add a `4:3` or `16:9` slot near the top of
`post-article` in `journal/template.html` and mirror it into
`css/style.css` (a `.post-cover` class following the `.project-hero-media`
pattern is the easiest reuse).

## Contact (`contact.html`)

No photo slots — the rotating seal is inline SVG/CSS, not an image.

---

## Adding a new image slot later

1. Pick the aspect ratio the layout needs and set it with CSS
   `aspect-ratio` on the wrapping element (see any `.media-4x3` /
   `.media-16x9` / `.dump-media` rule in `css/style.css` for the pattern).
2. Put `object-fit: cover` on the `<img>` itself so it crops instead of
   stretching.
3. Add the file under the matching `images/<section>/` folder and update
   this guide.
