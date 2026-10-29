# Colour

## Work in OKLCH

OKLCH (`oklch(L C H)`) models perceived lightness, so two colours with the same L look equally light whatever their hue. That makes ramps even, dark mode predictable and contrast easier to reason about. Hex and HSL ramps produce muddy mid-tones and badges of the same "lightness" that look wildly different.

- L: 0–1 (perceived lightness). C: chroma, 0 to about 0.37 (stay under ~0.2 for UI, push higher only for a vivid accent). H: hue angle 0–360.
- Generate a ramp: `node <orchid>/scripts/contrast.mjs ramp --hue 250 --chroma 0.12` (prints 50–950 steps, clamped to the sRGB gamut).
- Check contrast: `node <orchid>/scripts/contrast.mjs pair "oklch(0.25 0.02 250)" "oklch(0.97 0.01 90)"`.

## Roles and proportions

A 60-30-10 split is a useful heuristic (it's a convention, not research): about 60% ground, 30% secondary surfaces and text, 10% or less accent. The research behind keeping the accent rare is the isolation effect: the primary action stands out only if little else uses its colour.

- **Ground and ink:** most of the page. Tint the neutrals toward the direction's hue (chroma 0.005–0.02) rather than using pure grey; pure `#000` on pure `#fff` is harsh and flat.
- **Secondary:** quieter text, borders, surfaces.
- **Accent:** the primary action, focus rings, and at most one other meaningful thing per viewport.
- **States:** destructive, success, warning — only for states, never decoration.

## Contrast (WCAG 2.2 AA)

- Body text 4.5:1; large text (24 px+, or 18.66 px+ bold) 3:1; UI parts and focus indicators 3:1 against neighbours.
- Grey text on a coloured surface is the commonest failure. Check every text role on every surface it appears on.
- `contrast.mjs check DESIGN.md` tests all `*-foreground` / text roles against their surfaces in light and dark.

## Dark mode

- Not an inversion. Ground around L 0.14–0.20 with a slight hue tint, never pure black.
- Lower the chroma of the accent slightly and raise its lightness so it doesn't vibrate.
- Elevation in dark mode comes from lighter surfaces, not shadows.
- Every semantic role gets an explicit dark value in `.dark`.

## Tells to avoid

| Tell | Instead |
|---|---|
| Purple-to-blue or indigo gradients (hero backgrounds, buttons, text) | Flat colour from the direction; gradients only when the referent has them, and subtle |
| Neon cyan borders and glows in dark mode | A tinted dark ground and one restrained accent |
| Cream background with terracotta accent as the default "warm" palette | The direction's palette; if warmth is wanted, find it in the referent |
| Glassmorphism (`backdrop-blur` panels) everywhere | Solid surfaces; blur only over real imagery where legibility needs it |
| Pure grey neutrals | Neutrals tinted toward the direction's hue |
| Colour as the only signal of state | Colour plus icon, text or shape |
