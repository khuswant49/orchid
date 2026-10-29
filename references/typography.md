# Typography

Type carries most of a page's personality, and default type is the single biggest tell of generated pages.

## Banned as the display face

These are the reflex choices of generated UIs (Impeccable's overused-font list plus common AI picks). Don't use them for display type unless the user's brand already uses them:

Inter, Roboto, Open Sans, Lato, Montserrat, Arial, Helvetica, Poppins, Geist, Geist Mono, Mona Sans, Plus Jakarta Sans, Space Grotesk, Fraunces, Instrument Serif, Instrument Sans, Recoleta, DM Sans, Manrope, Outfit, Sora, Playfair Display, system-ui stacks.

Banning alone just shifts the agent to the next most common font. Each direction in `directions/` names three tested pairings instead; use one of those, or choose with the same logic: **the display face comes from the direction's referent** (a railway board suggests a condensed grotesk; a museum label suggests a quiet humanist sans with a classical serif).

## Pairing

- One display face, one text face, optionally one mono for data or code. Never more than three families.
- Contrast in structure, not just in name: serif display + sans body, or a condensed display + a wide text face. Two similar sans-serifs look like a mistake.
- Check the body face at 16 px on a phone before committing. Display faces often fail as text.
- Free sources: Google Fonts (via `next/font/google` or `@fontsource/*`) and Fontshare. Paid fonts only when the user supplies licences.
- Check Devanagari or other scripts if the audience needs them (Mukta, Hind, Tiro Devanagari, Anek, Rozha One cover Latin + Devanagari).

## Scale

- A modular scale from one ratio: 1.2 (operate), 1.25–1.333 (read), 1.414–1.618 (persuade, showcase). Persuade pages often add one extra-large display size outside the scale for the hero.
- Fluid sizes with `clamp()`, e.g. display `clamp(2.75rem, 1.6rem + 5vw, 6rem)`.
- Body 16–18 px on screens, line height 1.5–1.7 for text, 1.0–1.15 for display.
- Letter-spacing: slightly negative on large display sizes (−0.01 to −0.03 em); never crush it below −0.04 em. Positive tracking (0.04–0.12 em) only on small uppercase labels.
- Measure: 45–75 characters per line for reading text.

## Details that read as crafted

- Real typographic characters: curly quotes ‘ ’ “ ”, apostrophes ’, en dashes for ranges (2024–2026), × for dimensions, non-breaking spaces between numbers and units.
- Tabular figures (`font-variant-numeric: tabular-nums`) in tables, stats and prices.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Hanging punctuation on pull quotes where supported.
- One paragraph rhythm: space between paragraphs *or* first-line indents, never both.
- Weight contrast you can see: 400 body with 600–800 headings, or a single weight with size doing the work. Avoid 500 next to 600.

## Tells to avoid

- An icon in a rounded square above every heading.
- Pill badges or small all-caps labels above every headline.
- One word in the headline set in a different colour or italic serif "for emphasis".
- Every heading the same size as the one above it (flat scale).
- Gradient text.
