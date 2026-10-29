# Slop tells

Patterns that make a page read as generated or templated, grouped by domain, each with what to do instead. Read before building pages and again while looking at screenshots in phase 9. Many are also caught by `check-source.mjs` and `npx impeccable detect`.

## Layout
| Tell | Instead |
|---|---|
| Centred hero → three feature cards → stats row → logo wall → testimonial carousel → CTA band | A structure from the page plan: the order follows the visitor's questions |
| Cards everywhere, cards inside cards, same radius and padding on all of them | Group with space; one surface level; radii and padding from the direction |
| Every section the same width and height | Vary rhythm: full-bleed, narrow statement, split, list |
| Thick coloured left border on cards (`border-l-4`) as decoration | Reserve side stripes for real status (alerts, quotes) |
| Tiny "01 / 02 / 03" labels on every section | Numbers only when order matters |
| Decorative grid lines or dot backgrounds on pages that measure nothing | A ground from the direction |

## Type
| Tell | Instead |
|---|---|
| Inter, Geist, Space Grotesk, Fraunces, Instrument Serif and the rest of the banned list | A pairing from the direction |
| Icon in a rounded square above every heading | No icon, or an icon inline with the text when it adds meaning |
| Pill badge or all-caps micro-label above every headline | Use one only where it carries information (e.g. "New in 2.0") |
| One word in the headline in a different colour or italic serif | Hierarchy through size and weight |
| Flat scale (headings barely bigger than body) | A bold ratio; one display size well outside the scale on persuade pages |
| Gradient text | Solid ink |

## Colour and surface
| Tell | Instead |
|---|---|
| Purple-to-blue gradients, indigo buttons | The direction's palette |
| Dark mode with neon cyan borders, glows and radial halos | Tinted dark ground, restrained accent |
| Cream + terracotta as the "warm" default | The direction's palette |
| Glassmorphism panels | Solid surfaces |
| Hairline border *and* wide soft shadow on the same element | One or the other, per the direction's elevation rules |
| Pure #000 / pure grey | Tinted neutrals |

## Motion and 3D
| Tell | Instead |
|---|---|
| Identical fade-and-slide-up on every block | A few choreographed moments; the rest still |
| Bounce or elastic easing on dialogs and buttons | Strong ease-out |
| Pulsing dots, blinking cursors on static text, unpausable marquees | Stillness; motion only with a job |
| Preloader with a percentage counter | Content on the first frame |
| Floating blob, gradient orb, generic particle field or spinning globe in the hero | A real subject, or no 3D |
| A different effect in every section | One world, one motion personality |
| Long pinned scroll sequences | Short scenes, native scroll speed |

## Copy
| Tell | Instead |
|---|---|
| Banned phrases (see copy-and-states.md) | Specific claims with real evidence |
| "Not just X. Y." slogans | A plain statement of what it does |
| Em dashes in every sentence | Full stops and commas |
| Emoji as icons | Icons from one consistent set, or none |
| "Get started" / "Learn more" everywhere | CTAs that say what happens |

## States and details
| Tell | Instead |
|---|---|
| Only the happy path exists | Empty, loading, error and overflow states designed |
| Demo data that's too neat ("John Doe", round numbers) | Realistic fixtures, including worst cases |
| Focus rings removed | Visible focus styled to the direction |
| Footer with columns of links for a one-page site | A short footer with what's needed |
| Placeholder text left in ("Lorem ipsum", "Your Name") | Real copy or a marked placeholder listed in needs.md |
