import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { PALETTES } from '../data/palettes'
import { useAppStore } from '../store/useAppStore'
import { derivePalette } from '../utils/color'

/** Floating palette atelier: presets plus custom accent / background pickers. */
export default function ColorSelector({ open, onToggle, onClose }) {
  const palette = useAppStore((s) => s.palette)
  const setPalette = useAppStore((s) => s.setPalette)
  const [accent, setAccent] = useState(palette.accent)
  const [bg, setBg] = useState(palette.bg)
  const panel = useRef()

  useEffect(() => {
    setAccent(palette.accent)
    setBg(palette.bg)
  }, [palette])

  useEffect(() => {
    const el = panel.current
    if (open) {
      gsap.set(el, { display: 'block' })
      gsap.fromTo(el, { autoAlpha: 0, y: 24, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'expo.out' })
      gsap.from(el.querySelectorAll('.palette__item'), { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out', delay: 0.1 })
    } else {
      gsap.to(el, { autoAlpha: 0, y: 16, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(el, { display: 'none' }) })
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const applyCustom = (a = accent, b = bg) => setPalette(derivePalette(a, b))

  return (
    <div className="palette no-webgl">
      <div className="palette__panel" ref={panel} role="dialog" aria-label="Colour palette" style={{ display: 'none' }}>
        <div className="palette__head">
          <div>
            <span className="eyebrow">Atelier des couleurs</span>
            <h3>Choose your mood</h3>
          </div>
          <button className="palette__close" onClick={onClose} aria-label="Close palette">
            ×
          </button>
        </div>

        <div className="palette__grid">
          {PALETTES.map((p) => (
            <button
              key={p.id}
              className={`palette__item ${palette.id === p.id ? 'is-active' : ''}`}
              onClick={() => setPalette(p)}
            >
              <span className="palette__preview" style={{ background: p.bg }}>
                <span style={{ background: `radial-gradient(circle at 50% 60%, ${p.glow}, transparent 65%)` }} />
                <i style={{ background: p.accent }} />
              </span>
              <span className="palette__name">{p.name}</span>
            </button>
          ))}
        </div>

        <div className="palette__custom">
          <span className="eyebrow">Sur mesure</span>
          <div className="palette__pickers">
            <label>
              <input
                type="color"
                value={accent}
                onChange={(e) => {
                  setAccent(e.target.value)
                  applyCustom(e.target.value, bg)
                }}
              />
              <span>Accent</span>
            </label>
            <label>
              <input
                type="color"
                value={bg}
                onChange={(e) => {
                  setBg(e.target.value)
                  applyCustom(accent, e.target.value)
                }}
              />
              <span>Background</span>
            </label>
          </div>
        </div>
      </div>

      <button className="palette__fab" onClick={onToggle} aria-expanded={open} aria-label="Open colour palette">
        <span className="palette__fab-ring" style={{ background: `conic-gradient(${PALETTES.map((p) => p.accent).join(',')}, ${PALETTES[0].accent})` }} />
        <span className="palette__fab-dot" style={{ background: palette.accent }} />
      </button>
    </div>
  )
}
