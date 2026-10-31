/**
 * Mutable, non-reactive targets written by GSAP ScrollTrigger and read every
 * frame inside useFrame. Kept outside React to avoid re-renders on scroll.
 */
export const sceneTarget = {
  x: 1.5,
  y: -0.05,
  rotY: -0.45,
  rotX: 0.04,
  scale: 1,
  camZ: 7.2,
  camY: 0.2,
  halo: 1,
  hotspots: 0,
  progress: 0,
}

export const pointer = { x: 0, y: 0 }

// 0 → 1 once the loader finishes; drives the bottle's entrance.
export const intro = { value: 0 }
