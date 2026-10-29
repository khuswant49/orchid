---
id: block-print
name: Block Print
referent: Rajasthani hand block-printed textiles (Bagru, Sanganer) in indigo and madder
family: indian
mood: [handmade, rhythmic, generous]
modes: [persuade, showcase]
tags: [fashion, textile, craft, home, interior, food, cafe, ngo, artisan, india, small-business, wellness]
affinity3d: accent
scheme: light
dials:
  density: [3, 6]
  contrast: [6, 8]
  motion: [2, 5]
---

## Idea
Carved wooden blocks stamp a motif again and again: borders, fields and buttas in indigo and madder, each repeat slightly different by hand. Use it for craft, textile and food brands with Indian roots and a hand-made story.

## Palette
Cool cotton white (not cream), indigo ink, madder red as a second ink. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
light:
  background: oklch(0.972 0.006 250)
  foreground: oklch(0.22 0.04 268)
  surface: oklch(0.99 0.003 250)
  muted: oklch(0.935 0.012 255)
  muted-foreground: oklch(0.45 0.05 268)
  border: oklch(0.84 0.02 260)
  primary: oklch(0.36 0.12 270)
  primary-foreground: oklch(0.985 0.004 250)
  ring: oklch(0.36 0.12 270)
dark:
  background: oklch(0.20 0.05 270)
  foreground: oklch(0.95 0.008 250)
  surface: oklch(0.24 0.06 270)
  muted: oklch(0.27 0.06 270)
  muted-foreground: oklch(0.78 0.03 260)
  border: oklch(0.36 0.07 270)
  primary: oklch(0.78 0.09 265)
  primary-foreground: oklch(0.18 0.05 270)
  ring: oklch(0.78 0.09 265)
```

Madder `oklch(0.50 0.16 25)` as the second ink for motifs and small highlights only.

## Type
1. **Alegreya** + **Alegreya Sans**.
2. **Tiro Devanagari Hindi** (display, Latin + Devanagari) + **Hind**.
3. **Martel** + **Mukta**.

Scale 1.333. Warm, readable text; display set in generous sizes with comfortable leading.

## Layout
- Border bands of a repeated motif (SVG, made in code from one carved-looking shape) framing key sections.
- Fields of content like fabric panels; one central motif as the section marker.
- Keep repeats slightly irregular (±1–2 px offsets) to suggest the hand.

## Shape and surface
Soft square corners (4 px); motif borders instead of boxes; no shadows.

## Imagery
Real textiles, artisans at work (with consent), products in natural light.

## Motion
Stamping rhythm: motifs appear in a quick sequence along a border (40–60 ms stagger) once per section.

## 3D
Accent: a fabric drape simulation with the real print as texture, responding gently to the cursor.

## Traps
Cream plus terracotta; "ethnic" clichés and paisley wallpaper; motifs so busy the content is lost.
