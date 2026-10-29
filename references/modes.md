# Page modes

Classify each page (or each section of a mixed page) by what success looks like for the visitor there, not by the product's category. A developer-tools company's landing page is persuade; its docs are read.

| Mode | Visitor's success | Typical pages | Ambition shows as |
|---|---|---|---|
| **Persuade** | Takes one action: contact, sign up, buy | Landing, pricing, campaign, portfolio hero, contact | Bold composition, one peak moment, confident type |
| **Showcase** | Experiences the work itself | Portfolio work section, gallery, case study, product viewer | The artifact leads; the interface recedes |
| **Operate** | Finishes a task quickly and correctly | Dashboards, settings, editors, admin, forms | Precision, density, speed, consistency |
| **Read** | Understands and remembers | Docs, articles, changelogs, blog | Measure, rhythm, hierarchy, comfort |

## Which rules dominate in each mode

✓ = primary rule for this mode · ○ = applies normally · — = relaxed

| Rule (see psychology.md) | Persuade | Showcase | Operate | Read |
|---|---|---|---|---|
| One primary action per viewport | ✓ | ○ | — (many actions are normal) | — |
| Headline + primary action in first viewport | ✓ | ○ | — | — |
| Hick: few competing choices at decision points | ✓ | ○ | ○ (use progressive disclosure) | — |
| Fitts: large, near targets for frequent actions | ○ | ○ | ✓ | ○ |
| Jakob: conventional patterns | ○ (nav) | ○ (nav) | ✓ (everything) | ✓ |
| Gestalt grouping and spacing | ✓ | ✓ | ✓ | ✓ |
| Isolation: accent reserved for the action | ✓ | ○ | ○ (accent = selection/focus) | ○ (accent = links) |
| Peak-end: designed high point and ending | ✓ | ✓ | ○ (success states) | — |
| Goal-gradient: visible progress in multi-step flows | ○ | — | ✓ | ○ (reading progress optional) |
| Doherty: feedback within 100 ms, skeletons past 1 s | ○ | ○ | ✓ | ○ |
| Cognitive load: minimal decoration | ○ | — (the work is the decoration) | ✓ | ✓ |
| Reading measure 45–75 characters | ○ | ○ | ○ | ✓ |
| Motion | Choreographed, one protected moment | Can be rich; the work drives it | Under 300 ms, functional only | Almost none |
| 3D | Accent at most, unless the product *is* 3D | Full scenes allowed when the work is the subject | No, except data that is genuinely spatial | No |
| Density dial | 2–5 | 2–6 | 5–9 | 3–5 |

## Mixed pages

Most real pages mix modes. A portfolio: hero (persuade) → work (showcase) → about (read) → contact (persuade). Plan mode per section; the page's overall job comes from the persuade sections.

When a direction's dial conflicts with a mode (a dense direction on a persuade page), the mode wins on structure (one action, clear hierarchy) and the direction wins on surface (type, colour, texture).

## Mode-specific traps

- **Persuade:** three equal CTAs ("Get started", "Book a demo", "Learn more") side by side. Pick one primary; the rest become quiet links.
- **Showcase:** the interface competing with the work: busy frames, heavy captions, effects on top of screenshots.
- **Operate:** marketing patterns leaking in: hero sections on dashboards, decorative illustrations in empty states that should give instructions, motion on every row.
- **Read:** full-width text, low-contrast grey body copy, headings that look the same as body text.
