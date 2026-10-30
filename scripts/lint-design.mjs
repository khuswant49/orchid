#!/usr/bin/env node
// Lints DESIGN.md with Google's design.md CLI and makes sure a result actually came back.
//   node lint-design.mjs [DESIGN.md] [--timeout 300]
// On some Windows setups `npx @google/design.md lint` prints nothing and exits 0, which looks like a pass.
// This script runs it with stdin closed; if the output is still empty it calls the package's own entry
// file with node from the npx cache. Empty output after both attempts exits 2: record the lint as NOT RUN.
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d; };
const file = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--timeout') || 'DESIGN.md';
const timeout = Number(opt('timeout', 300)) * 1000;
const WIN = process.platform === 'win32';

if (!existsSync(file)) { console.error(`Not found: ${file}`); process.exit(1); }

const run = (cmd, a) => {
  const r = WIN
    ? spawnSync([cmd, ...a].map((x) => (/\s/.test(x) ? `"${x}"` : x)).join(' '), { shell: true, stdio: ['ignore', 'pipe', 'pipe'], timeout, encoding: 'utf8' })
    : spawnSync(cmd, a, { stdio: ['ignore', 'pipe', 'pipe'], timeout, encoding: 'utf8' });
  return { out: `${r.stdout || ''}${r.stderr || ''}`.trim(), status: r.status, timedOut: r.error?.code === 'ETIMEDOUT' };
};

// 1. The normal way.
let r = run('npx', ['--yes', '@google/design.md', 'lint', file]);
if (r.out) { console.log(r.out); process.exit(r.status ?? 0); }

// 2. Find the package in the npx cache and run its entry file directly.
const cache = run('npm', ['config', 'get', 'cache']).out.split(/\r?\n/).pop();
const npxDir = cache && join(cache, '_npx');
let entry = null, newest = 0;
try {
  for (const d of readdirSync(npxDir)) {
    const pkg = join(npxDir, d, 'node_modules', '@google', 'design.md');
    const bin = ['dist/index.js', 'dist/cli.js', 'bin/index.js'].map((p) => join(pkg, p)).find(existsSync);
    if (bin) { const t = statSync(bin).mtimeMs; if (t > newest) { newest = t; entry = bin; } }
  }
} catch {}
if (entry) {
  r = run(process.execPath, [entry, 'lint', file]);
  if (r.out) { console.log(`(ran ${entry} directly; npx printed nothing)\n${r.out}`); process.exit(r.status ?? 0); }
}

console.error(r.timedOut
  ? `design.md lint timed out after ${timeout / 1000}s. Record the lint as NOT RUN.`
  : 'design.md lint printed nothing. Record the lint as NOT RUN, not as passed.');
process.exit(2);
