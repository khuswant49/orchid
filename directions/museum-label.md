---
id: museum-label
name: Museum Label
referent: Wall labels and wayfinding in a contemporary art museum
family: editorial
mood: [quiet, precise, generous]
modes: [showcase, read]
tags: [art, photography, architecture, design, portfolio, gallery, culture, studio, luxury, minimal]
affinity3d: accent
scheme: light
dials:
  density: [1, 4]
  contrast: [5, 7]
  motion: [2, 4]
---

## Idea
In a gallery the work dominates and the labels whisper: small, exact text placed with great care in a lot of white space. Use it when the work should speak and the interface should recede.

## Palette
Gallery white, soft charcoal, one deep green reserved for action. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
light:
  background: oklch(0.985 0.003 90)
  foreground: oklch(0.22 0.006 270)
  surface: oklch(0.965 0.004 90)
  muted: oklch(0.95 0.004 90)
  muted-foreground: oklch(0.47 0.006 270)
  border: oklch(0.88 0.004 90)
  primary: oklch(0.42 0.08 160)
  primary-foreground: oklch(0.985 0.003 90)
  ring: oklch(0.42 0.08 160)
dark:
  background: oklch(0.17 0.004 270)
  foreground: oklch(0.94 0.004 90)
  surface: oklch(0.21 0.005 270)
  muted: oklch(0.24 0.005 270)
  muted-foreground: oklch(0.72 0.005 90)
  border: oklch(0.30 0.005 270)
  primary: oklch(0.74 0.09 160)
  primary-foreground: oklch(0.16 0.004 270)
  ring: oklch(0.74 0.09 160)
```

## Type
1. **EB Garamond** (titles of works) + **Hanken Grotesk** (labels, UI).
2. **Tenor Sans** (display) + **Gelasio** (text).
3. **Cormorant Garamond** (display, large sizes only) + **Hanken Grotesk**.

Small, exact sizes: body 16–17 px, labels 13 px with +0.04 em tracking. Scale 1.25. Work titles in italic serif; metadata (year, medium, dimensions) in the sans with tabular figures.

## Layout
- Very generous margins; the work at large size, labels aligned to its bottom-left edge like a wall label.
- Asymmetric placement: the work offset to one side, text in a narrow column.
- One item per screen in the work section.

## Shape and surface
No cards, no shadows, square corners. Thin rules only as wayfinding (above section labels).

## Imagery
The work itself at high quality, on neutral ground, with a caption block: title, year, role, medium.

## Motion
Slow and calm: images fade up 800 ms; captions follow 120 ms later. Signature move: the next work slides in like turning to the next wall, on scroll or arrow keys.

## 3D
Accent at most: a single work shown as an object you can turn (a product, a building model) with gallery lighting.

## Traps
Text so small or so light it fails contrast; empty space without rhythm (it should feel placed, not missing); serif italics everywhere.
