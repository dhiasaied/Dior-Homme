import * as THREE from 'three'

/**
 * Draws the cap label (silver serif lettering on black lacquer) into a
 * canvas so the 3D bottle needs no external image assets.
 */
export function createLabelTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8

  const draw = () => {
    const ctx = canvas.getContext('2d')
    const { width: w, height: h } = canvas
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, w, h)

    const silver = ctx.createLinearGradient(0, 80, 0, 440)
    silver.addColorStop(0, '#ffffff')
    silver.addColorStop(0.45, '#c9ccd1')
    silver.addColorStop(0.55, '#9a9ea6')
    silver.addColorStop(1, '#e9ebee')
    ctx.fillStyle = silver
    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'

    const serif = '"Cormorant Garamond", "Didot", "Bodoni MT", Georgia, serif'
    ctx.font = `500 200px ${serif}`
    ctx.fillText('Dior', w / 2, 250)

    ctx.font = `500 92px ${serif}`
    drawSpaced(ctx, 'HOMME', w / 2, 352, 10)

    ctx.font = `500 62px ${serif}`
    drawSpaced(ctx, 'INTENSE', w / 2, 438, 12)

    texture.needsUpdate = true
  }

  draw()
  // Redraw once the web font is available so the label uses it.
  if (document.fonts?.load) {
    document.fonts.load('500 100px "Cormorant Garamond"').then(draw).catch(() => {})
  }
  return texture
}

function drawSpaced(ctx, text, cx, y, spacing) {
  const widths = [...text].map((c) => ctx.measureText(c).width)
  const total = widths.reduce((a, b) => a + b, 0) + spacing * (text.length - 1)
  let x = cx - total / 2
  ctx.textAlign = 'left'
  ;[...text].forEach((c, i) => {
    ctx.fillText(c, x, y)
    x += widths[i] + spacing
  })
  ctx.textAlign = 'center'
}

/** Soft round sprite for mist particles. */
export function createDotTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 64
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.35)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(canvas)
  return tex
}
