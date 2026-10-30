'use client';
/** The heavy half of OrchidScene: three.js, R3F and drei load only when a scene will render. */
import { Suspense, useEffect, useState, type ReactNode } from 'react';
import { Canvas, useThree, type CanvasProps } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import type { Probe, Tier } from './OrchidScene';

const exposeHooks = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ORCHID_PROBES === '1';

function Inspector({ probes, tier }: { probes: Probe[]; tier: Tier }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    if (!exposeHooks) return;
    (window as any).__scene = {
      info: () => ({ calls: gl.info.render.calls, triangles: gl.info.render.triangles, dpr: gl.getPixelRatio(), tier, running: true }),
      probes,
    };
    return () => { delete (window as any).__scene; };
  }, [gl, probes, tier]);
  return null;
}

/**
 * Orbit/drag controls set touch-action: none on the canvas, which traps vertical swipes on phones
 * (the page can't be scrolled past the scene). Keep vertical panning for the page; horizontal drags
 * still reach the controls. Remove only if the scene genuinely needs vertical drags.
 */
function KeepPageScroll() {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const el = gl.domElement;
    const set = () => { if (el.style.touchAction !== 'pan-y') el.style.touchAction = 'pan-y'; };
    set();
    const mo = new MutationObserver(set);
    mo.observe(el, { attributes: true, attributeFilter: ['style'] });
    return () => mo.disconnect();
  }, [gl]);
  return null;
}

export default function SceneCanvas({ tier, probes, frameloop, camera, onDrawn, children }: {
  tier: Tier; probes: Probe[]; frameloop: CanvasProps['frameloop']; camera?: CanvasProps['camera'];
  onDrawn: () => void; children: ReactNode;
}) {
  const maxDpr = tier === 3 ? 2 : tier === 2 ? 1.5 : 1;
  const [dprCap, setDprCap] = useState(maxDpr);
  return (
    <Canvas
      dpr={[1, dprCap]}
      frameloop={frameloop}
      camera={camera}
      gl={{ antialias: tier >= 2, powerPreference: 'high-performance', alpha: true }}
      onCreated={() => requestAnimationFrame(onDrawn)}
    >
      <PerformanceMonitor onDecline={() => setDprCap(1)} onIncline={() => setDprCap(maxDpr)} />
      <AdaptiveDpr />
      <Suspense fallback={null}>{children}</Suspense>
      <Inspector probes={probes} tier={tier} />
      <KeepPageScroll />
    </Canvas>
  );
}
