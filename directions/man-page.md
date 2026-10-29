---
id: man-page
name: Man Page
referent: A Unix manual page and well-made technical reference
family: technical
mood: [plainspoken, rigorous, efficient]
modes: [read, operate]
tags: [developer, devtools, cli, api, open-source, docs, library, infrastructure, engineering, portfolio]
affinity3d: none
scheme: dark
dials:
  density: [5, 8]
  contrast: [6, 8]
  motion: [1, 3]
---

## Idea
Good reference documentation has no ego: name, synopsis, description, options, examples. Use it for developer tools and developers who want their work to speak in its own terms.

## Palette
Dark-first terminal ground with soft phosphor text and a green action; a paper version for light mode. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
dark:
  background: oklch(0.16 0.01 150)
  foreground: oklch(0.91 0.02 140)
  surface: oklch(0.20 0.012 150)
  muted: oklch(0.23 0.012 150)
  muted-foreground: oklch(0.70 0.02 140)
  border: oklch(0.30 0.014 150)
  primary: oklch(0.82 0.17 145)
  primary-foreground: oklch(0.16 0.01 150)
  ring: oklch(0.82 0.17 145)
light:
  background: oklch(0.978 0.004 100)
  foreground: oklch(0.22 0.01 150)
  surface: oklch(0.995 0.002 100)
  muted: oklch(0.945 0.006 100)
  muted-foreground: oklch(0.46 0.012 150)
  border: oklch(0.86 0.008 100)
  primary: oklch(0.48 0.13 150)
  primary-foreground: oklch(0.99 0.003 100)
  ring: oklch(0.48 0.13 150)
```

## Type
1. **IBM Plex Mono** (headings and code) + **IBM Plex Sans** (text).
2. **Martian Mono** + **Source Serif 4**.
3. **Azeret Mono** + **Literata**.

Scale 1.2. Section names in uppercase mono like man-page headers (NAME, SYNOPSIS); prose in the text face at 17 px for reading.

## Layout
- One reading column (max 72 characters) with a narrow left gutter for section names.
- Code blocks full-width, copyable, with a language label.
- A table of contents that tracks the reading position.

## Shape and surface
Square corners, no shadows. Code blocks are the only surfaces.

## Imagery
Terminal recordings (real, as text where possible), diagrams in line, screenshots of real output.

## Motion
Almost none: a cursor caret only where text is actually being typed in a demo; instant navigation. Signature move: the synopsis types out once on first load, then stays.

## 3D
None.

## Traps
Fake terminal chrome around everything; blinking cursors on static text; green-on-black "hacker" styling at full saturation.
