---
id: patient-leaflet
name: Patient Leaflet
referent: Modern pharmacy packaging and patient-information leaflets — calm, exact, easy to read under stress
family: care
mood: [calm, trustworthy, plain]
modes: [read, operate, persuade]
tags: [health, clinic, hospital, pharmacy, telehealth, medical, care, therapy, insurance, ngo, wellness, diagnostics, doctor]
affinity3d: none
scheme: light
voice: "Calm, plain and kind. Short sentences, everyday words, what to do next. Never alarming, never jokey."
avoid: []
dials:
  density: [3, 6]
  contrast: [6, 8]
  motion: [1, 3]
---

## Idea
People reach a health site worried, distracted or unwell. A well-made patient leaflet answers their questions in the order they ask them, in words they already use, with nothing competing for attention. Use it for clinics, hospitals, pharmacies, telehealth, insurers and health NGOs.

## Palette
Daylight white, dark slate ink, and a deep pharmacy green for actions; a pale mint for information boxes. Warnings and errors use the semantic tokens with an icon and words, never colour alone.

```yaml
light:
  background: oklch(0.985 0.004 190)
  foreground: oklch(0.25 0.02 230)
  surface: oklch(0.995 0.002 190)
  muted: oklch(0.96 0.008 190)
  muted-foreground: oklch(0.47 0.02 230)
  border: oklch(0.89 0.012 200)
  primary: oklch(0.42 0.08 170)
  primary-foreground: oklch(0.985 0.004 190)
  accent: oklch(0.95 0.03 170)
  accent-foreground: oklch(0.34 0.07 170)
  ring: oklch(0.52 0.10 170)
dark:
  background: oklch(0.19 0.012 220)
  foreground: oklch(0.94 0.006 190)
  surface: oklch(0.22 0.014 220)
  muted: oklch(0.25 0.015 220)
  muted-foreground: oklch(0.74 0.012 200)
  border: oklch(0.32 0.016 220)
  primary: oklch(0.80 0.09 170)
  primary-foreground: oklch(0.19 0.03 170)
  accent: oklch(0.29 0.04 170)
  accent-foreground: oklch(0.90 0.05 170)
  ring: oklch(0.74 0.10 170)
```

## Type
1. **Atkinson Hyperlegible Next** + **Source Serif 4** (long reading).
2. **Public Sans** + **Literata**.
3. **Hind** + **Noto Serif** (both cover Devanagari for Hindi or Marathi pages).

Body 17–18 px; line height 1.6–1.7; headings as questions.

## Layout
- Headings are the patient's questions: "What is this test?", "How do I prepare?", "When will I get results?".
- A key-facts box at the top of each service (cost, time, preparation, where).
- Emergency and contact information findable from every page; phone numbers as `tel:` links.
- Booking in one short column: choose, confirm, done, with a reference number and what happens next.
- Long content broken by numbered steps and short lists; plain-language summaries before detail.

## Shape and surface
Radius 8–10 px; soft, low-contrast borders; no shadows except dialogs. Signature move: information boxes with a thin left rule in the primary green, like the boxed warnings on a leaflet.

## Imagery
Real staff and real places, photographed with consent, in daylight. Diagrams instead of photos for anatomy and procedures. Never stock photos of smiling doctors with stethoscopes.

## Motion
Almost none: state changes and focus only. Nothing that could distract or alarm.

## 3D
None by default. An anatomical model only if it explains a procedure better than a diagram, with a still fallback.

## Traps
Stock doctors; moody dark themes; alarming red banners; a chatbot that doesn't say it's automated; long legal text in pale grey; urgency or upsell in care decisions; health claims without a source.
