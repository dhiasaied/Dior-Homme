import SplitText from '../components/SplitText'
import { CRAFT_STATS, HOTSPOTS } from '../data/content'
import { useAppStore } from '../store/useAppStore'

export default function Craft() {
  const active = useAppStore((s) => s.activeHotspot)
  const setActive = useAppStore((s) => s.setActiveHotspot)

  return (
    <section id="craft" className="section craft">
      <div className="section__inner craft__inner">
        <span className="chapter reveal">03 — The Flacon</span>
        <SplitText className="display display--md" lines={['Sculpted in', '*glass* & *shadow*']} />
        <p className="lead reveal">
          A monolith of crystal-clear glass crowned with black lacquer. Explore the details — tap the points of light on the
          bottle, or choose one below.
        </p>

        <ul className="craft__list reveal">
          {HOTSPOTS.map((h, i) => (
            <li key={h.id}>
              <button className={active === h.id ? 'is-active' : ''} onClick={() => setActive(active === h.id ? null : h.id)}>
                <span>0{i + 1}</span>
                {h.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="stats">
          {CRAFT_STATS.map((s, i) => (
            <div className="stat reveal" data-delay={i * 0.1} key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
