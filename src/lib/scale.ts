import type { KoryoonScaleConfig } from '../types';

const DEFAULTS = {
  orbitRadiusBase: 4,
  sphereSizeBase: 1.5,
  centerSphereScreenFraction: 1 / 3,
  fitPadding: 1.2,
  referenceHeight: 600,
};

export function computeScale(
  n: number,
  config?: KoryoonScaleConfig,
  containerHeight = 600,
  fovDeg = 50
) {
  const base = config?.orbitRadiusBase ?? DEFAULTS.orbitRadiusBase;
  const sizeBase = config?.sphereSizeBase ?? DEFAULTS.sphereSizeBase;
  const centerFraction =
    config?.centerSphereScreenFraction ?? DEFAULTS.centerSphereScreenFraction;
  const fitPadding = config?.fitPadding ?? DEFAULTS.fitPadding;
  const referenceHeight = config?.referenceHeight ?? DEFAULTS.referenceHeight;

  const scaleFactor = 1 + Math.sqrt(Math.max(0, n - 1));
  const orbitRadius = base * scaleFactor;
  const sphereSize = sizeBase / scaleFactor;

  // Scale scene to container height (referenceHeight px = 1 unit)
  const sceneScale = Math.max(containerHeight / referenceHeight, 0.5);
  const worldOrbitRadius = orbitRadius * sceneScale;
  const worldSphereSize = sphereSize * sceneScale;

  // Perspective: center sphere occupies centerFraction of screen
  // screenFraction = sphereSize / (cameraDistance * tan(fov/2))
  // cameraDistance = sphereSize / (centerFraction * tan(fov/2))
  const fovRad = (fovDeg * Math.PI) / 180;
  const tanHalfFov = Math.tan(fovRad / 2);
  const cameraForCenterThird =
    worldSphereSize / (centerFraction * tanHalfFov);

  // Fit all spheres: bounding radius must fit in view
  const boundingRadius = worldOrbitRadius + worldSphereSize;
  const cameraForFitAll = (boundingRadius * fitPadding) / tanHalfFov;

  const cameraDistance = Math.max(cameraForCenterThird, cameraForFitAll);

  return {
    orbitRadius: worldOrbitRadius,
    sphereSize: worldSphereSize,
    cameraDistance,
    scaleFactor,
    sceneScale,
  };
}
