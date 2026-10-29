# Ethics: persuasion without dark patterns

Dark patterns work — a pre-selected default alone nearly doubled acceptance in one experiment (11.3% → ~20.7%), and aggressive patterns nearly quadrupled it (Luguri & Strahilevitz 2021) — which is why they're now regulated. Orchid persuades with clarity, real evidence and good defaults, and never with deception, pressure or hidden costs.

## Banned patterns

India's CCPA Guidelines for Prevention and Regulation of Dark Patterns (2023) name 13. They apply to any platform offering goods or services in India; similar prohibitions exist under the EU Digital Services Act (Art. 25) and Unfair Commercial Practices Directive, and US FTC Act Section 5, ROSCA and state auto-renewal laws.

| Pattern | What it looks like | Do instead |
|---|---|---|
| False urgency | Countdown timers that reset; invented "only 2 left" | Real deadlines and real stock, or nothing |
| Basket sneaking | Add-ons, donations or insurance added at checkout without consent | Opt-in add-ons, unticked by default |
| Confirm shaming | "No thanks, I don't care about my security" | Neutral decline: "No thanks" |
| Forced action | Requiring sign-up, unrelated purchase or data to do the main task | Let people do the task; ask afterwards |
| Subscription trap | Easy to join, hard to cancel | Cancel in as few steps as joining |
| Interface interference | Hiding or greying the "no" option; misleading visual weight | Both options visible and readable; the recommended one emphasised honestly |
| Bait and switch | Advertising one thing, delivering another | What's shown is what's sold |
| Drip pricing | Fees revealed at the end; "free" features that cost | Full price up front |
| Disguised advertisement | Ads styled as content, reviews or news | Label ads as ads |
| Nagging | Repeated prompts until the user gives in | Ask once; respect "not now" for a reasonable period |
| Trick question | Double negatives, confusing opt-outs | Plain, positive wording |
| SaaS billing | Silent renewals; charges after a free trial without notice | Remind before charging; easy to see and stop |
| Rogue malware | Fake virus warnings, scare tactics | Never |

Also never: fake testimonials or reviews, invented social proof ("23 people are viewing this"), fabricated metrics or client logos, pre-ticked consent boxes for marketing or data sharing.

## Honest persuasion

| Principle | Honest use |
|---|---|
| Social proof | Real, attributable testimonials and numbers, used with permission |
| Scarcity and urgency | Only when true, with the real reason |
| Defaults | Choose the option that's best for the user |
| Emphasis (isolation effect) | Highlight the recommended option; keep alternatives visible |
| Goal-gradient | Accurate progress indicators |
| Peak-end | A good ending earned by a good experience, not a trick |

## Checks

`check-source.mjs` warns on: pre-checked checkboxes near prices or consent text, countdown timers, confirm-shaming phrasing, and placeholder social proof. Each warning needs a human look; the report lists them. This is a summary of public sources, not legal advice.
