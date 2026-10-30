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

## Law and enforcement, as of October 2026

What changed recently, and what it means for design. Summarised from public sources; not legal advice.

**India.** The CCPA now fines platforms for the patterns above. Cases disclosed in August 2026 included Zepto (handling charges revealed at checkout; a membership added without clear consent), Physics Wallah (a pre-selected ₹10 donation with persuasive text to keep it), BookMyShow (a pre-selected ₹1 donation), IndiGo (a confirm-shaming opt-out worded "No I will take risk") and others including FirstCry, PharmaEasy, SpiceJet and McAfee. Drip pricing, basket sneaking and confirm shaming have all been enforced against well-known companies, not just named in guidelines.

**European Union.**
- **Withdrawal button** (Directive 2023/2673, applies from 19 June 2026): B2C online contracts that carry a right of withdrawal need a clearly labelled function such as "Withdraw from contract here", easy to find and available for the whole withdrawal period. It leads to a short form (name, contract, how to receive confirmation) and a single unambiguous confirm button, followed by an acknowledgment on a durable medium (email). An account "Cancel" button can qualify only if its label makes the legal right clear and it uses a real two-step confirmation. Some member states prescribe the exact wording.
- **Digital Services Act Art. 25** already bans deceptive interface design on online platforms. A **Digital Fairness Act** proposal is expected from the Commission, aimed at dark patterns across all consumer sites and at addictive design (infinite scroll, autoplay, streaks and loss-framed rewards). It isn't law yet, but design as if it were: it costs nothing to comply early.

**United States.** The FTC's 2024 click-to-cancel rule was vacated by the Eighth Circuit in July 2025, but cancellation obstacles are still prosecuted under ROSCA and the FTC Act, and state laws apply. California's amended Automatic Renewal Law (AB 2863, from July 2025): if someone signed up online, they must be able to cancel online through a prominently located direct link or button; a retention offer is allowed only if the person can still cancel right away.

**What Orchid builds as a result**, for any site that sells subscriptions or contracts:
- A cancellation (or EU withdrawal) path as a designed page in the sitemap, reachable from the account area and the footer, with as few steps as signing up.
- Retention offers, if any, shown with the cancel button on the same screen and equal in visibility.
- The full price, including mandatory fees, in the first price shown.
- Add-ons, donations, insurance and memberships unticked by default.
- No streak penalties, guilt prompts or "you'll lose everything" framing to keep people engaged.

## Accessibility obligations

- **Target WCAG 2.2 AA.** WCAG 3 is still a working draft and its contrast method isn't settled, so APCA doesn't replace the 4.5:1 / 3:1 ratios. CSS `contrast-color()` is Baseline since April 2026 but only picks black or white: use it for colours Orchid doesn't control (user-chosen tags), not instead of a designed palette.
- **Reflow at 320 px** (WCAG 1.4.10, equivalent to 400% zoom on a 1280 px screen): no horizontal scrolling for text content. `check-page.mjs` checks this on every page.
- **European Union:** the European Accessibility Act has applied since 28 June 2025 to e-commerce, banking, transport ticketing, e-books and similar consumer services (harmonised standard EN 301 549, which maps to WCAG AA).
- **India:** in *Rajive Raturi v. Union of India* (November 2024) the Supreme Court ordered mandatory accessibility rules. The draft Rights of Persons with Disabilities (Amendment) Rules, 2026 (published July 2026, consultation stage) would require websites and apps offered to people in India, private as well as government, to conform to IS 17802, publish an Accessibility Conformance Report in human- and machine-readable form, and run a grievance process with a named officer. Government sites already follow GIGW 3.0.
- **What Orchid builds:** for commercial or public-service sites serving India or the EU, an `/accessibility` page in the sitemap (standard followed, known limitations, how to report a problem, a named contact) and a footer link to it. The contact and any conformance report come from the user: list them in `.orchid/needs.md`. Orchid's automated checks catch only part of WCAG; say so in the report and recommend a manual audit with a screen reader for anything regulated.

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
