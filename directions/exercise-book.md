---
id: exercise-book
name: Exercise Book
referent: Indian school exercise books, flash cards and classroom charts — ruled lines, bright covers, one clear step at a time
family: learning
mood: [encouraging, clear, playful]
modes: [operate, persuade, read]
tags: [education, edtech, kids, children, school, course, learning, quiz, tutoring, student, coaching, teacher, practice]
affinity3d: accent
scheme: light
voice: "Encouraging and clear, like a good teacher. One instruction per line, an example before the rule, praise for effort, never sarcasm."
avoid: []
dials:
  density: [3, 6]
  contrast: [6, 8]
  motion: [3, 6]
---

## Idea
A good exercise book makes the next step obvious: ruled lines, a margin for notes, a tick when it's right. Learners (children especially) do best with one task in view, schematic pictures without clutter, and feedback that tells them what to do next. Use it for courses, practice apps, tutoring and school sites.

## Palette
Cream paper, fountain-pen blue ink, a notebook-cover blue for actions, and the teacher's red-pen pink kept for marks and highlights. Correct and incorrect use the semantic success and error tokens, never the accent alone.

```yaml
light:
  background: oklch(0.975 0.012 95)
  foreground: oklch(0.27 0.06 262)
  surface: oklch(0.99 0.006 95)
  muted: oklch(0.945 0.018 95)
  muted-foreground: oklch(0.45 0.05 262)
  border: oklch(0.85 0.035 240)
  primary: oklch(0.44 0.15 262)
  primary-foreground: oklch(0.985 0.006 95)
  accent: oklch(0.92 0.05 20)
  accent-foreground: oklch(0.40 0.15 22)
  ring: oklch(0.55 0.17 262)
dark:
  background: oklch(0.20 0.03 262)
  foreground: oklch(0.95 0.012 95)
  surface: oklch(0.23 0.035 262)
  muted: oklch(0.26 0.035 262)
  muted-foreground: oklch(0.76 0.03 250)
  border: oklch(0.34 0.04 262)
  primary: oklch(0.80 0.10 262)
  primary-foreground: oklch(0.20 0.04 262)
  accent: oklch(0.32 0.08 22)
  accent-foreground: oklch(0.90 0.05 20)
  ring: oklch(0.75 0.12 262)
```

## Type
1. **Baloo 2** (headings; Latin and Devanagari) + **Atkinson Hyperlegible Next** (text).
2. **Andika** (designed for early readers) + **Baloo 2** for headings.
3. **Mukta** + **Kalam** (handwritten margin notes only, never body text).

Body 18 px minimum for children, 16–17 px for adults; line height 1.6; generous letter shapes, single-storey "a" helps early readers.

## Layout
- One task per screen in lessons; numbered steps; a progress line that tells the truth ("Question 3 of 8").
- Flash-card sized surfaces for exercises; answers as large buttons (48 px or more).
- A margin column for hints and notes on wider screens.
- Course pages: what you'll be able to do, how long it takes, what it costs, a sample lesson.

## Shape and surface
Radius 10–14 px; card surfaces with a faint ruled-line pattern (procedural, low contrast) on exercise areas only. Signature move: a red-pen tick or circle drawn on in SVG when an answer is checked.

## Imagery
Schematic diagrams and real photos of real things, on plain backgrounds; one clear subject per picture. Children's own work (with permission) beats any illustration pack.

## Motion
Short, rewarding feedback on an answer (200–300 ms), then stillness. Nothing moves while a learner is reading. Reduced motion keeps the feedback as a colour and icon change.

## 3D
Accent: a model the learner can turn or take apart when the concept is spatial (the solar system, a molecule, a geometric solid), with buttons for every action.

## Traps
A cartoon mascot on every screen; rainbow colours on everything; streaks that punish a missed day, loot-box rewards or guilt prompts (manipulative, and a target of the EU's coming Digital Fairness Act); autoplaying video; tiny grey text; ads styled as lessons.
