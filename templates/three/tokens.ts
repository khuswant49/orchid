'use client';
/**
 * Read design tokens from CSS so 3D colours stay on the design system.
 * three.js can't parse oklch(), so colours are resolved through a 1×1 canvas
 * (the browser does the conversion) and passed to THREE.Color as sRGB.
 */
import { Color, SRGBColorSpace } from 'three';

let ctx: CanvasRenderingContext2D | null = null;

export function cssVar(name: string, el: Element = document.documentElement): string {
  return getComputedStyle(el).getPropertyValue(name.startsWith('--') ? name : `--${name}`).trim();
}

/** tokenColor('primary') → THREE.Color in the right colour space. */
export function tokenColor(name: string, el?: Element): Color {
  const value = cssVar(name, el);
  ctx ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const color = new Color();
  if (!ctx || !value) return color;
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return color.setRGB(r / 255, g / 255, b / 255, SRGBColorSpace);
}
