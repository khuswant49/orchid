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
const SELF = fileURLToPath(import.meta.url);
const SELF_ROOT = join(dirname(SELF), '..');
const versionOf = (root) => { try { return readFileSync(join(root, 'VERSION'), 'utf8').trim(); } catch { return null; } };
const VERSION = versionOf(SELF_ROOT) || 'unknown';
const HOME = homedir();
const CWD = process.cwd();
const WIN = process.platform === 'win32';
const scopeProject = args.includes('--project');

// Run a command. On Windows, npx/npm/claude are .cmd shims that need a shell; pass one quoted string
// (not args + shell: true, which Node deprecates with DEP0190).
const quote = (a) => (/[\s"&|<>^()]/.test(a) ? `"${a.replace(/"/g, '\\"')}"` : a);
function exec(cmd, a, opts = {}) {
  return WIN ? spawnSync([cmd, ...a].map(quote).join(' '), { shell: true, ...opts }) : spawnSync(cmd, a, opts);
}

// The Claude desktop app doesn't put a `claude` CLI on PATH; the npm package does the same job.
const claudeCli = () => (exec('claude', ['--version'], { stdio: 'ignore' }).status === 0 ? ['claude', []] : ['npx', ['-y', '@anthropic-ai/claude-code']]);

const INSTALL = {
  playwright: {
    why: 'Required: page checks and screenshots',
    // check-page.mjs needs the npm package (resolvable from the project) and the browser.
    cmds: () => [
      ...(existsSync(join(CWD, 'package.json')) ? [['npm', ['i', '-D', 'playwright']]] : []),
      ['npx', ['--yes', 'playwright', 'install', 'chromium']],
    ],
    after: () => (existsSync(join(CWD, 'package.json')) ? '' : 'No package.json here, so only the browser was installed. Run `npm i -D playwright` in the project folder once it exists.'),
  },
  impeccable: {
    why: 'Recommended: 62-rule slop detector on every edit (Claude Code hook), reviews, live variants',
    cmds: () => [['npx', ['--yes', 'impeccable', 'install', '-y', '--providers=claude', `--scope=${scopeProject ? 'project' : 'global'}`]]],
  },
  'impeccable-hook': {
    why: "Impeccable's edit hook for this project (writes .claude/settings.local.json; also adds a project copy of Impeccable)",
    cmds: () => [['npx', ['--yes', 'impeccable', 'install', '-y', '--providers=claude', '--scope=project']]],
  },
  emil: {
    why: 'Recommended: review-animations and break-ui (you run them yourself: /review-animations, /break-ui)',
    cmds: () => [['npx', ['--yes', 'skills@latest', 'add', 'emilkowalski/skills', '--skill', 'review-animations', '--skill', 'break-ui', '-a', 'claude-code', ...(scopeProject ? [] : ['-g']), '-y']]],
  },
  motion: {
    why: "Recommended: Motion's /motion skill plus its free docs server, so Motion APIs come from current docs, not memory",
    cmds: () => {
      const [c, pre] = claudeCli();
      return [
        ['npx', ['--yes', 'skills@latest', 'add', 'motiondivision/ai-kit', '--skill', 'motion', '-a', 'claude-code', ...(scopeProject ? [] : ['-g']), '-y']],
        [c, [...pre, 'mcp', 'add', '--transport', 'http', '--scope', scopeProject ? 'project' : 'user', 'motion', 'https://mcp.motion.dev']],
      ];
    },
    after: () => 'The docs server loads in the next Claude Code session.',
  },
  taste: {
    why: 'Optional, only if the user wants its own pipeline (slow; its own art-direction dealer)',
    cmds: () => [['npx', ['--yes', 'skills@latest', 'add', 'https://github.com/Leonxlnx/taste-skill', '--skill', 'design-taste-frontend', '-a', 'claude-code', ...(scopeProject ? [] : ['-g']), '-y']]],
  },
};

// Where Claude Code (and the skills CLI) put skills: name → folder (first found).
const SKILL_ROOTS = [join(HOME, '.claude', 'skills'), join(CWD, '.claude', 'skills'), join(HOME, '.agents', 'skills'), join(CWD, '.agents', 'skills')];
function skillDirs() {
  const found = new Map();
  const addAll = (dir) => { try { for (const n of readdirSync(dir)) if (!found.has(n.toLowerCase())) found.set(n.toLowerCase(), join(dir, n)); } catch {} };
  for (const r of SKILL_ROOTS) addAll(r);
  // Marketplace plugins: ~/.claude/plugins/**/skills/<name>
  const walk = (d, depth) => {
    if (depth > 5) return;
    let entries; try { entries = readdirSync(d); } catch { return; }
    for (const n of entries) {
      const p = join(d, n);
      let st; try { st = statSync(p); } catch { continue; }
      if (!st.isDirectory()) continue;
      if (n === 'skills') addAll(p);
      else if (n !== 'node_modules' && !n.startsWith('.')) walk(p, depth + 1);
    }
  };
  walk(join(HOME, '.claude', 'plugins'), 0);
  return found;
}

// Skills that only the user can start (SKILL.md front matter: disable-model-invocation: true).
const userOnly = (dir) => { try { return /^disable-model-invocation:\s*true/m.test(readFileSync(join(dir, 'SKILL.md'), 'utf8').split(/^---\s*$/m)[1] || ''); } catch { return false; } };

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

// Playwright's browser cache, so a missing npm package and a missing browser are told apart.
function browserCached() {
  const dirs = [process.env.PLAYWRIGHT_BROWSERS_PATH, WIN ? join(process.env.LOCALAPPDATA || join(HOME, 'AppData', 'Local'), 'ms-playwright') : null,
    join(HOME, '.cache', 'ms-playwright'), join(HOME, 'Library', 'Caches', 'ms-playwright')].filter(Boolean);
  return dirs.some((d) => { try { return readdirSync(d).some((n) => n.startsWith('chromium')); } catch { return false; } });
}

function playwrightStatus() {
  for (const base of [import.meta.url, join(CWD, 'package.json')]) {
    try {
      const pw = createRequire(base)('playwright');
      const exe = pw.chromium.executablePath();
      return { pkg: true, browser: !!exe && existsSync(exe) };
    } catch {}
  }
  return { pkg: false, browser: browserCached() };
}

// Other copies of Orchid that Claude Code might load instead of this one (an old upload, a second clone, a plugin).
function otherCopies() {
  const found = [];
  const consider = (p) => {
    if (resolve(p) === resolve(SELF_ROOT)) return;
    try {
      if (existsSync(join(p, 'scripts', 'deal.mjs')) && /^name:\s*["']?orchid["']?\s*$/m.test(readFileSync(join(p, 'SKILL.md'), 'utf8'))) found.push({ path: p, version: versionOf(p) || 'older than 2026.10.30 (no VERSION file)' });
    } catch {}
  };
  for (const r of SKILL_ROOTS) { let names; try { names = readdirSync(r); } catch { continue; } for (const n of names) consider(join(r, n)); }
  for (const [, dir] of skillDirs()) if (!SKILL_ROOTS.some((r) => resolve(dirname(dir)) === resolve(r))) consider(dir);
  return found;
}

function status() {
  const node = process.versions.node;
  const nodeOk = Number(node.split('.')[0]) >= 20;
  const pw = playwrightStatus();
  const skills = skillDirs();
  const has = (...names) => names.some((n) => skills.has(n));
  const hook = hookInstalled();
  const emilUserOnly = ['review-animations', 'break-ui'].filter((n) => has(n) && userOnly(skills.get(n)));
  const rows = [
    { item: 'Node ≥ 20', ok: nodeOk, detail: `v${node}`, fix: nodeOk ? null : 'Install Node 20 or later' },
    { item: 'Playwright + Chromium', ok: pw.pkg && pw.browser,
      detail: pw.pkg ? (pw.browser ? 'ready' : 'npm package found, browser missing') : pw.browser ? 'browser installed; npm package not found from this project (run `npm i -D playwright` in the project)' : 'not found',
      fix: pw.pkg && pw.browser ? null : 'playwright' },
    { item: 'Impeccable skill', ok: has('impeccable'), detail: has('impeccable') ? 'installed' : 'not installed (its detector still runs via npx)', fix: has('impeccable') ? null : 'impeccable' },
    { item: 'Impeccable edit hook', ok: !!hook, detail: hook ? `in ${hook}` : 'off', fix: hook ? null : has('impeccable') ? 'impeccable-hook' : 'impeccable' },
    { item: "Emil's review-animations + break-ui", ok: has('review-animations') && has('break-ui'),
      detail: (['review-animations', 'break-ui'].filter((n) => has(n)).join(', ') || 'not installed') + (emilUserOnly.length ? ` (user-run only: ask the user to run ${emilUserOnly.map((n) => `/${n}`).join(' and ')}, or apply their STANDARDS.md by hand)` : ''),
      fix: has('review-animations') && has('break-ui') ? null : 'emil' },
    { item: "Motion's skill + docs server", ok: has('motion') && !!motionMcp(), detail: [has('motion') && 'skill', motionMcp() && 'docs server'].filter(Boolean).join(' + ') || 'not installed', fix: has('motion') && motionMcp() ? null : 'motion' },
    { item: 'taste-skill (optional)', ok: true, optional: true, detail: has('design-taste-frontend', 'taste-skill') ? 'installed — Orchid will not call it unless asked' : 'not installed (not needed)', fix: null },
    { item: 'Anthropic frontend-design', ok: true, optional: true, detail: has('frontend-design') ? 'installed — redundant with Orchid; Orchid wins on conflicts' : 'not installed (not needed)', fix: null },
  ];
  return { rows, skills: [...skills.keys()] };
}

function run(key) {
  const spec = INSTALL[key];
  if (!spec) { console.error(`Unknown installer: ${key}. Choose: ${Object.keys(INSTALL).join(', ')}`); process.exit(1); }
  for (const [cmd, a] of spec.cmds()) {
    console.log(`$ ${cmd} ${a.join(' ')}`);
    const r = exec(cmd, a, { stdio: 'inherit' });
    if (r.status !== 0) { console.error(`\nFailed (${r.error ? r.error.message : `exit ${r.status}`}): ${cmd} ${a.join(' ')}`); process.exit(r.status || 1); }
  }
  const note = spec.after?.();
  console.log(`\nDone.${note ? ` ${note}` : ''}${key === 'playwright' ? '' : ' New skills load in the next Claude Code session.'}`);
}

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
      console.log('  Keep one: remove or update the others.\n');
    }
    console.log('A copy uploaded to claude.ai appears in the skill list as anthropic-skills:orchid and only changes when the new package is uploaded.\n');
    for (const r of s.rows) console.log(`${r.ok ? (r.optional ? ' · ' : ' ✓ ') : ' ✗ '} ${r.item.padEnd(38)} ${r.detail}`);
    const seen = new Set();
    const missing = s.rows.filter((r) => !r.ok && r.fix && !seen.has(r.fix) && seen.add(r.fix));
    if (missing.length) {
      console.log('\nTo fix (ask the user before installing anything):');
      for (const r of missing) {
        const spec = INSTALL[r.fix];
        console.log(spec ? `  node "${SELF}" --install ${r.fix}   # ${spec.why}\n${spec.cmds().map(([c, a]) => `      runs: ${c} ${a.join(' ')}`).join('\n')}` : `  ${r.fix}`);
      }
    }
    console.log('\nNo install needed for: npx impeccable detect, and DESIGN.md linting via scripts/lint-design.mjs (both run through npx).');
  }
}
