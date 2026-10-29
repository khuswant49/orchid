'use client';
/** Scene contents for WorkGallery.example.tsx — lazy-loaded so three.js stays out of the page bundle. */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { MathUtils, SRGBColorSpace, type Group } from 'three';
import { tokenColor } from './tokens';
import type { Work } from './WorkGallery.example';

export default function Planes({ works, index }: { works: Work[]; index: number }) {
  const group = useRef<Group>(null);
  const textures = useTexture(works.map((w) => w.image));
  textures.forEach((t) => { t.colorSpace = SRGBColorSpace; });
  const frame = useMemo(() => tokenColor('border'), []);

  useFrame((_, dt) => {
    if (!group.current) return;
    // Ease the strip toward the selected work (frame-rate independent).
    group.current.position.x = MathUtils.damp(group.current.position.x, -index * 2.4, 6, dt);
  });

  return (
    <group ref={group}>
      {works.map((w, i) => (
        <group key={w.href} position={[i * 2.4, 0, 0]} rotation={[0, -0.12, 0]}>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.06, 1.32]} />
            <meshBasicMaterial color={frame} />
          </mesh>
          <mesh>
            <planeGeometry args={[2, 1.25]} />
            <meshBasicMaterial map={textures[i]} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
