'use client';
/**
 * OrchidScene — the shell every Orchid 3D scene sits in.
 *
 * - The poster <img> server-renders (so it can be the LCP element) and stays until the scene draws.
 * - Nothing heavy loads up front: three.js, R3F, drei and detect-gpu are fetched only when the
 *   container nears the viewport and the device qualifies.
 * - GPU tier from @pmndrs/detect-gpu: tier 0, no WebGL, or below `minTier` keeps the poster.
 * - Reduced motion keeps the poster for motion-heavy scenes.
 * - `mirror` is the real-DOM equivalent for screen readers and search engines.
 * - In development (or with NEXT_PUBLIC_ORCHID_PROBES=1) SceneCanvas exposes window.__scene
 *   so scripts/check-page.mjs can read draw calls and run interaction probes.
 *
 * Put scene contents in their own file and lazy-load them too, so their three.js imports
 * stay out of the page bundle:  const Planes = lazy(() => import('./MyScene.contents'))
 */
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import type { CanvasProps } from '@react-three/fiber';

export type Tier = 0 | 1 | 2 | 3;
export type Probe = { name: string; run: () => Promise<void> | void; check: () => boolean | Promise<boolean> };

const SceneCanvas = lazy(() => import('./SceneCanvas'));

// Test hook: ?orchid-tier=2 forces a tier in development or verification builds
// (headless browsers have no GPU, so detect-gpu would otherwise always say tier 0).
const allowTierOverride = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ORCHID_PROBES === '1';

let currentTier: Tier = 0;
/** The tier the current scene runs at, for scene contents that scale their detail. */
export const useSceneTier = () => currentTier;

type Props = {
  poster: string;
  posterAlt: string;
  children: ReactNode;
  mirror?: ReactNode;
  probes?: Probe[];
  frameloop?: CanvasProps['frameloop'];
  minTier?: Tier;
  motionHeavy?: boolean;
  className?: string;
  camera?: CanvasProps['camera'];
};

export function OrchidScene({
  poster, posterAlt, children, mirror, probes = [], frameloop = 'always',
  minTier = 1, motionHeavy = true, className, camera,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [tier, setTier] = useState<Tier | null>(null);
  const [reduced, setReduced] = useState(false);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: '300px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let alive = true;
    const hasWebGL = (() => { try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; } })();
    if (!hasWebGL) { setTier(0); return; }
    const forced = allowTierOverride ? new URLSearchParams(window.location.search).get('orchid-tier') : null;
    if (forced && /^[0-3]$/.test(forced)) { setTier(Number(forced) as Tier); return; }
    import('@pmndrs/detect-gpu')
      .then(({ getGPUTier }) => getGPUTier())
      .then((r) => { if (alive) setTier((r.tier ?? 1) as Tier); })
      .catch(() => { if (alive) setTier(1); });
    return () => { alive = false; };
  }, [near]);

  useEffect(() => { currentTier = (tier ?? 0) as Tier; }, [tier]);

  const show3D = near && tier !== null && tier >= minTier && !(reduced && motionHeavy);

  return (
    <div ref={ref} data-orchid-3d data-tier={tier ?? ''} className={`relative ${className ?? ''}`}>
      <img
        src={poster}
        alt={posterAlt}
        data-orchid-poster
        aria-hidden={show3D && drawn ? true : undefined}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${show3D && drawn ? 'opacity-0' : 'opacity-100'}`}
        fetchPriority="high"
      />
      {show3D && (
        <div className="absolute inset-0" aria-hidden={mirror ? true : undefined}>
          <Suspense fallback={null}>
            <SceneCanvas tier={tier as Tier} probes={probes} frameloop={frameloop} camera={camera} onDrawn={() => setDrawn(true)}>
              {children}
            </SceneCanvas>
          </Suspense>
        </div>
      )}
      {mirror && <div className="sr-only">{mirror}</div>}
    </div>
  );
}
