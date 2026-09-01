# Journal guide — adding and deleting bilingual blog posts

The Journal is driven by plain Markdown files. You write **one** `.md`
file per post — containing both an English and a German version — run one
command, and it produces a fully styled, bilingual blog post page (the
header's EN/DE toggle works on it, just like every other page on the
site) plus updates the Journal listing page automatically. Removing a
post is the same in reverse: delete the `.md` file, run the same command.

You never hand-edit anything inside `journal/posts/` — every file in there
is generated. If you edit one by hand, the next build will overwrite it.
Same for the auto-managed part of `js/i18n.js` (see below) — don't
hand-edit between its `BUILD:JOURNAL:START` / `BUILD:JOURNAL:END` markers.

---

## Add a new post

**1. Create the file.** Inside `journal/posts-md/`, add a new file named:

```
journal/posts-md/YYYY-MM-DD-a-short-slug.md
```

Use today's (or the post's) date, and a few dash-separated English words
for the slug — this becomes both the post's URL and its sort order
(newest first). Example:
`journal/posts-md/2026-08-19-what-i-learned-shipping-solo.md`.

**2. Write the post in both languages.** Every post file has this shape:
a front matter block, then the **English** body, then a line that says
`+++GERMAN+++` on its own, then the **German** body:

```markdown
---
title: What I learned shipping solo
title_de: Was ich beim Solo-Shippen gelernt habe
lede: The thing nobody tells you about going solo is how much of the job is just saying no.
lede_de: Was einem beim Alleingang niemand sagt: Ein großer Teil des Jobs ist einfach Nein sagen.
---

Your first paragraph goes here in English. Just write normally.

Add **bold** or *italic* like this, and [a link](https://example.com) like that.

![A caption for this photo](/images/journal/what-i-learned/desk.jpg)

> A short line you want to stand out renders as a big pull quote.

Your closing paragraph.

+++GERMAN+++

Dein erster Absatz kommt hier auf Deutsch. Ganz normal schreiben.

Auch hier funktionieren **fett** und *kursiv*, und [ein Link](https://example.com) genauso.

![Bildunterschrift für dieses Foto](/images/journal/what-i-learned/desk.jpg)

> Eine kurze Zeile, die auffallen soll, wird als großes Zitat dargestellt.

Dein Schlussabsatz.
```

That's the whole format. Blank lines separate paragraphs — that's it, no
other punctuation to remember. **Every post must have both languages** —
the build stops with a clear error if the `+++GERMAN+++` line, or any
German front matter field, is missing.

The `+++GERMAN+++` line must be on its own line, exactly that text
(case doesn't matter, so `+++german+++` also works, but don't put
anything else on that line).

**Front matter fields:**

| Field | Required? | What it does |
|---|---|---|
| `title` | yes | The English headline. |
| `title_de` | yes | The German headline. |
| `lede` | yes | The English intro line under the title, and the English preview on the Journal list page. |
| `lede_de` | yes | The German version of the same. |
| `read` | no | e.g. `5 min`. Auto-calculated from English word count if omitted. |
| `read_de` | no | e.g. `5 Min.`. Auto-calculated from German word count if omitted. |
| `cover` | no | Path to a big banner image at the top of the post (see Images below). Same image for both languages. |
| `cover_alt` | no | Alt text for the cover image (English only — see "What's not covered" below). Defaults to the English title if left out. |

The **date shown on the page** comes from the filename automatically
(`2026-08-19` → `19.08.26`) — you don't set it separately, and it's the
same in both languages (dates aren't translated).

**3. Build it.** From a terminal, inside the `site/` folder:

```bash
python3 journal/build.py
```

This does four things in one go:
- creates `journal/posts/2026-08-19-what-i-learned-shipping-solo.html`,
  with the EN/DE toggle already wired up and working on it
- adds it to the top of the list on `journal/index.html`, in both
  languages
- adds the post's title/lede/read-time to `js/i18n.js` so the header
  toggle knows how to translate them
- nothing else to touch

Re-run this command any time after adding, editing, or removing a `.md`
file.

**4. Preview it** locally (see the site's main `README.md` for the local
server command) — click the EN/DE toggle on your new post to confirm both
versions read correctly — then upload the changed files to Hostinger as
usual. Note that `js/i18n.js` and `journal/index.html` change on every
build too (not just the new post's own HTML file), so re-upload those
along with the new post page.

---

## Delete a post

Delete its file from `journal/posts-md/`, then run:

```bash
python3 journal/build.py
```

The script removes the matching page from `journal/posts/`, drops it
from the Journal list, and removes its title/lede/read-time from
`js/i18n.js` — automatically. There's no second place to clean up.

---

## Images: keep them fast, keep them yours

**Save images inside the project, not on an external link.** Put them
under `images/journal/<post-slug>/`, e.g.
`images/journal/what-i-learned/desk.jpg`. Reasons this beats linking to an
external URL (Google Drive, Imgur, someone else's CDN, etc.):

- **Speed stays in your control.** A self-hosted image loads as fast as
  the rest of your site. An external link is only as fast (and as
  online) as whatever server is hosting it — if that goes down, gets
  rate-limited, or the link changes, your blog post silently breaks.
- **No surprise ads/tracking/expiry** — some free image hosts rewrite,
  compress, or eventually delete files you don't own.

**Keep the site fast anyway — compress before you upload:**
- Resize the image so its longest side is roughly **1200–1600px**. A
  blog post never displays it bigger than that, so anything larger is
  wasted download weight.
- Save as **JPEG or WebP** (WebP is smaller at the same quality) at
  ~75–85% quality. Avoid PNG for photos — it's much bigger for no visual
  benefit on a photograph.
- Aim to keep each image **under ~300KB**. Any phone or "compress image"
  website / tool can do this in a few seconds if your camera export is
  larger.

**How to reference an image in your Markdown:** always start the path
with a leading `/`, from the site's root:

```markdown
![Caption text](/images/journal/what-i-learned/desk.jpg)
```

The leading `/` matters — it's what makes the same path work correctly
both when you preview locally and once it's live on your domain,
regardless of how deep the post page itself sits in the folder structure.

- A standalone `![...](...)` line becomes a full-width in-article photo
  with its caption underneath — write the caption in whichever language
  that section of the post is in (the caption is just part of that
  language's body text, so it naturally gets translated by writing it
  twice — once in the English body, once in the German body — same as
  any other sentence).
- Add `cover: /images/journal/what-i-learned/hero.jpg` to the front
  matter for a big banner image at the top of the post instead (or as
  well) — good for a strong visual hook per post. The cover image itself
  isn't duplicated per language (same photo either way).

---

## What's NOT covered by this workflow (by design, to keep it simple)

- **The cover image's alt text isn't translated.** `cover_alt` is
  English-only (screen readers only, not something a visitor sees) — a
  deliberate scope cut to keep the front matter shorter. Everything a
  visitor actually reads on the page is bilingual.
- **Markdown support is intentionally small**: paragraphs, `**bold**`,
  `*italic*`, `[links](url)`, `> pull quotes`, and `![images](url)`. No
  tables, headings-within-a-post, code blocks, or numbered lists. If you
  need one of those regularly, say so and it can be added to the script.

## If something goes wrong

The script tries to fail with a clear message rather than a cryptic
Python error — e.g. a missing `title_de:` line, a missing `+++GERMAN+++`
split, a filename that doesn't start with `YYYY-MM-DD-`, or a missing
`---` block will each print exactly what's wrong and which file. Fix
that file and run `python3 journal/build.py` again.

## Prefer to hand-write HTML instead?

That's still possible — `journal/template.html` is kept as a bilingual
manual fallback with its own instructions (fill in both an `[EN]` and a
`[DE]` version of everything). Just know that `journal/build.py` only
manages what's listed in `journal/posts-md/`, so a hand-written post
placed directly in `journal/posts/` (bypassing Markdown) needs its
`journal/index.html` listing row AND its `js/i18n.js` dictionary entries
added by hand too, and won't be auto-deleted if you later remove it.
Using Markdown is much less error-prone — reach for the manual path only
for a genuine one-off.
