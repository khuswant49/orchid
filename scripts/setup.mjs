#!/usr/bin/env node
// Orchid setup: what's installed, what's missing, and the exact commands to fix it.
//   node setup.mjs                 status report (default; changes nothing)
//   node setup.mjs --json          the same, machine-readable
//   node setup.mjs --install <playwright|impeccable|emil|taste> [--project]
//                                  run one installer (only after the user has agreed)
// Skills installed mid-session load in the next Claude Code session; npx-based checks work immediately.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
const HOME = homedir();
const CWD = process.cwd();
const scopeProject = args.includes('--project');

const INSTALL = {
  playwright: { why: 'Required: page checks and screenshots', cmd: ['npx', ['--yes', 'playwright', 'install', 'chromium']] },
  impeccable: {
    why: 'Recommended: 62-rule slop detector on every edit (Claude Code hook), reviews, live variants',
    cmd: ['npx', ['--yes', 'impeccable', 'install', '-y', '--providers=claude', `--scope=${scopeProject ? 'project' : 'global'}`]],
  },
  emil: {
    why: 'Recommended: review-animations and break-ui (motion review, edge-case fixtures)',
    cmd: ['npx', ['--yes', 'skills@latest', 'add', 'emilkowalski/skills', '--skill', 'review-animations', '--skill', 'break-ui', '-a', 'claude-code', ...(scopeProject ? [] : ['-g']), '-y']],
  },
  taste: {
    why: 'Optional, only if the user wants its own pipeline (slow; its own art-direction dealer)',
    cmd: ['npx', ['--yes', 'skills@latest', 'add', 'https://github.com/Leonxlnx/taste-skill', '--skill', 'design-taste-frontend', '-a', 'claude-code', ...(scopeProject ? [] : ['-g']), '-y']],
  },
};

// Where Claude Code (and the skills CLI) put skills.
function skillDirs() {
  const roots = [join(HOME, '.claude', 'skills'), join(CWD, '.claude', 'skills'), join(HOME, '.agents', 'skills'), join(CWD, '.agents', 'skills')];
  const found = new Set();
  for (const r of roots) {
    try { for (const n of readdirSync(r)) found.add(n.toLowerCase()); } catch {}
  }
  // Marketplace plugins: ~/.claude/plugins/**/skills/<name>
  const walk = (d, depth) => {
    if (depth > 5) return;
    let entries; try { entries = readdirSync(d); } catch { return; }
    for (const n of entries) {
      const p = join(d, n);
      let st; try { st = statSync(p); } catch { continue; }
      if (!st.isDirectory()) continue;
      if (n === 'skills') { try { for (const s of readdirSync(p)) found.add(s.toLowerCase()); } catch {} }
      else if (n !== 'node_modules' && !n.startsWith('.')) walk(p, depth + 1);
    }
  };
  walk(join(HOME, '.claude', 'plugins'), 0);
  return found;
}

function hookInstalled() {
  for (const f of [join(HOME, '.claude', 'settings.json'), join(CWD, '.claude', 'settings.json'), join(CWD, '.claude', 'settings.local.json')]) {
    try { if (/impeccable/i.test(readFileSync(f, 'utf8'))) return f; } catch {}
  }
  return null;
}

function chromiumReady() {
  const require = createRequire(import.meta.url);
  for (const base of [import.meta.url, join(CWD, 'package.json')]) {
    try {
      const pw = createRequire(base)('playwright');
      const exe = pw.chromium.executablePath();
      return { playwright: true, chromium: !!exe && existsSync(exe) };
    } catch {}
  }
  try { require.resolve('playwright'); return { playwright: true, chromium: false }; } catch { return { playwright: false, chromium: false }; }
}

function status() {
  const node = process.versions.node;
  const nodeOk = Number(node.split('.')[0]) >= 20;
  const pw = chromiumReady();
  const skills = skillDirs();
  const has = (...names) => names.some((n) => skills.has(n));
  const hook = hookInstalled();
  const rows = [
    { item: 'Node ≥ 20', ok: nodeOk, detail: `v${node}`, fix: nodeOk ? null : 'Install Node 20 or later' },
    { item: 'Playwright + Chromium', ok: pw.playwright && pw.chromium, detail: pw.playwright ? (pw.chromium ? 'ready' : 'browser missing') : 'not found', fix: pw.playwright && pw.chromium ? null : 'playwright' },
    { item: 'Impeccable skill', ok: has('impeccable'), detail: has('impeccable') ? 'installed' : 'not installed (its detector still runs via npx)', fix: has('impeccable') ? null : 'impeccable' },
    { item: 'Impeccable edit hook', ok: !!hook, detail: hook ? `in ${hook}` : 'off', fix: hook ? null : has('impeccable') ? 'Run /impeccable hooks on (asks first)' : 'impeccable' },
    { item: "Emil's review-animations + break-ui", ok: has('review-animations') && has('break-ui'), detail: ['review-animations', 'break-ui'].filter((n) => has(n)).join(', ') || 'not installed', fix: has('review-animations') && has('break-ui') ? null : 'emil' },
    { item: 'taste-skill (optional)', ok: true, optional: true, detail: has('design-taste-frontend', 'taste-skill') ? 'installed — Orchid will not call it unless asked' : 'not installed (not needed)', fix: null },
    { item: 'Anthropic frontend-design', ok: true, optional: true, detail: has('frontend-design') ? 'installed — redundant with Orchid; Orchid wins on conflicts' : 'not installed (not needed)', fix: null },
  ];
  return { rows, skills: [...skills] };
}

const run = (key) => {
  const spec = INSTALL[key];
  if (!spec) { console.error(`Unknown installer: ${key}. Choose: ${Object.keys(INSTALL).join(', ')}`); process.exit(1); }
  const [cmd, a] = spec.cmd;
  console.log(`$ ${cmd} ${a.join(' ')}`);
  const r = spawnSync(cmd, a, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status === 0) console.log(`\nDone. ${key === 'playwright' ? '' : 'Restart Claude Code (or start a new session) so the new skill loads.'}`);
  process.exitCode = r.status ?? 1;
};

const i = args.indexOf('--install');
if (i >= 0) run(args[i + 1]);
else {
  const s = status();
  if (args.includes('--json')) console.log(JSON.stringify(s, null, 2));
  else {
    console.log('Orchid setup\n');
    for (const r of s.rows) console.log(`${r.ok ? (r.optional ? ' · ' : ' ✓ ') : ' ✗ '} ${r.item.padEnd(38)} ${r.detail}`);
    const seen = new Set();
    const missing = s.rows.filter((r) => !r.ok && r.fix && !seen.has(r.fix) && seen.add(r.fix));
    const self = new URL(import.meta.url).pathname;
    if (missing.length) {
      console.log('\nTo fix (ask the user before installing anything):');
      for (const r of missing) {
        const spec = INSTALL[r.fix];
        console.log(spec ? `  node ${self} --install ${r.fix}   # ${spec.why}\n      runs: ${spec.cmd[0]} ${spec.cmd[1].join(' ')}` : `  ${r.fix}`);
      }
    }
    console.log('\nNo install needed for: npx impeccable detect, npx @google/design.md lint (they run through npx).');
  }
}
