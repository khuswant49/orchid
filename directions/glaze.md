---
id: glaze
name: Glaze
referent: A ceramics studio — celadon glazes, ash, kiln-fired surfaces
family: craft
mood: [calm, organic, considered]
modes: [persuade, showcase]
tags: [wellness, health, skincare, ceramics, interior, architecture, hospitality, food, studio, lifestyle]
affinity3d: accent
scheme: light
dials:
  density: [2, 5]
  contrast: [5, 7]
  motion: [2, 5]
---

## Idea
Glazes pool and break over edges; colours are mineral and quiet; forms are simple and hand-made. Use it for calm, considered brands where touch and material matter.

## Palette
Celadon-tinted pale ground, ash-blue ink, a deeper celadon for action. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
light:
  background: oklch(0.968 0.010 165)
  foreground: oklch(0.24 0.018 210)
  surface: oklch(0.985 0.006 165)
  muted: oklch(0.935 0.014 165)
  muted-foreground: oklch(0.46 0.02 210)
  border: oklch(0.86 0.016 170)
  primary: oklch(0.47 0.08 178)
  primary-foreground: oklch(0.985 0.006 165)
  ring: oklch(0.47 0.08 178)
dark:
  background: oklch(0.19 0.014 200)
  foreground: oklch(0.94 0.01 165)
  surface: oklch(0.23 0.016 200)
  muted: oklch(0.26 0.016 200)
  muted-foreground: oklch(0.74 0.014 165)
  border: oklch(0.34 0.018 200)
  primary: oklch(0.77 0.08 175)
  primary-foreground: oklch(0.17 0.014 200)
  ring: oklch(0.77 0.08 175)
```

## Type
1. **Young Serif** + **Work Sans**.
2. **Gloock** (display) + **Karla**.
3. **Petrona** + **Public Sans**.

Scale 1.333. Soft, open text sizes (17–18 px body, 1.65 leading).

## Layout
- Unhurried rhythm: one idea per section, large media, asymmetric placement.
- Soft edges where images meet the ground (a generous radius on media only).

## Shape and surface
Media radius 16–24 px; UI radius 8 px; no borders on surfaces, grouping by space and tone.

## Imagery
Real product and material photography with natural light; close-ups of surfaces.

## Motion
Slow and soft: 600–900 ms fades, gentle scale (0.98 → 1). Signature move: a glaze-like colour pooling across the hero image edge on load.

## 3D
Accent: a real object (a bowl, a bottle) turning slowly under soft light, with a matte glaze shader.

## Traps
Beige-and-terracotta wellness palette; stock spa photos; everything rounded including text containers.
