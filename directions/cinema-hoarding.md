---
id: cinema-hoarding
name: Cinema Hoarding
referent: Hand-painted Bombay film hoardings and posters
family: indian
mood: [exuberant, dramatic, warm]
modes: [persuade, showcase]
tags: [film, music, festival, food, restaurant, event, entertainment, creative, india, mumbai, culture]
affinity3d: accent
scheme: light
dials:
  density: [4, 7]
  contrast: [7, 10]
  motion: [4, 7]
---

## Idea
Painted billboards shouting a title in huge bilingual letters, saturated colour, dramatic faces and a tagline. Use it for entertainment, food and culture brands that want unapologetic energy rooted in Indian visual culture.

## Palette
A pale rose-white ground, deep aubergine ink, magenta for action and marigold for highlights and banners. In dark mode the marigold takes the action. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
light:
  background: oklch(0.97 0.012 350)
  foreground: oklch(0.23 0.07 330)
  surface: oklch(0.99 0.006 350)
  muted: oklch(0.935 0.02 350)
  muted-foreground: oklch(0.44 0.08 330)
  border: oklch(0.84 0.04 345)
  primary: oklch(0.52 0.21 350)
  primary-foreground: oklch(0.99 0.006 350)
  accent: oklch(0.82 0.16 72)
  accent-foreground: oklch(0.20 0.07 330)
  ring: oklch(0.52 0.21 350)
dark:
  background: oklch(0.19 0.05 330)
  foreground: oklch(0.95 0.01 350)
  surface: oklch(0.23 0.06 330)
  muted: oklch(0.26 0.06 330)
  muted-foreground: oklch(0.78 0.03 350)
  border: oklch(0.35 0.07 330)
  primary: oklch(0.82 0.16 72)
  primary-foreground: oklch(0.18 0.05 330)
  ring: oklch(0.72 0.17 350)
```

Marigold (`accent`) fills banners and highlight panels with aubergine text; it is too light to stand alone as a button on the light ground.

## Type
1. **Rozha One** (display, Latin + Devanagari) + **Mukta**.
2. **Yatra One** (display, Latin + Devanagari) + **Hind**.
3. **Teko** (condensed, Latin + Devanagari) + **Baloo 2**.

Scale 1.618. Huge titles, often bilingual (English + Hindi or Marathi) when the audience reads both; outlined or shadowed display type like painted lettering (a solid offset shadow, not a blur).

## Layout
- Poster compositions: a dominant title, a big image, a tagline banner, credits block.
- Stacked bilingual headlines with the scripts aligned on a shared baseline grid.

## Shape and surface
Solid colour panels; banners with notched ends; offset solid shadows (4–6 px, no blur) on display type and buttons.

## Imagery
Bold portraits and food photography with saturated colour; hand-painted illustration only if the user commissions it — don't fake it with filters.

## Motion
Theatrical but short: titles slam in with a quick scale (0.96 → 1, 250 ms), banners slide. Signature move: a marquee of credits that pauses on hover (and can be stopped).

## 3D
Accent: a hoarding panel with real artwork that tilts with scroll; or a product (a dish, an album) on a spotlit stage.

## Traps
Caricature or kitsch; Devanagari used as decoration in a language the audience doesn't read; low contrast on saturated grounds.
