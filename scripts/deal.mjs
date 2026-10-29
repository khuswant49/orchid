#!/usr/bin/env node
// Deals art directions for a brief.
//   node deal.mjs --modes persuade,showcase --brief "portfolio for a frontend developer" [--count 3] [--seed 42]
//                 [--scheme dark|light] [--exclude id,id] [--any]
//   node deal.mjs --record <id> --project <name>      remember a choice (avoids repeats next time)
//   node deal.mjs --list                               list every direction
// History lives in ~/.claude/orchid/history.json (override with ORCHID_HISTORY; disable with ORCHID_NO_HISTORY=1).
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { frontMatter } from './lib/yaml-lite.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const DIR = join(here, '..', 'directions');
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d; };
const flag = (n) => args.includes(`--${n}`);

const HISTORY = process.env.ORCHID_HISTORY || join(homedir(), '.claude', 'orchid', 'history.json');
const useHistory = !process.env.ORCHID_NO_HISTORY;
const readHistory = () => { try { return JSON.parse(readFileSync(HISTORY, 'utf8')); } catch { return []; } };

function load() {
  return readdirSync(DIR).filter((f) => f.endsWith('.md')).map((f) => {
    const md = readFileSync(join(DIR, f), 'utf8');
    const fm = frontMatter(md);
    const idea = (md.match(/## Idea\s+([\s\S]*?)\n## /) || [])[1]?.trim() || '';
    return { ...fm, file: join(DIR, f), idea };
  });
}

// Small seeded PRNG (mulberry32) so a deal can be reproduced with --seed.
function rng(seed) {
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function deal() {
  const all = load();
  const modes = (opt('modes', '') || '').split(',').map((s) => s.trim()).filter(Boolean);
  const brief = (opt('brief', '') || '').toLowerCase();
  const count = Number(opt('count', 3));
  const scheme = opt('scheme');
  const exclude = new Set((opt('exclude', '') || '').split(',').filter(Boolean));
  const seed = Number(opt('seed', Date.now() % 2147483647));
  const rand = rng(seed);
  const any = flag('any');

  const history = useHistory ? readHistory().map((h) => h.id) : [];
  const recent5 = new Set(history.slice(-5)), recent10 = new Set(history.slice(-10));

  const scored = all.filter((d) => !exclude.has(d.id)).map((d) => {
    const dm = d.modes || [];
    const modeHits = modes.filter((m) => dm.includes(m)).length;
    const tagHits = (d.tags || []).filter((t) => brief.includes(String(t).replace(/-/g, ' ')) || brief.includes(String(t))).length;
    let score = any ? 0 : modeHits * 2 + Math.min(tagHits, 3) * 1.5;
    if (!any && scheme && d.scheme === scheme) score += 1;
    if (recent5.has(d.id)) score -= 4; else if (recent10.has(d.id)) score -= 2;
    return { d, score, modeHits, tagHits };
  });

  // Weighted draw without replacement: better fits are likelier, never certain.
  // One direction per family keeps the three genuinely different.
  const T = 1.6;
  const picks = [], families = new Set();
  const draw = (pool) => {
    const avail = pool.filter((s) => !picks.includes(s) && !families.has(s.d.family));
    if (!avail.length) return null;
    const w = avail.map((s) => Math.exp(s.score / T));
    let r = rand() * w.reduce((a, b) => a + b, 0);
    for (let i = 0; i < avail.length; i++) { r -= w[i]; if (r <= 0) return avail[i]; }
    return avail[avail.length - 1];
  };
  // Every pick must fit at least one requested mode (unless --any or no modes given).
  const fits = scored.filter((s) => any || !modes.length || s.modeHits > 0);
  while (picks.length < Math.max(1, count - 1)) { const p = draw(fits); if (!p) break; picks.push(p); families.add(p.d.family); }
  // The last slot is a wildcard: any family not yet dealt that still fits a requested mode.
  const wildPool = scored.filter((s) => any || !modes.length || s.modeHits > 0).map((s) => ({ ...s, score: 0, _orig: s }));
  while (picks.length < count) {
    const avail = wildPool.filter((s) => !picks.some((p) => p.d.id === s.d.id) && !families.has(s.d.family));
    if (!avail.length) break;
    const w = avail[Math.floor(rand() * avail.length)];
    picks.push(w); families.add(w.d.family);
  }

  console.log(`# Dealt directions (seed ${seed})\n`);
  console.log(`Brief: ${brief || '(none)'}\nModes: ${modes.join(', ') || '(any)'}\n`);
  picks.forEach(({ d, modeHits, tagHits }, i) => {
    const dials = d.dials ? Object.entries(d.dials).map(([k, v]) => `${k} ${Array.isArray(v) ? v.join('–') : v}`).join(', ') : '';
    console.log(`## ${i + 1}. ${d.name} (\`${d.id}\`)${i === picks.length - 1 && picks.length > 2 ? ' — wildcard' : ''}`);
    console.log(`Referent: ${d.referent}`);
    console.log(`Mood: ${(d.mood || []).join(', ')} · Scheme: ${d.scheme} · 3D: ${d.affinity3d} · Dials: ${dials}`);
    console.log(`Fit: ${modeHits} mode match(es), ${tagHits} brief keyword(s)`);
    console.log(`${d.idea}`);
    console.log(`File: ${d.file}\n`);
  });
  console.log('Next: read all three files in full, pick one (or show the user in guided mode), set the dials, write the thesis,');
  console.log('then record it: node deal.mjs --record <id> --project <name>');
}

function record() {
  const id = opt('record');
  if (!load().some((d) => d.id === id)) { console.error(`Unknown direction: ${id}`); process.exit(1); }
  if (!useHistory) { console.log('History disabled (ORCHID_NO_HISTORY).'); return; }
  const h = readHistory();
  h.push({ id, project: opt('project', ''), date: new Date().toISOString().slice(0, 10) });
  mkdirSync(dirname(HISTORY), { recursive: true });
  writeFileSync(HISTORY, JSON.stringify(h.slice(-50), null, 2));
  console.log(`Recorded ${id} in ${HISTORY}`);
}

if (flag('list')) {
  for (const d of load()) console.log(`${d.id.padEnd(16)} ${String(d.family).padEnd(10)} ${String(d.scheme).padEnd(6)} ${(d.modes || []).join(',').padEnd(26)} ${d.referent}`);
} else if (opt('record')) record();
else deal();
