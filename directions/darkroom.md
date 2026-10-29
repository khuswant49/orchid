---
id: darkroom
name: Darkroom
referent: A photographer's contact sheet under red safelight
family: material
mood: [focused, nocturnal, exacting]
modes: [showcase, persuade]
tags: [portfolio, photography, film, developer, designer, creative, studio, video, case-study, dark]
affinity3d: accent
scheme: dark
dials:
  density: [3, 6]
  contrast: [6, 9]
  motion: [3, 6]
---

## Idea
On a contact sheet every frame sits in sequence, edge markings visible, the best ones circled in grease pencil. Use it for portfolios where the work should be judged frame by frame.

## Palette
Dark-first warm black, paper-white text, safelight red for action. Light mode is the printed contact sheet. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
dark:
  background: oklch(0.16 0.006 30)
  foreground: oklch(0.93 0.008 80)
  surface: oklch(0.20 0.007 30)
  muted: oklch(0.23 0.008 30)
  muted-foreground: oklch(0.71 0.01 80)
  border: oklch(0.30 0.008 30)
  primary: oklch(0.64 0.19 28)
  primary-foreground: oklch(0.13 0.006 30)
  ring: oklch(0.64 0.19 28)
light:
  background: oklch(0.965 0.004 80)
  foreground: oklch(0.18 0.006 30)
  surface: oklch(0.99 0.002 80)
  muted: oklch(0.93 0.005 80)
  muted-foreground: oklch(0.45 0.008 30)
  border: oklch(0.84 0.006 80)
  primary: oklch(0.50 0.18 28)
  primary-foreground: oklch(0.99 0.002 80)
  ring: oklch(0.50 0.18 28)
```

## Type
1. **Antonio** (condensed display) + **Courier Prime** (frame numbers, notes).
2. **Barlow Condensed** + **DM Mono**.
3. **Big Shoulders Text** + **IBM Plex Mono**.

Scale 1.333. Frame numbers and edge markings in mono, small, tracked (+0.08 em). Headings condensed uppercase.

## Layout
- The work as a grid of frames with consistent aspect ratio and thin gutters, numbered in sequence.
- Selected work enlarged; a red grease-pencil circle or tick (SVG, hand-drawn but crisp) marks the featured frame.
- Captions as edge markings under each frame: number, project, year.

## Shape and surface
Square frames with a thin film-edge border; no rounded cards, no shadows.

## Imagery
Screenshots or photos of the real work, consistent crops, slight grain only if the user's work is photographic.

## Motion
Deliberate: frames develop in (opacity and slight contrast increase, 700 ms) as they enter. Signature move: scroll-scrubbed sequence through a project, frame by frame.

## 3D
Accent: a loupe that magnifies frames under the cursor; or the user's work on a slowly turning device.

## Traps
Red everywhere (it's a safelight, not a theme); film-strip clichés with sprocket holes on every image; unreadable small mono.
