import SplitText from '../components/SplitText'

export default function Story() {
  return (
    <section id="story" className="section story">
      <div className="section__inner story__inner">
        <span className="chapter reveal">01 — The Story</span>
        <SplitText className="display display--md" lines={['A portrait of', '*masculine* sensuality']} />
        <p className="lead reveal">
          Born from the tension between strength and softness, Homme Intense wraps the cool elegance of iris in the warmth
          of ambrette and precious woods. It is a fragrance of contrast — light that only reveals itself in the dark.
        </p>
        <p className="body reveal" data-delay="0.1">
          Each bottle carries a heart of Florentine iris, among the most precious raw materials in perfumery: the roots are
          dried for three years before their butter is distilled, yielding a note that is at once powdery, earthy and
          strangely addictive.
        </p>
        <blockquote className="quote reveal" data-delay="0.15">
          “An iris worn like a second skin — close, warm, and impossible to forget.”
        </blockquote>
      </div>
    </section>
  )
}
