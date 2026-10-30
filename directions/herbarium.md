---
id: herbarium
name: Herbarium
referent: Pressed specimen sheets and labels in a botanical archive
family: science
mood: [scholarly, delicate, orderly]
modes: [showcase, read]
tags: [science, botany, agriculture, research, museum, archive, education, collection, catalogue, environment]
affinity3d: accent
scheme: light
voice: "Catalogue precision. Names, dates and provenance; a little wonder, never gushing."
avoid: [finance, civic, commerce]
dials:
  density: [3, 6]
  contrast: [5, 7]
  motion: [1, 4]
---

## Idea
Each specimen mounted on a sheet with a typed label: collector, date, place, number. Use it for collections, catalogues and research where each item deserves its own record.

## Palette
Pale grey-green archive card, deep green-black ink, archival blue for action. Hue ±10°, lightness ±0.03; recheck contrast.

```yaml
light:
  background: oklch(0.97 0.008 120)
  foreground: oklch(0.23 0.02 145)
  surface: oklch(0.99 0.004 120)
  muted: oklch(0.94 0.01 120)
  muted-foreground: oklch(0.46 0.02 145)
  border: oklch(0.85 0.014 125)
  primary: oklch(0.45 0.12 248)
  primary-foreground: oklch(0.99 0.004 120)
  ring: oklch(0.45 0.12 248)
dark:
  background: oklch(0.18 0.014 150)
  foreground: oklch(0.93 0.008 120)
  surface: oklch(0.22 0.016 150)
  muted: oklch(0.25 0.016 150)
  muted-foreground: oklch(0.72 0.012 120)
  border: oklch(0.33 0.018 150)
  primary: oklch(0.76 0.10 245)
  primary-foreground: oklch(0.16 0.014 150)
  ring: oklch(0.76 0.10 245)
```

## Type
1. **EB Garamond** + **Cutive Mono** (labels).
2. **Libre Baskerville** + **Courier Prime**.
3. **Crimson Pro** + **IBM Plex Mono**.

Scale 1.25. Specimen names in italic serif; label data in typewriter mono, small.

## Layout
- Each item on its own "sheet": a large image, a label block in the bottom-right corner with structured fields.
- Catalogue index as a dense, sortable list with accession numbers.

## Shape and surface
Square sheets with a thin border, a small paper-strip "mount" detail at corners (CSS, subtle).

## Imagery
Specimens or objects photographed flat on neutral ground; scans; archival images with credits.

## Motion
Very quiet; page-to-page transitions like turning sheets (opacity and 8 px shift, 400 ms).

## 3D
Accent: a scanned specimen or object you can turn, with the label still in the DOM.

## Traps
Vintage clichés (sepia, foxing stains); unreadable typewriter text at small sizes; too delicate to scan.
