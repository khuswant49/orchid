'use client';
/**
 * ScrollSequence — scroll-scrubbed frame sequence (the Apple product-page effect).
 *
 * Frames come from a video:
 *   ffmpeg -i hero.mp4 -vf "fps=30,scale=1280:-2" -c:v libwebp -quality 75 public/seq/desktop/f_%03d.webp
 *   ffmpeg -i hero.mp4 -vf "fps=15,scale=720:-2"  -c:v libwebp -quality 70 public/seq/mobile/f_%03d.webp
 *
 * - Frame 1 is a normal <img> (server-rendered; usually the LCP element).
 * - Remaining frames stream in after the page is idle; the nearest loaded frame is drawn.
 * - Pinned for `screens` viewport heights with native scroll speed (no scroll-jacking).
 * - Reduced motion or no JS: the poster frame and the overlay text, unpinned.
 * - Text goes in `children` as real HTML, never baked into frames.
 *
 * Usage (works in Server Components):
 *   <ScrollSequence desktop={{ dir: '/seq/desktop', count: 90 }} mobile={{ dir: '/seq/mobile', count: 45 }}
 *                   alt="…" screens={2}>…overlay text…</ScrollSequence>
 */
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Serializable, so it can be passed from a Server Component. Frames are `${dir}/f_001.webp` … */
type FrameSet = { dir: string; count: number; ext?: string };

type Props = {
  desktop: FrameSet;
  mobile?: FrameSet;
  alt: string;
  /** How many viewport heights the sequence stays pinned (keep to 3 or fewer). */
  screens?: number;
  /** 'cover' fills the frame (filmed footage); 'contain' shows the whole frame (screen recordings, UI). */
  fit?: 'cover' | 'contain';
  children?: ReactNode;
  className?: string;
};

const exposeHooks = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ORCHID_PROBES === '1';
const pad = (n: number) => String(n).padStart(3, '0');
const src = (set: FrameSet, i: number) => `${set.dir}/f_${pad(i + 1)}.${set.ext ?? 'webp'}`;

export function ScrollSequence({ desktop, mobile, alt, screens = 2.5, fit = 'cover', children, className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const state = useRef({ frame: 0 });

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const set = isMobile && mobile ? mobile : desktop;
      const el = canvas.current!;
      const ctx = el.getContext('2d')!;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const resize = () => {
        el.width = Math.round(el.clientWidth * dpr);
        el.height = Math.round(el.clientHeight * dpr);
        draw();
      };

      // Nearest frame that has loaded, so fast scrolling never shows a blank.
      const nearestLoaded = (i: number) => {
        for (let d = 0; d < set.count; d++) {
          for (const j of [i - d, i + d]) {
            const img = images.current[j];
            if (img && img.complete && img.naturalWidth) return img;
          }
        }
        return null;
      };

      const draw = () => {
        const img = nearestLoaded(Math.round(state.current.frame));
        if (!img) return;
        // object-fit: cover or contain
        const s = (fit === 'contain' ? Math.min : Math.max)(el.width / img.naturalWidth, el.height / img.naturalHeight);
        const w = img.naturalWidth * s, h = img.naturalHeight * s;
        ctx.clearRect(0, 0, el.width, el.height);
        ctx.drawImage(img, (el.width - w) / 2, (el.height - h) / 2, w, h);
      };

      // Load frame 1 now, the rest when the browser is idle.
      images.current = Array.from({ length: set.count }, () => new Image());
      const load = (i: number) => { const img = images.current[i]; img.decoding = 'async'; img.src = src(set, i); img.onload = () => { if (Math.round(state.current.frame) === i) draw(); }; };
      load(0);
      const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
      idle(() => { for (let i = 1; i < set.count; i++) load(i); });

      resize();
      window.addEventListener('resize', resize);
      el.dataset.active = 'true';

      const tween = gsap.to(state.current, {
        frame: set.count - 1,
        ease: 'none',
        onUpdate: draw,
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${Math.round(screens * 100)}%`,
          pin: true,
          scrub: true,
        },
      });

      return () => {
        window.removeEventListener('resize', resize);
        tween.scrollTrigger?.kill();
        tween.kill();
        el.dataset.active = 'false';
      };
    });
    return () => mm.revert();
  }, { scope: root });

  // Expose a probe target for check-page.mjs (frame index after scrolling), in the same builds as window.__scene.
  useEffect(() => {
    if (!exposeHooks) return;
    (window as any).__sequence = { frame: () => Math.round(state.current.frame) };
    return () => { delete (window as any).__sequence; };
  }, []);

  return (
    <section ref={root} data-orchid-sequence className={`relative h-svh overflow-hidden ${className ?? ''}`}>
      <img src={src(desktop, 0)} alt={alt} data-orchid-poster className={`absolute inset-0 h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`} fetchPriority="high" />
      <canvas ref={canvas} aria-hidden className="absolute inset-0 h-full w-full opacity-0 data-[active=true]:opacity-100" />
      {children && <div className="relative h-full">{children}</div>}
    </section>
  );
}
