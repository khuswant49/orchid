---
name: orchid
description: Designs and builds complete web projects that look deliberately designed rather than AI-generated, from brief and art direction through a design system, every page, motion and optional 3D, to verification in a real browser. Use whenever the user asks to design, build, redesign, restyle or review a website, landing page, portfolio, product page, web app UI, dashboard or docs site; wants it to look professional, premium, unique or "not like AI slop"; mentions 3D, Three.js, React Three Fiber, scroll animation, scroll-scrubbed video or parallax; or asks why a UI looks generic. Use it even when the request is phrased casually ("make me a site for my cafe"). Not for native mobile apps.
---

# Orchid

Orchid turns a request like "build my portfolio" into a finished, verified web project. Three ideas run through everything here:

- **Decide before you code.** Product facts, art direction, tokens and page plans are written to files first. Agents that start with components converge on the statistical average of the web; agents that commit to written decisions don't, and later pages stay consistent with the first.
- **Use psychology that holds up.** The rules in `references/psychology.md` come from replicated research and each one can be measured on a rendered page. Popular claims that don't hold up (7±2 menus, colour emotions, decoy tiers) are filtered out.
- **Verify by measuring and driving the page.** Screenshots alone can't tell a working page from a broken one. `scripts/check-page.mjs` measures the rendered result and drives 3D interactions.

## Non-negotiables

These hold on every route. Each has a reason; when a situation seems to argue against one, the reason tells you whether the exception is real.

1. **Familiar structure, original surface.** People judge a page in 17–50 ms and prefer layouts typical of their category, but like novelty when it's combined with typicality. Keep navigation and page structure conventional; put originality into colour, type, imagery, composition and motion.
2. **Tokens only.** Every colour, size, radius, shadow and duration comes from `DESIGN.md` via the locked Tailwind theme. Raw hex values and arbitrary Tailwind values are how a design system silently dies.
3. **One job per page, one primary action per viewport** on persuade pages. The accent colour marks that action and little else, because emphasis only works against a quiet background (the isolation effect).
4. **Every animation has a job** — guiding attention, showing cause and effect, or confirming an action. Anything triggered 100+ times a day doesn't animate. With reduced motion on, the page shows its finished state.
5. **3D needs a subject and a fallback.** A product, a place, a process, a body of work or a story. "It looks cool" is not a subject. Every 3D element ships with a poster image and a real-DOM equivalent.
6. **Real content only.** Never invent testimonials, metrics, client logos, team members, awards or press. Use clearly marked placeholders and list them in `.orchid/needs.md`. Fabricated proof is both a dark pattern and a credibility risk for the user.
7. **No dark patterns.** See `references/ethics.md`. India's CCPA guidelines name 13 banned patterns; similar rules apply in the EU and US.
8. **Accessibility floor.** WCAG AA contrast, 24×24 px minimum targets (44 px on touch), keyboard access with visible focus, semantic HTML.
9. **Respect what exists.** In an existing project, follow its stack and design system. Never migrate a framework, rewrite a working component library or change existing code on the redesign route without the user's approval.

## How to work with the user

**Guided by default, fast on request.** When the user hasn't decided something that matters (structure, direction, whether to use 3D), offer 2–3 concrete options with the trade-off of each and a recommendation, rather than an open question. If the user says "just build", "your call" or similar, make the calls yourself, state the assumptions in one line each, and keep going.

Ask at most 3 questions per round and at most 2 rounds in the brief. Batch questions; never drip them one at a time. Everything after the brief runs without stopping except at the checkpoints marked ⏸ below.

Tell the user what you need from them. After planning, write `.orchid/needs.md`: each item the build would benefit from (screenshots, a hero video, a photo, real result numbers), with a precise spec and the reason. Build with marked placeholders in the meantime.

## Routes

Phase 1 decides the route. Every route starts by taking stock.

| Request | Route | Phases |
|---|---|---|
| A new project | **New** | 1–10 |
| Redesign or restyle an existing UI | **Redesign** | 1–10. Phase 1 extracts current tokens, content and components. ⏸ No existing code changes before the user approves the plan |
| More pages or features in a project that already has `DESIGN.md` | **Add pages** | 1, then 6–10 |
| "Review this", "why does this look generic?" | **Review** | 1, 9 without fixing, 10 as a prioritised fix list. ⏸ Fix only what the user approves |

## The phases

Each phase lists what to read, what to do and what it writes. Working files live in `.orchid/` in the project root; `PRODUCT.md` and `DESIGN.md` live in the root so other tools (Impeccable, Google's design.md CLI) can read them. In commands, `<orchid>` means this skill's own folder (the base directory Claude Code reports when the skill loads).

### 1. Take stock and route

Read before writing anything:
- `package.json`, framework, Tailwind version and config, existing CSS variables, components folder.
- `PRODUCT.md`, `DESIGN.md`, brand assets (logo, fonts, colours) if present.

Then check the toolchain and companions:
```bash
node <orchid>/scripts/setup.mjs
```
It reports Node, Playwright's Chromium, and which companion skills and hooks are installed, with the exact command for each missing piece. Missing Playwright is required: ask once and install it (`setup.mjs --install playwright`). For missing companions (Impeccable with its edit hook, Emil's `review-animations` and `break-ui`, Motion's skill and docs server), offer them **once**, in one question, with what each adds (see `references/companions.md`). Install only what the user agrees to, with `setup.mjs --install <name>`; installing changes their Claude Code setup, so never do it unasked. In fast mode, don't ask: work without them and say so in the report. Newly installed skills load in the next Claude Code session; the `npx` checks (`impeccable detect`, `@google/design.md lint`) work immediately either way.

Pick the stack:
- **Existing project** → its stack, whatever it is.
- **New multi-page project** → Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui components restyled through tokens. Motion for component interactions, GSAP + ScrollTrigger for scroll choreography, Lenis only on persuade and showcase pages. React Three Fiber + drei on three.js's WebGL renderer for 3D.
- **A single quick page, demo or prototype** → one HTML file with three.js and GSAP as ES modules. No Tailwind: tokens become CSS custom properties copied from `DESIGN.md`, and the React templates are followed by hand (poster image first, scene loaded with a dynamic `import()` when near the viewport).
- WebGPU only when the user asks for it (`references/3d.md` explains why).

Write `.orchid/context.json`: route, stack, existing assets, companions found, tools available.

**While Orchid is running, Orchid owns the design flow.** If Impeccable is installed, don't start its `init`, `shape`, `craft` or new-work flows mid-run; they'd compete with the dealer and the page plans. Its edit hook, detector and review commands are welcome (`references/companions.md` says how to handle their findings).

### 2. Brief ⏸ (only if facts are missing)

Read `references/brief.md`. Establish audience, the project's one job, voice, anti-references, constraints and what real evidence exists (projects, numbers, testimonials). Write `PRODUCT.md` from `templates/PRODUCT.md`. Record absences explicitly ("no testimonials yet") so later phases don't fabricate them.

### 3. Site structure

Read `references/modes.md` and `references/layout.md`. Produce `.orchid/sitemap.md`: every page, its **mode** (persuade, operate, read or showcase), its one job, the 2–3 key journeys, and navigation built on conventional patterns. A page can mix modes by section (a portfolio hero persuades, its work section showcases); note that per section.

### 4. Art direction ⏸ (optional confirm)

Skip when a brand or `DESIGN.md` already exists — work within it.

Otherwise:
```bash
node <orchid>/scripts/deal.mjs --modes persuade,showcase --brief "<one paragraph from PRODUCT.md>"
```
It prints 3 directions from `directions/`, chosen by fit plus a random draw and down-weighted if used recently. Read all three files in full. In guided mode, show the user the three as one line each plus your recommendation; in fast mode, pick. Then:
- Set the three dials (density, contrast, motion, each 1–10) within the direction's ranges, to suit the brief.
- Write the **thesis**: one sentence tying a fact only this client has to the direction. ("A darkroom contact sheet, because this developer's work is best judged screen by screen.")
- Record the choice: `node <orchid>/scripts/deal.mjs --record <id> --project <name>`.

If the user names a direction or gives reference sites, use those instead of dealing.

### 5. Design system

Read `references/design-system.md`, `references/typography.md` and `references/color.md`.
- Write `DESIGN.md` from `templates/DESIGN.md`: colour roles in OKLCH with dark mode, type pairing and scale, spacing, radii, elevation, motion tokens, component tokens, do's and don'ts.
- Generate the locked theme from `templates/theme.css`. It resets Tailwind's default palette, fonts, radii, shadows, type sizes and spacing, so off-system classes (`bg-indigo-500`, `shadow-md`, `p-13`) produce no CSS at all. Tailwind ignores them silently, so `check-source.mjs` is what flags them.
- Check every text/surface pair: `node <orchid>/scripts/contrast.mjs check DESIGN.md`.
- Lint: `npx @google/design.md lint DESIGN.md` (fix every error).
- Build the base components (button, link, input, card, nav, footer) and a specimen page at `/orchid-specimen` (excluded from the sitemap) that shows type scale, colours and components together. Look at it before building pages: problems are cheapest here.

### 6. Page plans

Read `references/psychology.md` and `references/copy-and-states.md`. For each page write `.orchid/pages/<page>.md`:
- mode and one job; the primary action (mark it in code with `data-cta="primary"`);
- section order and hierarchy, with an ASCII wireframe for desktop and mobile;
- the **peak** (one deliberate high point) and the **end** (what the visitor leaves with);
- required states (empty, loading, error, overflow) for every data view;
- draft copy in the product's voice.

Check each plan against its mode's rules in `references/modes.md` before moving on.

### 7. 3D and motion plan

Read `references/motion.md`, and `references/3d.md` if any page might use 3D or a scroll scene. For each page decide: **none**, **accent** (one small scene or shader) or **full scene**, and write down the subject. Then the stack, assets (the user's or CC0), poster image, performance budget, quality tiers and the interactions the check script should probe. Write `.orchid/3d.md`.

Then write `.orchid/needs.md` (see "How to work with the user").

### 8. Build

Order matters, because each layer depends on the previous one being right:
1. Scaffold (new projects only).
2. Tokens and theme. Fonts via `next/font/google`, or the `@fontsource/<name>` npm packages when Google Fonts can't be reached at build time (offline, proxies, CI).
3. Shared components.
4. Pages, most important first. Run `node <orchid>/scripts/check-source.mjs` after each page and fix what it reports before moving on.
5. States and fixtures for data views (`?orchid-state=empty|loading|error|long`, see `references/copy-and-states.md`).
6. Motion. When Motion's docs server is connected, look up the API for the installed version there rather than writing it from memory; don't use its ready-made page sections.
7. 3D and scroll scenes last, as progressive enhancement over a page that already works. Use `templates/three/` as the starting point.
8. Imagery and credits (`references/imagery.md`).

Read `references/slop-tells.md` once before building pages, and again during verification.

### 9. Verify

Run a production build with the test hooks on (dev servers distort performance numbers), then rebuild without them for deployment:
```bash
node <orchid>/scripts/check-source.mjs --root .
NEXT_PUBLIC_ORCHID_PROBES=1 npx next build && npx next start -p 3000
node <orchid>/scripts/check-page.mjs --url http://localhost:3000 --config .orchid/check.json
```
Write `.orchid/check.json` from the sitemap first: pages with their modes and states (format in `scripts/README.md`). For other stacks, use their production build and server in place of the Next.js commands. The markers the checks rely on (`data-cta="primary"`, `data-orchid-placeholder`, `?orchid-state=`) are listed in `scripts/README.md`. The page script tests 390, 768 and 1440 px, a reduced-motion run and a WebGL-disabled run, and writes `.orchid/checks/report.json`, `summary.md` and screenshots.

Add companion checks where suitable (`references/companions.md`): `npx impeccable detect --json .` on the source and on the running URL; Emil's `review-animations` after motion work; `break-ui` on data components.

Then **look** at the screenshots at all three widths against the thesis and `references/slop-tells.md`. Some qualities only a look can catch: rhythm, whether the peak lands, whether it feels like the direction.

Fix the three most severe problems, re-run, look again. Stop after 3 rounds. Anything still failing goes in the report with the reason.

### 10. Report ⏸

Write `.orchid/report.md` and summarise it to the user:

```markdown
# Orchid report: <project>
Route: <route> · Direction: <name> · Thesis: <one sentence>
## Passed
## Trade-offs made
## Still open (with reason)
## Needs from you (from needs.md, still missing)
## Companion findings rejected (finding → reason)
## How to extend
DESIGN.md is the source of truth. For new pages, ask for "more pages with Orchid".
## Next
If Impeccable is installed: `/impeccable live` to pick between variants of any element in the browser.
```

## Reference map

Read a reference when its phase needs it, not all at once.

| File | Read during | Covers |
|---|---|---|
| `references/brief.md` | 2 | Interview questions, guided options, evidence inventory |
| `references/modes.md` | 3, 6 | Persuade / operate / read / showcase rule weights |
| `references/layout.md` | 3, 6, 8 | Grouping, hierarchy, grids, responsive rules |
| `references/design-system.md` | 5 | DESIGN.md, locked theme, token architecture |
| `references/typography.md` | 5 | Pairing, scale, measure, banned defaults |
| `references/color.md` | 5 | OKLCH roles, 60-30-10, dark mode, contrast |
| `references/psychology.md` | 6, 9 | Evidence-rated principles as never/instead + checks; myth filter |
| `references/copy-and-states.md` | 6, 8 | UX writing, banned phrases, states and fixtures |
| `references/motion.md` | 7, 8 | Frequency rule, timing tables, scroll scenes, reduced motion |
| `references/3d.md` | 7, 8 | 3D gate, stack, recipes, budget, tiers, accessibility |
| `references/imagery.md` | 7, 8 | Sourcing, licences, credits, screenshots of the user's work |
| `references/ethics.md` | 6, 9 | Banned dark patterns, honest persuasion |
| `references/slop-tells.md` | 8, 9 | What reads as template, with replacements |
| `references/companions.md` | 1, 9 | When to call other installed skills |

## Who wins a disagreement

The user's instruction, then the project's existing `DESIGN.md`, then Orchid's rules, then companion-skill findings. Companion findings are input, not orders: accept or reject each one and list rejections with a reason in the report.

When Orchid's own rules seem to conflict (a direction's "dense" dial against a persuade page's "one action per viewport"), the mode wins for structure and the direction wins for surface.
