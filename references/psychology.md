# Psychology rules

Each rule below comes from research that has held up, with the evidence level stated. Each has a **never / instead** pair (a ban alone just makes the agent pick the next most common default) and a **check** that `check-page.mjs` or a look can verify.

Evidence: **Strong** = replicated or meta-analysed. **Moderate** = solid single studies, field data or large practitioner studies.

## Contents
1. First impressions (strong)
2. Fitts's law (strong)
3. Hick–Hyman law (strong in lab, limited for UI)
4. Gestalt grouping (strong)
5. Pop-out and isolation (strong)
6. Serial position (strong for recall)
7. Peak-end rule (strong)
8. Goal-gradient (strong, field data)
9. Response time and the Doherty threshold (moderate)
10. Cognitive load and chunking (strong)
11. Conventions — Jakob's law (moderate)
12. Scanning and the fold (moderate)
13. Credibility and aesthetics (strong for performance, moderate for credibility)
14. Myth filter — don't apply these

---

## 1. First impressions

Visitors judge visual appeal in 17–50 ms (Lindgaard et al. 2006; Tuch et al. 2012). Higher visual complexity lowers appeal, and so does low prototypicality — a structurally unusual layout loses even when simple. Complexity explains far more of first-impression appeal than colourfulness (Reinecke & Gajos 2013, 548 people, 450 sites). Typicality and novelty together explained 56% of preference for product designs, and they work best balanced — "most advanced yet acceptable" (Hekkert et al. 2003).

- **Never:** an unconventional page structure to look original (sideways navigation, hidden menus on desktop, content that only appears after interaction).
- **Instead:** conventional structure; originality in type, colour, imagery, composition and one signature move.
- **Never:** many competing elements in the first viewport (badges, stats, logos, three CTAs, background effects).
- **Instead:** the first viewport holds a headline, one supporting line, one primary action and one visual.
- **Check:** count distinct visual elements in the first viewport at 1440 px; look at the screenshot squinting — is there one obvious focal point?

## 2. Fitts's law

Time to hit a target grows with distance and shrinks with size (Fitts 1954; MacKenzie 1992).

- **Never:** small tap targets; primary actions far from where the eye or thumb already is; icon-only buttons under 24 px.
- **Instead:** WCAG 2.2 SC 2.5.8 minimum 24×24 CSS px; 44 px on touch (Apple 44 pt, Material 48 dp). Primary actions large and near the content they act on; on mobile, within thumb reach.
- **Check:** `check-page.mjs` fails targets under 24 px and warns under 44 px at 390 px width (inline text links are exempt).

## 3. Hick–Hyman law

Decision time grows with the log of the number of equally likely, *known* options (Hick 1952; Hyman 1953). It doesn't apply to scanning an unfamiliar list, where time grows linearly (Landauer & Nachbar 1985).

- **Never:** several equal-weight choices at a decision point (three same-styled CTAs; a pricing table with five plans and no recommendation).
- **Instead:** one recommended path visually distinct; secondary options quieter; long lists ordered predictably (alphabetical, frequency) and grouped.
- **Check:** number of primary-styled actions per viewport (persuade: 1); top-level nav items (aim for 7 or fewer, as a convention rather than a law).

## 4. Gestalt grouping

Proximity, similarity, common region, continuity and figure-ground govern what people see as belonging together (Wertheimer 1923; Palmer 1992; Wagemans et al. 2012). Common region (a shared background or border) groups more strongly than proximity, which is why nested cards blur structure.

- **Never:** uniform spacing everywhere; cards inside cards; borders and backgrounds on every group.
- **Instead:** spacing inside a group clearly smaller than between groups (at least 1.5×, from the spacing scale); one level of surface at most inside a section; same function → same look.
- **Check:** `check-page.mjs` compares inner vs outer gaps and fails surface nesting deeper than 2.

## 5. Pop-out and isolation

A unique colour, size or motion is found preattentively, in under about 250 ms (Treisman & Gelade 1980; Healey & Enns 2012). An item is remembered because it differs from a *uniform* context (von Restorff 1933; Hunt 1995). The onset of motion captures attention involuntarily (Abrams & Christ 2003).

- **Never:** the accent colour on decoration, icons, headings and buttons alike; ambient animation near text people are reading; several "highlighted" items per section.
- **Instead:** the accent marks the primary action and at most one other meaningful thing per viewport; motion starts on load or user action, not mid-read.
- **Check:** accent-coloured area per viewport (warn above 15%); count of infinite animations near text.

## 6. Serial position

First and last items in a list are remembered best (Ebbinghaus 1913; Murdock 1962). Evidence for web scanning specifically is weaker, but consistent with eye-tracking.

- **Never:** the strongest project, feature or argument buried in the middle.
- **Instead:** strongest first, second strongest last; nav with the most important items at the ends.
- **Check:** a look at the order in page plans.

## 7. Peak-end rule

People remember an experience mostly by its most intense moment and its end, largely ignoring duration (Kahneman et al. 1993; meta-analysis r = .57 across ~90 studies, Alaybek 2020). The overall average predicts memory about as well, so the rest can't be neglected.

- **Never:** uniform intensity everywhere (every section animated); pages that just stop at a footer.
- **Instead:** one designed peak per page (the best project revealed, the product in motion) and a designed ending (a clear contact block, a success state worth seeing).
- **Check:** page plans name the peak and the end; a look confirms they exist.

## 8. Goal-gradient

Effort speeds up as a goal gets closer; an illusory head start sped completion in a real café (Kivetz, Urminsky & Zheng 2006).

- **Never:** multi-step flows with no sense of progress; fake progress that misstates what's left.
- **Instead:** honest step indicators ("Step 2 of 3"); the first step pre-completed when it genuinely is (account created → "1 of 3 done").
- **Check:** every multi-step flow shows its progress.

## 9. Response time

Under 0.1 s feels instant; under 1 s keeps the train of thought; around 10 s attention is lost (Miller 1968; Card et al. 1991). IBM's 400 ms target kept users in flow (Doherty & Thadani 1982). INP is good at 200 ms or less.

- **Never:** a click with no visible change; spinners for waits under 1 s; blocking full-page loaders.
- **Instead:** visible feedback within 100 ms (pressed state, optimistic update); for waits of about 1–10 s, a skeleton shaped like the coming content; past ~10 s, a determinate progress indicator that says what's happening (NN/g's guidance on skeleton screens).
- **Check:** time from click to first visible change in Playwright; INP in the report.

## 10. Cognitive load and chunking

Extraneous material competes with the task for limited working memory (Sweller 1988). Working memory holds about 4 chunks (Cowan 2001). A 2026 meta-analysis of 50 experiments (20,883 learners) confirmed that interesting but irrelevant material ("seductive details") has a small, significant cost to memory and comprehension, and showed through structural modelling that it works by adding extraneous load (Cheng, Wang et al. 2026, *Educational Psychology Review*). Realism isn't the problem by itself: a realistic picture of the right subject hurt learning when it sat in a rich, irrelevant background (Niesik, Engel-Hermann & Skulmowski 2026, *Applied Cognitive Psychology*).

- **Never:** decoration with no information (floating blobs, stock illustrations, ornamental icons); asking users to remember something from a previous screen.
- **Instead:** group content into meaningful chunks (3–5 items per group as a starting point); keep needed information visible where it's used.
- **Never:** a real subject (product, person, place, 3D model) shown inside a busy scene that has nothing to do with the point.
- **Instead:** the subject on a plain or meaningful background; detail only where the visitor has to tell things apart.
- **Check:** count distinct font sizes and colours per screen against the scale; a look for decoration that carries no meaning.

## 11. Conventions (Jakob's law)

Users spend most of their time on other sites, so they expect familiar patterns (Nielsen 2000). This is a practitioner principle, but the prototypicality research in §1 backs it.

- **Never:** reinvented navigation, scroll direction, link styling, form controls or cart placement.
- **Instead:** logo top-left linking home, nav at the top (or a standard mobile menu), links that look like links, native-feeling form controls. Novelty goes into the surface.
- **Check:** landmarks (`header`, `nav`, `main`, `footer`) present; logo links to `/`.

## 12. Scanning and the fold

The F-pattern is what users fall into when a page gives no structure — a failure mode, not a target (NN/g 2006, 2017). About 57% of viewing time is above the fold and 74% within the first two screens (NN/g 2018).

- **Never:** walls of text; headings that don't say anything; the key message below the fold.
- **Instead:** front-loaded headings that carry the point; short paragraphs; the key message and action in the first viewport; the second-most-important content in the second screen.
- **Check:** h1 and the primary action visible in the first viewport (persuade pages).

## 13. Credibility and aesthetics

In a Stanford / Consumer WebWatch study (2,684 people), 46.1% of comments about a site's credibility mentioned its visual design, more than any other factor (Fogg et al. 2002). Polish is a trust signal. After real use, though, usability shapes perceived beauty more than the reverse (Tuch et al. 2012), so polish can't cover for broken flows.

Good looks also help people *perform*, not just judge: a 2026 meta-analysis of 31 experiments (18,794 participants) found a small-to-medium positive effect of visual aesthetics on objective speed, accuracy and efficiency, larger than the 2019 estimate, and no evidence that attractive design impairs performance (Schlamann, Nestler & Thielsch 2026, *International Journal of Human–Computer Interaction*). Treat design quality as part of usability, on operate pages too.

Words and visuals are read together. In a 2026 qualitative study of digital health services, users took consistency between visual style and writing register as a sign of expertise (*Healthcare* 14(7):964; moderate evidence, but it matches the credibility research above). A restrained, editorial layout with breathless marketing copy reads as fake.

- **Never:** inconsistent spacing, misaligned edges, broken states, placeholder text left in production.
- **Instead:** exact alignment to the grid, consistent tokens, every state designed.
- **Never:** copy whose register fights the direction (hype on a museum-label page, jokes on a patient-leaflet page).
- **Instead:** write in the direction's `voice` (front matter of each direction file), adjusted by the voice words in `PRODUCT.md`.
- **Check:** read the h1 and the primary button aloud next to the screenshot; they should sound like the same author.

## 14. Myth filter — don't apply these

| Claim | What the evidence shows | Do instead |
|---|---|---|
| "Menus need 7±2 items" | Miller studied recall; visible menus are recognised. Capacity is ~4 chunks anyway | Chunk and group; no magic number |
| "Blue builds trust, red creates urgency" | Colour psychology is underpowered and inconsistent (Elliot 2015) | Use colour for contrast, hierarchy and convention (red = error) |
| "Fewer choices always convert better" | Meta-analysis: mean effect ≈ 0 (Scheibehenne et al. 2010); overload only under specific conditions | Reduce choices when the set is complex, preferences are unclear and the visitor must decide now |
| "Add a decoy pricing tier" | Appeared with numeric attributes, in none of 27 studies with perceptual ones (Frederick et al. 2014) | Present honest tiers with one clear recommendation |
| "Unfinished tasks are remembered better" (Zeigarnik) | Not supported by a 2025 meta-analysis; people do tend to *resume* tasks | Offer "continue where you left off"; don't rely on memory |
| "Design for the F-pattern" | It's a failure mode | Design so people don't fall into it |
| "Every page within 3 clicks" | 44 users, 620 tasks: more clicks didn't reduce success or satisfaction | Make each click obviously right |
| "Attention span is 8 seconds" | Untraceable statistic; attention is task-dependent and stable | Earn attention with relevance |
| "Beautiful = usable" | True before use; after use, usability shapes beauty | Do both |

Full sources: the Orchid research report (UI Psychology and Web 3D).
