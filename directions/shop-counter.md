---
id: shop-counter
name: Shop Counter
referent: A well-run shop counter and mail-order catalogue — the product first, the facts beside it, the full price on the tag
family: commerce
mood: [helpful, clear, tactile]
modes: [persuade, operate, showcase]
tags: [ecommerce, shop, store, retail, d2c, marketplace, product, catalogue, grocery, electronics, commerce, small-business]
affinity3d: accent
scheme: light
voice: "Helpful and concrete, like a good shop assistant. Product name, what it is for, the facts that decide the purchase, the full price."
avoid: []
dials:
  density: [5, 8]
  contrast: [5, 7]
  motion: [2, 4]
---

## Idea
A good shop puts the product in your hands and answers your next question before you ask it. Products sit on a calm neutral ground; the facts that decide a purchase (size, material, delivery date, total price) sit right beside them, never one click away. Use it for stores, marketplaces and product catalogues, where people compare and decide.

## Palette
Warm paper-white ground so product photos read true; ink text; a deep bottle-green for buying actions; a price-tag yellow used only for tags and the "added" state. Hue ±15°; recheck contrast.

```yaml
light:
  background: oklch(0.982 0.004 85)
  foreground: oklch(0.22 0.012 80)
  surface: oklch(0.995 0.002 85)
  muted: oklch(0.955 0.007 85)
  muted-foreground: oklch(0.47 0.015 80)
  border: oklch(0.89 0.008 85)
  primary: oklch(0.34 0.06 155)
  primary-foreground: oklch(0.98 0.005 85)
  accent: oklch(0.91 0.11 95)
  accent-foreground: oklch(0.26 0.04 80)
  ring: oklch(0.50 0.11 155)
dark:
  background: oklch(0.18 0.008 80)
  foreground: oklch(0.94 0.006 85)
  surface: oklch(0.21 0.009 80)
  muted: oklch(0.24 0.01 80)
  muted-foreground: oklch(0.72 0.012 85)
  border: oklch(0.31 0.012 80)
  primary: oklch(0.80 0.10 155)
  primary-foreground: oklch(0.18 0.03 155)
  accent: oklch(0.85 0.12 95)
  accent-foreground: oklch(0.20 0.03 80)
  ring: oklch(0.75 0.11 155)
```

## Type
1. **Schibsted Grotesk** (headings, prices) + **Literata** (product stories).
2. **Familjen Grotesk** + **Public Sans**.
3. **Archivo** (use its narrow widths for prices and specs) + **Source Serif 4**.

Scale 1.2–1.25. Prices and specs in tabular figures; the price is the largest thing on a product card after the photo.

## Layout
- Category pages: real product photos at a size you can judge (at least 240 px wide on desktop), name, the 2–3 deciding attributes and the full price on every card. Don't trade product information for white space: people compare.
- Filters where people expect them (left column on desktop, a sheet on mobile); sort by default the way the shop actually recommends.
- Product page: gallery left, facts and buying action right; on mobile a sticky add-to-cart bar. Size guide, delivery date and returns visible without opening anything.
- A comparison table when products differ by numbers.
- Checkout: one column, progress shown, every fee in the first price the visitor sees.

## Shape and surface
Radius 4 px; hairline borders; flat surfaces. Signature move: tags shaped like a paper price label (a small notch, the accent yellow) for price and stock facts.

## Imagery
Consistent product photography: same background, angle and light across the range, with a scale cue (a hand, a person, a ruler) for anything where size matters. Zoom on tap. No lifestyle stock that hides the product.

## Motion
Functional and quick (150–200 ms): the cart count updates with a short confirmation; images cross-fade in the gallery. No carousels that move by themselves.

## 3D
Accent: a product viewer only when turning the product answers a real question (shoes, furniture, devices). Poster image first; most products need good photos, not 3D.

## Traps
Editorial white space that shrinks products to thumbnails; hero carousels; invented scarcity ("only 2 left", countdowns) and fees revealed at checkout (both illegal in India and the EU); pre-ticked add-ons or donations; generic "Shop now" on every button.
