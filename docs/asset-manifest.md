# Sake No Hana — Homepage Asset Manifest

Every media asset used on the live homepage, with direct URLs and what each is for.
Source: https://taogroup.com/venues/sake-no-hana-new-york/

> **Status (2026-07-07):** all assets below are downloaded into `static/assets/`
> (`images/`, `videos/`, `logos/`) and wired into the site. The SAKE NO HANA
> wordmark + TAO Group logo were extracted from the live page's inline SVG into
> `src/lib/editorial/SnhLogo.svelte` / `TaoGroupLogo.svelte`.
>
> **Rights note:** these are Tao Group / Sake No Hana copyrighted photos, videos, and logos. Fine as reference for a comp/redesign, but for a public or production demo, replace them with licensed stock or client-provided assets.

Local folder layout (under `static/`):
```
static/assets/
  images/   platter.jpg · hamachi-crudo.jpg · bar-set.jpg · sushi.jpg · sake3.jpg
            cathedrale.jpg · tao-uptown.jpg · tao-downtown.jpg · silver-lining.jpg
            highlight-room.jpg · wine-spectator.jpg
  videos/   hero.mp4 · social-sushi-roll.mp4 · social-hamachi.mp4 · social-dining-room.mp4
  logos/    tao-group-venues.png
```

---

## Videos (`assets/videos/`)

| Use | URL |
|-----|-----|
| Hero background loop (Vimeo, 1080p mp4) | https://player.vimeo.com/progressive_redirect/playback/790117256/rendition/1080p/file.mp4 |
| Social/gallery clip — Valentine's / sushi roll | https://taogroup.com/wp-content/uploads/2022/09/All-you-need-is-love%E2%80%A6-and-a-really-good-sushi-roll.-Valentines-Eve-plans-start-here.mp4 |
| Social/gallery clip — Hamachi crudo | https://taogroup.com/wp-content/uploads/2022/09/SAKE-NO-HANA-%E2%80%94-NYC-@sakenohana-Hamachi-crudo-sets-the-tone%E2%80%94white-ponzu-smoked-horseradish-cre.mp4 |
| Social/gallery clip — LES dining room | https://taogroup.com/wp-content/uploads/2022/09/After-the-holiday-rush-the-LES-dining-room-is-the-place-to-slow-down.-Begin-the-weekend-at-Sake.mp4 |

---

## Images (`assets/images/`)

### Gallery / social strip & food
| Use | URL |
|-----|-----|
| Platter (gallery) | https://taogroup.com/wp-content/uploads/2022/09/A-table-full-of-friends-deserves-a-platter-to-match.jpg |
| Hamachi crudo (gallery) | https://taogroup.com/wp-content/uploads/2022/09/Hamachi-crudo-is-always-the-right-answer.jpg |
| Bar set / happy hour (gallery) | https://taogroup.com/wp-content/uploads/2022/09/Doors-open-bar-set-happy-hour-all-day.jpg |
| Sushi — Feature block A photo | https://taogroup.com/wp-content/uploads/2022/09/sushi.jpg |
| Sake / bar — likely Private Events / gallery | https://taogroup.com/wp-content/uploads/2022/09/sake3.jpg |

### Featured Branded Locations (carousel)
| Venue | URL |
|-------|-----|
| Cathédrale | https://taogroup.com/wp-content/uploads/2019/09/cathedral-new-york.jpg |
| TAO Uptown | https://taogroup.com/wp-content/uploads/2019/09/IMG_1679-819x1024.jpg |
| TAO Downtown | https://taogroup.com/wp-content/uploads/2019/09/NYC-TAODowntown.jpg |
| Silver Lining Lounge | https://taogroup.com/wp-content/uploads/2022/10/Silver-Linings-Hero-Wide1080-819x1024.jpg |
| The Highlight Room | https://taogroup.com/wp-content/uploads/2022/11/Highlight-Room-Wide-View-Michael-Kleinberg45-819x1024.jpg |

### Awards
| Use | URL |
|-----|-----|
| Wine Spectator award badge lockup | https://taogroup.com/wp-content/uploads/2022/09/Wine_Sake-No-Hana.jpg |

---

## Logos (`assets/logos/`)

| Use | URL |
|-----|-----|
| SAKE NO HANA header/footer wordmark | Rendered as inline SVG on the page (no image file) — recreate as text/SVG, or export from the page's `<svg>` in the header |
| Tao Group brand strip (all venues lockup, footer) | https://taogroup.com/wp-content/uploads/2026/06/LOGOS18-scaled.png |

### Favicons / touch icons (optional)
Base path: `https://taogroup.com/wp-content/themes/tao-group-v2/images/favicons/`
Files: `apple-touch-icon-57x57.png`, `-60x60`, `-72x72`, `-76x76`, `-114x114`, `-120x120`, `-144x144`, `-152x152` (append `.png`).

---

## Quick download (run on your own machine, not needed for the demo)

```bash
# from inside the assets/ folder
mkdir -p images videos logos
# example — repeat per URL above:
curl -L -o images/sushi.jpg "https://taogroup.com/wp-content/uploads/2022/09/sushi.jpg"
```

Note: video/image filenames contain URL-encoded characters (`%E2%80%A6` etc.); wrap URLs in quotes and set your own output filename with `-o`.
