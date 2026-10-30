# Orchid scripts

All scripts are plain Node (≥ 20) with no dependencies, except `check-page.mjs` and `capture.mjs`, which need Playwright: `npm i -D playwright && npx playwright install chromium`.

| Script | What it does |
|---|---|
| `deal.mjs` | Deals 3 art directions for a brief and modes; records choices to avoid repeats |
| `contrast.mjs` | OKLCH ramps, contrast of a pair, and a full check of `DESIGN.md` or a direction file |
| `check-source.mjs` | Source checks: tokens, dead classes, banned fonts, easing, reduced motion, copy, dark patterns |
| `check-page.mjs` | Rendered checks at 3 widths, reduced motion, WebGL off, 3D probes, scroll sequences, LCP/CLS |
| `capture.mjs` | Clean desktop and mobile screenshots of a live site (for showcasing the user's work) |
| `setup.mjs` | Status of Node, Playwright, companion skills and Impeccable's hook; `--install <playwright\|impeccable\|emil\|taste>` runs one installer (only with the user's agreement) |

## Conventions the checks rely on

Put these in the code Orchid builds:

| Marker | Meaning |
|---|---|
| `data-cta="primary"` | The page's primary action. Persuade pages: one per viewport |
| `data-orchid-3d` | A 3D scene container (`OrchidScene` adds it) |
| `data-orchid-poster` | The poster image inside a scene or sequence |
| `data-orchid-sequence` | A scroll-scrubbed frame sequence (`ScrollSequence` adds it) |
| `data-orchid-placeholder` | Placeholder content waiting for the user; counted and reported |
| `?orchid-state=empty\|loading\|error\|long` | Data pages render that state in development (see `references/copy-and-states.md`) |
| `?orchid-tier=0..3` | Forces the 3D quality tier (development, or builds with `NEXT_PUBLIC_ORCHID_PROBES=1`) |
| `window.__scene` | `{ info(), probes[] }` exposed by `SceneCanvas` in the same builds |
| `window.__sequence` | `{ frame() }` exposed by `ScrollSequence` |

Verify against a production build with the hooks on, then rebuild without them for deployment:

```bash
NEXT_PUBLIC_ORCHID_PROBES=1 npx next build && npx next start -p 3000
node <orchid>/scripts/check-page.mjs --url http://localhost:3000 --config .orchid/check.json
```

## `.orchid/check.json`

```json
{
  "widths": [390, 768, 1440],
  "pages": [
    { "path": "/", "mode": "persuade" },
    { "path": "/work/attendance", "mode": "showcase" },
    { "path": "/dashboard", "mode": "operate", "states": ["empty", "loading", "error", "long"] },
    { "path": "/docs/setup", "mode": "read", "has3D": false }
  ],
  "perf": true
}
```

- `mode` decides which rules apply (`persuade` adds one-primary-per-viewport, first-viewport and accent-share checks).
- `states` loads each `?orchid-state=` fixture and checks for errors and overflow.
- `has3D: false` skips the WebGL-off run for pages without scenes.
- `perf: false` skips the throttled mobile LCP/CLS run.

## Output

`check-page.mjs` writes to `.orchid/checks/`: `report.json` (every check with status and detail), `summary.md` (fails and warnings), and `screens/` (full-page screenshots per width, plus reduced-motion and state variants). Look at the screenshots: the numbers can't judge rhythm, hierarchy or whether the peak lands.

Notes from testing:
- Headless Chromium has no GPU, so `detect-gpu` reports tier 0. `check-page.mjs` retries with `?orchid-tier=2` and says so; confirm frame times on real hardware.
- LCP from a dev server is inflated; use a production build.
- `transfer` counts only responses with a `content-length` header, so treat it as a lower bound.
