# Brief

The brief exists to collect facts only this client has. Those facts are what make the result specific instead of average: a thesis built on "a developer who rebuilt their college's attendance system" can't be reused for anyone else, whereas "modern and clean" fits every site on the web.

## What to establish

| Fact | Why it matters | If missing |
|---|---|---|
| **Audience**: who visits, what they already know, what device | Sets mode, density, vocabulary | Ask |
| **The one job**: what a visit should end with (contact, signup, purchase, understanding) | Decides the primary action and the page's end | Ask |
| **Evidence**: real projects, numbers, testimonials, press, photos, screenshots | Proof beats adjectives; also what must never be faked | Ask for an inventory |
| **Voice**: 3 words for how it should sound, and 1 it must never sound like | Copy and art direction | Offer 3 voice options |
| **Anti-references**: sites or styles to avoid | Prevents a direction the user already dislikes | Optional |
| **References**: 2–3 sites the user admires | Can replace dealing | Optional |
| **Constraints**: deadline, hosting, existing brand, languages, accessibility needs | Stack and scope | Infer from the repo; ask only if unclear |

## How to ask

- Read the repo and any files the user attached first. Never ask for what's already on disk.
- One round of at most 3 questions, a second round only if answers open new gaps.
- Prefer options to open questions when the user seems unsure. Each option gets a one-line trade-off and you mark a recommendation:

> **How should the page open?**
> A. Your best project, full width — recruiters see proof in the first second. *(recommended for job hunting)*
> B. A short statement of who you are — warmer, but proof comes one scroll later.
> C. A live demo of something you built — memorable, but only if a demo exists.

- In fast mode ("just build"), don't ask: state assumptions in one line each at the top of `PRODUCT.md` under "Assumptions", and proceed.

## Evidence inventory

Ask the user to list what exists, then record absences as plainly as presences. For a portfolio this usually means:

- Projects: name, live URL, repo URL, the user's role, stack, one result line ("cut checkout time from 4 s to 1.2 s").
- Screenshots or live URLs (Orchid can capture them with `scripts/capture.mjs`).
- Photo, résumé, contact links.
- Testimonials or recommendations, with permission to quote.

Write "None yet" where nothing exists. Later phases read this section and leave the gap visible instead of filling it.

## PRODUCT.md

Use `templates/PRODUCT.md`. Its headings follow Impeccable's product record (schema 1), so either skill can read it. Keep it factual: no visual decisions belong here; those go in `DESIGN.md`.
