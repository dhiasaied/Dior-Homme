import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Shared instance so any component can scroll programmatically.
export const scroller = { lenis: null }

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (scroller.lenis) scroller.lenis.scrollTo(el, { duration: 1.8 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/** Lenis smooth scrolling, driven by GSAP's ticker and synced with ScrollTrigger. */
export function useSmoothScroll(enabled) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      duration: reduced ? 0.4 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })
    scroller.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      scroller.lenis = null
    }
  }, [])

  // Hold the page still until the intro has played.
  useEffect(() => {
    const lenis = scroller.lenis
    if (!lenis) return
    if (enabled) {
      lenis.start()
      document.documentElement.classList.remove('is-locked')
    } else {
      lenis.stop()
      document.documentElement.classList.add('is-locked')
    }
  }, [enabled])
}
