// Colour maths for Orchid: parse CSS colours, OKLCH <-> sRGB, WCAG contrast.

const clamp01 = (x) => Math.min(1, Math.max(0, x));

export function parseColor(input) {
  const s = String(input).trim().toLowerCase();
  let m;
  if ((m = s.match(/^#([0-9a-f]{3,8})$/))) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    const n = (i) => parseInt(h.slice(i, i + 2), 16) / 255;
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) : 1 };
  }
  if ((m = s.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(?:\/\s*([\d.]+)(%?))?\s*\)$/))) {
    const L = m[2] ? Number(m[1]) / 100 : Number(m[1]);
    const a = m[5] === undefined ? 1 : m[6] ? Number(m[5]) / 100 : Number(m[5]);
    return { ...oklchToSrgb(L, Number(m[3]), Number(m[4])), a };
  }
  if ((m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+)(%?))?\s*\)$/))) {
    const a = m[4] === undefined ? 1 : m[5] ? Number(m[4]) / 100 : Number(m[4]);
    return { r: Number(m[1]) / 255, g: Number(m[2]) / 255, b: Number(m[3]) / 255, a };
  }
  if (s === 'white') return { r: 1, g: 1, b: 1, a: 1 };
  if (s === 'black') return { r: 0, g: 0, b: 0, a: 1 };
  throw new Error(`Unsupported colour: ${input}`);
}

// OKLCH -> linear sRGB (Björn Ottosson's OKLab matrices).
export function oklchToLinear(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h), b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}

const gammaEncode = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
const gammaDecode = (x) => (x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4));

export function inGamut(L, C, H) {
  const { r, g, b } = oklchToLinear(L, C, H);
  const e = 1e-4;
  return [r, g, b].every((v) => v >= -e && v <= 1 + e);
}

export function oklchToSrgb(L, C, H) {
  const { r, g, b } = oklchToLinear(L, C, H);
  return { r: clamp01(gammaEncode(r)), g: clamp01(gammaEncode(g)), b: clamp01(gammaEncode(b)) };
}

// Reduce chroma until the colour fits sRGB.
export function gamutMap(L, C, H) {
  if (inGamut(L, C, H)) return C;
  let lo = 0, hi = C;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut(L, mid, H)) lo = mid; else hi = mid;
  }
  return lo;
}

export function luminance({ r, g, b }) {
  return 0.2126 * gammaDecode(r) + 0.7152 * gammaDecode(g) + 0.0722 * gammaDecode(b);
}

// Composite a (possibly translucent) colour over an opaque background.
export function over(fg, bg) {
  const a = fg.a ?? 1;
  return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 };
}

export function contrast(fgInput, bgInput) {
  const bg = typeof bgInput === 'string' ? parseColor(bgInput) : bgInput;
  let fg = typeof fgInput === 'string' ? parseColor(fgInput) : fgInput;
  fg = over(fg, bg);
  const l1 = luminance(fg), l2 = luminance(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

export const fmt = (n) => (Math.round(n * 100) / 100).toFixed(2);
export const oklchString = (L, C, H) => `oklch(${(+L).toFixed(3)} ${(+C).toFixed(3)} ${(+H).toFixed(1)})`;
