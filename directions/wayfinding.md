---
id: wayfinding
name: Wayfinding
referent: Transit and airport signage systems
family: modernist
mood: [clear, helpful, calm]
modes: [operate, read, persuade]
tags: [civic, government, transport, travel, health, education, docs, saas, app, public, accessibility]
affinity3d: none
scheme: light
dials:
  density: [3, 6]
  contrast: [8, 10]
  motion: [1, 3]
---

## Idea
Signage helps stressed strangers find their way: high contrast, pictograms, colour-coded lines, one message per sign. Use it when clarity and accessibility are the product's promise.

## Palette
Clean ground, deep sign-blue for action, and a set of line colours for categories (use them only as category markers, never decoration). Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
light:
  background: oklch(0.975 0.004 250)
  foreground: oklch(0.18 0.01 260)
  surface: oklch(0.995 0.002 250)
  muted: oklch(0.94 0.006 250)
  muted-foreground: oklch(0.44 0.012 260)
  border: oklch(0.84 0.008 250)
  primary: oklch(0.45 0.16 258)
  primary-foreground: oklch(0.99 0.002 250)
  ring: oklch(0.45 0.16 258)
dark:
  background: oklch(0.17 0.012 260)
  foreground: oklch(0.95 0.004 250)
  surface: oklch(0.22 0.014 260)
  muted: oklch(0.25 0.014 260)
  muted-foreground: oklch(0.74 0.01 250)
  border: oklch(0.33 0.016 260)
  primary: oklch(0.76 0.12 250)
  primary-foreground: oklch(0.16 0.012 260)
  ring: oklch(0.76 0.12 250)
```

Category line colours (as small markers only): `oklch(0.62 0.17 145)`, `oklch(0.72 0.15 75)`, `oklch(0.55 0.2 25)`, `oklch(0.55 0.15 300)`.

## Type
1. **Overpass** (derived from the US highway sign face) + **Overpass Mono**.
2. **Atkinson Hyperlegible** + **Atkinson Hyperlegible Mono** (designed for low-vision readers).
3. **Red Hat Display** + **Red Hat Text**.

Scale 1.25. Large x-heights; body 18 px; labels bold, never thin weights.

## Layout
- One message per panel, pictogram first then words.
- Consistent placement: navigation and actions in the same spot on every page.
- Colour-coded side markers for categories, always paired with a label.

## Shape and surface
Radius 6–8 px on panels like enamel signs; solid fills, no gradients, no shadows.

## Imagery
Pictograms from one consistent set (e.g. Lucide or a custom set), maps and diagrams. Photography secondary.

## Motion
Minimal: transitions under 200 ms. Signature move: the current step's marker moves along a line in multi-step flows.

## 3D
None, except a real map or venue model when navigation in space is the job.

## Traps
Colour as the only signal; too many line colours; airport cliché fonts and yellow-black everywhere.
