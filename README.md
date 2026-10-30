# Orchid

A Claude Code skill that designs and builds complete web projects that look deliberately designed rather than AI-generated: brief → art direction → design system → every page → motion and optional 3D → verification in a real browser.

## Install

Copy this folder so Claude Code finds it:

- For every project: `~/.claude/skills/orchid/`
- For one project: `<project>/.claude/skills/orchid/`

Then, once per machine:

```bash
node --version              # needs 20 or later
npx playwright install chromium
```

### Companion skills (optional)

Orchid works alone, but it's better with these. On its first run it checks what you have and offers to install the rest, asking before it changes anything. You can also check or install yourself:

```bash
node ~/.claude/skills/orchid/scripts/setup.mjs                      # what's installed, what's missing
node ~/.claude/skills/orchid/scripts/setup.mjs --install impeccable  # skill + edit hook that catches slop as code is written
node ~/.claude/skills/orchid/scripts/setup.mjs --install emil        # review-animations + break-ui only
```

Restart Claude Code afterwards so new skills load. With Impeccable installed too, start design work with `/orchid` so it's clear which skill leads; Orchid uses Impeccable's detector, hook, reviews and `/impeccable live` along the way.

## Use

Type `/orchid` in Claude Code, or just describe the job:

> Build my personal landing page as a frontend developer looking for jobs. Projects and links are in projects.md; photo is me.jpg.

> Redesign the dashboard in this repo so it stops looking like a template.

> Review the landing page at localhost:3000 — why does it look generic?

Orchid guides you with concrete options when something isn't decided. Say "just build" and it makes the calls itself and lists its assumptions.

## What it leaves in your project

| File | Purpose |
|---|---|
| `PRODUCT.md` | Product facts: audience, the one job, voice, real evidence |
| `DESIGN.md` | The design system: tokens and rules; source of truth for later pages |
| `theme.css` / `globals.css` | Locked Tailwind v4 theme generated from DESIGN.md |
| `.orchid/` | Sitemap, page plans, 3D plan, `needs.md` (what Orchid needs from you), check results, report |

## Customise

Everything is plain text; edit freely.

| To change | Edit |
|---|---|
| The workflow or rules | `SKILL.md` |
| Psychology, motion, 3D, copy guidance | `references/*.md` |
| Art directions | `directions/*.md`. Add your own by copying one: keep the front matter fields (`id`, `name`, `referent`, `family`, `mood`, `modes`, `tags`, `affinity3d`, `scheme`, `dials`) and the yaml palette block, then run `node scripts/contrast.mjs check directions/<file>.md` |
| Banned fonts and phrases | `BANNED_FONTS` and `BANNED_PHRASES` in `scripts/check-source.mjs`, plus `references/typography.md` and `references/copy-and-states.md` |
| Check thresholds | `scripts/check-page.mjs` |
| Starting theme and 3D components | `templates/` |

The dealer remembers which directions you've used in `~/.claude/orchid/history.json` so consecutive projects differ. Set `ORCHID_NO_HISTORY=1` to turn that off, or `ORCHID_HISTORY=<path>` to move it.

## Tested

Scripts and templates were tested on a Next.js 16 / React 19 / Tailwind 4.3 / three.js r186 site: the theme lock, the dealer's variety, every palette's contrast (21 directions, light and dark), DESIGN.md linting with `@google/design.md`, source and page checks against a deliberately sloppy page, 3D probes, the scroll sequence, reduced-motion and WebGL-off fallbacks, and lazy loading of three.js.

See `NOTICE.md` for sources and attribution.
