import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { HOTSPOTS } from '../data/content'
import { sceneTarget } from '../store/sceneState'
import { useAppStore } from '../store/useAppStore'

/** Interactive anatomy markers pinned to the bottle; shown in the Craft section. */
export default function Hotspots() {
  const wrappers = useRef([])
  // Render into a fixed overlay above the page content (not the scrolling root).
  const portal = useMemo(() => ({ current: document.getElementById('hotspot-layer') }), [])
  const active = useAppStore((s) => s.activeHotspot)
  const setActive = useAppStore((s) => s.setActiveHotspot)

  useFrame(() => {
    const v = sceneTarget.hotspots
    const visible = v > 0.6
    wrappers.current.forEach((el, i) => {
      if (!el) return
      el.style.opacity = String(Math.max(0, (v - 0.6) / 0.4))
      el.style.transform = `scale(${0.6 + 0.4 * Math.min(1, v)})`
      el.style.pointerEvents = visible ? 'auto' : 'none'
      el.style.transitionDelay = `${i * 60}ms`
    })
    if (!visible && useAppStore.getState().activeHotspot) setActive(null)
  })

  return HOTSPOTS.map((h, i) => (
    <Html key={h.id} position={h.position} zIndexRange={[20, 10]} portal={portal} center>
      <div ref={(el) => (wrappers.current[i] = el)} className="hotspot" style={{ opacity: 0 }}>
        <button
          className={`hotspot__dot ${active === h.id ? 'is-active' : ''}`}
          aria-label={h.label}
          onClick={() => setActive(active === h.id ? null : h.id)}
        >
          <span />
        </button>
        <div className={`hotspot__card ${active === h.id ? 'is-open' : ''} ${h.position[0] < 0 ? 'is-left' : ''}`}>
          <span className="hotspot__index">0{i + 1}</span>
          <strong>{h.label}</strong>
          <p>{h.text}</p>
        </div>
      </div>
    </Html>
  ))
}
