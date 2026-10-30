---
version: alpha
name: REPLACE project name
description: REPLACE one line — the direction and thesis
colors:
  background: "oklch(0.985 0.002 250)"
  foreground: "oklch(0.21 0.008 260)"
  surface: "oklch(0.995 0.001 250)"
  surface-foreground: "oklch(0.21 0.008 260)"
  muted: "oklch(0.965 0.004 250)"
  muted-foreground: "oklch(0.48 0.01 260)"
  primary: "oklch(0.25 0.012 260)"
  primary-foreground: "oklch(0.985 0.002 250)"
  accent: "oklch(0.95 0.025 255)"
  accent-foreground: "oklch(0.30 0.10 258)"
  destructive: "oklch(0.52 0.19 27)"
  destructive-foreground: "oklch(0.99 0.002 250)"
  border: "oklch(0.90 0.005 250)"
  ring: "oklch(0.55 0.15 258)"
  background-dark: "oklch(0.17 0.006 260)"
  foreground-dark: "oklch(0.94 0.004 250)"
  surface-dark: "oklch(0.20 0.007 260)"
  surface-foreground-dark: "oklch(0.94 0.004 250)"
  muted-dark: "oklch(0.23 0.008 260)"
  muted-foreground-dark: "oklch(0.70 0.008 250)"
  primary-dark: "oklch(0.94 0.004 250)"
  primary-foreground-dark: "oklch(0.17 0.006 260)"
  accent-dark: "oklch(0.28 0.04 258)"
  accent-foreground-dark: "oklch(0.90 0.05 255)"
  destructive-dark: "oklch(0.68 0.17 27)"
  destructive-foreground-dark: "oklch(0.16 0.006 260)"
  border-dark: "oklch(0.29 0.009 260)"
  ring-dark: "oklch(0.70 0.13 255)"
typography:
  display:
    fontFamily: REPLACE display face
    fontSize: 6rem
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.02em
  h2:
    fontFamily: REPLACE display face
    fontSize: 2.441rem
    fontWeight: 650
    lineHeight: 1.1
  h3:
    fontFamily: REPLACE display face
    fontSize: 1.5625rem
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: REPLACE text face
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: REPLACE text face
    fontSize: 0.8125rem
    fontWeight: 600
    letterSpacing: 0.04em
  mono:
    fontFamily: REPLACE mono face
    fontSize: 0.875rem
rounded:
  none: 0px
  sm: 4px
  md: 8px
  full: 9999px
spacing:
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "6": 24px
  "8": 32px
  "12": 48px
  "16": 64px
  "24": 96px
  "32": 128px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.sm}"
    padding: 12px 20px
    height: 44px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
  button-secondary:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    height: 44px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.surface-foreground}"
    rounded: "{rounded.sm}"
    height: 44px
---

## Overview

REPLACE: two or three sentences describing the feel in concrete terms.

### Direction
- **Direction:** REPLACE (e.g. Darkroom, from Orchid's catalog)
- **Thesis:** REPLACE one sentence tying a fact only this client has to the direction.
- **Dials:** density REPLACE, contrast REPLACE, motion REPLACE (1–10)
- **Signature move:** REPLACE the one memorable thing this site does.

## Colors

Roles, not hues. Dark values carry the `-dark` suffix in the tokens above.

- **Background / foreground:** REPLACE where and why.
- **Primary:** the primary action only (and focus). Used at most once per viewport.
- **Accent:** hover and selection states.
- **Destructive:** errors and destructive actions only.

## Typography

- **Display:** REPLACE face, why it fits the referent, where it's used.
- **Text:** REPLACE face, size, measure (max 65ch).
- **Mono:** REPLACE — data, code, labels.
- Scale ratio REPLACE. Tabular figures in tables and stats. Sentence case.
- The display size above is its maximum; in CSS it is fluid: `clamp(2.75rem, 1.6rem + 5vw, 6rem)` (design.md tokens don't accept clamp()).

## Layout

- 12-column grid on desktop (gutter 24px), 4 on mobile (gutter 16px).
- Spacing only from the scale. Inside a group is at least one step tighter than between groups.
- Content width `content` (72rem); reading width `measure` (65ch).
- REPLACE direction-specific layout rules.

## Elevation & Depth

- REPLACE (e.g. "No shadows on content. Floating layers — menus, dialogs — use `shadow-float`.")

## Shapes

- REPLACE radii rules (e.g. "Square everywhere except pills for tags").

## Components

- Buttons: primary (one per viewport on persuade pages, marked `data-cta="primary"`), secondary, quiet. Height 44px.
- Every interactive component has hover, active, focus-visible and disabled states.
- REPLACE other components and their rules.

## Motion

```text
motion:
  ease-out: cubic-bezier(0.23, 1, 0.32, 1)
  ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)
  ease-expo: cubic-bezier(0.16, 1, 0.3, 1)
  press: 140ms
  ui: 200ms
  reveal: 800ms
```

- Personality: REPLACE (tempo and curve family from the direction).
- Signature move: REPLACE.
- Reduced motion: content visible immediately, loops stopped, scroll scenes show a still.

## Do's and Don'ts

| Don't | Do instead |
|---|---|
| REPLACE | REPLACE |
| Raw colours or arbitrary Tailwind values | Add a token here, then use it |
| The accent on decoration | Accent only on the primary action and focus |
