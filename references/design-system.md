# Design system

`DESIGN.md` is the single source of truth. `theme.css` is generated from it and locks Tailwind to it. Components use semantic tokens only.

## Why lock the theme

An agent with Tailwind's default palette available will eventually write `bg-indigo-500` or `text-gray-600`, and the design system drifts one class at a time. Tailwind v4 lets you reset whole namespaces inside `@theme`, so off-system utilities simply don't exist: `bg-indigo-500`, `text-gray-600`, `shadow-md`, `rounded-lg` and off-scale spacing like `p-13` generate no CSS (verified with Tailwind 4.3). Tailwind skips unknown classes silently rather than failing the build, so `check-source.mjs` reports them as `default-palette-class` and `dead-class`. Prose rules in `DESIGN.md` are context; the reset plus the checker are enforcement.

Spacing is locked too: only the steps defined in the theme exist (`p-4`, `gap-6`, `h-12`…). A class like `h-11` silently does nothing if 11 isn't a step, which is a common source of broken layouts — add the step to `DESIGN.md` or use a neighbouring one.

## Token architecture (two layers)

**Layer 1 — primitives** (inside `@theme`, after the resets): the direction's raw values. Brand ramps (`--color-ink-950`, `--color-signal-500`), font stacks (`--font-display`), radii, shadows, easing curves, durations.

**Layer 2 — semantic roles** (in `:root` and `.dark`, exposed through `@theme inline`): what components use. Names follow shadcn/ui so its components work unchanged:

| Role | Use |
|---|---|
| `background` / `foreground` | Page ground and main text |
| `surface` / `surface-foreground` | Raised areas when space alone can't group (shadcn: `card`) |
| `muted` / `muted-foreground` | Quiet areas and secondary text |
| `primary` / `primary-foreground` | The primary action. Rare by design |
| `accent` / `accent-foreground` | Hover and selection states (shadcn convention), *not* a second brand colour |
| `border`, `input`, `ring` | Lines, field borders, focus ring |
| `destructive`, `success`, `warning` (+ `-foreground`) | States only |

Components use `bg-primary text-primary-foreground`, never primitives. Opacity via `bg-primary/50` (Tailwind v4 compiles this with `color-mix` in OKLab).

## DESIGN.md

Start from `templates/DESIGN.md`. It follows Google's design.md format (YAML tokens at the top, prose sections in this order: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts), plus two Orchid sections that the format preserves: **Direction** (inside Overview) and **Motion**.

Rules for good DESIGN.md content (an analysis of 299 public DESIGN.md files found these were the commonest failures):
- Name colours by role (`surface`, `text-muted`, `action`), not hue (`blue-500`).
- Measurable rules, not adjectives. "Body text 17/28 px, max 68 characters" beats "airy and readable".
- State tokens for components (hover, active, disabled, focus) as separate entries.
- Every "Don't" paired with a "Do instead".

Lint after every write. Expect "orphaned token" warnings for roles no component token references (dark values, ring, border); they're harmless. Fix every **error**. Fluid sizes (`clamp()`) aren't valid design.md dimensions, so store the maximum in the token and the clamp in prose and `theme.css`.
```bash
npx @google/design.md lint DESIGN.md
node <orchid>/scripts/contrast.mjs check DESIGN.md
```

## Arbitrary-value escape hatch

Even with a locked theme, `bg-[#3b82f6]`, `p-[13px]` or `style={{ color: '#6366f1' }}` compile. `check-source.mjs` fails them. If a one-off value is genuinely needed, add a token for it — that's the point at which someone decides whether it belongs in the system.

## Base components (phase 5)

Build these before pages, in the direction's style, with every state:

| Component | States |
|---|---|
| Button (primary, secondary, quiet) | default, hover, active, focus-visible, disabled, loading |
| Link | default, hover, visited (reading pages), focus-visible |
| Input, textarea, select | default, focus, filled, error with message, disabled |
| Card or surface (only if the direction uses surfaces) | default, hover if clickable, focus-visible if clickable |
| Nav (desktop and mobile sheet) | current page, open/closed |
| Footer | — |

Then the specimen page at `/orchid-specimen`: type scale with real sentences, colour roles as swatches with their contrast ratios, every component in every state, light and dark. Look at it at 390 and 1440 px before building pages.

## Using shadcn/ui

shadcn components are a reliable accessible base (Radix primitives), but their default look is one of the most recognisable templates on the web. Always restyle through tokens: radius, border usage, shadow, density and type come from the direction, not from shadcn's defaults. Remove what the direction doesn't use (e.g. borders on cards if the direction groups with space).
