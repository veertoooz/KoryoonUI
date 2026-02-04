import { useMemo } from 'react';
import type { SpherePosition } from '../types';

interface Options {
  count: number;
  radius?: number;
  center?: [number, number, number];
}

export const useSpherePoints = ({
  count,
  radius = 6,
  center = [0, 0, 0],
}: Options): SpherePosition[] =>
  useMemo(() => {
    if (count === 0) return [];

    const [cx, cy, cz] = center;
    const points: SpherePosition[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    // We start loop at 0. 
    // If we want index 0 to be the Center Node, we handle it specifically.
    for (let i = 0; i < count; i++) {
      if (i === 0) {
        // Place the first item (Current Node) dead center
        points.push({ x: cx, y: cy, z: cz, theta: 0, phi: 0, index: 0 });
        continue;
      }

      // Distribute the rest (Children) on the sphere surface
      // We adjust index (i - 1) so the math stays uniform for the children
      const childIndex = i - 1; 
      const childCount = count - 1;
      
      const theta = (2 * Math.PI * childIndex) / goldenRatio;
      const phi = Math.acos(1 - (2 * (childIndex + 0.5)) / childCount);

      points.push({
        x: cx + radius * Math.sin(phi) * Math.cos(theta),
        y: cy + radius * Math.sin(phi) * Math.sin(theta),
        z: cz + radius * Math.cos(phi),
        theta,
        phi,
        index: i,
      });
    }

    return points;
  }, [count, radius, center]);
