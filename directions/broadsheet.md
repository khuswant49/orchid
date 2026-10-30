---
id: broadsheet
name: Broadsheet
referent: The front page of a serious daily newspaper
family: editorial
mood: [authoritative, dense, considered]
modes: [read, persuade]
tags: [writing, blog, journalism, research, consultant, agency, publication, newsletter, docs, portfolio]
affinity3d: none
scheme: light
voice: "Journalistic. Headlines that state the news, a standfirst that explains it, a source for every claim."
avoid: [kids]
dials:
  density: [5, 8]
  contrast: [6, 8]
  motion: [1, 3]
---

## Idea
A front page earns trust through hierarchy: one lead story, a clear second tier, and everything else in quiet columns. Use it when the content is the product and the visitor reads before acting.

## Palette
Newsprint-grey ground, black-blue ink, one editorial red for the action. Hue may shift ±10° and lightness ±0.03 to suit the brief; recheck contrast.

```yaml
light:
  background: oklch(0.965 0.006 85)
  foreground: oklch(0.21 0.015 260)
  surface: oklch(0.99 0.003 85)
  muted: oklch(0.93 0.008 85)
  muted-foreground: oklch(0.45 0.012 260)
  border: oklch(0.84 0.01 85)
  primary: oklch(0.50 0.19 27)
  primary-foreground: oklch(0.99 0.003 85)
  ring: oklch(0.50 0.19 27)
dark:
  background: oklch(0.18 0.01 260)
  foreground: oklch(0.93 0.008 85)
  surface: oklch(0.22 0.012 260)
  muted: oklch(0.25 0.012 260)
  muted-foreground: oklch(0.72 0.01 85)
  border: oklch(0.32 0.012 260)
  primary: oklch(0.70 0.16 27)
  primary-foreground: oklch(0.16 0.01 260)
  ring: oklch(0.70 0.16 27)
```

## Type
1. **Newsreader** (display, optical sizes) + **Libre Franklin** (UI and captions).
2. **Libre Caslon Display** + **Public Sans**.
3. **Spectral** + **IBM Plex Sans**.

Scale 1.333 with an oversized lead headline. Serif headlines in sentence case; small caps or tracked uppercase sans for section labels ("OPINION"); datelines and bylines in the sans.

## Layout
- Multi-column grid (12 columns desktop) with visible column rules between stories.
- One lead item spans 7–8 columns; secondary items in narrower columns.
- Dense but ordered: tight leading in headlines, generous gutters.
- Section labels above rules, never pill badges.

## Shape and surface
No rounded corners. Hairline rules (1 px, `border` colour) separate content; no cards, no shadows.

## Imagery
Documentary photography with captions and credits beneath. Black-and-white or lightly desaturated works. Charts in ink with one red highlight.

## Motion
Almost none. Hover underlines, a quick fade when filtering. Signature move: the lead headline sets in line by line on first load (once, 600 ms, expo out).

## 3D
None. The format's authority comes from print restraint.

## Traps
Fake newspaper clichés (distressed textures, "EXTRA!" headlines, gothic mastheads); too many columns on mobile; red used for anything but the action and one highlight.
