import { useEffect } from 'react'
import { PALETTE_STORAGE_KEY, useAppStore } from '../store/useAppStore'
import { hexToRgb } from '../utils/color'

/** Writes a palette to the document's CSS custom properties. */
export function applyPaletteVars(palette) {
  const root = document.documentElement
  const vars = {
    bg: palette.bg,
    surface: palette.surface,
    text: palette.text,
    muted: palette.muted,
    accent: palette.accent,
    glow: palette.glow,
  }
  Object.entries(vars).forEach(([k, v]) => {
    root.style.setProperty(`--${k}`, v)
    const { r, g, b } = hexToRgb(v)
    root.style.setProperty(`--${k}-rgb`, `${r}, ${g}, ${b}`)
  })
  root.dataset.theme = palette.light ? 'light' : 'dark'
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', palette.bg)
}

/** Mirrors the active palette into CSS custom properties and remembers it. */
export function usePaletteSync() {
  const palette = useAppStore((s) => s.palette)

  useEffect(() => {
    applyPaletteVars(palette)
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, JSON.stringify(palette))
    } catch {
      /* storage unavailable */
    }
  }, [palette])
}
