import { createStore } from './createStore'
import { DEFAULT_PALETTE, PALETTES } from '../data/palettes'
import { SIZES } from '../data/content'

export const PALETTE_STORAGE_KEY = 'dhi-palette'

// Restore the viewer's last palette synchronously so nothing overwrites it on mount.
function loadPalette() {
  try {
    const saved = JSON.parse(localStorage.getItem(PALETTE_STORAGE_KEY) || 'null')
    if (saved?.id === 'custom' && saved.bg && saved.accent) return saved
    return PALETTES.find((p) => p.id === saved?.id) ?? DEFAULT_PALETTE
  } catch {
    return DEFAULT_PALETTE
  }
}

export const useAppStore = createStore((set, get) => ({
  palette: loadPalette(),
  setPalette: (palette) => set({ palette }),

  size: SIZES[1],
  setSize: (size) => set({ size }),

  cart: 0,
  addToCart: () => set({ cart: get().cart + 1, toast: Date.now() }),
  toast: 0,

  // Incremented on each spray so the 3D scene can react.
  spray: 0,
  triggerSpray: () => set({ spray: get().spray + 1 }),

  loaded: false,
  setLoaded: () => set({ loaded: true }),

  // True once the WebGL scene has compiled and drawn its first frames.
  sceneReady: false,
  setSceneReady: () => set({ sceneReady: true }),

  activeHotspot: null,
  setActiveHotspot: (activeHotspot) => set({ activeHotspot }),
}))
