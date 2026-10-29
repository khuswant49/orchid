---
id: instrument-panel
name: Instrument Panel
referent: A broadcast control room or cockpit instrument cluster at night
family: technical
mood: [alert, focused, capable]
modes: [operate, persuade]
tags: [dashboard, monitoring, data, devtools, infrastructure, analytics, ai, robotics, drone, saas, developer]
affinity3d: accent
scheme: dark
dials:
  density: [6, 9]
  contrast: [6, 9]
  motion: [2, 5]
---

## Idea
Instruments show many values at once yet stay readable in the dark: consistent placement, mono numerals, amber for attention. Use it for products that monitor, measure or control something.

## Palette
Dark-first: a cool near-black ground, soft white readouts, amber for action and attention. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
dark:
  background: oklch(0.17 0.012 240)
  foreground: oklch(0.93 0.008 240)
  surface: oklch(0.21 0.014 240)
  muted: oklch(0.24 0.014 240)
  muted-foreground: oklch(0.72 0.012 240)
  border: oklch(0.31 0.016 240)
  primary: oklch(0.80 0.15 72)
  primary-foreground: oklch(0.18 0.012 240)
  ring: oklch(0.80 0.15 72)
light:
  background: oklch(0.965 0.005 240)
  foreground: oklch(0.20 0.012 240)
  surface: oklch(0.99 0.003 240)
  muted: oklch(0.93 0.006 240)
  muted-foreground: oklch(0.45 0.012 240)
  border: oklch(0.85 0.008 240)
  primary: oklch(0.62 0.15 65)
  primary-foreground: oklch(0.13 0.012 240)
  ring: oklch(0.55 0.14 62)
```

## Type
1. **Rajdhani** (labels and display) + **IBM Plex Sans** (text) + **JetBrains Mono** (values).
2. **Barlow Condensed** + **Barlow** + **Azeret Mono**.
3. **Saira Condensed** + **Saira** + **IBM Plex Mono**.

Scale 1.2. Values in mono with tabular figures; units smaller and muted beside them; labels in condensed uppercase.

## Layout
- Fixed panels in a strict grid; values never move when they update.
- Group gauges by system; status in the top-left of each panel.
- High density is fine; alignment does the work.

## Shape and surface
Radius 4–6 px. Panels slightly lighter than ground, 1 px border, no shadows, no glow.

## Imagery
Real data, real telemetry, real screenshots. Charts: thin lines, amber for the current value, grey for history.

## Motion
Functional only: values tween under 200 ms, alerts pulse once (not forever). Signature move: a sweep on gauges as data first arrives.

## 3D
Accent: a live model of the real thing being monitored (a drone, a robot, a rack), driven by real state.

## Traps
Neon cyan glows and "hacker" green; fake data; constantly moving numbers that make reading impossible; red used for anything but errors.
