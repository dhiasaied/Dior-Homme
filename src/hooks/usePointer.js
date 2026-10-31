import { useEffect } from 'react'
import { pointer } from '../store/sceneState'

/** Normalised (-1…1) pointer position, consumed by the 3D parallax. */
export function usePointer() {
  useEffect(() => {
    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => {
      pointer.x = 0
      pointer.y = 0
    }
    window.addEventListener('pointermove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])
}
