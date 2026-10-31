import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '../store/useAppStore'
import { createDotTexture } from './labelTexture'
import { mix } from '../utils/color'

const LIFE = 2.2

/** A burst of fine mist particles released when the bottle is tapped. */
export default function SprayMist({ origin, low }) {
  const count = low ? 160 : 340
  const points = useRef()
  const material = useRef()
  const spray = useAppStore((s) => s.spray)
  const palette = useAppStore((s) => s.palette)
  const age = useRef(LIFE)

  const sprite = useMemo(() => createDotTexture(), [])
  const { positions, velocities } = useMemo(
    () => ({ positions: new Float32Array(count * 3), velocities: new Float32Array(count * 3) }),
    [count]
  )
  useEffect(() => () => sprite.dispose(), [sprite])

  useEffect(() => {
    if (!spray) return
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = origin[0] + (Math.random() - 0.5) * 0.08
      positions[i3 + 1] = origin[1] + (Math.random() - 0.5) * 0.05
      positions[i3 + 2] = origin[2] + (Math.random() - 0.5) * 0.08
      // Cone aimed up and towards the viewer.
      const speed = 1.2 + Math.random() * 2.4
      const theta = Math.random() * Math.PI * 2
      const spread = Math.random() * 0.55
      velocities[i3] = Math.cos(theta) * spread * speed
      velocities[i3 + 1] = speed * (0.75 + Math.random() * 0.3)
      velocities[i3 + 2] = (0.35 + Math.sin(theta) * spread) * speed
    }
    points.current.geometry.attributes.position.needsUpdate = true
    age.current = 0
    // Only a new spray should restart the burst.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spray])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    if (age.current >= LIFE) {
      points.current.visible = false
      return
    }
    points.current.visible = true
    age.current += dt
    const drag = Math.pow(0.12, dt)
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] += velocities[i] * dt
      positions[i + 1] += velocities[i + 1] * dt
      positions[i + 2] += velocities[i + 2] * dt
      velocities[i] *= drag
      velocities[i + 1] = velocities[i + 1] * drag + 0.15 * dt
      velocities[i + 2] *= drag
    }
    points.current.geometry.attributes.position.needsUpdate = true
    const life = age.current / LIFE
    material.current.opacity = Math.pow(1 - life, 1.6) * 0.75
    material.current.size = 0.06 + life * 0.22
  })

  return (
    <points ref={points} visible={false} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        map={sprite}
        color={mix(palette.glow, '#ffffff', 0.55)}
        size={0.08}
        transparent
        depthWrite={false}
        blending={palette.light ? THREE.NormalBlending : THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}
