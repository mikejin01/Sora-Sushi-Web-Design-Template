# SORA — High-End Restaurant Demo

A one-page demo homepage for a fictional upscale Japanese restaurant (**SORA**), rendered in **four switchable design styles** via a floating style switcher. Built with **SvelteKit (Svelte 5)** as a fully static site, deployable to **GitHub Pages**.

- **Editorial** — dark & cinematic (default)
- **Minimalist** — light & serene
- **Illustrative** — warm & hand-crafted
- **Bento** — modular & modern

All four styles share the same content and section order; only the visual design changes. The switcher (bottom-right) re-skins the whole page live. Theme state is in-memory only (no `localStorage`).

## Run locally

Uses [pnpm](https://pnpm.io) (`corepack enable` if you don't have it):

```bash
pnpm install
pnpm dev           # dev server at http://localhost:5173
```

Build / preview the production static site:

```bash
pnpm build         # outputs static files to ./build
pnpm preview       # serve the built site locally
```

## Deploy to GitHub Pages

A workflow is included at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site publishes at
   `https://<user>.github.io/<repo>/`.

The build's base path is set automatically from the repo name by
`actions/configure-pages`, so project pages under a subpath work without edits.
`static/.nojekyll` is included so the `_app/` assets aren't stripped by Jekyll.

## Adding a hero video (optional)

The hero is wired for a looping background video with a graceful fallback:

- **No video present** → the royalty-free hero image shows with a slow cinematic
  (“Ken Burns”) zoom. This is the default.
- **Drop a file at `static/media/hero.mp4`** → it auto-plays (muted, looped) and
  fades in over the poster image. No code changes needed.

Use a licensed/royalty-free MP4 (H.264, muted, ~1080p, a few seconds looped).

## Project structure

```
src/
  app.html                 document shell + fonts + default <body> theme class
  app.css                  all design tokens (4 theme sets) + component styles
  lib/
    content.js             all copy + image data (single source of content)
    theme.svelte.js        reactive theme state (in-memory) + setTheme()
    reservation.svelte.js  reservation-modal open/close state
    actions.js             reveal-on-scroll + header-scroll Svelte actions
    components/            Header, Hero, Gallery, About, Feature, Locations,
                           Newsletter, Awards, InfoBar, Footer, Carousel,
                           StyleSwitcher, ReservationModal
  routes/
    +layout.js             prerender = true (static)
    +layout.svelte         applies theme class to <body>; mounts switcher + modal
    +page.svelte           assembles the homepage sections
static/                    favicon, .nojekyll, media/ (drop hero.mp4 here)
docs/                      original build brief, content, and asset manifest
standalone.html            the original single-file version (no build step)
```

## Notes

- **Forms are demo-only.** The Reservations modal and newsletter validate input
  and show a polished success state, but nothing is sent anywhere and no data is
  stored.
- **Imagery** uses royalty-free Unsplash photos. Fonts load from Google Fonts.
- `standalone.html` is the original self-contained single-file build, kept for
  reference — open it directly in a browser with no tooling.
