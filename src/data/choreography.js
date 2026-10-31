/**
 * Per-section targets for the bottle & camera. GSAP tweens `sceneTarget`
 * between these as the user scrolls past each section.
 */
const TAU = Math.PI * 2

export const DESKTOP_KEYFRAMES = {
  hero: { x: 1.75, y: -0.05, rotY: -0.45, rotX: 0.04, scale: 0.8, camZ: 7.2, camY: 0.2, halo: 1, hotspots: 0 },
  story: { x: -1.85, y: -0.1, rotY: TAU + 0.55, rotX: -0.02, scale: 0.84, camZ: 7, camY: 0.1, halo: 0.55, hotspots: 0 },
  notes: { x: 0, y: 0.35, rotY: TAU * 2 - 0.25, rotX: 0.12, scale: 0.58, camZ: 8.2, camY: 0.5, halo: 0.85, hotspots: 0 },
  craft: { x: 1.6, y: 0.05, rotY: TAU * 3 - 0.35, rotX: 0.02, scale: 0.86, camZ: 6.8, camY: 0.1, halo: 0.4, hotspots: 1 },
  shop: { x: -1.6, y: -0.1, rotY: TAU * 4 + 0.4, rotX: 0.03, scale: 0.82, camZ: 7.2, camY: 0.15, halo: 1, hotspots: 0 },
}

export const MOBILE_KEYFRAMES = {
  hero: { x: 0, y: 1.1, rotY: -0.4, rotX: 0.04, scale: 0.56, camZ: 8.6, camY: 0.2, halo: 1, hotspots: 0 },
  story: { x: 0, y: 1.05, rotY: TAU + 0.5, rotX: 0, scale: 0.62, camZ: 8.6, camY: 0.1, halo: 0.5, hotspots: 0 },
  notes: { x: 0, y: 1.2, rotY: TAU * 2 - 0.25, rotX: 0.1, scale: 0.5, camZ: 9, camY: 0.4, halo: 0.8, hotspots: 0 },
  craft: { x: 0, y: 0.7, rotY: TAU * 3 - 0.35, rotX: 0, scale: 0.8, camZ: 8.4, camY: 0.1, halo: 0.4, hotspots: 1 },
  shop: { x: 0, y: 0.9, rotY: TAU * 4 + 0.4, rotX: 0.03, scale: 0.7, camZ: 8.6, camY: 0.15, halo: 1, hotspots: 0 },
}

export const SECTION_ORDER = ['hero', 'story', 'notes', 'craft', 'shop']
