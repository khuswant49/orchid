#!/usr/bin/env node
// Orchid colour helper.
//   node contrast.mjs pair <fg> <bg>                 contrast ratio of two colours
//   node contrast.mjs ramp --hue 250 --chroma 0.12   11-step OKLCH ramp (50–950), gamut-mapped
//   node contrast.mjs check <DESIGN.md | direction.md> [--json]
//        checks every text role against the surfaces it sits on, light and dark
import { readFileSync } from 'node:fs';
import { contrast, fmt, gamutMap, oklchString } from './lib/color.mjs';
import { frontMatter, yamlBlocks } from './lib/yaml-lite.mjs';

const args = process.argv.slice(2);
const cmd = args[0];
const opt = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : dflt;
};

// Text roles and the surfaces each must be readable on. Ratio: 4.5 text, 3 for UI parts.
const PAIRS = [
  ['foreground', 'background', 4.5],
  ['foreground', 'surface', 4.5],
  ['muted-foreground', 'background', 4.5],
  ['muted-foreground', 'surface', 4.5],
  ['muted-foreground', 'muted', 4.5],
  ['surface-foreground', 'surface', 4.5],
  ['primary-foreground', 'primary', 4.5],
  ['primary', 'background', 3],
  ['accent-foreground', 'accent', 4.5],
  ['destructive-foreground', 'destructive', 4.5],
  ['destructive', 'background', 3],
  ['ring', 'background', 3],
  ['link', 'background', 4.5],
];

function paletteSets(file) {
  const md = readFileSync(file, 'utf8');
  const fm = frontMatter(md);
  const blocks = yamlBlocks(md);
  const sets = {};
  // Direction files: ```yaml blocks with light: / dark: maps.
  if (blocks.light) sets.light = blocks.light;
  if (blocks.dark) sets.dark = blocks.dark;
  // DESIGN.md: colors map; dark values as <role>-dark.
  if (fm.colors && typeof fm.colors === 'object') {
    const light = {}, dark = {};
    for (const [k, v] of Object.entries(fm.colors)) {
      if (typeof v !== 'string') continue;
      if (k.endsWith('-dark')) dark[k.slice(0, -5)] = v; else light[k] = v;
    }
    sets.light = { ...light, ...(sets.light || {}) };
    if (Object.keys(dark).length) sets.dark = { ...light, ...dark, ...(sets.dark || {}) };
    // Component pairs: textColor on backgroundColor.
    if (fm.components && typeof fm.components === 'object') {
      const resolve = (v) => {
        const m = typeof v === 'string' && v.match(/^\{colors\.([^}]+)\}$/);
        return m ? fm.colors[m[1]] : v;
      };
      sets.components = [];
      for (const [name, c] of Object.entries(fm.components)) {
        if (c && c.textColor && c.backgroundColor) sets.components.push([name, resolve(c.textColor), resolve(c.backgroundColor)]);
      }
    }
  }
  return sets;
}

function check(file, asJson) {
  const sets = paletteSets(file);
  const rows = [];
  for (const scheme of ['light', 'dark']) {
    const p = sets[scheme];
    if (!p) continue;
    // Extra roles the project added (e.g. `note-foreground` on `note`) are checked too.
    const extra = Object.keys(p).filter((k) => k.endsWith('-foreground') && p[k.slice(0, -11)] && !PAIRS.some(([f]) => f === k)).map((k) => [k, k.slice(0, -11), 4.5]);
    for (const [fg, bg, min] of [...PAIRS, ...extra]) {
      if (!p[fg] || !p[bg]) continue;
      // A palette that defines surface-foreground puts only that text on surfaces.
      if (bg === 'surface' && fg === 'foreground' && p['surface-foreground']) continue;
      const r = contrast(p[fg], p[bg]);
      rows.push({ scheme, pair: `${fg} on ${bg}`, ratio: +fmt(r), min, pass: r >= min });
    }
  }
  for (const [name, fg, bg] of sets.components || []) {
    if (!fg || !bg) continue;
    const r = contrast(fg, bg);
    rows.push({ scheme: 'component', pair: name, ratio: +fmt(r), min: 4.5, pass: r >= 4.5 });
  }
  const failed = rows.filter((r) => !r.pass);
  if (asJson) console.log(JSON.stringify({ file, rows, failed: failed.length }, null, 2));
  else {
    if (!rows.length) console.log(`No colour roles found in ${file}.`);
    for (const r of rows) console.log(`${r.pass ? 'pass' : 'FAIL'}  ${r.scheme.padEnd(9)} ${r.pair.padEnd(38)} ${String(r.ratio).padStart(5)} (min ${r.min})`);
    console.log(failed.length ? `\n${failed.length} pair(s) below minimum.` : `\nAll ${rows.length} pairs pass.`);
  }
  process.exitCode = failed.length ? 1 : 0;
}

function ramp(hue, chroma) {
  const steps = { 50: 0.975, 100: 0.945, 200: 0.89, 300: 0.81, 400: 0.72, 500: 0.63, 600: 0.54, 700: 0.46, 800: 0.38, 900: 0.30, 950: 0.22 };
  for (const [step, L] of Object.entries(steps)) {
    // Less chroma at the extremes keeps light and dark ends clean.
    const shaped = chroma * (1 - Math.pow(Math.abs(L - 0.6) / 0.45, 2) * 0.7);
    const C = gamutMap(L, Math.max(0, shaped), hue);
    console.log(`  --color-x-${step}: ${oklchString(L, C, hue)};`);
  }
}

if (cmd === 'pair') {
  const r = contrast(args[1], args[2]);
  console.log(`${fmt(r)}:1  normal text AA ${r >= 4.5 ? 'pass' : 'fail'} · large text / UI AA ${r >= 3 ? 'pass' : 'fail'} · AAA ${r >= 7 ? 'pass' : 'fail'}`);
} else if (cmd === 'ramp') {
  ramp(Number(opt('hue', 250)), Number(opt('chroma', 0.12)));
} else if (cmd === 'check') {
  check(args[1], args.includes('--json'));
} else {
  console.log('Usage:\n  contrast.mjs pair <fg> <bg>\n  contrast.mjs ramp --hue <deg> --chroma <c>\n  contrast.mjs check <DESIGN.md|direction.md> [--json]');
}
