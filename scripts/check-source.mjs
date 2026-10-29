#!/usr/bin/env node
// Orchid source checks (no browser).
//   node check-source.mjs [--root .] [--out .orchid/checks] [--allow-fonts "Inter,Roboto"] [--json]
// Exit code 1 when any check fails. Warnings need a human look but don't fail.
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const ROOT = opt('root', '.');
const OUT = opt('out', null);
const allowFonts = new Set((opt('allow-fonts', '') || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean));

const SKIP_DIRS = new Set(['node_modules', '.next', 'dist', 'build', 'out', '.git', '.orchid', 'coverage', '.vercel', '.turbo', 'public', '.cache', 'vendor']);
const CODE_EXT = new Set(['.tsx', '.jsx', '.ts', '.js', '.mjs', '.vue', '.svelte', '.astro']);
const STYLE_EXT = new Set(['.css', '.scss', '.sass', '.less']);
const TEXT_EXT = new Set(['.md', '.mdx', '.html']);

const BANNED_FONTS = ['inter', 'inter tight', 'roboto', 'open sans', 'lato', 'montserrat', 'arial', 'helvetica', 'poppins', 'geist', 'geist sans', 'geist mono', 'mona sans', 'plus jakarta sans', 'space grotesk', 'fraunces', 'instrument serif', 'instrument sans', 'recoleta', 'dm sans', 'manrope', 'outfit', 'sora', 'playfair display'];
const BANNED_PHRASES = [
  /supercharg/i, /unlock the (full )?power/i, /\bunleash/i, /\bseamless(ly)?\b/i, /\beffortless(ly)?\b/i,
  /revolutioni[sz]e/i, /game[- ]?chang/i, /next[- ]level/i, /cutting[- ]edge/i, /world[- ]class/i, /best[- ]in[- ]class/i,
  /\bleverag(e|ing) (your|our|the)\b/i, /\bempower(s|ing)?\b/i, /elevate your/i, /in today'?s fast[- ]paced/i,
  /all[- ]in[- ]one platform/i, /built for the future/i, /scale without limits/i, /\bnot just an? [^.!?]{2,40}[.!?]/i,
  /, reimagined\b/i, /say goodbye to/i, /delightful (digital )?experiences/i, /crafting (digital|beautiful) experiences/i,
];
const PALETTE = '(?:slate|gray|grey|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)';
const DEFAULT_PALETTE_CLASS = new RegExp(`\\b(?:bg|text|border|ring|fill|stroke|from|via|to|outline|decoration|divide|placeholder|accent|caret|shadow)-${PALETTE}-\\d{2,3}\\b`, 'g');
const TOKENISH_ARBITRARY = /\b(?:text|bg|border|fill|stroke|ring|shadow|from|via|to|outline|decoration|p[xytrbl]?|m[xytrbl]?|gap(?:-[xy])?|space-[xy]|w|h|min-w|max-w|min-h|max-h|size|rounded(?:-[a-z]+)?|top|left|right|bottom|inset(?:-[xy])?|leading|tracking|font|duration|ease|delay|z|opacity|blur)-\[[^\]\s]+\]/g;
const COLOR_LITERAL = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\([^)]*\)/g;

const findings = [];
const add = (severity, rule, file, line, excerpt, hint) => findings.push({ severity, rule, file, line, excerpt: excerpt?.trim().slice(0, 140), hint });

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') && name !== '.') { if (SKIP_DIRS.has(name) || name === '.git') continue; }
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;
const lineText = (text, idx) => { const s = text.lastIndexOf('\n', idx) + 1; const e = text.indexOf('\n', idx); return text.slice(s, e < 0 ? undefined : e); };

let usesMotion = false, hasReducedMotion = false;

// Locked-theme awareness: find the CSS file with Orchid's @theme resets and collect defined token names.
const theme = { locked: false, radius: new Set(), shadow: new Set(), text: new Set(), spacing: new Set(), color: new Set() };
for (const abs of walk(ROOT)) {
  if (!STYLE_EXT.has(extname(abs))) continue;
  let css; try { css = readFileSync(abs, 'utf8'); } catch { continue; }
  if (!/@theme/.test(css)) continue;
  if (/--color-\*\s*:\s*initial/.test(css)) theme.locked = true;
  for (const [, kind, name] of css.matchAll(/--(radius|shadow|text|spacing|color)-([a-z0-9_.-]+?)\s*:/g)) theme[kind]?.add(name.replace('_', '.'));
}
const FIXED = { rounded: ['none', 'full'], shadow: ['none'], text: ['left', 'right', 'center', 'justify', 'start', 'end', 'wrap', 'nowrap', 'balance', 'pretty', 'ellipsis', 'clip', 'transparent', 'current', 'inherit'] };
function deadClasses(cls) {
  const dead = [];
  for (const c of cls.split(/\s+/)) {
    const base = c.replace(/^([a-z0-9-]+:)+/, '').replace(/^-/, '').replace(/^!/, '');
    let m;
    if ((m = base.match(/^rounded(?:-(?:[trblse]{1,2}))?(?:-([a-z0-9]+))?$/))) { const v = m[1] || 'DEFAULT'; if (v !== 'DEFAULT' && !theme.radius.has(v) && !FIXED.rounded.includes(v)) dead.push(c); }
    else if ((m = base.match(/^shadow-([a-z0-9-]+)$/))) { const v = m[1]; if (!theme.shadow.has(v) && !theme.color.has(v.replace(/\/\d+$/, '')) && !FIXED.shadow.includes(v)) dead.push(c); }
    else if ((m = base.match(/^text-(xs|sm|base|lg|[2-9]?xl)$/))) { if (!theme.text.has(m[1])) dead.push(c); }
    else if ((m = base.match(/^(?:p|m|gap|space|w|h|size|min-w|min-h|max-h|top|left|right|bottom|inset|translate)[xytrblse]?(?:-[xy])?-(\d+(?:\.\d+)?)$/))) { if (!theme.spacing.has(m[1])) dead.push(c); }
  }
  return dead;
}
const files = walk(ROOT).filter((f) => CODE_EXT.has(extname(f)) || STYLE_EXT.has(extname(f)) || TEXT_EXT.has(extname(f)));

for (const abs of files) {
  const file = relative(ROOT, abs) || abs;
  const ext = extname(abs);
  let text; try { text = readFileSync(abs, 'utf8'); } catch { continue; }
  if (text.length > 600_000) continue;
  const is3D = /@react-three|from ['"]three['"]|from ['"]ogl['"]|THREE\./.test(text) || /three|scene|webgl/i.test(file);
  const isConfig = /(^|\/)(tailwind|postcss|next|vite|eslint|prettier)\.config\.|\.d\.ts$/.test(file);
  if (isConfig) continue;

  if (/gsap|motion\/react|framer-motion|@keyframes|animation\s*:|transition\s*:|\banimate-|\btransition-/.test(text)) usesMotion = true;
  if (/prefers-reduced-motion|useReducedMotion|reducedMotion|motion-reduce:|motion-safe:/.test(text)) hasReducedMotion = true;

  // --- Colour and token discipline ---
  if (STYLE_EXT.has(ext)) {
    // Raw colours are fine inside custom-property declarations (tokens) and @theme blocks.
    text.split('\n').forEach((ln, i) => {
      const t = ln.trim();
      if (!t || t.startsWith('--') || t.startsWith('/*') || t.startsWith('*') || t.startsWith('@')) return;
      const m = t.match(/^([a-z-]+)\s*:\s*(.+)$/i);
      if (m && COLOR_LITERAL.test(m[2]) && !/var\(--/.test(m[2])) add('fail', 'raw-colour', file, i + 1, t, 'Use a token: var(--color-…) or a semantic utility.');
      COLOR_LITERAL.lastIndex = 0;
    });
  } else if (CODE_EXT.has(ext)) {
    for (const m of text.matchAll(/(["'`])(#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})|(?:rgba?|hsla?|oklch)\([^)]*\))\1/g)) {
      add(is3D ? 'warn' : 'fail', 'raw-colour', file, lineOf(text, m.index), lineText(text, m.index),
        is3D ? 'In 3D code, read colours from CSS tokens at runtime (see templates/three/tokens.ts).' : 'Use a semantic token class or var(--…).');
    }
    for (const m of text.matchAll(/style=\{\{[^}]*\}\}/g)) {
      if (COLOR_LITERAL.test(m[0])) add('fail', 'inline-style-colour', file, lineOf(text, m.index), m[0], 'Move the colour to a token.');
      COLOR_LITERAL.lastIndex = 0;
    }
  }
  if (CODE_EXT.has(ext) || TEXT_EXT.has(ext)) {
    for (const m of text.matchAll(DEFAULT_PALETTE_CLASS)) add('fail', 'default-palette-class', file, lineOf(text, m.index), m[0], 'Tailwind default palette; use semantic roles (bg-primary, text-muted-foreground).');
    for (const m of text.matchAll(TOKENISH_ARBITRARY)) add('fail', 'arbitrary-value', file, lineOf(text, m.index), m[0], 'Add a token to the theme instead of an arbitrary value.');
    for (const m of text.matchAll(/\b(?:bg|text|border)-(?:white|black)\b/g)) add(theme.locked ? 'fail' : 'warn', 'absolute-colour-class', file, lineOf(text, m.index), m[0], theme.locked ? 'Has no effect under the locked theme; use semantic roles.' : 'Prefer semantic roles so dark mode works.');
    if (theme.locked) {
      for (const m of text.matchAll(/class(?:Name)?=(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g)) {
        const dead = deadClasses((m[1] ?? m[2] ?? m[3] ?? '').replace(/\$\{[^}]*\}/g, ' '));
        if (dead.length) add('fail', 'dead-class', file, lineOf(text, m.index), dead.join(' '), 'Not in the locked theme, so it silently does nothing. Use a token step from DESIGN.md (or add one).');
      }
    }
    for (const m of text.matchAll(/<(a|button|Link|Button)\b[^>]*>\s*(Get started|Learn more|Click here|Submit|Read more|Explore|Discover more)\s*</gi)) add('warn', 'vague-cta', file, lineOf(text, m.index), m[2], 'Say what happens: "Email me", "Start free trial", "Read the case study".');
  }

  // --- Fonts ---
  const fontHits = [];
  for (const m of text.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]next\/font\/google['"]/g)) m[1].split(',').forEach((n) => fontHits.push([n.trim().replace(/_/g, ' '), m.index]));
  for (const m of text.matchAll(/@fontsource(?:-variable)?\/([a-z0-9-]+)/g)) fontHits.push([m[1].replace(/-/g, ' '), m.index]);
  for (const m of text.matchAll(/font-family\s*:\s*['"]?([^,'";]+)/g)) fontHits.push([m[1].trim(), m.index]);
  for (const m of text.matchAll(/--font-[a-z-]+\s*:\s*['"]?([^,'";]+)/g)) fontHits.push([m[1].trim(), m.index]);
  for (const m of text.matchAll(/family=([A-Za-z+]+)/g)) fontHits.push([m[1].replace(/\+/g, ' '), m.index]);
  for (const [name, idx] of fontHits) {
    const n = name.toLowerCase().replace(/\s+as\s+.*/, '').trim();
    if (BANNED_FONTS.includes(n) && !allowFonts.has(n)) add('fail', 'default-font', file, lineOf(text, idx), name, 'A reflex default of generated UIs. Use the direction\'s pairing, or pass --allow-fonts if it is the brand font.');
  }

  // --- Motion ---
  for (const m of text.matchAll(/\bease-in\b(?!-out)|cubic-bezier\(\s*0?\.4\s*,\s*0\s*,\s*1\s*,\s*1\s*\)|power[1-4]\.in\b|["']easeIn["']/g)) add('warn', 'ease-in', file, lineOf(text, m.index), lineText(text, m.index), 'Ease-in only for short exits; entrances use ease-out.');
  for (const m of text.matchAll(/animate-bounce|\belastic\.|\bback\.(?:out|inOut)|\bbounce\.(?:out|inOut)|["']backOut["']|["']anticipate["']/g)) add('fail', 'bounce-easing', file, lineOf(text, m.index), m[0], 'No bounce or elastic easing on UI.');
  for (const m of text.matchAll(/transition(?:-property)?\s*:\s*[^;]*\b(width|height|top|left|right|bottom|margin|padding)\b/g)) add('fail', 'layout-animation', file, lineOf(text, m.index), lineText(text, m.index), 'Animate transform and opacity; use FLIP for layout.');
  for (const m of text.matchAll(/(?:animate|initial|exit)=\{\{[^}]*\b(width|height|top|left|margin)\s*:/g)) add('warn', 'layout-animation', file, lineOf(text, m.index), lineText(text, m.index), 'Prefer transform/opacity or Motion layout animations.');
  for (const m of text.matchAll(/gsap\.(?:to|from|fromTo)\([^)]*\{[^}]*\b(width|height|top|left)\s*:/g)) add('warn', 'layout-animation', file, lineOf(text, m.index), lineText(text, m.index), 'Prefer transform/opacity.');
  for (const m of text.matchAll(/scale\(\s*0\s*\)|\bscale\s*:\s*0\s*[,}]/g)) add('warn', 'scale-zero', file, lineOf(text, m.index), lineText(text, m.index), 'Start from scale 0.9–0.97 with opacity 0.');

  // --- Copy ---
  if (CODE_EXT.has(ext) || TEXT_EXT.has(ext)) {
    const copy = TEXT_EXT.has(ext) ? [[text, 0]] : [...text.matchAll(/>([^<>{}]{12,})</g)].map((m) => [m[1], m.index]).concat([...text.matchAll(/["'`]([A-Z][^"'`]{24,})["'`]/g)].map((m) => [m[1], m.index]));
    let words = 0, dashes = 0;
    for (const [chunk, idx] of copy) {
      words += chunk.split(/\s+/).length; dashes += (chunk.match(/—/g) || []).length;
      for (const re of BANNED_PHRASES) { const m = chunk.match(re); if (m) add('fail', 'slop-phrase', file, lineOf(text, idx), m[0], 'Say the specific thing instead (see copy-and-states.md).'); }
      if (/lorem ipsum/i.test(chunk)) add('fail', 'lorem-ipsum', file, lineOf(text, idx), 'Lorem ipsum', 'Real copy, or a marked placeholder listed in needs.md.');
      if (/\b(John|Jane) Doe\b|acme (corp|inc)/i.test(chunk)) add('warn', 'fake-name', file, lineOf(text, idx), chunk, 'Use realistic fixtures in dev only; never ship fake people or companies.');
      if (/\p{Emoji_Presentation}|\p{Extended_Pictographic}\uFE0F/u.test(chunk) && CODE_EXT.has(ext)) add('warn', 'emoji-icon', file, lineOf(text, idx), chunk, 'Use an icon set, or no icon.');
      if (/no,? thanks?,? i (?:don'?t|do not) (?:want|like|care|need)|i(?:'d| would) rather (?:pay full price|stay)/i.test(chunk)) add('fail', 'confirm-shaming', file, lineOf(text, idx), chunk, 'Neutral decline text: "No thanks".');
      if (/only \d+ left|offer ends|ends in \d|hurry|\d+ (?:people|others) (?:are )?(?:viewing|looking)/i.test(chunk)) add('warn', 'urgency', file, lineOf(text, idx), chunk, 'Only if it is true and live (see ethics.md).');
      if (/trusted by|\d[\d,]*\+? (?:happy )?(?:customers|users|clients|teams|developers)/i.test(chunk)) add('warn', 'social-proof', file, lineOf(text, idx), chunk, 'Must be real and verifiable; otherwise remove.');
    }
    if (words > 150 && dashes / words > 1 / 120) add('warn', 'em-dash-density', file, 1, `${dashes} em dashes in ~${words} words`, 'Use full stops and commas; heavy em-dash use reads as generated.');
    for (const m of text.matchAll(/<input[^>]*type=["']checkbox["'][^>]*(defaultChecked|checked(?:=\{true\})?)[^>]*>/g)) {
      const ctx = text.slice(Math.max(0, m.index - 300), m.index + 300);
      if (/price|₹|\$|€|add-?on|insurance|donat|newsletter|marketing|consent|share (?:my|your) data|subscribe/i.test(ctx)) add('warn', 'pre-checked', file, lineOf(text, m.index), m[0], 'Pre-ticked paid add-ons or consent are banned (basket sneaking).');
    }
    if (/setInterval/.test(text) && /countdown|ends in|time left|expires/i.test(text)) add('warn', 'countdown', file, 1, 'countdown timer', 'Countdowns must reflect a real deadline.');
  }
}

if (usesMotion && !hasReducedMotion) add('fail', 'no-reduced-motion', '(project)', 0, 'Animations found but no prefers-reduced-motion handling anywhere', 'Wrap hidden starting states in prefers-reduced-motion: no-preference, or use useReducedMotion / gsap.matchMedia.');

const placeholderCount = files.reduce((n, f) => { try { return n + (readFileSync(f, 'utf8').match(/data-orchid-placeholder/g) || []).length; } catch { return n; } }, 0);
if (placeholderCount) add('info', 'placeholders', '(project)', 0, `${placeholderCount} marked placeholder(s)`, 'List them in .orchid/needs.md and the report.');

const fails = findings.filter((f) => f.severity === 'fail').length;
const warns = findings.filter((f) => f.severity === 'warn').length;
const result = { root: ROOT, filesScanned: files.length, fails, warns, findings };

if (OUT) { mkdirSync(OUT, { recursive: true }); writeFileSync(join(OUT, 'source.json'), JSON.stringify(result, null, 2)); }
if (args.includes('--json')) console.log(JSON.stringify(result, null, 2));
else {
  const byRule = {};
  for (const f of findings) (byRule[`${f.severity}:${f.rule}`] ||= []).push(f);
  for (const [k, list] of Object.entries(byRule).sort()) {
    console.log(`\n${k.toUpperCase()} (${list.length}) — ${list[0].hint}`);
    for (const f of list.slice(0, 12)) console.log(`  ${f.file}:${f.line}  ${f.excerpt}`);
    if (list.length > 12) console.log(`  … ${list.length - 12} more`);
  }
  console.log(`\nScanned ${files.length} files · ${fails} fail · ${warns} warn`);
}
process.exitCode = fails ? 1 : 0;
