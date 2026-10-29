---
id: atelier
name: Atelier
referent: A fashion house's lookbook and atelier stationery
family: luxury
mood: [poised, restrained, exacting]
modes: [showcase, persuade]
tags: [fashion, luxury, jewellery, beauty, interior, architecture, photography, hotel, brand, portfolio]
affinity3d: accent
scheme: light
dials:
  density: [1, 4]
  contrast: [7, 9]
  motion: [3, 6]
---

## Idea
High-contrast serifs, wide spacing, enormous images and very little else. Luxury reads as confidence in leaving things out. Use it for brands whose product is visual and whose buyers expect restraint.

## Palette
Warm white, near-black, and oxblood used almost never. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
light:
  background: oklch(0.978 0.004 60)
  foreground: oklch(0.17 0.006 60)
  surface: oklch(0.995 0.002 60)
  muted: oklch(0.945 0.005 60)
  muted-foreground: oklch(0.46 0.008 60)
  border: oklch(0.86 0.006 60)
  primary: oklch(0.17 0.006 60)
  primary-foreground: oklch(0.978 0.004 60)
  ring: oklch(0.38 0.10 20)
dark:
  background: oklch(0.15 0.005 60)
  foreground: oklch(0.94 0.005 60)
  surface: oklch(0.19 0.006 60)
  muted: oklch(0.22 0.006 60)
  muted-foreground: oklch(0.73 0.006 60)
  border: oklch(0.30 0.007 60)
  primary: oklch(0.94 0.005 60)
  primary-foreground: oklch(0.15 0.005 60)
  ring: oklch(0.70 0.08 20)
```

Oxblood `oklch(0.38 0.10 20)` appears only as a rare detail (a sale marker, a signature).

## Type
1. **Bodoni Moda** (display, high contrast) + **Jost**.
2. **Italiana** (display) + **Questrial**.
3. **Gilda Display** + **Karla**.

Scale 1.618. Display in light weights at very large sizes; navigation and labels uppercase with wide tracking (+0.12 em).

## Layout
- Full-bleed imagery; text in small blocks placed at edges.
- Editorial pairings: one large image beside one small one, captions minimal.

## Shape and surface
No radii, no borders, no shadows. Black buttons with white text; ghost buttons with thin underlines.

## Imagery
Professional photography only; consistent art direction; never stock.

## Motion
Slow and precise: image reveals with a mask wipe (1,100–1,400 ms, in-out). Signature move: the hero image crossfades between looks as you scroll.

## 3D
Accent: a single object (jewellery, bottle, shoe) turning under studio light, photoreal.

## Traps
Using it without professional photography; tiny light-grey text; gold gradients.
