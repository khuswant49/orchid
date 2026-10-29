# Imagery

Real photographs and real screenshots carry information; generic illustrations and AI-generated people carry none, and visitors recognise them instantly.

## Order of preference

1. **The user's own material:** product photos, screenshots of their work, team photos, places.
2. **Captured by Orchid:** screenshots of the user's live sites with `scripts/capture.mjs` (desktop and mobile, clean viewport, no cookie banners if avoidable).
   ```bash
   node <orchid>/scripts/capture.mjs https://example.com --out public/work/example
   ```
3. **Open archives:** Openverse, Wikimedia Commons, museum open-access collections (Met, Smithsonian, Rijksmuseum) — public domain, CC0, CC BY, CC BY-SA. Check each item's licence.
4. **Procedural or typographic visuals** made in code: patterns, diagrams, data, type as image.
5. **A marked placeholder** with the spec written on it, listed in `.orchid/needs.md`.

Orchid doesn't generate images or video with AI. If the user wants to, write them a precise brief for their tool instead.

## Credits

CC BY and CC BY-SA require attribution. Keep a `credits` list in `PRODUCT.md` (title, author, source URL, licence) and render it on a credits page or in the footer. CC0 and public domain need no credit, but crediting is good practice.

## Treatment

Follow the direction's imagery section: crop, colour treatment, framing, captions. General rules:
- Consistent aspect ratios within a set.
- `next/image` (or `<img>` with `width`, `height`, `loading="lazy"`, `decoding="async"`) so layout doesn't shift.
- AVIF or WebP; hero images ≤ 200 KB where possible; responsive `sizes`.
- Meaningful `alt` text; empty `alt=""` for decorative images.
- Screenshots of work: show the real thing at a readable size, framed simply. No fake device mockups at odd angles that make the work unreadable.

## Tells to avoid

- Abstract 3D blobs, gradient orbs and "floating shapes" as hero art.
- Stock photos of people pointing at screens or shaking hands.
- Isometric illustration packs, "friendly diverse team of floating torsos".
- Hand-drawn SVG "sketches" pretending to be illustration (diagrams and crisp geometry are fine).
- The same image style the user's competitors use.
