---
id: almanac
name: Almanac
referent: Data journalism and the annual almanac — numbers made readable
family: editorial
mood: [informative, curious, trustworthy]
modes: [read, operate, persuade]
tags: [data, research, report, analytics, climate, finance, health, ml, ai, education, dashboard, student]
affinity3d: accent
scheme: light
dials:
  density: [5, 8]
  contrast: [6, 8]
  motion: [2, 5]
---

## Idea
Charts that explain one finding each, annotated in plain words, set in a calm reading layout. Use it when data or research results are the product.

## Palette
White ground, ink text, a teal for action and the highlighted series; categorical chart colours chosen for colour-blind safety. Hue ±10°; recheck contrast.

```yaml
light:
  background: oklch(0.985 0.003 200)
  foreground: oklch(0.21 0.01 240)
  surface: oklch(0.97 0.005 200)
  muted: oklch(0.95 0.006 200)
  muted-foreground: oklch(0.46 0.012 240)
  border: oklch(0.87 0.008 200)
  primary: oklch(0.48 0.09 200)
  primary-foreground: oklch(0.99 0.002 200)
  ring: oklch(0.48 0.09 200)
dark:
  background: oklch(0.18 0.01 230)
  foreground: oklch(0.94 0.006 200)
  surface: oklch(0.22 0.012 230)
  muted: oklch(0.25 0.012 230)
  muted-foreground: oklch(0.73 0.01 200)
  border: oklch(0.32 0.014 230)
  primary: oklch(0.78 0.10 195)
  primary-foreground: oklch(0.17 0.01 230)
  ring: oklch(0.78 0.10 195)
```

Chart series (in order): teal `oklch(0.55 0.09 200)`, orange `oklch(0.70 0.15 55)`, purple `oklch(0.55 0.12 300)`, grey `oklch(0.65 0.01 240)` for context.

## Type
1. **Spectral** (headings) + **Libre Franklin** (text, charts) + **IBM Plex Mono** (numbers in tables).
2. **Source Serif 4** + **Source Sans 3**.
3. **Literata** + **Chivo** + **Chivo Mono**.

Scale 1.25. Chart titles state the finding ("Mobile visits doubled in 2026"), not the topic; axis labels small and muted.

## Layout
- A reading column with charts that break out wider than the text.
- Each chart: finding as title, one highlighted series, direct labels instead of legends, source line.
- Key numbers inline in text with their source.

## Shape and surface
No cards; charts sit on the ground; thin rules separate sections.

## Imagery
Charts, maps and tables built from real data; photography secondary.

## Motion
Charts draw in once when they enter (600 ms); scrollytelling only for a single key chart.

## 3D
Accent: only when data is genuinely spatial (terrain, 3D scans, point clouds), with a 2D fallback chart.

## Traps
Dashboards of decorative charts; rainbow palettes; 3D bar charts; numbers without sources.
