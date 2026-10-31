import { useRef } from 'react'
import gsap from 'gsap'
import SplitText from '../components/SplitText'
import { NOTES } from '../data/content'

const ACCORDS = [
  { label: 'Powdery', value: 92 },
  { label: 'Woody', value: 84 },
  { label: 'Aromatic', value: 62 },
  { label: 'Floral', value: 55 },
]

/** Glass card with a light that follows the pointer and a gentle 3D tilt. */
function NoteCard({ note, index }) {
  const card = useRef()

  const onMove = (e) => {
    const r = card.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    card.current.style.setProperty('--mx', `${x * 100}%`)
    card.current.style.setProperty('--my', `${y * 100}%`)
    gsap.to(card.current, { rotateY: (x - 0.5) * 10, rotateX: (0.5 - y) * 10, duration: 0.6, ease: 'power3.out' })
  }
  const onLeave = () => gsap.to(card.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' })

  return (
    <article className="note-card reveal" data-delay={index * 0.12} ref={card} onPointerMove={onMove} onPointerLeave={onLeave}>
      <span className="note-card__tier">
        <i>0{index + 1}</i> {note.tier} notes
      </span>
      <h3>{note.title}</h3>
      <p>{note.text}</p>
      <ul>
        {note.ingredients.map((ing) => (
          <li key={ing}>{ing}</li>
        ))}
      </ul>
    </article>
  )
}

export default function Notes() {
  return (
    <section id="notes" className="section notes">
      <div className="notes__head">
        <span className="chapter reveal">02 — The Notes</span>
        <SplitText className="display display--md" lines={['An olfactory', '*architecture*']} />
      </div>

      <div className="notes__grid">
        {NOTES.map((n, i) => (
          <NoteCard note={n} index={i} key={n.tier} />
        ))}
      </div>

      <div className="accords reveal">
        <span className="eyebrow">Accord profile</span>
        <div className="accords__list">
          {ACCORDS.map((a) => (
            <div className="accord" key={a.label}>
              <div className="accord__label">
                <span>{a.label}</span>
                <span>{a.value}%</span>
              </div>
              <div className="accord__track">
                <span data-meter={a.value} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
