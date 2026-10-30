# Companion skills

Orchid works alone. When another design skill is installed (it appears in your available-skills list) or its CLI can run through `npx`, decide per task whether calling it adds something. All of these are MIT or Apache 2.0.

## Installing them

`node <orchid>/scripts/setup.mjs` reports what's installed. Install only with the user's agreement:

| Companion | Command (via `setup.mjs --install <name>`) | Adds |
|---|---|---|
| `playwright` | `npx playwright install chromium` | Required for page checks |
| `impeccable` | `npx impeccable install -y --providers=claude --scope=global` | The skill plus its Claude Code edit hook. Add `--project` to `setup.mjs` for a project-only install |
| `emil` | `npx skills@latest add emilkowalski/skills --skill review-animations --skill break-ui -a claude-code -g -y` | Only the two skills Orchid uses, not all 16 |
| `motion` | `npx skills@latest add motiondivision/ai-kit --skill motion -a claude-code -g -y`, then `claude mcp add --transport http --scope user motion https://mcp.motion.dev` | Motion's `/motion` skill and its free docs server (no account). Motion's own installer, `npx motion-ai`, only runs in an interactive terminal, so Orchid uses these two commands instead |
| `taste` | `npx skills@latest add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend -a claude-code -g -y` | Only if the user wants its pipeline |

If Impeccable's installer can't download its bundle (a proxy or firewall), the alternative is its Claude Code plugin: the user types `/plugin marketplace add pbakaus/impeccable`, then installs it from `/plugin`. New skills load in the next Claude Code session.

## Impeccable's edit hook

With the hook on, Impeccable scans every UI file Claude edits and adds its findings to the conversation; at the end of the turn it runs a deeper pass. Orchid's directions already avoid its overused-font list, so most findings are real problems: fix them. When a finding contradicts a deliberate choice in `DESIGN.md` (say, a direction whose referent uses a gradient), record a narrow exception with its reason instead of fighting the hook:

```bash
npx impeccable ignores add-value <rule-id> <value> --reason "DESIGN.md: <direction> uses this deliberately"
```

Never add an ignore just to make a warning go away. Turn the hook on or off per project with `/impeccable hooks on|off`.

## Avoiding clashes

With both skills installed, a request like "build a landing page" could trigger either. During an Orchid run, don't start Impeccable's `init`, `shape`, `craft` or new-work flows; use its detector, hook, `critique`, `audit`, `harden` and, after the report, `live`. Users can call `/orchid` explicitly to be sure which skill leads.

| Companion | Use it for | Suitable | Not suitable | Conflicts |
|---|---|---|---|---|
| **Impeccable** (pbakaus/impeccable) | `npx impeccable detect`: 62 deterministic slop rules, no LLM calls, works without the skill installed. Its edit hook catches problems while building. `/impeccable critique`, `audit`, `harden`; `/impeccable live` for variants after the build | Detector: every verify phase. Hook: whole build, when installed. Commands: the review route; `live` after the report | Starting a new design: its new-work flow and visual worlds compete with Orchid's dealer | Both read `PRODUCT.md` and `DESIGN.md`; keep the formats compatible |
| **Emil Kowalski's skills** (emilkowalski/skills) | `review-animations` after motion work; `break-ui` to stress-test data components; `animation-vocabulary` when the user describes motion vaguely | Operate-mode UI and component interactions | Art direction, 3D, marketing reveals | Its ~300 ms cap applies to operate-mode UI only; persuade reveals follow motion.md's slower rows |
| **Motion AI Kit** (motiondivision/ai-kit) | Current Motion API docs and examples through its free MCP server, so Motion code comes from the docs for the installed version (Motion changes fast: 14.9 as of 30 Oct 2026); animation best practices; CSS `linear()` spring generation for CSS-only motion | Whenever Orchid writes Motion code | Its insert panel's ready-made sections (heroes, pricing): they're templates and override the direction. Motion+ features (audits, source) are paid: only if the user already has Motion+ | Compatible: it also recommends springs for interruptible motion, no overshoot on serious interfaces, and `<MotionConfig reducedMotion="user">`. For UI chrome, Orchid's no-bounce rule wins; springs with `bounce` ≤ 0.2 are fine for gestures. Never install `motion-plus` without the user's agreement |
| **taste-skill** (Leonxlnx/taste-skill) | Nothing by default | Only when the user asks for its pipeline | Default runs: reportedly 30–45 min per page, its own dealer, house rules (no gradients, no hairlines) that clash with some directions | — |
| **Anthropic frontend-design** | Nothing; Orchid covers its plan-first approach and copy rules | — | Always redundant | If both load, Orchid's rules win |
| **Google design.md CLI** (`@google/design.md`) | `lint` after every DESIGN.md write; `diff` when the system changes | Always | — | None; Orchid uses its format |
| **Three.js skill packs** (e.g. CloudAI-X/threejs-skills) | API detail for complex scenes | Full scenes beyond Orchid's recipes | Accents | Their code must still meet the 3D budget |

## How to use a finding

Companion output is input, not orders. For each finding:
1. Does it apply to this page's mode and the chosen direction? (A "no gradients" finding is wrong for a direction whose referent has gradients.)
2. Does it conflict with the user's instructions or `DESIGN.md`? Then it loses.
3. Otherwise fix it, or reject it with a one-line reason in the report.

## Running them

```bash
npx impeccable detect --json .          # source patterns, from the project root
npx impeccable detect --json http://localhost:3000   # rendered rules (contrast, tiny text)
npx @google/design.md lint DESIGN.md
```
If `npx` can't reach the registry, skip the companion and say so in the report.
