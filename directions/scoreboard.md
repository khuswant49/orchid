---
id: scoreboard
name: Scoreboard
referent: Stadium scoreboards and sports broadcast graphics
family: pop
mood: [loud, competitive, live]
modes: [persuade, operate]
tags: [sports, fitness, gaming, esports, live, events, competition, leaderboard, app, community]
affinity3d: accent
scheme: dark
dials:
  density: [5, 8]
  contrast: [8, 10]
  motion: [4, 7]
---

## Idea
Big condensed numerals, team colours, live state, nothing ambiguous at fifty metres. Use it for sports, fitness and gaming products where numbers and momentum are the point.

## Palette
Dark-first stadium black, white readouts, stadium yellow for action. In light mode, ink buttons carry yellow text. Swap the yellow for the team colour when there is one; recheck contrast.

```yaml
dark:
  background: oklch(0.15 0.01 260)
  foreground: oklch(0.96 0.004 260)
  surface: oklch(0.20 0.012 260)
  muted: oklch(0.23 0.012 260)
  muted-foreground: oklch(0.74 0.01 260)
  border: oklch(0.32 0.014 260)
  primary: oklch(0.88 0.17 100)
  primary-foreground: oklch(0.15 0.01 260)
  ring: oklch(0.88 0.17 100)
light:
  background: oklch(0.97 0.004 260)
  foreground: oklch(0.15 0.01 260)
  surface: oklch(0.995 0.002 260)
  muted: oklch(0.93 0.006 260)
  muted-foreground: oklch(0.44 0.012 260)
  border: oklch(0.83 0.008 260)
  primary: oklch(0.20 0.015 260)
  primary-foreground: oklch(0.90 0.17 100)
  ring: oklch(0.20 0.015 260)
```

## Type
1. **Big Shoulders Display** + **Barlow**.
2. **Teko** + **Saira**.
3. **Saira Extra Condensed** + **Saira**.

Scale 1.5. Scores and stats at enormous sizes in condensed bold with tabular figures; labels uppercase.

## Layout
- Score-first: the key number dominates each panel.
- Lower-third bars and tickers for secondary info (pausable).
- Strong diagonal accents allowed as structure (a skewed section edge), sparingly.

## Shape and surface
Square or skewed panels; solid fills; no glow.

## Imagery
Real action photography, cut-outs with motion; real stats.

## Motion
Fast and punchy (150–300 ms), counters ticking to real values once. Signature move: a score flip like a split-flap board.

## 3D
Accent: a real ball, shoe or device; or a stadium/track map with live positions.

## Traps
Fake stats; constant motion; aggressive red/black esports clichés.
