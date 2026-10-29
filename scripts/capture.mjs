#!/usr/bin/env node
// Capture clean screenshots of a live site (e.g. the user's own projects for a portfolio).
//   node capture.mjs <url> --out public/work/my-project [--full]
// Writes <out>-desktop.jpg (1440×900) and <out>-mobile.jpg (390×844), viewport only unless --full.
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { try { ({ chromium } = require(require.resolve('playwright', { paths: [process.cwd()] }))); } catch { console.error('Playwright not found. Run: npm i -D playwright && npx playwright install chromium'); process.exit(2); } }

const args = process.argv.slice(2);
const url = args.find((a) => /^https?:\/\//.test(a));
const out = (() => { const i = args.indexOf('--out'); return i >= 0 ? args[i + 1] : 'capture'; })();
const full = args.includes('--full');
if (!url) { console.log('Usage: capture.mjs <url> --out <path-prefix> [--full]'); process.exit(1); }
mkdirSync(dirname(out) || '.', { recursive: true });

// Common cookie/consent banners, hidden so they don't end up in the portfolio.
const HIDE = `[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i],[aria-label*="cookie" i],#onetrust-banner-sdk,.cc-window,[class*="gdpr" i]{display:none!important}`;

const browser = await chromium.launch();
for (const [name, viewport, mobile] of [['desktop', { width: 1440, height: 900 }, false], ['mobile', { width: 390, height: 844 }, true]]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2, isMobile: mobile, hasTouch: mobile, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  try { await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }); } catch { await page.goto(url, { waitUntil: 'load', timeout: 45000 }).catch(() => {}); }
  await page.addStyleTag({ content: HIDE }).catch(() => {});
  await page.waitForTimeout(1500);
  const file = `${out}-${name}.jpg`;
  await page.screenshot({ path: file, fullPage: full, type: 'jpeg', quality: 85 });
  console.log(`Saved ${file}`);
  await ctx.close();
}
await browser.close();
