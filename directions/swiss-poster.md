---
id: swiss-poster
name: Swiss Poster
referent: International Typographic Style posters of the 1950s–60s
family: modernist
mood: [bold, rational, direct]
modes: [persuade, showcase]
tags: [agency, design, event, conference, architecture, startup, portfolio, product, launch, culture]
affinity3d: accent
scheme: light
dials:
  density: [2, 5]
  contrast: [8, 10]
  motion: [3, 6]
---

## Idea
Objective typography on a strict grid, huge type as image, asymmetric balance, one strong colour. Use it when the message is short and the brand wants clarity with force.

## Palette
White, near-black and one signal red. Hue may move toward orange or blue (±20°) if the brand needs; recheck contrast.

```yaml
light:
  background: oklch(0.985 0.002 90)
  foreground: oklch(0.17 0.004 270)
  surface: oklch(0.955 0.003 90)
  muted: oklch(0.94 0.003 90)
  muted-foreground: oklch(0.44 0.006 270)
  border: oklch(0.17 0.004 270)
  primary: oklch(0.54 0.21 29)
  primary-foreground: oklch(0.99 0.002 90)
  ring: oklch(0.54 0.21 29)
dark:
  background: oklch(0.16 0.004 270)
  foreground: oklch(0.96 0.003 90)
  surface: oklch(0.21 0.005 270)
  muted: oklch(0.24 0.005 270)
  muted-foreground: oklch(0.73 0.005 90)
  border: oklch(0.96 0.003 90)
  primary: oklch(0.65 0.20 29)
  primary-foreground: oklch(0.13 0.004 270)
  ring: oklch(0.65 0.20 29)
```

## Type
1. **Schibsted Grotesk** (heavy weights for display, regular for text).
2. **Familjen Grotesk** (display) + **IBM Plex Sans** (text).
3. **Darker Grotesque** (display, 800–900) + **Work Sans** (text).

Big ratio (1.618) with a display size of 10–14 vw on the hero. Flush-left, ragged-right always; tight leading on display (0.9–1.0); lowercase or sentence case.

## Layout
- A visible modular grid; elements snap to it and leave large, active empty fields.
- Asymmetric: headline across 8 columns, supporting text in 3, offset.
- Type can be the image: a single word at poster scale.

## Shape and surface
No radii, no shadows. Solid colour fields and heavy rules (2–4 px) as structure.

## Imagery
Black-and-white photography cropped hard; geometric forms built from the grid; no illustration.

## Motion
Crisp and mechanical: elements slide along grid lines (300–450 ms, expo out). Signature move: the hero word assembles from grid modules.

## 3D
Accent: a single primitive form (sphere, cylinder, plane) in the brand colour, moving with scroll, built from the grid. Never ornamental.

## Traps
Centred layouts (the style is asymmetric); Helvetica imitation with Inter (banned); red on everything.
