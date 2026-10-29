---
id: letterpress
name: Letterpress
referent: Two-colour letterpress printing on heavy cotton paper
family: craft
mood: [crafted, warm, tactile]
modes: [persuade, read]
tags: [stationery, wedding, restaurant, cafe, bakery, studio, craft, publisher, event, small-business]
affinity3d: none
scheme: light
dials:
  density: [3, 6]
  contrast: [6, 8]
  motion: [1, 4]
---

## Idea
Two inks pressed into thick paper: confident type, careful spacing, the occasional ornament. Use it for craft businesses and events where a made-by-hand quality matters.

## Palette
Cotton white (cool, not cream), blue-black ink and ultramarine as the second ink. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
light:
  background: oklch(0.972 0.005 250)
  foreground: oklch(0.21 0.03 265)
  surface: oklch(0.99 0.003 250)
  muted: oklch(0.94 0.008 250)
  muted-foreground: oklch(0.46 0.03 265)
  border: oklch(0.85 0.012 260)
  primary: oklch(0.44 0.17 265)
  primary-foreground: oklch(0.99 0.003 250)
  ring: oklch(0.44 0.17 265)
dark:
  background: oklch(0.19 0.025 265)
  foreground: oklch(0.94 0.006 250)
  surface: oklch(0.23 0.028 265)
  muted: oklch(0.26 0.028 265)
  muted-foreground: oklch(0.74 0.012 250)
  border: oklch(0.34 0.03 265)
  primary: oklch(0.74 0.12 265)
  primary-foreground: oklch(0.17 0.025 265)
  ring: oklch(0.74 0.12 265)
```

## Type
1. **Ultra** (display, sparingly) + **Libre Caslon Text**.
2. **Alfa Slab One** + **Crimson Pro**.
3. **Bodoni Moda** + **Libre Franklin**.

Scale 1.414. Display set large and centred only in small, set-piece moments (menus, invitations); otherwise flush left. Small caps for labels; true italics.

## Layout
- Centred set pieces allowed (the referent does it), framed by generous margins and a simple border rule.
- Content in printed "cards" like menus or invitations, with ruled dividers and modest ornaments (one per page).

## Shape and surface
Square corners; a subtle inset shadow on the primary button to suggest impression (1 px, low opacity) — the only shadow.

## Imagery
Photographs of real products and places with natural light; printed ephemera.

## Motion
Quiet: hover states deepen the ink colour. Signature move: the hero type presses in (a 1–2 px shift and ink deepening, 300 ms) on load.

## 3D
None.

## Traps
Cream paper with terracotta ink (the AI default warm palette); fake paper textures; too many ornaments; wedding-invitation scripts.
