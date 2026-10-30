---
id: riso-zine
name: Riso Zine
referent: Risograph-printed zines and gig posters with overprinted spot inks
family: pop
mood: [playful, energetic, independent]
modes: [persuade, showcase]
tags: [music, event, community, student, creative, game, indie, festival, portfolio, education]
affinity3d: accent
scheme: light
voice: "Loud, informal and local. Short punchy lines, first names, jokes the community gets."
avoid: [health, civic, finance]
dials:
  density: [4, 7]
  contrast: [6, 9]
  motion: [4, 8]
---

## Idea
Two or three spot inks overprinted on cheap paper, slightly misregistered, made fast and with joy. Use it for communities, events, games and young brands that want energy without polish-as-anxiety.

## Palette
Paper white, federal-blue ink, fluorescent pink as the second ink and the action. Overprint where the inks meet (CSS `mix-blend-mode: multiply` on images and shapes). Hue ±15°; recheck contrast.

```yaml
light:
  background: oklch(0.975 0.006 95)
  foreground: oklch(0.33 0.15 265)
  surface: oklch(0.99 0.004 95)
  muted: oklch(0.94 0.012 265)
  muted-foreground: oklch(0.42 0.12 265)
  border: oklch(0.33 0.15 265)
  primary: oklch(0.655 0.21 355)
  primary-foreground: oklch(0.20 0.10 265)
  ring: oklch(0.55 0.18 265)
dark:
  background: oklch(0.22 0.08 265)
  foreground: oklch(0.96 0.01 95)
  surface: oklch(0.26 0.09 265)
  muted: oklch(0.29 0.09 265)
  muted-foreground: oklch(0.80 0.04 265)
  border: oklch(0.45 0.10 265)
  primary: oklch(0.78 0.16 355)
  primary-foreground: oklch(0.20 0.08 265)
  ring: oklch(0.78 0.16 355)
```

## Type
1. **Dela Gothic One** (display) + **Work Sans**.
2. **Rubik Mono One** (display) + **Rubik**.
3. **Bowlby One** + **Courier Prime**.

Scale 1.618 for display; big, tight, sometimes rotated a few degrees in set pieces.

## Layout
- Collage energy within a grid: overlapping image and type blocks, deliberate 2–4 px misregistration offsets on duotone images.
- Stickers and stamps for real labels (dates, prices), sparingly.

## Shape and surface
Hard edges, thick ink outlines (2–3 px) on buttons, no shadows; halftone dot patterns on images.

## Imagery
Photos converted to two-ink duotone (blue + pink, multiply); hand-cut shapes.

## Motion
Bouncy is allowed here for set pieces only (stickers popping in), never on UI controls. Signature move: misregistration that settles into alignment on scroll.

## 3D
Accent: a flat, toon-shaded object in the two inks.

## Traps
Using it for serious financial or medical products; pink everywhere; illegible rotated text.
