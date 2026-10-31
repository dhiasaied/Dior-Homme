import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { useAppStore } from '../store/useAppStore'
import { sceneTarget, pointer, intro } from '../store/sceneState'
import { createLabelTexture } from './labelTexture'
import Plinth from './Plinth'
import SprayMist from './SprayMist'
import Hotspots from './Hotspots'

// Bottle proportions, modelled on the 50 ml flacon (1 unit ≈ 4 cm).
const GLASS = { w: 1.4, h: 2.0, d: 0.9 }
const CAP = { w: 1.42, h: 0.62, d: 0.92 }
const LIQUID = { w: 1.12, h: 1.56, d: 0.62, base: 0.28 }
const CENTER_Y = (GLASS.h + CAP.h) / 2

const { damp } = THREE.MathUtils

export default function PerfumeBottle({ low }) {
  const root = useRef() // position + scale (follows scroll)
  const spinner = useRef() // rotation (scroll + drag + pointer)
  const liquidMat = useRef()
  const glowLight = useRef()
  const press = useRef({ s: 1 })
  const drag = useRef({ active: false, lastX: 0, startX: 0, offset: 0, vel: 0 })

  const palette = useAppStore((s) => s.palette)
  const size = useAppStore((s) => s.size)
  const spray = useAppStore((s) => s.spray)
  const triggerSpray = useAppStore((s) => s.triggerSpray)

  const labelTexture = useMemo(() => createLabelTexture(), [])
  const liquidTarget = useMemo(() => new THREE.Color(palette.liquid), [palette.liquid])
  const glowTarget = useMemo(() => new THREE.Color(palette.glow), [palette.glow])

  useEffect(() => () => labelTexture.dispose(), [labelTexture])

  // A little "press" squash each time the atomiser fires.
  useEffect(() => {
    if (!spray) return
    gsap
      .timeline()
      .to(press.current, { s: 0.955, duration: 0.12, ease: 'power2.out' })
      .to(press.current, { s: 1, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
  }, [spray])

  // Drag to spin, with inertia. A short tap counts as a spray.
  useEffect(() => {
    const onMove = (e) => {
      const d = drag.current
      if (!d.active) return
      const dx = e.clientX - d.lastX
      d.lastX = e.clientX
      d.offset += dx * 0.012
      d.vel = dx * 0.012
    }
    const onUp = (e) => {
      const d = drag.current
      if (!d.active) return
      d.active = false
      document.body.classList.remove('is-grabbing')
      if (Math.abs(e.clientX - d.startX) < 6) triggerSpray()
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [triggerSpray])

  useFrame((state, delta) => {
    const t = sceneTarget
    const d = drag.current
    const i = intro.value
    const dt = Math.min(delta, 0.1)

    if (!d.active) {
      d.offset += d.vel
      d.vel *= Math.pow(0.04, dt) // frame-rate independent decay
    }

    const g = root.current
    g.position.x = damp(g.position.x, t.x, 3.2, dt)
    g.position.y = damp(g.position.y, t.y - (1 - i) * 2.6 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04, 3.2, dt)
    const s = damp(g.scale.x, t.scale * size.scale * (0.6 + 0.4 * i), 3.5, dt)
    g.scale.set(s, s * press.current.s, s)

    const sp = spinner.current
    const targetY = t.rotY + d.offset + pointer.x * 0.28 - (1 - i) * Math.PI * 1.2
    sp.rotation.y = damp(sp.rotation.y, targetY, 3, dt)
    sp.rotation.x = damp(sp.rotation.x, t.rotX - pointer.y * 0.12, 3, dt)
    sp.rotation.z = damp(sp.rotation.z, -pointer.x * 0.04, 3, dt)

    const k = 1 - Math.pow(0.02, dt)
    liquidMat.current.color.lerp(liquidTarget, k)
    liquidMat.current.attenuationColor.copy(liquidMat.current.color)
    liquidMat.current.emissive.copy(liquidMat.current.color)
    glowLight.current.color.lerp(glowTarget, k)
  })

  const onPointerDown = (e) => {
    // Events come from the whole page; let real UI controls keep their clicks.
    if (e.nativeEvent?.target?.closest?.('button, a, input, label, .no-webgl')) return
    e.stopPropagation()
    const d = drag.current
    d.active = true
    d.lastX = d.startX = e.clientX
    d.vel = 0
    document.body.classList.add('is-grabbing')
  }

  return (
    <group ref={root} position={[sceneTarget.x, -3, 0]} scale={0.6}>
      <Plinth position={[0, -CENTER_Y, 0]} />

      <group
        ref={spinner}
        onPointerDown={onPointerDown}
        onPointerOver={() => document.body.classList.add('is-hovering-bottle')}
        onPointerOut={() => document.body.classList.remove('is-hovering-bottle')}
      >
        <group position={[0, -CENTER_Y, 0]}>
          {/* Juice — transmissive so it glows with the light behind it */}
          <RoundedBox
            args={[LIQUID.w, LIQUID.h, LIQUID.d]}
            radius={0.035}
            smoothness={3}
            position={[0, LIQUID.base + LIQUID.h / 2, 0]}
            castShadow
          >
            <meshPhysicalMaterial
              ref={liquidMat}
              color={palette.liquid}
              transmission={1}
              thickness={0.8}
              ior={1.36}
              roughness={0.06}
              attenuationColor={palette.liquid}
              attenuationDistance={1.4}
              emissive={palette.liquid}
              emissiveIntensity={0.42}
              clearcoat={0.3}
              clearcoatRoughness={0.1}
              envMapIntensity={0.8}
            />
          </RoundedBox>

          {/* Glass shell — a clear, reflective skin drawn over the juice */}
          <RoundedBox
            args={[GLASS.w, GLASS.h, GLASS.d]}
            radius={0.07}
            smoothness={low ? 3 : 5}
            position={[0, GLASS.h / 2, 0]}
            renderOrder={2}
          >
            <meshPhysicalMaterial
              color="#1a1d22"
              transparent
              opacity={0.16}
              roughness={0.02}
              metalness={0.2}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.02}
              specularIntensity={1}
              envMapIntensity={3}
              depthWrite={false}
            />
          </RoundedBox>
          {/* Thick glass base */}
          <RoundedBox args={[GLASS.w - 0.04, LIQUID.base - 0.02, GLASS.d - 0.04]} radius={0.05} smoothness={3} position={[0, LIQUID.base / 2, 0]}>
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={1}
              thickness={0.4}
              roughness={0.04}
              ior={1.5}
              envMapIntensity={1.5}
              attenuationColor={palette.liquid}
              attenuationDistance={2.5}
            />
          </RoundedBox>

          {/* Dip tube + collar, visible through the juice */}
          <mesh position={[0, LIQUID.base + 0.85, 0]}>
            <boxGeometry args={[0.11, 1.6, 0.05]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.5} />
          </mesh>
          <mesh position={[0, GLASS.h - 0.09, 0]}>
            <boxGeometry args={[0.26, 0.14, 0.26]} />
            <meshStandardMaterial color="#111111" metalness={0.6} roughness={0.35} />
          </mesh>

          {/* Seam between glass and cap */}
          <mesh position={[0, GLASS.h + 0.004, 0]}>
            <boxGeometry args={[CAP.w - 0.02, 0.012, CAP.d - 0.02]} />
            <meshStandardMaterial color="#cfd2d6" metalness={1} roughness={0.2} />
          </mesh>

          {/* Black lacquer cap */}
          <RoundedBox
            args={[CAP.w, CAP.h, CAP.d]}
            radius={0.05}
            smoothness={low ? 3 : 5}
            position={[0, GLASS.h + 0.01 + CAP.h / 2, 0]}
            castShadow
          >
            <meshPhysicalMaterial
              color="#060606"
              metalness={0.35}
              roughness={0.16}
              clearcoat={1}
              clearcoatRoughness={0.03}
              envMapIntensity={1.6}
            />
          </RoundedBox>

          {/* Front label */}
          <mesh position={[0, GLASS.h + 0.01 + CAP.h / 2, CAP.d / 2 + 0.002]}>
            <planeGeometry args={[1.02, 0.51]} />
            <meshPhysicalMaterial map={labelTexture} metalness={0.55} roughness={0.28} clearcoat={1} envMapIntensity={1.3} />
          </mesh>

          {/* Warm light trapped in the juice */}
          <pointLight ref={glowLight} position={[0, 1, -0.2]} intensity={low ? 1.5 : 2.5} distance={2.6} color={palette.glow} />

          <SprayMist origin={[0, GLASS.h + CAP.h + 0.08, 0.1]} low={low} />
        </group>

        <Hotspots />
      </group>
    </group>
  )
}
