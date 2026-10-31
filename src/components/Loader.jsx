import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useAppStore } from '../store/useAppStore'
import { intro } from '../store/sceneState'

const withTimeout = (promise, ms) => Promise.race([promise, new Promise((r) => setTimeout(r, ms))])

// Resolves when the WebGL scene has drawn its first frames.
const waitForScene = () =>
  new Promise((resolve) => {
    if (useAppStore.getState().sceneReady) return resolve()
    const unsubscribe = useAppStore.subscribe(() => {
      if (useAppStore.getState().sceneReady) {
        unsubscribe()
        resolve()
      }
    })
  })

/**
 * Intro curtain. The wordmark waits for the web font (no fallback flash),
 * the counter tracks fonts + scene readiness, then the curtain lifts.
 */
export default function Loader() {
  const root = useRef()
  const counter = useRef()
  const setLoaded = useAppStore((s) => s.setLoaded)

  useEffect(() => {
    let cancelled = false
    const state = { p: 0 }
    const render = () => {
      if (counter.current) counter.current.textContent = String(Math.round(state.p)).padStart(3, '0')
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fonts = withTimeout(document.fonts?.ready ?? Promise.resolve(), 2500)
    const scene = withTimeout(waitForScene(), 8000)
    const minTime = new Promise((r) => setTimeout(r, reduced ? 300 : 1100))

    const ctx = gsap.context(() => {
      gsap.set(['.loader__letter', '.loader__sub', '.loader__count'], { autoAlpha: 0 })

      fonts.then(() => {
        if (cancelled) return
        gsap
          .timeline()
          .fromTo('.loader__letter', { yPercent: 110, autoAlpha: 1 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.07 })
          .to('.loader__sub', { autoAlpha: 1, duration: 1, ease: 'power2.out' }, 0.45)
          .to('.loader__count', { autoAlpha: 1, duration: 0.8 }, 0.6)
      })

      // Ease towards 70% while waiting, settle in the rest once everything is ready.
      const count = gsap.to(state, { p: 70, duration: 1.4, ease: 'power2.out', onUpdate: render })
      fonts.then(() => !cancelled && gsap.to(state, { p: Math.max(state.p, 40), duration: 0.3, onUpdate: render }))

      Promise.all([fonts, scene, minTime]).then(() => {
        if (cancelled) return
        count.kill()
        gsap
          .timeline({ defaults: { ease: 'power3.inOut' } })
          .to(state, { p: 100, duration: 0.45, ease: 'power1.out', onUpdate: render })
          .to('.loader__inner > *', { autoAlpha: 0, y: -16, duration: 0.55, stagger: 0.04, ease: 'power2.in' }, '+=0.1')
          .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=0.15')
          .add(() => setLoaded(), '-=0.75')
          .to(intro, { value: 1, duration: 2.2, ease: 'power3.out' }, '-=0.95')
          .set(root.current, { display: 'none' })
      })
    }, root)

    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [setLoaded])

  return (
    <div className="loader" ref={root} role="status" aria-label="Loading">
      <div className="loader__inner">
        <div className="loader__word" aria-hidden="true">
          {'DIOR'.split('').map((l, i) => (
            <span className="loader__mask" key={i}>
              <span className="loader__letter">{l}</span>
            </span>
          ))}
        </div>
        <p className="loader__sub">Homme Intense — Eau de Parfum</p>
        <span className="loader__count" ref={counter}>
          000
        </span>
      </div>
    </div>
  )
}
