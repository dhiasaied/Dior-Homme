import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { NAV_LINKS } from '../data/content'
import { useAppStore } from '../store/useAppStore'
import { scrollToSection } from '../hooks/useSmoothScroll'

export default function Navbar({ onOpenPalette }) {
  const cart = useAppStore((s) => s.cart)
  const loaded = useAppStore((s) => s.loaded)
  const palette = useAppStore((s) => s.palette)
  const [open, setOpen] = useState(false)
  const bag = useRef()

  const navRef = useRef()

  // Keep the bar hidden under the loader, then let it settle in after the reveal.
  useLayoutEffect(() => {
    const items = navRef.current.children
    if (!loaded) {
      gsap.set(items, { autoAlpha: 0, y: -16 })
      return
    }
    const tween = gsap.to(items, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.08, delay: 0.6 })
    return () => tween.kill()
  }, [loaded])

  // Little bounce on the bag when something is added.
  useEffect(() => {
    if (!cart) return
    gsap.fromTo(bag.current, { scale: 1.35 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.4)' })
  }, [cart])

  const go = (id) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header className={`nav-wrap ${open ? 'is-open' : ''}`}>
      <nav className="nav" ref={navRef}>
        <button className="nav__logo" onClick={() => go('hero')} aria-label="Back to top">
          DIOR
        </button>

        <ul className="nav__links">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button onClick={() => go(l.id)}>{l.label}</button>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <button className="nav__palette" onClick={onOpenPalette} aria-label="Change colour palette">
            <span className="nav__swatch" style={{ background: palette.accent }} />
            <span className="nav__palette-label">{palette.name}</span>
          </button>
          <button className="nav__bag" onClick={() => go('shop')} aria-label={`Bag, ${cart} items`}>
            Bag <span ref={bag} className="nav__count">{cart}</span>
          </button>
          <button className="nav__burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div className="nav__progress" />

      <div className="mobile-menu" aria-hidden={!open}>
        {NAV_LINKS.map((l, i) => (
          <button key={l.id} onClick={() => go(l.id)} style={{ transitionDelay: `${open ? 0.1 + i * 0.06 : 0}s` }}>
            <span>0{i + 1}</span>
            {l.label}
          </button>
        ))}
      </div>
    </header>
  )
}
