'use client';
/**
 * Example: a portfolio "work gallery" scene — the user's real screenshots on planes,
 * moved with real DOM buttons (keyboard accessible), mirrored for screen readers,
 * with probes for check-page.mjs. Scene contents live in WorkGallery.planes.tsx (lazy). Adapt rather than copy: the direction decides
 * spacing, motion and framing.
 */
import { lazy, useRef, useState } from 'react';
import { OrchidScene, type Probe } from './OrchidScene';

export type Work = { title: string; href: string; image: string; summary: string };

const Planes = lazy(() => import('./WorkGallery.planes'));

export function WorkGallery({ works, poster }: { works: Work[]; poster: string }) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  indexRef.current = index;
  const go = (d: number) => setIndex((i) => Math.max(0, Math.min(works.length - 1, i + d)));

  const probes: Probe[] = [
    {
      name: 'next-work',
      run: () => { (document.querySelector('[data-gallery-next]') as HTMLButtonElement)?.click(); },
      check: () => indexRef.current === 1,
    },
  ];

  return (
    <div className="grid gap-6">
      <OrchidScene
        poster={poster}
        posterAlt={`Screenshots of ${works.map((w) => w.title).join(', ')}`}
        frameloop="always"
        probes={probes}
        className="aspect-video w-full"
        camera={{ position: [0, 0, 3.2], fov: 40 }}
        mirror={
          <ul>
            {works.map((w) => (
              <li key={w.href}><a href={w.href}>{w.title}</a>: {w.summary}</li>
            ))}
          </ul>
        }
      >
        <Planes works={works} index={index} />
      </OrchidScene>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground tabular">{index + 1} / {works.length}</p>
          <h3 className="font-display text-xl"><a href={works[index].href}>{works[index].title}</a></h3>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} disabled={index === 0} className="h-12 rounded-sm px-4 bg-muted text-foreground disabled:opacity-50">Previous</button>
          <button type="button" data-gallery-next onClick={() => go(1)} disabled={index === works.length - 1} className="h-12 rounded-sm px-4 bg-muted text-foreground disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}
