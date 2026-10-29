---
id: drafting-table
name: Drafting Table
referent: Architectural and engineering drawings on drafting film
family: technical
mood: [exact, structural, confident]
modes: [showcase, persuade, read]
tags: [architecture, engineering, hardware, robotics, product, developer, construction, technical, portfolio, saas]
affinity3d: full
scheme: light
dials:
  density: [4, 7]
  contrast: [6, 8]
  motion: [3, 6]
---

## Idea
A drawing set shows how something is built: dimension lines, section cuts, title blocks, revision notes, a red pencil for corrections. Use it for work where construction and precision are the story.

## Palette
Cool drafting-film ground, technical-pen ink, red pencil for action. Dark mode becomes a blueprint. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
light:
  background: oklch(0.97 0.006 230)
  foreground: oklch(0.21 0.02 250)
  surface: oklch(0.99 0.004 230)
  muted: oklch(0.935 0.008 230)
  muted-foreground: oklch(0.46 0.02 250)
  border: oklch(0.82 0.015 240)
  primary: oklch(0.53 0.18 27)
  primary-foreground: oklch(0.99 0.004 230)
  ring: oklch(0.53 0.18 27)
dark:
  background: oklch(0.24 0.07 255)
  foreground: oklch(0.95 0.02 240)
  surface: oklch(0.28 0.075 255)
  muted: oklch(0.30 0.07 255)
  muted-foreground: oklch(0.80 0.04 240)
  border: oklch(0.45 0.07 250)
  primary: oklch(0.85 0.13 85)
  primary-foreground: oklch(0.22 0.06 255)
  ring: oklch(0.85 0.13 85)
```

## Type
1. **Archivo** (expanded widths for display) + **IBM Plex Mono** (dimensions, notes).
2. **Chivo** + **Chivo Mono**.
3. **Red Hat Display** + **Red Hat Mono**.

Scale 1.333. Labels in uppercase mono with +0.06 em tracking; dimensions and specs in mono with tabular figures.

## Layout
- A visible structural grid: thin rules at column edges, corner registration marks on hero media.
- A title block in a corner of key sections (project, date, revision, scale) — real data only.
- Dimension lines with values annotating real measurements in the work.

## Shape and surface
Square corners, 1 px lines, no shadows. Callout leaders (thin lines with a dot) connect notes to details.

## Imagery
Line drawings, exploded views, section cuts, plans, screenshots annotated with leader lines.

## Motion
Lines draw on, then content appears; scroll scenes can "explode" an assembly. Signature move: a dimension line measuring the hero element as the page loads.

## 3D
Full scenes suit it: an exploded or assembling model of the real product, a building model, a mechanism moving. Wireframe-to-solid transitions fit the referent.

## Traps
Blueprint blue everywhere in light mode; fake measurements; so many lines the content is lost.
