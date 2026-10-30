# Copy and states

Copy is interface. Generic copy is as strong a tell as generic visuals, and missing states are what make a demo-ready page break in production.

## Writing rules

- **Specific beats impressive.** "Rebuilt the college attendance system; 2,000 students use it daily" beats "Passionate full-stack developer crafting delightful experiences".
- **Write from the user's mental model.** "Manage notifications", not "Webhook configuration".
- **CTAs say what happens.** "Save changes", "Email me", "View the case study" — not "Submit", "Get started", "Learn more".
- **Keep action names through the flow.** A "Publish" button produces a "Published" toast, not "Success!".
- **Errors explain and direct.** What happened, why, how to fix it. No apology, no blame, no vagueness: "That email is already registered. Sign in instead?"
- **Empty states invite action.** "No projects yet. Add your first project" with the button, not an illustration and a shrug.
- **Sentence case** for headings and buttons. Title Case Everywhere reads as template.
- Use the voice from `PRODUCT.md`, in the register of the direction's `voice` line. A visual style and a writing style that disagree read as fake (`psychology.md` §13). Read headings aloud: if one could appear on any other site, rewrite it.

## Banned phrases

`check-source.mjs` flags these. They're the averaged language of generated marketing:

supercharge · unlock the power · unleash · seamless(ly) · effortless(ly) · revolutionise/revolutionize · game-changer · next-level · cutting-edge · world-class · best-in-class · leverage (as a verb) · empower · elevate your · in today's fast-paced · take X to the next level · all-in-one platform · built for the future · scale without limits · "Not just X. Y." · "X, reimagined" · "Say goodbye to X" · "Meet X" as an opener · delightful experiences · crafting digital experiences

Also flagged: an em dash in most sentences (a strong generated-text tell), and emoji used as icons in UI.

## Placeholder content

When real content is missing, use placeholders that are obviously placeholders and can't ship by accident:

- Text: `[Project result — e.g. "cut load time from 4 s to 1.2 s"]`
- Images: a neutral block with the needed spec written on it ("Screenshot, 1600×1000, project X home page").
- Mark each with `data-orchid-placeholder` so the check script counts them and the report lists them.

Never fill gaps with invented metrics, testimonials, client names or logos.

## Interactions that work

A polished page whose buttons do nothing is the commonest failure of generated sites. In IWC-Bench (2026: 369 real requests, 5,088 acceptance checks, 16 models), visual quality and working functionality correlated strongly across models but only weakly (0.36) across individual apps: a page that looks finished is weak evidence that it works.

- Every control does something real, or is visibly disabled with the reason.
- Forms submit somewhere real (an API route, a form service, `mailto:`) and show success and error states. If no backend exists yet, say so on the page in a clearly marked placeholder and list it in `needs.md`; never a submit button that silently does nothing.
- Every link resolves (no `#` hrefs, no 404 routes), and no login wall appears unless the brief asked for one.
- Data views use realistic fixtures (see below), never `Item 1`, `John Doe` or `$99.99`.
- Each page plan lists **acceptance checks** (what a visitor can do and see), and verification walks them in the browser.

## States for every data view

Every component that shows data needs these states designed, not just the happy path:

| State | What it shows |
|---|---|
| **Empty, first use** | What this will hold and the action to start |
| **Empty, no results** | Why (filters, search) and how to widen |
| **Loading** | Nothing for waits under ~1 s; a skeleton shaped like the content for ~1–10 s; past ~10 s, a determinate progress indicator with what's happening |
| **Error** | What failed, whether data is safe, retry |
| **Partial** | Some items failed or are missing fields |
| **Overflow** | Very long names, unbroken strings (emails, URLs), huge numbers, 1 item vs 1,000 items, missing optional fields, RTL text, emoji |

### Fixture convention

Make each data page render a state from the URL in development: `?orchid-state=empty|loading|error|long`. The `long` fixture combines worst cases: 80-character names, a 60-character unbroken email, a count of 1,284,903, a single-letter name (breaks two-letter avatar initials), a list of exactly 1 item (breaks pluralisation), and one Arabic or Hebrew label.

`check-page.mjs` loads each state listed in `check.json` and checks for overflow and console errors. If Emil Kowalski's `break-ui` skill is installed, use it on complex components; it builds richer fixtures.
