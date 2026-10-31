import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DESKTOP_KEYFRAMES, MOBILE_KEYFRAMES, SECTION_ORDER } from '../data/choreography'
import { sceneTarget } from '../store/sceneState'

gsap.registerPlugin(ScrollTrigger)

/**
 * Wires every section to the 3D scene: as a section scrolls into view the
 * bottle/camera targets tween from the previous section's keyframe to its own.
 * Also drives the generic `.reveal` and `.split` text animations.
 */
export function useScrollChoreography(ready) {
  // Scene keyframes are set up immediately, so the bottle starts from the
  // correct breakpoint pose while the loader is still up.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add({ mobile: '(max-width: 768px)', desktop: '(min-width: 769px)' }, (ctx) => {
      const kf = ctx.conditions.mobile ? MOBILE_KEYFRAMES : DESKTOP_KEYFRAMES
      Object.assign(sceneTarget, kf.hero)

      SECTION_ORDER.slice(1).forEach((id, i) => {
        const el = document.getElementById(id)
        if (!el) return
        gsap.fromTo(sceneTarget, { ...kf[SECTION_ORDER[i]] }, {
          ...kf[id],
          ease: 'power1.inOut',
          immediateRender: false,
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 15%', scrub: true },
        })
      })

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          sceneTarget.progress = self.progress
          document.documentElement.style.setProperty('--progress', self.progress.toFixed(4))
        },
      })
    })

    return () => mm.revert()
  }, [])

  // Text reveals start once the intro has finished.
  useLayoutEffect(() => {
    if (!ready) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          duration: 1.3,
          ease: 'power3.out',
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      gsap.utils.toArray('.split:not(.split--intro)').forEach((el) => {
        gsap.from(el.querySelectorAll('.split__inner'), {
          yPercent: 110,
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      gsap.utils.toArray('[data-meter]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: Number(el.dataset.meter) / 100,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }
        )
      })
    })

    ScrollTrigger.refresh()
    // Fonts can shift layout after first paint.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => ctx.revert()
  }, [ready])
}
