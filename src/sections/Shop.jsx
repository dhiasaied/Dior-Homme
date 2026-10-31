import { useRef } from 'react'
import gsap from 'gsap'
import SplitText from '../components/SplitText'
import { SIZES } from '../data/content'
import { useAppStore } from '../store/useAppStore'

export default function Shop() {
  const size = useAppStore((s) => s.size)
  const setSize = useAppStore((s) => s.setSize)
  const addToCart = useAppStore((s) => s.addToCart)
  const triggerSpray = useAppStore((s) => s.triggerSpray)
  const price = useRef()

  const choose = (s) => {
    if (s.ml === size.ml) return
    setSize(s)
    gsap.fromTo(price.current, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: 'expo.out' })
  }

  return (
    <section id="shop" className="section shop">
      <div className="section__inner shop__inner">
        <span className="chapter reveal">04 — The Ritual</span>
        <SplitText className="display display--md" lines={['Make it', '*yours*']} />

        <div className="product reveal">
          <div className="product__head">
            <div>
              <h3>Dior Homme Intense</h3>
              <p>Eau de Parfum · Iris, Ambrette, Cedar</p>
            </div>
            <div className="product__rating" aria-label="Rated 4.8 out of 5">
              ★★★★★ <span>4.8</span>
            </div>
          </div>

          <div className="product__sizes" role="radiogroup" aria-label="Bottle size">
            {SIZES.map((s) => (
              <button
                key={s.ml}
                role="radio"
                aria-checked={size.ml === s.ml}
                className={size.ml === s.ml ? 'is-active' : ''}
                onClick={() => choose(s)}
              >
                <strong>{s.ml}</strong> ml
              </button>
            ))}
          </div>

          <div className="product__buy">
            <div className="product__price">
              <span ref={price}>€{size.price}</span>
              <small>Incl. VAT</small>
            </div>
            <button className="btn btn--primary btn--wide" onClick={addToCart}>
              Add to bag
            </button>
          </div>

          <button className="product__try" onClick={triggerSpray}>
            ✦ Try a virtual spray
          </button>

          <ul className="product__perks">
            <li>Complimentary engraving</li>
            <li>Free delivery & returns</li>
            <li>Two samples of your choice</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
