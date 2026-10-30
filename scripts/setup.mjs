#!/usr/bin/env node
// Orchid setup: what's installed, what's missing, and the exact commands to fix it.
//   node setup.mjs                 status report (default; changes nothing)
//   node setup.mjs --json          the same, machine-readable
//   node setup.mjs --install <playwright|impeccable|emil|motion|taste> [--project]
//                                  run one installer (only after the user has agreed)
// Skills installed mid-session load in the next Claude Code session; npx-based checks work immediately.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
const SELF_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const versionOf = (root) => { try { return readFileSync(join(root, 'VERSION'), 'utf8').trim(); } catch { return null; } };
const VERSION = versionOf(SELF_ROOT) || 'unknown';
const HOME = homedir();
const CWD = process.cwd();
const scopeProject = args.includes('--project');

const INSTALL = {
  playwright: { why: 'Required: page checks and screenshots', cmds: [['npx', ['--yes', 'playwright', 'install', 'chromium']]] },
  impeccable: {
    why: 'Recommended: 62-rule slop detector on every edit (Claude Code hook), reviews, live variants',
    cmds: [['npx', ['--yes', 'impeccable', 'install', '-y', '--providers=claude', `--scope=${scopeProject ? 'project' : 'global'}`]]],
  },
  emil: {
    why: 'Recommended: review-animations and break-ui (motion review, edge-case fixtures)',
    cmds: [['npx', ['--yes', 'skills@latest', 'add', 'emilkowalski/skills', '--skill', 'review-animations', '--skill', 'break-ui', '-a', 'claude-code', ...(scopeProject ? [] : ['-g']), '-y']]],
  },
  motion: {
    why: "Recommended: Motion's /motion skill plus its free docs server, so Motion APIs come from current docs, not memory",
    cmds: [
      ['npx', ['--yes', 'skills@latest', 'add', 'motiondivision/ai-kit', '--skill', 'motion', '-a', 'claude-code', ...(scopeProject ? [] : ['-g']), '-y']],
      ['claude', ['mcp', 'add', '--transport', 'http', '--scope', scopeProject ? 'project' : 'user', 'motion', 'https://mcp.motion.dev']],
    ],
  },
  taste: {
    why: 'Optional, only if the user wants its own pipeline (slow; its own art-direction dealer)',
    cmds: [['npx', ['--yes', 'skills@latest', 'add', 'https://github.com/Leonxlnx/taste-skill', '--skill', 'design-taste-frontend', '-a', 'claude-code', ...(scopeProject ? [] : ['-g']), '-y']]],
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

function motionMcp() {
  for (const f of [join(HOME, '.claude.json'), join(CWD, '.mcp.json')]) {
    try { if (/mcp\.motion\.dev/.test(readFileSync(f, 'utf8'))) return f; } catch {}
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

// Other copies of Orchid that Claude Code might load instead of this one (e.g. an old upload or a second clone).
function otherCopies() {
  const roots = [join(HOME, '.claude', 'skills'), join(CWD, '.claude', 'skills'), join(HOME, '.agents', 'skills'), join(CWD, '.agents', 'skills')];
  const found = [];
  for (const r of roots) {
    let names; try { names = readdirSync(r); } catch { continue; }
    for (const n of names) {
      const p = join(r, n);
      if (resolve(p) === resolve(SELF_ROOT)) continue;
      if (existsSync(join(p, 'SKILL.md')) && existsSync(join(p, 'scripts', 'deal.mjs')) && /name:\s*orchid/.test(readFileSync(join(p, 'SKILL.md'), 'utf8'))) found.push({ path: p, version: versionOf(p) || 'older than 2026.10.30' });
    }
  }
  return found;
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
    { item: "Motion's skill + docs server", ok: has('motion') && !!motionMcp(), detail: [has('motion') && 'skill', motionMcp() && 'docs server'].filter(Boolean).join(' + ') || 'not installed', fix: has('motion') && motionMcp() ? null : 'motion' },
    { item: 'taste-skill (optional)', ok: true, optional: true, detail: has('design-taste-frontend', 'taste-skill') ? 'installed — Orchid will not call it unless asked' : 'not installed (not needed)', fix: null },
    { item: 'Anthropic frontend-design', ok: true, optional: true, detail: has('frontend-design') ? 'installed — redundant with Orchid; Orchid wins on conflicts' : 'not installed (not needed)', fix: null },
  ];
  return { rows, skills: [...skills] };
}

const run = (key) => {
  const spec = INSTALL[key];
  if (!spec) { console.error(`Unknown installer: ${key}. Choose: ${Object.keys(INSTALL).join(', ')}`); process.exit(1); }
  for (const [cmd, a] of spec.cmds) {
    console.log(`$ ${cmd} ${a.join(' ')}`);
    const r = spawnSync(cmd, a, { stdio: 'inherit', shell: process.platform === 'win32' });
    if (r.status !== 0) { console.error(`\nFailed: ${cmd} ${a.join(' ')}`); process.exitCode = r.status ?? 1; return; }
  }
  console.log(`\nDone. ${key === 'playwright' ? '' : 'Restart Claude Code (or start a new session) so it loads.'}`);
};

const i = args.indexOf('--install');
if (i >= 0) run(args[i + 1]);
else {
  const s = status();
  if (args.includes('--json')) console.log(JSON.stringify({ version: VERSION, root: SELF_ROOT, otherCopies: otherCopies(), ...s }, null, 2));
  else {
    console.log(`Orchid ${VERSION} (${SELF_ROOT})\n`);
    const others = otherCopies();
    if (others.length) {
      console.log('Other copies of Orchid found; Claude Code may load one of these instead:');
      for (const o of others) console.log(`  ${o.version.padEnd(24)} ${o.path}`);
      console.log('  Keep one: remove or update the others. A copy uploaded to claude.ai is separate and only changes when you upload the new package.\n');
    }
    for (const r of s.rows) console.log(`${r.ok ? (r.optional ? ' · ' : ' ✓ ') : ' ✗ '} ${r.item.padEnd(38)} ${r.detail}`);
    const seen = new Set();
    const missing = s.rows.filter((r) => !r.ok && r.fix && !seen.has(r.fix) && seen.add(r.fix));
    const self = new URL(import.meta.url).pathname;
    if (missing.length) {
      console.log('\nTo fix (ask the user before installing anything):');
      for (const r of missing) {
        const spec = INSTALL[r.fix];
        console.log(spec ? `  node ${self} --install ${r.fix}   # ${spec.why}\n${spec.cmds.map(([c, a]) => `      runs: ${c} ${a.join(' ')}`).join('\n')}` : `  ${r.fix}`);
      }
    }
    console.log('\nNo install needed for: npx impeccable detect, npx @google/design.md lint (they run through npx).');
  }
}
