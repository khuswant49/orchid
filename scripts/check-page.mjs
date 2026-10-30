#!/usr/bin/env node
// Orchid rendered-page checks (Playwright + Chromium).
//   node check-page.mjs --url http://localhost:3000 [--config .orchid/check.json] [--pages /,/work]
//                       [--mode persuade] [--out .orchid/checks] [--no-perf] [--widths 390,768,1440]
// Writes report.json, summary.md and screenshots to --out. Exit code 1 when any check fails.
// Install the browser once: npx playwright install chromium
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch {
  try { ({ chromium } = require(require.resolve('playwright', { paths: [process.cwd()] }))); }
  catch { console.error('Playwright not found. Run: npm i -D playwright && npx playwright install chromium'); process.exit(2); }
}

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d; };
const flag = (n) => args.includes(`--${n}`);
const BASE = (opt('url', 'http://localhost:3000')).replace(/\/$/, '');
const OUT = opt('out', '.orchid/checks');
const configPath = opt('config', existsSync('.orchid/check.json') ? '.orchid/check.json' : null);
const config = configPath ? JSON.parse(readFileSync(configPath, 'utf8')) : {};
const WIDTHS = (opt('widths', null)?.split(',').map(Number)) || config.widths || [390, 768, 1440];
const pages = config.pages || (opt('pages', '/').split(',').map((p) => ({ path: p.trim(), mode: opt('mode', 'persuade') })));
const doPerf = !flag('no-perf') && config.perf !== false;
mkdirSync(join(OUT, 'screens'), { recursive: true });

const results = [];
const record = (page, width, run, id, status, detail, data) => results.push({ page, width, run, id, status, detail, ...(data ? { data } : {}) });
const slug = (p) => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-')) || 'home';

// ---------- In-page measurement (runs in the browser) ----------
function measure(opts) {
  const { mode } = opts;
  const out = {};
  const vw = innerWidth, vh = innerHeight;
  const cnv = document.createElement('canvas'); cnv.width = cnv.height = 1;
  const ctx = cnv.getContext('2d', { willReadFrequently: true });
  const rgba = (str) => {
    if (!str || str === 'transparent') return [0, 0, 0, 0];
    ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = str; ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255];
  };
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const blend = (top, bot) => { const a = top[3]; return [top[0] * a + bot[0] * (1 - a), top[1] * a + bot[1] * (1 - a), top[2] * a + bot[2] * (1 - a), 1]; };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  const visible = (el) => {
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false;
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') return false;
    let o = 1, n = el; while (n && n.nodeType === 1) { o *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; } return o > 0.05;
  };
  const isSrOnly = (el) => { const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); return (cs.clip && cs.clip !== 'auto' && r.width <= 2) || (r.width <= 1 && r.height <= 1); };
  const effectiveBg = (el) => {
    const layers = []; let n = el, image = false;
    while (n && n.nodeType === 1) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') image = true;
      const c = rgba(cs.backgroundColor); if (c[3] > 0) layers.push(c);
      if (c[3] >= 1) break; n = n.parentElement;
    }
    let bg = [255, 255, 255, 1]; for (let i = layers.length - 1; i >= 0; i--) bg = blend(layers[i], bg);
    return { bg, image };
  };
  const desc = (el) => { const t = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('alt') || '').trim().replace(/\s+/g, ' ').slice(0, 40); return `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${t ? ` "${t}"` : ''}`; };

  // Horizontal overflow
  out.overflow = document.documentElement.scrollWidth - vw;

  // Interactive targets
  const interactive = [...document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role=button], [tabindex]:not([tabindex="-1"])')].filter(visible).filter((el) => !isSrOnly(el));
  const small = [], warnSmall = [];
  for (const el of interactive) {
    const r = el.getBoundingClientRect();
    // Inline links inside running text are exempt (WCAG 2.5.8 inline exception).
    if (el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.closest('p, li, td, figcaption, blockquote')) continue;
    const m = Math.min(r.width, r.height);
    if (m < 24) small.push(`${desc(el)} ${Math.round(r.width)}×${Math.round(r.height)}`);
    else if (m < 44 && vw <= 480) warnSmall.push(`${desc(el)} ${Math.round(r.width)}×${Math.round(r.height)}`);
  }
  out.targets = { total: interactive.length, under24: small, under44: warnSmall };

  // Text contrast
  const textEls = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode() && textEls.length < 600) {
    const t = walker.currentNode; if (!t.textContent.trim()) continue;
    const el = t.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'OPTION'].includes(el.tagName)) continue;
    if (!visible(el) || isSrOnly(el) || el.closest('[aria-hidden="true"], [disabled], [data-orchid-placeholder]')) continue;
    textEls.push(el);
  }
  const lowContrast = []; let overImage = 0;
  for (const el of textEls) {
    const cs = getComputedStyle(el); const fg = rgba(cs.color);
    const { bg, image } = effectiveBg(el); if (image) { overImage++; continue; }
    const r = ratio(blend(fg, bg), bg);
    const size = parseFloat(cs.fontSize), weight = parseInt(cs.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const min = large ? 3 : 4.5;
    if (r < min) lowContrast.push(`${desc(el)} ${r.toFixed(2)}:1 (min ${min})`);
  }
  out.contrast = { checked: textEls.length, failing: lowContrast, overImage };

  // Primary action
  const primaryVar = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
  const primaryRgb = primaryVar ? rgba(primaryVar) : null;
  const near = (a, b) => b && Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) < 12 && a[3] > 0.9;
  const marked = [...document.querySelectorAll('[data-cta="primary"]')].filter(visible);
  const byColour = interactive.filter((el) => primaryRgb && near(rgba(getComputedStyle(el).backgroundColor), primaryRgb));
  const primaries = marked.length ? marked : byColour;
  const docH = document.documentElement.scrollHeight;
  const perViewport = [];
  for (let y = 0; y < docH; y += vh) {
    const n = primaries.filter((el) => { const r = el.getBoundingClientRect(); const top = r.top + scrollY; return top >= y && top < y + vh; }).length;
    perViewport.push(n);
  }
  const h1 = document.querySelector('h1');
  const h1r = h1 && visible(h1) ? h1.getBoundingClientRect() : null;
  const firstPrimary = primaries.map((el) => el.getBoundingClientRect()).find((r) => r.top + scrollY < vh);
  out.primary = { marked: marked.length, byColour: byColour.length, perViewport, h1InFirst: !!(h1r && h1r.top + scrollY < vh), primaryInFirst: !!firstPrimary, h1Count: document.querySelectorAll('h1').length };

  // Accent area in the first viewport
  if (primaryRgb) {
    let area = 0;
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect(); if (r.bottom + scrollY < 0 || r.top + scrollY > vh || r.width * r.height < 16) continue;
      if (near(rgba(getComputedStyle(el).backgroundColor), primaryRgb)) {
        const w = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0)), h = Math.max(0, Math.min(r.bottom + scrollY, vh) - Math.max(r.top + scrollY, 0));
        area += w * h;
      }
    }
    out.accentShare = area / (vw * vh);
  }

  // Surface nesting (cards inside cards)
  const surfaceOf = new Map();
  const isSurface = (el) => {
    if (surfaceOf.has(el)) return surfaceOf.get(el);
    let s = false;
    const tag = el.tagName;
    if (!['HTML', 'BODY', 'IMG', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A', 'SVG', 'CANVAS', 'VIDEO', 'PICTURE', 'LABEL', 'CODE', 'PRE', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TD', 'TH', 'HR'].includes(tag)) {
      const r = el.getBoundingClientRect();
      if (r.width >= 64 && r.height >= 48) {
        const cs = getComputedStyle(el);
        const bg = rgba(cs.backgroundColor);
        const parentBg = el.parentElement ? effectiveBg(el.parentElement).bg : [255, 255, 255, 1];
        const differs = bg[3] > 0.05 && Math.abs(blend(bg, parentBg)[0] - parentBg[0]) + Math.abs(blend(bg, parentBg)[1] - parentBg[1]) + Math.abs(blend(bg, parentBg)[2] - parentBg[2]) > 6;
        const sides = ['Top', 'Right', 'Bottom', 'Left'].filter((k) => parseFloat(cs[`border${k}Width`]) >= 1 && rgba(cs[`border${k}Color`])[3] > 0.1 && cs[`border${k}Style`] !== 'none').length;
        s = differs || sides >= 3;
      }
    }
    surfaceOf.set(el, s); return s;
  };
  let maxDepth = 0, deepest = null;
  const scope = document.querySelector('main') || document.body;
  for (const el of scope.querySelectorAll('*')) {
    if (!isSurface(el) || !visible(el)) continue;
    let d = 1, n = el.parentElement; while (n && n !== document.body) { if (isSurface(n)) d++; n = n.parentElement; }
    if (d > maxDepth) { maxDepth = d; deepest = desc(el); }
  }
  out.nesting = { maxDepth, deepest };

  // Grouping: gaps inside groups should be smaller than gaps between groups.
  const stacked = (el) => [...el.children].filter((c) => visible(c) && getComputedStyle(c).position !== 'absolute' && getComputedStyle(c).position !== 'fixed');
  const vgaps = (kids) => { const g = []; for (let i = 1; i < kids.length; i++) { const a = kids[i - 1].getBoundingClientRect(), b = kids[i].getBoundingClientRect(); if (b.top >= a.bottom - 1) g.push(b.top - a.bottom); } return g; };
  const median = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
  const grouping = [];
  for (const el of scope.querySelectorAll('section, article, main > div, [data-section]')) {
    const kids = stacked(el); if (kids.length < 2) continue;
    const outer = median(vgaps(kids)); if (outer === null) continue;
    const inners = kids.map((k) => median(vgaps(stacked(k)))).filter((x) => x !== null && x > 0);
    const inner = median(inners);
    if (inner !== null && outer > 0 && inner >= outer * 0.95) grouping.push(`${desc(el)}: inner gap ${Math.round(inner)}px ≥ outer gap ${Math.round(outer)}px`);
  }
  out.grouping = grouping.slice(0, 6);

  // Landmarks and conventions
  out.landmarks = { header: !!document.querySelector('header, [role=banner]'), nav: !!document.querySelector('nav, [role=navigation]'), main: !!document.querySelector('main, [role=main]'), footer: !!document.querySelector('footer, [role=contentinfo]'), homeLink: !!document.querySelector('header a[href="/"], [role=banner] a[href="/"]') };
  out.lang = document.documentElement.getAttribute('lang') || '';

  // Images
  const imgs = [...document.images];
  out.images = {
    total: imgs.length,
    missingAlt: imgs.filter((i) => !i.hasAttribute('alt')).map((i) => i.currentSrc.split('/').pop()).slice(0, 10),
    noDimensions: imgs.filter((i) => !i.getAttribute('width') && !i.getAttribute('height') && !i.closest('[data-orchid-3d], [data-orchid-sequence]') && !/absolute|fixed/.test(getComputedStyle(i).position)).map((i) => i.currentSrc.split('/').pop()).slice(0, 10),
    broken: imgs.filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc).map((i) => i.currentSrc.split('/').pop()).slice(0, 10),
  };
  out.placeholders = document.querySelectorAll('[data-orchid-placeholder]').length;
  out.has3D = document.querySelectorAll('[data-orchid-3d]').length;
  out.hasSequence = document.querySelectorAll('[data-orchid-sequence]').length;
  out.mode = mode;
  return out;
}

function hiddenTextAndLoops() {
  const vis = (el) => { let o = 1, n = el; while (n && n.nodeType === 1) { const cs = getComputedStyle(n); if (cs.visibility === 'hidden' || cs.display === 'none') return false; o *= parseFloat(cs.opacity); n = n.parentElement; } return o > 0.05; };
  let hidden = 0; const examples = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const t = walker.currentNode; if (!t.textContent.trim()) continue;
    const el = t.parentElement; if (!el || el.closest('[aria-hidden="true"], script, style, noscript, template')) continue;
    const r = el.getBoundingClientRect(); if (r.width <= 1 || r.height <= 1) continue;
    if (!vis(el)) { hidden++; if (examples.length < 5) examples.push(t.textContent.trim().slice(0, 50)); }
  }
  const loops = document.getAnimations ? document.getAnimations().filter((a) => a.playState === 'running' && a.effect && a.effect.getTiming && a.effect.getTiming().iterations === Infinity).length : 0;
  const pinned = document.querySelectorAll('.pin-spacer').length;
  return { hidden, examples, loops, pinned };
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    const step = innerHeight * 0.6;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300));
  });
}

async function open(context, path, { waitExtra = 800, expectStatus = 200 } = {}) {
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    const t = m.text();
    // A not-found page served with its intended 404 status logs that status once; it isn't an error.
    if (expectStatus !== 200 && new RegExp(`status of ${expectStatus}\\b`).test(t) && (m.location()?.url || '').replace(/\/$/, '') === (BASE + path).replace(/\/$/, '')) return;
    errors.push(t.slice(0, 200));
  });
  page.on('pageerror', (e) => errors.push(String(e.message || e).slice(0, 200)));
  let resp = null;
  try { resp = await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 45000 }); }
  catch { resp = await page.goto(BASE + path, { waitUntil: 'load', timeout: 45000 }).catch(() => null); }
  await page.waitForTimeout(waitExtra);
  return { page, errors, status: resp?.status() ?? null };
}

// Swipe up over the 3D canvas with real touch input; the page should scroll (touch-action must allow pan-y).
async function touchScroll(browser, path, width) {
  const context = await browser.newContext({ viewport: { width, height: 844 }, hasTouch: true, isMobile: true });
  const sep = path.includes('?') ? '&' : '?';
  const { page } = await open(context, `${path}${sep}orchid-tier=2`, { waitExtra: 2500 });
  try {
    const box = await page.evaluate(async () => {
      const host = document.querySelector('[data-orchid-3d]');
      if (!host) return null;
      host.scrollIntoView({ block: 'center' });
      await new Promise((r) => setTimeout(r, 1500));
      const c = host.querySelector('canvas');
      if (!c) return { noCanvas: true };
      const r = c.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, h: r.height, scrollY: window.scrollY };
    });
    if (!box || box.noCanvas) return box;
    const cdp = await context.newCDPSession(page);
    const pt = (y) => [{ x: Math.round(box.x), y: Math.round(y) }];
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(box.y + box.h * 0.3) });
    for (let i = 1; i <= 8; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(box.y + box.h * 0.3 - i * 25) });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.waitForTimeout(600);
    const after = await page.evaluate(() => window.scrollY);
    return { before: box.scrollY, after };
  } finally { await context.close(); }
}

async function keyboard(page) {
  return page.evaluate(async () => {
    const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 1 && r.height > 1 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    const all = [...document.querySelectorAll('a[href], button:not([disabled]), input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(visible);
    return { total: all.length };
  }).then(async ({ total }) => {
    const reached = new Set(); let noRing = 0; const noRingEx = [];
    await page.evaluate(() => document.activeElement?.blur());
    for (let i = 0; i < Math.min(120, total + 10); i++) {
      await page.keyboard.press('Tab');
      const info = await page.evaluate(() => {
        const el = document.activeElement; if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        const ring = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || (cs.boxShadow && cs.boxShadow !== 'none');
        const key = el.outerHTML.slice(0, 120) + el.getBoundingClientRect().top;
        return { key, ring, label: `${el.tagName.toLowerCase()} "${(el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 30)}"` };
      });
      if (!info) continue;
      if (reached.has(info.key)) break;
      reached.add(info.key);
      if (!info.ring) { noRing++; if (noRingEx.length < 5) noRingEx.push(info.label); }
    }
    return { total, reached: reached.size, noRing, noRingEx };
  });
}

async function perf(browser, path) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await context.addInitScript(() => {
    window.__perf = { lcp: 0, cls: 0 };
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__perf.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__perf.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  let bytes = 0;
  page.on('response', async (r) => { const h = r.headers()['content-length']; if (h) bytes += Number(h); });
  await page.goto(BASE + path, { waitUntil: 'load', timeout: 90000 }).catch(() => {});
  await page.waitForTimeout(3000);
  const p = await page.evaluate(() => window.__perf);
  await context.close();
  return { ...p, transferKB: Math.round(bytes / 1024) };
}

async function probe3D(page, path) {
  const has = await page.evaluate(() => document.querySelectorAll('[data-orchid-3d]').length);
  if (!has) return null;
  const waitScene = async () => {
    await page.evaluate(() => document.querySelector('[data-orchid-3d]')?.scrollIntoView({ block: 'center' }));
    await page.waitForFunction(() => window.__scene, null, { timeout: 15000 }).catch(() => {});
    return page.evaluate(() => !!window.__scene);
  };
  let ready = await waitScene(), forced = false;
  if (!ready) {
    // Headless Chromium has no GPU, so detect-gpu reports tier 0. Force tier 2 to exercise the scene.
    const sep = path.includes('?') ? '&' : '?';
    await page.goto(`${BASE}${path}${sep}orchid-tier=2`, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
    ready = await waitScene(); forced = true;
  }
  if (!ready) {
    const tier = await page.evaluate(() => document.querySelector('[data-orchid-3d]')?.getAttribute('data-tier'));
    return { ready: false, tier };
  }
  await page.waitForTimeout(1200);
  const info = await page.evaluate(() => window.__scene.info());
  const frames = await page.evaluate(() => new Promise((res) => { const t = []; let last = performance.now(); const end = last + 2000; const f = (now) => { t.push(now - last); last = now; if (now < end) requestAnimationFrame(f); else res(t); }; requestAnimationFrame(f); }));
  frames.sort((a, b) => a - b);
  const p95 = frames[Math.floor(frames.length * 0.95)] || 0;
  const probes = await page.evaluate(async () => {
    const out = [];
    for (const p of window.__scene.probes || []) {
      try { await p.run(); await new Promise((r) => setTimeout(r, 900)); out.push({ name: p.name, pass: !!(await p.check()) }); }
      catch (e) { out.push({ name: p.name, pass: false, error: String(e).slice(0, 120) }); }
    }
    return out;
  });
  return { ready: true, forced, info, p95: Math.round(p95 * 10) / 10, probes };
}

async function sequenceProbe(page) {
  const has = await page.evaluate(() => !!document.querySelector('[data-orchid-sequence]') && !!window.__sequence);
  if (!has) return null;
  const before = await page.evaluate(() => window.__sequence.frame());
  await page.evaluate(async () => { const el = document.querySelector('[data-orchid-sequence]'); const top = el.getBoundingClientRect().top + scrollY; for (let i = 0; i <= 10; i++) { scrollTo(0, top + i * innerHeight * 0.2); await new Promise((r) => setTimeout(r, 80)); } });
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => window.__sequence.frame());
  return { before, after, advanced: after > before };
}

const browser = await chromium.launch();
try {
  for (const pg of pages) {
    const path = pg.path; const mode = pg.mode || 'persuade'; const name = slug(path);
    for (const width of WIDTHS) {
      const height = width <= 480 ? 844 : width <= 900 ? 1024 : 900;
      const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, hasTouch: width <= 900 });
      const expectStatus = pg.status || 200;
      const { page, errors, status } = await open(context, path, { expectStatus });
      if (width === WIDTHS[0]) record(path, width, 'default', 'http-status', status === expectStatus ? 'pass' : 'fail', `${status ?? 'no response'} (expected ${expectStatus}${expectStatus === 200 ? '; set "status": 404 in check.json for a not-found page' : ''})`);
      await autoScroll(page);
      await page.screenshot({ path: join(OUT, 'screens', `${name}-${width}.png`), fullPage: true }).catch(() => {});
      const m = await page.evaluate(measure, { mode });

      record(path, width, 'default', 'console-errors', errors.length ? 'fail' : 'pass', errors.length ? errors.slice(0, 5).join(' | ') : 'none');
      record(path, width, 'default', 'horizontal-overflow', m.overflow > 1 ? 'fail' : 'pass', m.overflow > 1 ? `${m.overflow}px wider than viewport` : 'none');
      record(path, width, 'default', 'target-size', m.targets.under24.length ? 'fail' : m.targets.under44.length ? 'warn' : 'pass',
        m.targets.under24.length ? `under 24px: ${m.targets.under24.slice(0, 6).join('; ')}` : m.targets.under44.length ? `under 44px on touch: ${m.targets.under44.slice(0, 6).join('; ')}` : `${m.targets.total} targets OK`);
      record(path, width, 'default', 'text-contrast', m.contrast.failing.length ? 'fail' : 'pass', m.contrast.failing.length ? m.contrast.failing.slice(0, 6).join('; ') : `${m.contrast.checked} text elements OK${m.contrast.overImage ? `; ${m.contrast.overImage} over images (check by eye)` : ''}`);
      record(path, width, 'default', 'surface-nesting', m.nesting.maxDepth >= 3 ? 'fail' : 'pass', `max depth ${m.nesting.maxDepth}${m.nesting.maxDepth >= 3 ? ` at ${m.nesting.deepest}` : ''}`);
      record(path, width, 'default', 'grouping', m.grouping.length ? 'warn' : 'pass', m.grouping.length ? m.grouping.join('; ') : 'inner gaps smaller than outer gaps');
      const lm = m.landmarks;
      record(path, width, 'default', 'landmarks', lm.main && lm.header && lm.footer ? (lm.homeLink ? 'pass' : 'warn') : 'warn', `header ${lm.header}, nav ${lm.nav}, main ${lm.main}, footer ${lm.footer}, logo→home ${lm.homeLink}`);
      if (width === WIDTHS[WIDTHS.length - 1]) {
        record(path, width, 'default', 'html-lang', m.lang ? 'pass' : 'fail', m.lang || 'missing lang attribute');
        record(path, width, 'default', 'single-h1', m.primary.h1Count === 1 ? 'pass' : 'warn', `${m.primary.h1Count} h1 element(s)`);
      }
      record(path, width, 'default', 'images', m.images.broken.length || m.images.missingAlt.length ? 'fail' : m.images.noDimensions.length ? 'warn' : 'pass',
        [m.images.broken.length && `broken: ${m.images.broken.join(', ')}`, m.images.missingAlt.length && `no alt: ${m.images.missingAlt.join(', ')}`, m.images.noDimensions.length && `no width/height (layout shift): ${m.images.noDimensions.join(', ')}`].filter(Boolean).join('; ') || `${m.images.total} images OK`);
      if (m.placeholders) record(path, width, 'default', 'placeholders', 'info', `${m.placeholders} marked placeholder(s) — list in needs.md`);

      if (mode === 'persuade') {
        const p = m.primary;
        if (!p.marked) record(path, width, 'default', 'primary-marked', 'warn', `no element marked data-cta="primary"${p.byColour ? ` (${p.byColour} found by colour)` : ''}`);
        const over = p.perViewport.map((n, i) => (n > 1 ? `screen ${i + 1}: ${n}` : null)).filter(Boolean);
        record(path, width, 'default', 'one-primary-per-viewport', over.length ? 'fail' : 'pass', over.length ? over.join('; ') : `per screen: ${p.perViewport.join(',')}`);
        record(path, width, 'default', 'first-viewport', p.h1InFirst && p.primaryInFirst ? 'pass' : 'fail', `h1 visible ${p.h1InFirst}, primary action visible ${p.primaryInFirst}`);
      }
      if (m.accentShare !== undefined && (mode === 'persuade' || mode === 'showcase')) record(path, width, 'default', 'accent-share', m.accentShare > 0.15 ? 'warn' : 'pass', `${Math.round(m.accentShare * 100)}% of the first viewport`);

      if (width === WIDTHS[WIDTHS.length - 1]) {
        const k = await keyboard(page);
        record(path, width, 'default', 'keyboard-reach', k.reached >= Math.min(k.total, 120) * 0.8 ? 'pass' : 'fail', `${k.reached} of ${k.total} focusable elements reached by Tab`);
        record(path, width, 'default', 'focus-visible', k.noRing ? 'fail' : 'pass', k.noRing ? `${k.noRing} without a visible focus indicator: ${k.noRingEx.join('; ')}` : 'all focus states visible');
      }

      if (width === WIDTHS[WIDTHS.length - 1] || width === WIDTHS[0]) {
        const s = await probe3D(page, path);
        if (s) {
          if (!s.ready) record(path, width, 'default', '3d-ready', 'fail', `scene did not start even with ?orchid-tier=2 (tier ${s.tier ?? 'unknown'}). Check console errors; for production builds set NEXT_PUBLIC_ORCHID_PROBES=1`);
          else {
            record(path, width, 'default', '3d-dpr', s.info.dpr <= 2 ? 'pass' : 'fail', `dpr ${s.info.dpr}, tier ${s.info.tier}${s.forced ? ' (forced: headless browser has no GPU)' : ''}`);
            record(path, width, 'default', '3d-draw-calls', s.info.calls < 100 ? 'pass' : 'fail', `${s.info.calls} draw calls, ${s.info.triangles} triangles`);
            record(path, width, 'default', '3d-frame-time', s.p95 <= (width <= 480 ? 33.4 : 16.8) * 1.15 ? 'pass' : 'warn', `p95 frame ${s.p95} ms (headless; confirm on real hardware)`);
            for (const pr of s.probes) record(path, width, 'default', `3d-probe:${pr.name}`, pr.pass ? 'pass' : 'fail', pr.pass ? 'interaction works' : `interaction failed${pr.error ? `: ${pr.error}` : ''}`);
            if (!s.probes.length) record(path, width, 'default', '3d-probes', 'warn', 'no probes registered; add one per interaction');
          }
        }
        if (s && s.forced) { await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {}); await page.waitForTimeout(800); }
        const q = await sequenceProbe(page);
        if (q) record(path, width, 'default', 'sequence-scrub', q.advanced ? 'pass' : 'fail', `frame ${q.before} → ${q.after} while scrolling`);
      }
      await context.close();

      // Reduced motion run
      if (width === WIDTHS[0] || width === WIDTHS[WIDTHS.length - 1]) {
        const rctx = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
        const { page: rp } = await open(rctx, path, { waitExtra: 1500 });
        const r1 = await rp.evaluate(hiddenTextAndLoops);
        await rp.screenshot({ path: join(OUT, 'screens', `${name}-${width}-reduced.png`), fullPage: true }).catch(() => {});
        record(path, width, 'reduced-motion', 'content-visible', r1.hidden ? 'fail' : 'pass', r1.hidden ? `${r1.hidden} text node(s) hidden without scrolling, e.g. ${r1.examples.map((e) => `"${e}"`).join(', ')}` : 'all content visible on load');
        record(path, width, 'reduced-motion', 'loops-stopped', r1.loops ? 'fail' : 'pass', `${r1.loops} infinite animation(s) running`);
        record(path, width, 'reduced-motion', 'no-pinning', r1.pinned ? 'fail' : 'pass', `${r1.pinned} pinned section(s)`);
        await rctx.close();
      }

      // State fixtures (operate pages)
      for (const state of pg.states || []) {
        if (width !== WIDTHS[0] && width !== WIDTHS[WIDTHS.length - 1]) continue;
        const sctx = await browser.newContext({ viewport: { width, height } });
        const sep = path.includes('?') ? '&' : '?';
        const { page: sp, errors: se } = await open(sctx, `${path}${sep}orchid-state=${state}`);
        const ov = await sp.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        await sp.screenshot({ path: join(OUT, 'screens', `${name}-${width}-state-${state}.png`), fullPage: true }).catch(() => {});
        record(path, width, `state:${state}`, 'renders', se.length || ov > 1 ? 'fail' : 'pass', [se.length && se.slice(0, 3).join(' | '), ov > 1 && `${ov}px overflow`].filter(Boolean).join('; ') || 'no errors, no overflow');
        await sctx.close();
      }
    }

    // Dark mode: if the page changes under prefers-color-scheme: dark, check its text contrast there too.
    {
      const W = WIDTHS[WIDTHS.length - 1];
      const bgOf = async (scheme) => {
        const c = await browser.newContext({ viewport: { width: W, height: 900 }, colorScheme: scheme });
        const { page: p } = await open(c, path, { expectStatus: pg.status || 200 });
        const bg = await p.evaluate(() => getComputedStyle(document.body).backgroundColor + '|' + getComputedStyle(document.documentElement).backgroundColor);
        return { c, p, bg };
      };
      const light = await bgOf('light'); await light.c.close();
      const dark = await bgOf('dark');
      if (dark.bg === light.bg) record(path, W, 'dark', 'dark-mode', 'info', 'page looks the same under prefers-color-scheme: dark (no dark theme, or it is toggled another way)');
      else {
        await autoScroll(dark.p);
        const dm = await dark.p.evaluate(measure, { mode: pg.mode || 'persuade' });
        await dark.p.screenshot({ path: join(OUT, 'screens', `${name}-${W}-dark.png`), fullPage: true }).catch(() => {});
        record(path, W, 'dark', 'text-contrast', dm.contrast.failing.length ? 'fail' : 'pass', dm.contrast.failing.length ? dm.contrast.failing.slice(0, 6).join('; ') : `${dm.contrast.checked} text elements OK in dark mode`);
      }
      await dark.c.close();
    }

    // Touch scrolling over 3D: a swipe on the canvas must still scroll the page on phones.
    if (pg.has3D !== false) {
      const t = await touchScroll(browser, path, Math.min(WIDTHS[0], 430));
      if (t && t.noCanvas) record(path, Math.min(WIDTHS[0], 430), 'touch', '3d-touch-scroll', 'warn', 'scene container found but no canvas mounted at ?orchid-tier=2; check by hand on a phone');
      else if (t) record(path, Math.min(WIDTHS[0], 430), 'touch', '3d-touch-scroll', t.after > t.before + 20 ? 'pass' : 'fail', t.after > t.before + 20 ? `swipe over the canvas scrolled the page ${Math.round(t.after - t.before)}px` : 'a vertical swipe over the canvas did not scroll the page: set touch-action: pan-y on the canvas (controls often set it to none); see references/3d.md');
    }

    // WCAG 1.4.10 Reflow: usable at 320 CSS px (400% zoom on a 1280 px screen) without horizontal scrolling.
    {
      const fctx = await browser.newContext({ viewport: { width: 320, height: 640 }, hasTouch: true });
      const { page: fp } = await open(fctx, path);
      const ov = await fp.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (ov > 1) await fp.screenshot({ path: join(OUT, 'screens', `${name}-320-reflow.png`), fullPage: true }).catch(() => {});
      record(path, 320, 'reflow', 'reflow-320', ov > 1 ? 'fail' : 'pass', ov > 1 ? `${ov}px horizontal scroll at 320px (WCAG 1.4.10)` : 'no horizontal scroll at 320px');
      await fctx.close();
    }

    // WebGL disabled: poster must show
    if (pg.has3D !== false) {
      const nb = await chromium.launch({ args: ['--disable-webgl', '--disable-3d-apis', '--disable-gpu'] });
      const nctx = await nb.newContext({ viewport: { width: 1440, height: 900 } });
      const { page: np } = await open(nctx, path, { waitExtra: 2500 });
      const posters = await np.evaluate(async () => {
        const boxes = [...document.querySelectorAll('[data-orchid-3d]')];
        for (const b of boxes) { b.scrollIntoView({ block: 'center' }); await new Promise((r) => setTimeout(r, 1200)); }
        return boxes.map((b) => { const img = b.querySelector('[data-orchid-poster]'); const op = img ? parseFloat(getComputedStyle(img).opacity) : 0; return { hasPoster: !!img, shown: !!img && img.naturalWidth > 0 && op > 0.5 }; });
      });
      if (posters.length) record(path, 1440, 'webgl-off', 'poster-fallback', posters.every((p) => p.shown) ? 'pass' : 'fail', posters.map((p, i) => `scene ${i + 1}: ${p.shown ? 'poster shown' : p.hasPoster ? 'poster not visible' : 'no poster'}`).join('; '));
      await nb.close();
    }

    if (doPerf) {
      const p = await perf(browser, path);
      record(path, 390, 'perf-mobile', 'lcp', p.lcp <= 2500 ? 'pass' : p.lcp <= 4000 ? 'warn' : 'fail', `LCP ${Math.round(p.lcp)} ms (throttled 4× CPU, slow 4G)`);
      record(path, 390, 'perf-mobile', 'cls', p.cls <= 0.1 ? 'pass' : p.cls <= 0.25 ? 'warn' : 'fail', `CLS ${p.cls.toFixed(3)}`);
      record(path, 390, 'perf-mobile', 'transfer', 'info', `${p.transferKB} KB transferred (content-length headers only)`);
    }
  }
} finally {
  await browser.close();
}

// ---------- Report ----------
const fails = results.filter((r) => r.status === 'fail');
const warns = results.filter((r) => r.status === 'warn');
writeFileSync(join(OUT, 'report.json'), JSON.stringify({ base: BASE, widths: WIDTHS, pages, results, fails: fails.length, warns: warns.length }, null, 2));
const lines = [`# Orchid page checks`, ``, `${BASE} · widths ${WIDTHS.join(', ')} · ${fails.length} fail · ${warns.length} warn`, ``];
for (const [title, list] of [['Failing', fails], ['Warnings', warns]]) {
  lines.push(`## ${title}`, '');
  if (!list.length) lines.push('None.', '');
  else { lines.push('| Page | Width | Run | Check | Detail |', '|---|---|---|---|---|'); for (const r of list) lines.push(`| ${r.page} | ${r.width} | ${r.run} | ${r.id} | ${String(r.detail).replace(/\|/g, '/')} |`); lines.push(''); }
}
const perfRows = results.filter((r) => r.run === 'perf-mobile');
if (perfRows.length) { lines.push('## Performance (mobile, throttled)', ''); for (const r of perfRows) lines.push(`- ${r.page}: ${r.detail}`); lines.push(''); }
lines.push('Screenshots: `screens/`. Dev servers inflate LCP; run against a production build for real numbers.');
writeFileSync(join(OUT, 'summary.md'), lines.join('\n'));
console.log(lines.join('\n'));
process.exitCode = fails.length ? 1 : 0;
