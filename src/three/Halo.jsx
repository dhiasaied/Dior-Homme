import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '../store/useAppStore'
import { sceneTarget } from '../store/sceneState'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// An "eclipse" behind the bottle: dark core, bright shimmering rim, wide bloom.
const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - 0.5;
    float d = length(p) * 2.0;
    float a = atan(p.y, p.x);

    float shimmer = 0.65 + 0.35 * sin(a * 3.0 + uTime * 0.5) * sin(a * 5.0 - uTime * 0.3);
    float ring = exp(-pow((d - 0.56) * 22.0, 2.0)) * shimmer;
    float rimGlow = exp(-max(d - 0.56, 0.0) * 5.5) * smoothstep(0.3, 0.56, d) * 0.55;
    float bloom = exp(-d * d * 2.4) * 0.28;
    float core = smoothstep(0.56, 0.2, d) * 0.12;

    float alpha = (ring * 0.85 + rimGlow * 0.7 + bloom - core) * uIntensity * 0.8;
    alpha *= smoothstep(1.0, 0.75, d);
    vec3 col = mix(uColor, vec3(1.0), ring * 0.35);
    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`

export default function Halo({ low }) {
  const mesh = useRef()
  const palette = useAppStore((s) => s.palette)
  const target = useMemo(() => new THREE.Color(palette.glow), [palette.glow])
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(palette.glow) },
      uTime: { value: 0 },
      uIntensity: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1)
    const m = mesh.current
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uColor.value.lerp(target, 1 - Math.pow(0.02, dt))
    uniforms.uIntensity.value = THREE.MathUtils.damp(uniforms.uIntensity.value, sceneTarget.halo * (palette.light ? 0.8 : 1), 2.5, dt)
    m.position.x = THREE.MathUtils.damp(m.position.x, sceneTarget.x * 0.9, 2.6, dt)
    m.position.y = THREE.MathUtils.damp(m.position.y, sceneTarget.y + 0.3, 2.6, dt)
    m.rotation.z += dt * 0.03
  })

  return (
    <mesh ref={mesh} position={[0, 0.3, -2.6]} scale={low ? 7 : 8}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={palette.light ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </mesh>
  )
}
