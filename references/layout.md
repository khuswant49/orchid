# Layout and hierarchy

## Grouping (Gestalt)

- Pick a spacing scale in `DESIGN.md` (e.g. 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px) and use only its steps.
- **Inside a group, gaps are smaller than between groups** — at least one step apart, ideally 1.5–2×. A heading sits closer to its own content than to the section above.
- Group with space first. Add a surface (background or border) only when space can't do the job, e.g. a form field, a clickable card, a code block.
- **One level of surface inside a section.** Cards inside cards, or bordered boxes inside bordered panels, blur the structure because common region competes with itself.

## Hierarchy

Every screen answers three questions in order: what is this, why should I care, what do I do. Make the answer to the first visible from across the room.

- One dominant element per viewport, then a clear second level, then everything else quiet.
- Build hierarchy with **size, weight and position** before colour. Colour is reserved for action and state.
- Use a big jump between the display size and body size (a ratio of 3–6× on persuade pages). A timid scale is a common reason pages look generic.
- Squint test: blur the screenshot; the dominant element and the primary action should still be obvious.

## Grids and composition

- Use a 12-column grid (or 4 on mobile, 8 on tablet) with consistent gutters from the spacing scale.
- Asymmetry reads as designed: 7/5 or 8/4 splits, a headline offset from the column the body sits in, an image breaking the grid on purpose. Centred-everything reads as template.
- Align to edges, not just centres. Text blocks, images and buttons share left edges unless there's a reason not to.
- Vary section rhythm: not every section is "heading, paragraph, three cards". Use full-bleed media, a single large statement, a list, a table, a quote, a split.
- Max content width for reading: 45–75 characters per line. Define it as a token (`--container-measure: 65ch` in `@theme` gives a `max-w-measure` utility) rather than an arbitrary value.

## Navigation

- Logo top-left, linking home. Primary nav top; on mobile, a standard menu button opening a sheet.
- 7 or fewer top-level items as a convention. Group the rest.
- Current page indicated by more than colour (weight, underline, marker).
- Sticky headers only when the page is long and nav is needed often; keep them short (≤ 64 px) and give content room underneath.

## Responsive

- Design mobile and desktop plans in phase 6, not desktop only. Sometimes the mobile version needs a different component (a carousel becomes a list, a side-by-side becomes stacked with reordered content), not just wrapping.
- Breakpoints from content, not devices. Typical: 640, 768, 1024, 1280 px.
- Fluid type and spacing with `clamp()` between breakpoints, defined as tokens.
- Test at 390, 768 and 1440 px (the check script does this). Also check 320 px for reflow (WCAG 1.4.10).
- No horizontal scroll at any width except deliberate, keyboard-accessible horizontal lists.

## Section patterns that don't read as template

| Instead of | Try |
|---|---|
| Centred hero with headline, subline, two buttons and a gradient | Left-aligned headline at display size with the visual breaking the grid on the right; one button |
| Three feature cards with icons | A numbered list with real detail; a split with one large visual; a table comparing before and after |
| Logo wall "Trusted by" with invented logos | Real logos with permission, or nothing; or one specific outcome with a name attached |
| Stats row of big numbers | One number that matters, with its source and context |
| Testimonials carousel | One quote, large, with a real name and role; or none |
| Footer with four columns of links on a small site | Contact, two or three links and the copyright on one line |
