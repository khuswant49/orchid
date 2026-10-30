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

### When the user brings AI-generated media

- **Never** AI-generated people presented as real customers, team members, patients or students.
- **Label** photorealistic AI images or video that show real-looking people, places or events with a visible "AI-generated" note near the media (a caption works). The EU AI Act's transparency duties for this kind of content (Art. 50) apply from 2 August 2026. Clearly stylised or abstract media is exempt from the label but still never pretends to be documentation.
- **Chat widgets** say they're automated in their first message and header.
- **Provenance:** extracting frames for a scroll sequence strips the source file's metadata (C2PA, watermarks). Keep the original video and its provenance in the project's source assets, and note the tool used in `PRODUCT.md` credits.
- India's 2026 IT Rules amendments on synthetic media bind intermediaries (platforms that host other people's uploads). If the site lets users upload images or video, flag the labelling and takedown duties to the user.

## Images must match their text

An image shows what the text beside it describes. If the user's only screenshots show an older version, a different product or a prototype, don't explain the mismatch away in a caption: ask for current screenshots (list them in `needs.md`) and, until they arrive, leave the image out or label it plainly with the user's agreement. Don't infer facts from images (the engine a game was made in, a device model, a client's name); ask.

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
