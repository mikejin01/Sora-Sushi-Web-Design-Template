# High-End Restaurant Demo Site — Build Guide

> **START HERE (for the building agent):** Before writing any code, read the other two docs in this same `docs/` folder — **`website-content.md`** (the exact copy for every section) and **`asset-manifest.md`** (all image/video/logo URLs). This guide covers structure and styling; those two hold the content and assets. Read all three, then build.

**Goal:** Build a single demo website for a fictional high-end restaurant that can render its homepage in **4 distinct design styles**. A floating style switcher (bottom-right) lets the user toggle live between the styles. Each style is a **one-page site** (homepage only) but must include the full set of essential sections, structured to mirror the Sake No Hana homepage.

**Reference site:** Sake No Hana, New York — https://taogroup.com/venues/sake-no-hana-new-york/

### Project docs (this folder)
This guide is one of three docs. Keep them together in the project's `docs/` folder:

1. **`restaurant-demo-build-guide.md`** (this file) — architecture, the 4 styles, switcher spec, build order.
2. **`website-content.md`** — the exact copy for every section, transcribed from the reference site. **Use this as the single source of content** when building.
3. **`asset-manifest.md`** — direct URLs for every image/video/logo on the reference homepage, labeled by section (see §7).

Assumed project layout:
```
project/
  docs/
    restaurant-demo-build-guide.md
    website-content.md
    asset-manifest.md
  assets/            <- downloaded media go here (images/ videos/ logos/)
  index.html         <- the demo
```

---

## 1. What we're building (summary for the agent)

- One HTML page (single-page app is fine) with **four complete visual themes**.
- A **floating style switcher** fixed to the bottom-right corner. Clicking a style instantly re-skins the entire page.
- All four styles share the **same content and the same section order** (below). Only the visual design changes — layout treatment, color, type, imagery style, spacing, and motion.
- Fully responsive (desktop + mobile). Mobile hero, stacked sections, hamburger nav.
- Use placeholder imagery (see §7). Do not scrape real Sake No Hana assets.

**Fictional brand for the demo:** "SORA" — a modern high-end Japanese restaurant. Tagline placeholder: *"Tokyo Soul, City Nights."* (Agent may rename, but keep one consistent brand across all 4 styles so the comparison is fair.)

---

## 2. Technical approach

- **Single `index.html`** with embedded CSS and JS (self-contained, no build step) — or a small React/Vite app if preferred. Keep it to one deliverable that opens in a browser.
- Implement styles as **theme classes on `<body>`**: `theme-editorial`, `theme-minimalist`, `theme-illustrative`, `theme-bento`. All theming driven by CSS variables scoped to each theme class so the switcher only swaps one class.
- **CSS variables** per theme for: colors, fonts, radius, section padding, max-width, button style, shadow. Layout differences (e.g. bento grid vs. editorial full-bleed) handled by theme-scoped rules on the same markup, or by minimal conditional markup where a layout truly can't be expressed with CSS alone.
- **Persist selection** with a JS variable in memory (do not rely on localStorage). Default theme on load: **Editorial**.
- Smooth transition (200–300ms) on theme change for color/background properties so the swap feels intentional, not jarring.
- Fonts via Google Fonts or system stacks. Load only the fonts each theme needs.

---

## 3. Floating style switcher (spec)

- **Position:** `position: fixed; bottom: 24px; right: 24px; z-index: 9999.`
- **Form:** a compact pill/card that expands on hover/click to show the 4 options. Collapsed state shows the current style name + a small palette/swatch icon. Expanded shows 4 rows, each with: a mini color swatch, the style name, and a one-line descriptor.
- **Options (label → theme):**
  1. Editorial — *Dark & cinematic*
  2. Minimalist — *Light & serene*
  3. Illustrative — *Warm & hand-crafted*
  4. Bento — *Modular & modern*
- **Behavior:** click sets the active theme, highlights the active row, collapses after selection (optional). Keyboard accessible (focusable, arrow/enter). Should itself be lightly styled so it reads as a neutral UI control and doesn't clash with any theme (use a frosted/neutral dark-glass look with the active swatch as accent).
- **Mobile:** same bottom-right placement, slightly smaller; expands upward.

---

## 4. Shared page structure (mirrors Sake No Hana)

All four styles must include these sections **in this order**. The content stays constant; only the styling changes. **Pull the actual copy from `website-content.md`** — the summaries below are structural, that file has the real text.

1. **Header / Nav (sticky)**
   - Left: wordmark logo ("SORA").
   - Right: nav links — `Menu`, `Gallery`, `Private Events`, `Locations`, `Contact`, and a prominent **Reservations** button.
   - Small utility link: `Delivery & Pickup`.
   - Mobile: hamburger → slide-in menu.

2. **Hero (full-viewport)**
   - Full-bleed background image (or themed treatment).
   - Eyebrow line: *"LOWER MANHATTAN, JAPANESE-STYLED"* (placeholder).
   - Sub-eyebrow: *"WELCOME TO SORA"*.
   - Two CTAs: **Make a Reservation** (primary) + **View Menu** (secondary).
   - Scroll-down chevron at the bottom.

3. **Gallery / Social strip (horizontal carousel)**
   - A horizontally scrolling row of 5–6 food/interior images (Instagram-style). Include one "branded" tile with the logo overlaid.
   - Arrows or drag to scroll.

4. **About / Intro (centered text block)**
   - Eyebrow: *"JAPANESE MODERN CLASSICS WITH A NEW YORK POINT OF VIEW"*.
   - One paragraph of intro copy (placeholder ~60–80 words about the concept, ingredients, atmosphere).
   - CTA: **Make a Reservation**.

5. **Feature block A — Menu highlight** ("Sushi & Sashimi Sets")
   - Split layout: a colored text card on one side, a large food photo on the other.
   - Heading, 1–2 sentence description, **View Menu** button.

6. **Feature block B — Private Events**
   - Split layout, mirrored from block A (text card + interior photo).
   - Heading "Private Events", short description, **Book Now** button.

7. **Featured Locations (carousel)**
   - Horizontal carousel of 4–5 sister-venue cards, each with an image + venue name + city label.

8. **Newsletter signup**
   - Heading "Join our Mailing List", email input + submit, small legal/consent line.

9. **Awards / Social proof**
   - A row of award badges (e.g. placeholder "Excellence Award 2023–2026") with a short honoree line.

10. **Info bar — Hours / Location / Actions**
    - Three columns: **Hours of Operation**, **Location** (address + "Get Directions" + phone), and buttons **Careers** / **Press Inquiries**.

11. **Footer**
    - Wordmark, link columns (Reservations, Special Events, Rewards, Gift Cards, Careers, Press, Delivery & Pickup), social icons (IG, FB), copyright line.

12. **Floating style switcher** (always visible, §3).

> Note: keep section IDs stable (`#menu`, `#gallery`, `#events`, `#locations`, `#contact`) so nav anchors work across all themes.

---

## 5. The 4 styles — detailed design specs

Each style below defines: concept, palette, typography, layout treatment, buttons/UI, imagery, motion, and how each shared section should be interpreted. The agent should follow these closely so the four feel genuinely different, not recolored versions of one design.

### STYLE 1 — Editorial / Cinematic Luxury (the Sake No Hana look) — DEFAULT

**Concept:** Sultry, exclusive, nocturnal. Magazine-inspired, photography-first. This is the closest to the reference site and should read as the "baseline."

- **Palette:** near-black backgrounds (`#0A0A0A`–`#141414`), warm off-white text (`#F2EFE9`), a single accent — terracotta/brick red (`#B23A2E` / `#A83224`). Warm amber highlights in imagery.
- **Typography:** thin, wide-tracked, ALL-CAPS serif or high-contrast display for headings (e.g. *Cormorant Garamond*, *Playfair Display*, or a light Didone), with generous `letter-spacing` (0.15–0.3em). Small centered sans-serif body (e.g. *Inter*/*Helvetica*) with tight sizes.
- **Layout:** full-bleed imagery, lots of negative space, centered compositions, layered magazine spreads. Feature blocks use a **solid red text card** beside a large photo (exactly like Sake No Hana's Sushi/Private Events blocks).
- **Buttons:** thin 1px outline buttons, uppercase, wide letter-spacing, transparent fill; hover fills subtly.
- **Imagery:** moody, low-key lit, rich shadows, food shot against darkness. High-contrast, cinematic.
- **Motion:** slow fade-ins on scroll, gentle parallax on hero, scroll chevron bounce.
- **Section notes:** hero = dark full-bleed with centered thin caps type; gallery = dark carousel; about = centered small caps eyebrow + serif; awards = badges on black.

### STYLE 2 — Minimalist / Quiet Luxury (light)

**Concept:** The tonal opposite of Editorial — bright, airy, serene, confident through restraint. Nordic / Michelin-tier calm.

- **Palette:** bone/white backgrounds (`#FAF9F6`, `#FFFFFF`), soft warm grey text (`#1C1B19`), one restrained accent — muted sage or ink (`#3A3F35` or near-black). Almost monochrome.
- **Typography:** one refined serif for headings (e.g. *Cormorant* or *EB Garamond*) at large sizes, paired with a clean humanist sans body (e.g. *Inter*, *Neue Montreal* substitute). Normal case, not all-caps. Restrained sizes, lots of leading.
- **Layout:** enormous negative space, single-column focus, one hero image, generous margins (max-width ~1100px, wide gutters). Feature blocks become calm split layouts with tons of whitespace and a thin hairline divider instead of a colored card.
- **Buttons:** minimal — text link with underline on hover, or a thin pill with 1px border; no fills.
- **Imagery:** bright, natural light, clean plating on light surfaces, airy. Fewer images, each given room.
- **Motion:** very subtle — soft opacity fades only. No parallax, no bounce. Stillness is the point.
- **Section notes:** hero = light full-bleed or a single centered dish on white; gallery = spacious grid or slow carousel with whitespace; awards = quiet grey badges; overall feels like a printed lookbook.

### STYLE 3 — Illustrative / Bespoke Craft

**Concept:** Warm, hand-crafted, characterful. Custom illustration and storytelling rather than photography-led. Reads as "expensive because bespoke" — heritage, artisanal, personal.

- **Palette:** warm heritage tones — cream/paper (`#F6EEDD`), deep ink (`#20211C`), and 2–3 warm accents (terracotta `#C25A3A`, mustard `#D8A24A`, deep green `#2E4034`). Richer and warmer than the others.
- **Typography:** a distinctive display face with character for headings (a warm serif or a tasteful hand/brush accent for select words like the brand name), paired with a readable serif or slab body. Occasional hand-lettered accent word — used sparingly, never in body copy.
- **Layout:** looser, editorial-but-playful. Custom **line-art / illustrated motifs** (waves, cranes, seigaiha patterns, ingredients drawn as line art) framing sections, decorative dividers, illustrated borders. Feature blocks framed by illustrated panels rather than photo cards. Photos can be masked into organic shapes or paired with drawn elements.
- **Buttons:** solid warm-accent fill with slightly rounded corners, or an outlined button with a small drawn flourish/icon.
- **Imagery:** mix of warm photography and **custom illustrations** (SVG line art acceptable as placeholder — cranes, waves, sake bottles, chopsticks, botanicals). This is the defining trait.
- **Motion:** playful but tasteful — illustrated elements can subtly draw-in or float; hover states reveal small drawn accents.
- **Section notes:** hero = illustrated backdrop or illustrated frame around a photo, brand name with a hand-drawn accent; gallery = images with drawn frames/captions; dividers = illustrated wave/seigaiha lines; footer = illustrated motif band.

> Implementation tip: inline SVG line-art motifs (stroke only, `currentColor`) make good, lightweight placeholders. Keep line weight consistent for a cohesive hand.

### STYLE 4 — Bento / Modular Grid (Apple-inspired)

**Concept:** Clean, modern, organized, premium-tech. Content lives in tidy rounded tiles of varied sizes packed into a grid — inspired by Apple's product pages and the Japanese bento box (thematically apt for a Japanese restaurant).

- **Palette:** light neutral base (`#F5F5F7` page, `#FFFFFF` tiles) with high-contrast dark text (`#111`), plus small pops of color inside individual tiles (each tile can have its own accent background — deep red, charcoal, warm cream). Optionally a dark-mode variant with `#000` page and dark tiles like Apple's product-page mosaics.
- **Typography:** clean, tight sans-serif throughout (e.g. *Inter*, *SF Pro* substitute), bold confident headings, clear hierarchy. Minimal decorative type.
- **Layout:** the defining trait — a **modular grid of rounded-corner tiles** (radius ~20–28px) of mixed sizes (some full-width, some half, some quarter), packed with **minimal whitespace between tiles** (~16–20px gaps). Each shared section becomes one or more tiles:
  - Hero = one large full-width feature tile.
  - Menu highlight + Private Events = paired half-width tiles side by side (like Apple's MacBook Pro / AirPods pairing).
  - Gallery = a set of small image tiles in the grid.
  - Locations = a row of equal tiles.
  - Awards, Hours, Newsletter = smaller tiles slotted into the mosaic.
- **Buttons:** Apple-style — small pill buttons, blue or accent fill for primary ("Reserve"), and a text link with chevron ("Learn more ›") for secondary.
- **Imagery:** crisp, bright product-style photography centered within tiles, often on solid tile backgrounds with the dish "floating."
- **Motion:** subtle tile hover-lift/scale, smooth scroll, content fading up into tiles.
- **Section notes:** keep every section boxed. The page should read as one cohesive mosaic where the eye moves tile to tile. This is the most "content-organized" of the four.

---

## 6. Side-by-side quick reference

| # | Style | Base color | Accent | Type feel | Layout signature | Vibe |
|---|-------|-----------|--------|-----------|------------------|------|
| 1 | Editorial | Near-black | Terracotta red | Thin caps Didone/serif | Full-bleed photo + red text cards | Sultry, nocturnal, exclusive |
| 2 | Minimalist | Bone/white | Ink/sage | Refined serif + clean sans | Huge whitespace, single column | Serene, timeless, quiet luxury |
| 3 | Illustrative | Cream/paper | Terracotta, mustard, green | Display serif + hand accents | Illustrated frames & motifs | Warm, crafted, characterful |
| 4 | Bento | Light grey/white | Per-tile pops | Tight bold sans | Mosaic of rounded tiles | Modern, organized, premium-tech |

---

## 7. Assets & placeholders

- **Reference assets:** `asset-manifest.md` lists direct URLs for every image, video, and logo on the reference homepage, labeled by section (hero Vimeo loop, gallery clips, food shots, location photos, award badge, brand-strip logo, favicons). These were **not** auto-downloaded — pull them via the `curl` snippet in that file into `assets/images|videos|logos/`, or reference the URLs directly during prototyping.
  - **Rights note:** those files are Tao Group / Sake No Hana copyrighted media. Fine as reference/placeholder for an internal comp, but for a public or production demo, swap in **royalty-free stock** (e.g. Unsplash Japanese food/interiors) or client-provided, licensed assets.
- **Illustrations (Style 3):** inline SVG line art — cranes, waves (seigaiha), sake bottle, chopsticks, botanicals. Keep stroke-only and themeable via `currentColor`.
- **Logo:** the reference wordmark is an inline SVG (no image file). Recreate as a styled text wordmark per theme — "SORA" for the fictional brand, or "SAKE NO HANA" if branding the demo as the real venue (confirm with stakeholder).
- **Icons:** a lightweight icon set (e.g. Lucide) for nav, social, chevrons, switcher.
- **Copy:** use `website-content.md` as the source. Keep the same copy across all 4 themes so the comparison is fair.

---

## 8. Acceptance checklist

- [ ] One self-contained page opens in a browser with no build step (or a simple documented run command).
- [ ] Floating switcher is fixed bottom-right, shows 4 styles, and instantly re-skins the whole page.
- [ ] Default theme is Editorial on first load.
- [ ] All 12 sections present in every theme, same content, same order.
- [ ] Each theme is visually distinct per §5 (not just recolored) — verify by comparing hero + feature blocks across themes.
- [ ] Editorial theme visibly echoes the Sake No Hana reference (dark, thin caps type, red text cards).
- [ ] Bento theme uses a genuine mosaic of rounded tiles with paired half-width cards.
- [ ] Responsive: nav collapses to hamburger, sections stack, switcher repositions on mobile.
- [ ] Theme switch has a smooth 200–300ms transition.
- [ ] No use of localStorage/sessionStorage (in-memory state only).

---

## 9. Suggested build order for the agent

1. Build the shared HTML skeleton with all 12 sections and placeholder content.
2. Wire up the floating switcher to toggle `body` theme classes (default Editorial).
3. Define global CSS-variable structure and base (theme-agnostic) layout.
4. Style **Editorial** first (it's the baseline and matches the reference).
5. Layer in **Minimalist**, then **Illustrative**, then **Bento** as theme-scoped overrides.
6. Make it responsive.
7. Run the acceptance checklist; compare all four side by side.
