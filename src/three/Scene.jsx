import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '../store/useAppStore'
import { sceneTarget, pointer } from '../store/sceneState'
import PerfumeBottle from './PerfumeBottle'
import Halo from './Halo'

const { damp } = THREE.MathUtils

/** Camera drifts with scroll targets and a touch of pointer parallax. */
function CameraRig() {
  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.1)
    camera.position.x = damp(camera.position.x, pointer.x * 0.35, 2, dt)
    camera.position.y = damp(camera.position.y, sceneTarget.camY + pointer.y * 0.2, 2, dt)
    camera.position.z = damp(camera.position.z, sceneTarget.camZ, 2, dt)
    camera.lookAt(0, 0, 0)
  })
  return null
}

/** Studio lighting: a key spot for shadows plus coloured rim lights. */
function Lights({ low }) {
  const palette = useAppStore((s) => s.palette)
  const key = useRef()

  return (
    <>
      <ambientLight intensity={palette.light ? 0.6 : 0.15} />
      <spotLight
        ref={key}
        position={[4, 7, 5]}
        angle={0.42}
        penumbra={1}
        intensity={palette.light ? 90 : 130}
        decay={2}
        color="#fff6ea"
        castShadow
        shadow-mapSize={low ? 512 : 1024}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
      <pointLight position={[-3.5, 2, -3]} intensity={40} color={palette.glow} decay={2} />
      <pointLight position={[3.5, -1, -2.5]} intensity={22} color={palette.glow} decay={2} />
      <directionalLight position={[-4, 3, 4]} intensity={palette.light ? 0.8 : 0.35} color="#dfe6ff" />
    </>
  )
}

/** Procedural studio environment — no HDR download needed. */
function StudioEnvironment({ low }) {
  const palette = useAppStore((s) => s.palette)
  return (
    <Environment key={palette.id + palette.glow} resolution={low ? 128 : 256} frames={1}>
      <color attach="background" args={['#050505']} />
      <Lightformer form="rect" intensity={3} position={[0, 5, -1]} rotation-x={Math.PI / 2} scale={[10, 2, 1]} />
      <Lightformer form="rect" intensity={2.4} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[2.2, 7, 1]} />
      <Lightformer form="rect" intensity={1.6} position={[5, 1, 0]} rotation-y={-Math.PI / 2} scale={[1.2, 7, 1]} />
      <Lightformer form="ring" intensity={4} color={palette.glow} position={[0, 1, -6]} scale={4} />
      <Lightformer form="rect" intensity={1.2} color={palette.accent} position={[0, -4, 2]} rotation-x={-Math.PI / 2} scale={[8, 3, 1]} />
    </Environment>
  )
}

export default function Scene({ low }) {
  const palette = useAppStore((s) => s.palette)

  return (
    <>
      <color attach="background" args={[palette.bg]} />
      <fog attach="fog" args={[palette.bg, 9, 20]} />
      <CameraRig />
      <Lights low={low} />
      <StudioEnvironment low={low} />
      <Halo low={low} />
      <Sparkles
        count={low ? 35 : 80}
        scale={[12, 7, 5]}
        position={[0, 0.5, -1]}
        size={low ? 2.2 : 2.8}
        speed={0.25}
        opacity={palette.light ? 0.5 : 0.7}
        color={palette.glow}
        noise={0.6}
      />
      <PerfumeBottle low={low} />
    </>
  )
}
