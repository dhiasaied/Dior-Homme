import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitText from '../components/SplitText'
import { useAppStore } from '../store/useAppStore'
import { scrollToSection } from '../hooks/useSmoothScroll'

export default function Hero() {
  const loaded = useAppStore((s) => s.loaded)
  const size = useAppStore((s) => s.size)
  const root = useRef()

  // Hide the intro elements before first paint so nothing flashes under the curtain.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.split__inner', { yPercent: 110 })
      gsap.set('.hero__fade', { autoAlpha: 0, y: 24 })
      gsap.set('.hero__rule', { scaleX: 0 })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!loaded) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.25 })
        .to('.split__inner', { yPercent: 0, duration: 1.6, ease: 'expo.out', stagger: 0.09 })
        .to('.hero__rule', { scaleX: 1, duration: 1.4, ease: 'expo.inOut' }, 0.35)
        .to('.hero__fade', { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.09 }, 0.45)
    }, root)
    return () => ctx.kill()
  }, [loaded])

  return (
    <section id="hero" className="section hero" ref={root}>
      <div className="hero__content">
        <p className="eyebrow hero__fade">Eau de Parfum — Intense</p>
        <SplitText as="h1" intro className="display hero__title" lines={['Darkness,', '*Distilled.*']} />
        <span className="hero__rule" />
        <p className="lead hero__fade">
          An iris-led eau de parfum of quiet power — powdery, woody and unmistakably sensual. Crafted for the hours after dark.
        </p>
        <div className="hero__ctas hero__fade">
          <button className="btn btn--primary" onClick={() => scrollToSection('story')}>
            Discover the scent
          </button>
          <button className="btn btn--ghost" onClick={() => scrollToSection('shop')}>
            Shop — €{size.price}
          </button>
        </div>
      </div>

      <aside className="hero__meta hero__fade">
        <span>Paris</span>
        <span className="hero__meta-line" />
        <span>Since 2011</span>
      </aside>

      <div className="hero__hint hero__fade">
        <span className="hero__hint-icon" />
        Drag to rotate · Tap to spray
      </div>

      <div className="scroll-cue hero__fade">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}
