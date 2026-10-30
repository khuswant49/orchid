---
id: passbook
name: Passbook
referent: Bank passbooks, cheque stock and printed statements — guilloche patterns, tabular figures, stamped dates
family: finance
mood: [precise, secure, reassuring]
modes: [operate, persuade, read]
tags: [fintech, bank, finance, payments, insurance, investing, accounting, tax, lending, wallet, upi, money, statement]
affinity3d: none
scheme: light
voice: "Precise and reassuring. Exact figures, dates and fees in full. No hype and no hedging about money."
avoid: []
dials:
  density: [4, 8]
  contrast: [6, 8]
  motion: [1, 3]
---

## Idea
Money interfaces earn trust the way a passbook does: every entry dated, every figure aligned, nothing hidden in the small print. Security printing (fine guilloche lines, tinted cheque stock) gives the surface its character without decoration that distracts from the numbers. Use it for banks, payments, insurance, investing, accounting and tax tools.

## Palette
Pale cheque-stock tint, deep ink-blue for text and actions, and a teal tint for guilloche patterns and selected rows. Gains and losses use semantic tokens with a sign (+/−) and words, never colour alone.

```yaml
light:
  background: oklch(0.978 0.008 185)
  foreground: oklch(0.23 0.03 255)
  surface: oklch(0.993 0.003 185)
  muted: oklch(0.952 0.012 185)
  muted-foreground: oklch(0.46 0.03 250)
  border: oklch(0.88 0.015 200)
  primary: oklch(0.34 0.09 255)
  primary-foreground: oklch(0.985 0.004 185)
  accent: oklch(0.93 0.035 185)
  accent-foreground: oklch(0.33 0.07 195)
  ring: oklch(0.52 0.13 255)
dark:
  background: oklch(0.18 0.02 250)
  foreground: oklch(0.94 0.006 185)
  surface: oklch(0.21 0.022 250)
  muted: oklch(0.24 0.024 250)
  muted-foreground: oklch(0.74 0.015 220)
  border: oklch(0.31 0.026 250)
  primary: oklch(0.82 0.08 240)
  primary-foreground: oklch(0.19 0.04 255)
  accent: oklch(0.28 0.04 195)
  accent-foreground: oklch(0.88 0.05 185)
  ring: oklch(0.74 0.11 240)
```

## Type
1. **Libre Caslon Text** (headings, the banknote serif) + **Public Sans** (text and figures) + **JetBrains Mono** (account and reference numbers).
2. **Spectral** + **Work Sans**.
3. **Martel** + **Hind** (both cover Devanagari).

Tabular figures everywhere numbers appear; amounts right-aligned; currency symbols and minus signs set properly (₹1,20,000, −₹450).

## Layout
- Statements and transaction lists as real tables: date, description, amount, balance; totals ruled off.
- Every fee and rate in the first price shown, with an example calculation.
- Transfers and payments: review screen with every detail, one clear confirm, then a receipt with reference number and timestamp.
- Security information (how money is protected, regulator, grievance contact) linked from every page footer.

## Shape and surface
Radius 4–6 px; hairline borders; flat. Signature move: a fine guilloche band generated in SVG along the top of cards and receipts, in the accent tint at low contrast.

## Imagery
Almost none: the numbers are the content. Diagrams for how a product works; real photos of the team or branch only when true.

## Motion
Minimal: confirmations and focus. Numbers never animate counting up; show the real figure at once.

## 3D
None.

## Traps
Neon-on-black crypto gradients; fake security badges; hidden fees or rates; pre-selected insurance add-ons; confirm-shaming on cancellation; "Get started" on every button; stock handshakes and skylines.
