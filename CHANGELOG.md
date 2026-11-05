# Changelog

## 2026-11-05

Code-quality cleanup pass across the whole site (38 files touched) — broken
links, duplicated JavaScript, and dead CSS. No visual or content changes;
every edit was verified behaviourally equivalent before being committed.

- **Fixed broken internal links and path bugs** (32 files: `about.html`,
  `accessibility.html`, `activities.html`, `adultswimlesson.html`,
  `careers.html`, `centre-policies.html`, `centres.html`, `contact.html`,
  `gym.html`, `help.html`, `index.html`, `membershipfunnel.html`,
  `poolactivities.html`, `pricing.html`, all of `Centres/`, `Certfictaons/`,
  and `Policies/`):
  - Renamed `Activities.html` → `activities.html` to match the lowercase
    filename every link site-wide already used — the mismatch worked by
    accident on case-insensitive filesystems (macOS/Windows) but would 404
    on case-sensitive hosting (Linux, Nginx, GitHub Pages)
  - Fixed wrong relative-path depth (e.g. `../` where `../../` was needed)
    in nested pages under `Centres/`, `Certfictaons/`, and `Policies/`
  - Fixed a sitewide dead `#hours` anchor — 29 pages linked to `#hours`
    expecting an in-page scroll target that only exists on `index.html`;
    all now point at `index.html#hours` with the correct relative depth
  - Fixed dead `#contact`/`#help` anchors on `index.html`'s mobile nav to
    point at `contact.html`/`help.html`
  - Fixed mislabeled links: `aquatics.html` → `poolactivities.html`,
    `certifications.html` → `Certfictaons/Cert.html`, `faq.html` →
    `help.html`, `adult-swim.html` → `adultswimlesson.html`,
    `wsi-level1.html` → `ws.html`, `fitness-classes.html` → `#classes`
  - Fixed an absolute `/LW/...` path bug in `centre-policies.html`'s
    mobile nav

- **Consolidated duplicated swim-lesson JavaScript into `script.js`**
  (5 files: `script.js` and `Activities/Swimlessons/{rl,ss,swimschool,wsf}.html`):
  each of the four pages carried its own copy of the `initBubbleCanvas()`
  engine plus the level-card scroll reveal, stat count-up, level-image
  click "pop", and FAQ accordion handlers — about 300 duplicated lines for
  identical logic. Moved it all into one shared block in `script.js`,
  guarded so it's a no-op on every other page; per-page hero bubble colour
  is now a `data-color` attribute instead of a hard-coded JS argument.
  Verified with before/after DOM diffs, console checks, and screenshots
  that behaviour and appearance are unchanged.

- **Removed a duplicate dead CSS block from `style.css`** — a 20-line
  `@media` rule that had been copy-pasted into the file twice
  byte-for-byte; confirmed it was a true no-op duplicate before deleting
  one copy.

Known issues found during this pass but left untouched (missing content/
assets the next developer needs to supply, not something safe to
auto-fix): `Activities/other.html`, `functional-zone.html`, and
`Activities/Swimlessons/aquafit.html` are linked but don't exist; five
policy PDFs referenced from `centre-policies.html` were never added;
`Images/bishopstown.jpg` is missing (used on `index.html`'s Bishopstown
card and as that centre's hero background); `Certfictaons/nplq.html` is a
near-duplicate of `ws.html` and likely needs its own NPLQ-specific
content; and `style.css` has a `.hero-ghost` font-family declared twice
with different values, where the later one silently wins sitewide.

## 2026-08-21

- Added `Activities.html` — new central activities hub page, replacing the old `index.html#activities` anchor section
- Added `adultswimlesson.html` and `poolactivities.html` — new pages for adult swim lessons and pool activities
- Built out `accessibility.html` (previously empty) with a full "Functional Zone" page — adapted gym equipment for people with neurological conditions, physiotherapist-led, HSE referral info
- Added `Certfictaons/` folder with `Cert.html`, `nplq.html`, and `ws.html` — new certification pages (NPLQ, water safety, etc.)
- Added new images to `Images/`: `adultswim.png`, `gymact.jpg`, `kidscamps.jpg`
- Updated "Activities" nav links across the site (`index.html`, `about.html`, `careers.html`, `centre-policies.html`, `centres.html`, `contact.html`, `gym.html`, `help.html`, `membershipfunnel.html`, `pricing.html`, the `Centres/`, `Activities/Swimlessons/`, and `Policies/` pages) to point to `Activities.html`/`activities.html` instead of the old `#activities` anchor

## 2026-08-19

- Added `gym.html` — new gym page
- Added `appfunnel.html` — new app sign-up funnel page, with new app store / play store badge images
- Added a "Help" link to the main navigation on `index.html`, `about.html`, `careers.html`, `centre-policies.html`, `pricing.html`, and the `Centres/` pages
- Fixed "Contact" nav links across pages to point to `contact.html` instead of `index.html#contact`
- Embedded the live chat widget script on `index.html`
- Removed decorative hero watermark/ghost text elements from `index.html` and `Activities/Swimlessons/swimschool.html`, added a hero swoosh element to `swimschool.html`
- Added new images to `Images/` supporting the gym and app funnel pages (class/workout photos, app store badges, etc.)
