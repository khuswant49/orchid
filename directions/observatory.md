---
id: observatory
name: Observatory
referent: Star atlases, observatory logbooks and astronomical charts
family: science
mood: [vast, precise, contemplative]
modes: [showcase, persuade]
tags: [space, astronomy, ai, research, deep-tech, data, science, physics, drone, robotics, portfolio]
affinity3d: full
scheme: dark
voice: "Measured wonder. Precise figures and coordinates; awe earned by facts."
avoid: [health, kids, civic, finance]
dials:
  density: [2, 5]
  contrast: [6, 9]
  motion: [3, 7]
---

## Idea
Star charts map the infinite with thin coordinate lines, catalogue numbers and exact annotations. Use it for deep-tech and research where scale and precision are the story — with real data, not decorative stars.

## Palette
Dark-first deep navy, chart-white text, pale gold for action. Light mode is the printed atlas. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
dark:
  background: oklch(0.17 0.04 265)
  foreground: oklch(0.94 0.01 260)
  surface: oklch(0.21 0.045 265)
  muted: oklch(0.24 0.045 265)
  muted-foreground: oklch(0.74 0.025 260)
  border: oklch(0.33 0.05 265)
  primary: oklch(0.86 0.10 88)
  primary-foreground: oklch(0.17 0.04 265)
  ring: oklch(0.86 0.10 88)
light:
  background: oklch(0.972 0.006 260)
  foreground: oklch(0.20 0.04 265)
  surface: oklch(0.99 0.003 260)
  muted: oklch(0.94 0.008 260)
  muted-foreground: oklch(0.45 0.035 265)
  border: oklch(0.85 0.012 260)
  primary: oklch(0.32 0.10 265)
  primary-foreground: oklch(0.97 0.006 260)
  ring: oklch(0.32 0.10 265)
```

## Type
1. **Michroma** (display, sparingly) + **Hanken Grotesk** + **DM Mono** (coordinates).
2. **Tenor Sans** + **Source Serif 4**.
3. **Josefin Sans** + **Azeret Mono**.

Scale 1.414. Coordinates, catalogue numbers and measurements in mono with tabular figures.

## Layout
- Wide, quiet compositions; thin coordinate grid (RA/Dec style lines) as structure, used sparingly.
- Annotations with leader lines and catalogue IDs pointing at real features.

## Shape and surface
Hairlines and circles; no cards; surfaces are slightly lighter navy panels with 1 px borders.

## Imagery
Real data visualised (orbits, sensor readings, maps), real photography of the hardware or sky.

## Motion
Slow, celestial: the coordinate grid rotates a few degrees with scroll; annotations draw on. Signature move: the camera tracks to a labelled object as you scroll.

## 3D
Full scenes suit it when the subject is spatial: a real orbit, a sensor's field of view, a drone's path, a dataset as a point cloud. Never a generic starfield or spinning globe.

## Traps
Generic particle starfields; neon gradients; glowing text; "space" fonts that hurt readability.
