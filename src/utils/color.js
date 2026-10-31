// Small color helpers used to derive a full palette from custom picks.
export function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export function rgbToHex({ r, g, b }) {
  const c = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')
  return `#${c(r)}${c(g)}${c(b)}`
}

export function mix(a, b, t) {
  const A = hexToRgb(a)
  const B = hexToRgb(b)
  return rgbToHex({ r: A.r + (B.r - A.r) * t, g: A.g + (B.g - A.g) * t, b: A.b + (B.b - A.b) * t })
}

export function luminance(hex) {
  const { r, g, b } = hexToRgb(hex)
  const f = (v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

/** Build a complete palette from just an accent and a background color. */
export function derivePalette(accent, bg) {
  const light = luminance(bg) > 0.35
  const text = light ? '#17130e' : '#f3ece2'
  return {
    id: 'custom',
    name: 'Sur Mesure',
    bg,
    surface: mix(bg, text, 0.06),
    text,
    muted: mix(text, bg, 0.42),
    accent,
    glow: mix(accent, '#ffffff', 0.15),
    liquid: mix(accent, '#c8862a', 0.55),
    light,
  }
}
