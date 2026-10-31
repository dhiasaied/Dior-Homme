import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, PerformanceMonitor, Preload } from '@react-three/drei'
import Scene from './Scene'
import { useDeviceTier } from '../hooks/useMediaQuery'
import { useAppStore } from '../store/useAppStore'

/**
 * Signals the loader once the scene has rendered a few frames, so shader
 * compilation happens behind the curtain instead of after the reveal.
 */
function ReadySignal() {
  const frames = useRef(0)
  useFrame(() => {
    if (frames.current++ === 3) useAppStore.getState().setSceneReady()
  })
  return null
}

/** Fixed full-viewport WebGL layer that sits behind the HTML content. */
export default function Experience() {
  const { low } = useDeviceTier()
  const [dpr, setDpr] = useState(low ? 1.25 : 1.75)

  return (
    <div className="webgl" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, dpr]}
        camera={{ position: [0, 0.2, 7.2], fov: 32, near: 0.1, far: 50 }}
        gl={{ antialias: !low, powerPreference: 'high-performance', alpha: false }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
      >
        <PerformanceMonitor
          onDecline={() => setDpr((d) => Math.max(1, d - 0.25))}
          onIncline={() => setDpr((d) => Math.min(low ? 1.5 : 2, d + 0.25))}
          flipflops={3}
          onFallback={() => setDpr(1)}
        />
        <AdaptiveDpr pixelated={false} />
        <Suspense fallback={null}>
          <Scene low={low} />
          <Preload all />
          <ReadySignal />
        </Suspense>
      </Canvas>
    </div>
  )
}
