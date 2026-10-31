import { scrollToSection } from '../hooks/useSmoothScroll'
import { NAV_LINKS } from '../data/content'

const MARQUEE = 'Dior Homme Intense — Eau de Parfum — Iris — Ambrette — Cedar — Vetiver — '

export default function Footer() {
  return (
    <footer className="footer">
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          <span>{MARQUEE}</span>
          <span>{MARQUEE}</span>
        </div>
      </div>

      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__word">HOMME</span>
          <span className="footer__word footer__word--italic">Intense</span>
        </div>

        <div className="footer__cols">
          <div>
            <span className="eyebrow">Explore</span>
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollToSection(l.id)}>
                {l.label}
              </button>
            ))}
          </div>
          <div>
            <span className="eyebrow">Newsletter</span>
            <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email" aria-label="Email address" />
              <button type="submit">→</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer__base">
        <span>Concept experience — not affiliated with Parfums Christian Dior.</span>
        <button onClick={() => scrollToSection('hero')}>Back to top ↑</button>
      </div>
    </footer>
  )
}
