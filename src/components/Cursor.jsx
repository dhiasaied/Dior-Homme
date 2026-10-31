import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMediaQuery } from '../hooks/useMediaQuery'

/** Two-part custom cursor for fine pointers; grows over controls and the bottle. */
export default function Cursor() {
  const fine = useMediaQuery('(pointer: fine)')
  const dot = useRef()
  const ring = useRef()

  useEffect(() => {
    if (!fine) return
    document.body.classList.add('has-cursor')
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })

    const onMove = (e) => {
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
      const interactive = e.target.closest?.('button, a, input, label')
      ring.current.classList.toggle('is-link', Boolean(interactive))
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.body.classList.remove('has-cursor')
    }
  }, [fine])

  if (!fine) return null
  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring}>
        <span>Drag</span>
      </div>
    </>
  )
}
