---
id: field-notebook
name: Field Notebook
referent: A naturalist's waterproof field notebook with graph paper and pencil notes
family: craft
mood: [curious, methodical, hands-on]
modes: [read, showcase]
tags: [science, research, education, environment, agriculture, student, data, maker, documentation, portfolio]
affinity3d: accent
scheme: light
dials:
  density: [4, 7]
  contrast: [5, 7]
  motion: [2, 5]
---

## Idea
Observations recorded carefully in the field: a grid, measurements, sketches, short notes in the margin. Use it for projects that come from investigation, data or making.

## Palette
Pale green-grey graph paper (not cream), graphite ink, one forest-green ink for action. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
light:
  background: oklch(0.972 0.010 125)
  foreground: oklch(0.26 0.012 250)
  surface: oklch(0.99 0.006 125)
  muted: oklch(0.94 0.012 125)
  muted-foreground: oklch(0.46 0.014 250)
  border: oklch(0.86 0.02 140)
  primary: oklch(0.45 0.10 150)
  primary-foreground: oklch(0.985 0.006 125)
  ring: oklch(0.45 0.10 150)
dark:
  background: oklch(0.19 0.014 150)
  foreground: oklch(0.93 0.01 125)
  surface: oklch(0.23 0.016 150)
  muted: oklch(0.26 0.016 150)
  muted-foreground: oklch(0.72 0.014 125)
  border: oklch(0.33 0.02 150)
  primary: oklch(0.76 0.12 150)
  primary-foreground: oklch(0.17 0.014 150)
  ring: oklch(0.76 0.12 150)
```

## Type
1. **Bitter** (headings) + **Atkinson Hyperlegible** (text); **Kalam** for rare margin notes.
2. **Zilla Slab** + **Karla**.
3. **Alegreya** + **Alegreya Sans**.

Scale 1.25. Measurements and data in tabular figures. Handwritten face only for one or two annotations per page, never for UI.

## Layout
- A faint 8 px graph grid on the ground (subtle; `border` at 30% opacity), content snapped to it.
- Main column with a margin column for notes, dates and measurements.
- Numbered entries ("Entry 04 · 12 March") where the content is a sequence.

## Shape and surface
Small radius (2–4 px). Surfaces look like taped-in cards: flat, slightly lighter, hairline border, no shadow.

## Imagery
Real photographs of the work or site, cropped square like prints; diagrams drawn in line; charts in ink with one green series.

## Motion
Measured and light: lines draw on (SVG stroke) when a diagram enters, once. Signature move: a pencil-line underline drawing under the active nav item.

## 3D
Accent: a specimen or device you can turn, or a terrain from real data for field projects.

## Traps
Cream paper and terracotta (the default AI "warm" palette); overdone handwriting; fake coffee stains or torn edges.
