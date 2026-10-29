# Motion

## Four questions before any animation

1. **How often will someone see it?** Hundreds of times a day (keyboard actions, command palette, list hovers in an app): no animation. Many times per visit (menus, tooltips, accordions): fast and small. Once per visit (hero, section reveal): can take its time.
2. **What job does it do?** Guide attention, show cause and effect, show spatial relationships, confirm an action, or bridge a wait. If none: cut it.
3. **Does it hide content?** If a script fails or reduced motion is on, the content must still be there.
4. **Is it the same as everything else?** The identical fade-and-slide-up on every block is the most cited motion tell of generated pages. Choreograph a few moments; leave the rest still.

## Timing

App UI and marketing pages need different timing. Use the mode.

| Interaction | Duration | Easing |
|---|---|---|
| Visible feedback after any input | start within 100 ms | — |
| Button press | 100–160 ms | ease-out |
| Tooltip, small popover | 125–200 ms | ease-out, from `scale(0.95)` + opacity 0, `transform-origin` at the trigger |
| Dropdown, select | 150–250 ms | ease-out |
| Modal, drawer | 200–500 ms | ease-out; drawers `cubic-bezier(0.32, 0.72, 0, 1)` |
| Element moving on screen | by distance | ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)` |
| Hover colour (marketing) | 200–300 ms | `ease` |
| Small interface moves (marketing) | 300–450 ms | quint/expo out |
| Section reveal, line rise (once) | 600–1,000 ms; fire when the element's top reaches 80–95% of the viewport | expo out `cubic-bezier(0.16, 1, 0.3, 1)` |
| Image opening, wipe | 1,100–1,600 ms | in-out for travelling things |
| Page transition | ≤ 480 ms | off under reduced motion |
| Stagger | 20–40 ms characters, 75–120 ms lines, 50–100 ms list items (UI lists 30–80 ms) | — |
| Springs (drag, gestures, interruptible) | e.g. `{ type: "spring", duration: 0.5, bounce: 0.2 }` | spring |

Operate-mode UI stays under ~300 ms (Emil Kowalski's rule). Persuade and showcase reveals follow the slower rows, which come from measurements of 99 Awwwards Sites of the Day (taste-skill, 2026).

Material 3 tokens for reference: short 50–200 ms, medium 250–400, long 450–600, extra-long 700–1,000; standard `cubic-bezier(0.2, 0, 0, 1)`, emphasized decelerate `cubic-bezier(0.05, 0.7, 0.1, 1)`, emphasized accelerate `cubic-bezier(0.3, 0, 0.8, 0.15)`.

## Rules

- **Never ease-in on entrances.** It starts slow at the moment the user is watching. Ease-in only for short exits.
- **Never `scale(0)`.** Start from `scale(0.9–0.97)` with opacity 0.
- **Animate `transform` and `opacity` only.** Not `width`, `height`, `top`, `left` or margins. Use FLIP or the View Transitions API for layout changes.
- **No bounce or elastic easing on UI.** Overshoot appeared in 19 award stylesheets but ran on only 2.
- **Interruptible.** A menu closed mid-open reverses from where it is.
- **No looping ambient motion near text** (pulsing dots, blinking cursors on static text, auto-scrolling marquees that can't be paused). Motion onset pulls the eye involuntarily.
- **No preloaders** on content pages. The message is readable on the first frame; heavy assets stream in after. In the Awwwards sample, preloaders didn't cover slower pages and only usability fell.
- Durations and curves are tokens in `DESIGN.md`, not literals in components.

## Reduced motion

Put every hidden starting state inside `@media (prefers-reduced-motion: no-preference)` (or `useReducedMotion()` / `gsap.matchMedia()`), so the reduced page *is* the finished page. Under reduced motion:
- Content is visible immediately; reveals don't run.
- Loops stop; scroll scenes show a strong still frame and their text; nothing is pinned.
- Small fades and colour changes are fine; large movement, parallax, zoom and camera flights are not.
- If code waits on `animationend`, shorten durations to ~0.01 ms instead of `animation: none`.

Consider an on-page motion toggle on motion-heavy pages (with `aria-pressed`).

## Which tool

| Need | Tool |
|---|---|
| Component micro-interactions in React | Motion (`motion/react`) |
| Scroll-linked choreography, pinned scenes, timelines | GSAP + ScrollTrigger (free for commercial use, including SplitText) |
| Smooth scrolling | Lenis — persuade and showcase pages only; never on app screens |
| Simple reveals without JS | CSS `animation-timeline: view()` as progressive enhancement (not in Firefox stable as of mid-2026) |
| Page and state transitions | View Transitions API |

## Scroll scenes

A scroll scene pins a section and maps scroll position to a timeline. Use 2–3 per page at most.

- **Keep the scroll speed native.** Changing it is scrolljacking, which disoriented most participants in NN/g's testing (2023), worst on mobile and with text to read.
- **Short:** about one screen per step, three screens per scene at most. Pinned pages in the Awwwards sample were twice as long for fewer words per screen.
- **Below the fold**, not as the first thing people meet.
- **Text in real HTML**, beside or over the scene, never baked into frames or canvas.
- **Mobile gets its own version**, often unpinned.
- **Reduced motion:** no pin, one still frame, all text visible.

### Recipe: scroll-scrubbed frame sequence

A video's frames are drawn to a canvas, and scroll picks the frame (the effect on Apple product pages). Use `templates/three/ScrollSequence.tsx`.

1. **Video:** 3–5 s, locked camera, clean background matching the direction, a real subject (the product, the user's own site in use). If the user makes it with another tool, write them a shot brief: duration, resolution, framing, motion, background, what's on screen.
2. **Frames:**
   ```bash
   ffmpeg -i hero.mp4 -vf "fps=30,scale=1280:-2" -c:v libwebp -quality 75 public/seq/desktop/f_%03d.webp
   ffmpeg -i hero.mp4 -vf "fps=15,scale=720:-2"  -c:v libwebp -quality 70 public/seq/mobile/f_%03d.webp
   ```
3. **Budget:** roughly 5–10 MB for 120 desktop frames. Load frame 1 as a normal `<img>` (it's also the LCP element), stream the rest after the page is interactive, serve half the frames at ~720 px on phones.
4. **Pin** for 2–3 screens at most, `scrub: true`, `ease: 'none'`:
   ```tsx
   <ScrollSequence desktop={{ dir: '/seq/desktop', count: 120 }} mobile={{ dir: '/seq/mobile', count: 60 }}
                   alt="The checkout flow on a phone" screens={2}>
     <p>Overlay text in real HTML</p>
   </ScrollSequence>
   ```
5. **Reduced motion and no JS:** the poster frame and the text, unpinned.

Lighter alternative for short clips: scrub one `<video>` encoded with every frame a keyframe (`ffmpeg -i in.mp4 -c:v libx264 -g 1 -crf 23 -an scrub.mp4`) by setting `currentTime`. One file, less code, but seeking can stutter on some browsers.
