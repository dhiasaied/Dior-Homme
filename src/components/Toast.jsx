import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useAppStore } from '../store/useAppStore'

export default function Toast() {
  const toast = useAppStore((s) => s.toast)
  const size = useAppStore((s) => s.size)
  const el = useRef()

  useEffect(() => {
    if (!toast) return
    gsap
      .timeline()
      .fromTo(el.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' })
      .to(el.current, { autoAlpha: 0, y: 20, duration: 0.4, delay: 2.4, ease: 'power2.in' })
  }, [toast])

  return (
    <div className="toast" ref={el} role="status" aria-live="polite">
      <span className="toast__check">✓</span>
      <div>
        <strong>Added to your bag</strong>
        <p>Dior Homme Intense — {size.ml} ml</p>
      </div>
    </div>
  )
}
