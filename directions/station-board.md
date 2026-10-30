---
id: station-board
name: Station Board
referent: Indian Railways enamel station boards and platform signage
family: indian
mood: [plain, reliable, public]
modes: [operate, read, persuade]
tags: [transport, civic, government, utility, logistics, booking, travel, india, public, app, docs]
affinity3d: none
scheme: light
voice: "Public-information tone, bilingual where useful. Clear nouns, directions and times."
avoid: []
dials:
  density: [4, 7]
  contrast: [8, 10]
  motion: [1, 3]
---

## Idea
Yellow enamel boards with black lettering in several scripts, the station name in huge letters, height above sea level in small print. Use it for public, utility and logistics products that must be read instantly by everyone.

## Palette
White ground, black lettering, signboard yellow for panels, black buttons with yellow text for action. Hue ±5°; recheck contrast.

```yaml
light:
  background: oklch(0.975 0.004 95)
  foreground: oklch(0.17 0.006 95)
  surface: oklch(0.88 0.16 95)
  surface-foreground: oklch(0.17 0.006 95)
  muted: oklch(0.94 0.006 95)
  muted-foreground: oklch(0.42 0.01 95)
  border: oklch(0.17 0.006 95)
  primary: oklch(0.17 0.006 95)
  primary-foreground: oklch(0.88 0.16 95)
  ring: oklch(0.17 0.006 95)
dark:
  background: oklch(0.17 0.008 95)
  foreground: oklch(0.95 0.006 95)
  surface: oklch(0.86 0.16 95)
  surface-foreground: oklch(0.17 0.008 95)
  muted: oklch(0.24 0.01 95)
  muted-foreground: oklch(0.75 0.01 95)
  border: oklch(0.40 0.01 95)
  primary: oklch(0.86 0.16 95)
  primary-foreground: oklch(0.17 0.008 95)
  ring: oklch(0.86 0.16 95)
```

Note: `foreground on surface` is not used; text on yellow panels uses `surface-foreground`.

## Type
1. **Anek Latin** (condensed widths for names) + **Anek Devanagari**.
2. **Rajdhani** + **Hind**.
3. **Khand** + **Mukta**.

Scale 1.414. Names huge and bold; secondary scripts stacked beneath at the same weight; data (times, platforms, distances) in tabular figures.

## Layout
- Board-like panels: one name, one message, consistent placement.
- Multilingual stacks where the audience needs them, each script given equal care.
- Tables for schedules and status, with strong row rules.

## Shape and surface
Rounded-rectangle enamel boards (radius 8–12 px) with a thin black inset border; no shadows.

## Imagery
Real photos of places and operations; pictograms; maps.

## Motion
Minimal: split-flap style updates for changing values only.

## 3D
None.

## Traps
Nostalgic kitsch; yellow everywhere; scripts used decoratively in languages the audience doesn't read; tiny secondary-script text.
