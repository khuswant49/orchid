# Companion skills

Orchid works alone. When another design skill is installed (it appears in your available-skills list) or its CLI can run through `npx`, decide per task whether calling it adds something. All of these are MIT or Apache 2.0.

| Companion | Use it for | Suitable | Not suitable | Conflicts |
|---|---|---|---|---|
| **Impeccable** (pbakaus/impeccable) | `npx impeccable detect`: 62 deterministic slop rules, no LLM calls, works without the skill installed. `/impeccable critique`, `audit`, `harden` | Detector: every verify phase on a web project. Commands: the review route on an existing UI | Starting a new design: its new-work flow and visual worlds compete with Orchid's dealer | Both read `PRODUCT.md` and `DESIGN.md`; keep the formats compatible |
| **Emil Kowalski's skills** (emilkowalski/skills) | `review-animations` after motion work; `break-ui` to stress-test data components; `animation-vocabulary` when the user describes motion vaguely | Operate-mode UI and component interactions | Art direction, 3D, marketing reveals | Its ~300 ms cap applies to operate-mode UI only; persuade reveals follow motion.md's slower rows |
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
