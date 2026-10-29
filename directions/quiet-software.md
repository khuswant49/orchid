---
id: quiet-software
name: Quiet Software
referent: Well-made professional tools — precise, calm, keyboard-first
family: product
mood: [precise, calm, fast]
modes: [operate, persuade]
tags: [saas, dashboard, app, devtools, productivity, b2b, admin, editor, analytics, startup, developer]
affinity3d: none
scheme: light
dials:
  density: [5, 9]
  contrast: [5, 7]
  motion: [1, 3]
---

## Idea
The best tools disappear: dense but calm, consistent, fast, with colour saved for state. Use it for app screens and B2B products where people work for hours.

## Palette
Near-white ground, ink-dark primary buttons, and a restrained blue used for selection and focus. Hue ±15°; recheck contrast.

```yaml
light:
  background: oklch(0.985 0.002 250)
  foreground: oklch(0.21 0.008 260)
  surface: oklch(0.995 0.001 250)
  muted: oklch(0.965 0.004 250)
  muted-foreground: oklch(0.48 0.01 260)
  border: oklch(0.90 0.005 250)
  primary: oklch(0.25 0.012 260)
  primary-foreground: oklch(0.985 0.002 250)
  accent: oklch(0.95 0.025 255)
  accent-foreground: oklch(0.30 0.10 258)
  ring: oklch(0.55 0.15 258)
dark:
  background: oklch(0.17 0.006 260)
  foreground: oklch(0.94 0.004 250)
  surface: oklch(0.20 0.007 260)
  muted: oklch(0.23 0.008 260)
  muted-foreground: oklch(0.70 0.008 250)
  border: oklch(0.29 0.009 260)
  primary: oklch(0.94 0.004 250)
  primary-foreground: oklch(0.17 0.006 260)
  accent: oklch(0.28 0.04 258)
  accent-foreground: oklch(0.90 0.05 255)
  ring: oklch(0.70 0.13 255)
```

## Type
1. **IBM Plex Sans** + **IBM Plex Mono**.
2. **Public Sans** + **JetBrains Mono**.
3. **Libre Franklin** + **Fragment Mono**.

Scale 1.2. Body 14–15 px in dense views, 16 px elsewhere; numbers tabular; weights 400/600 only.

## Layout
- App shell: sidebar, top bar, content; consistent across every screen.
- Tables over cards for lists; inline editing; keyboard shortcuts shown next to actions.
- Progressive disclosure: settings and rare actions behind menus.

## Shape and surface
Radius 6 px; hairline borders; shadows only on floating layers (menus, dialogs).

## Imagery
Screenshots of the real product; no illustrations in empty states — instructions and an action instead.

## Motion
Functional and fast (100–200 ms); no animation on frequent actions. Signature move: dialogs scale from their trigger.

## 3D
None.

## Traps
Becoming another shadcn default (restyle radius, borders, density, type); purple primary buttons; marketing heroes inside the app.
