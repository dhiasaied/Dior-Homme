import { useMemo } from 'react'
import * as THREE from 'three'
import { useAppStore } from '../store/useAppStore'
import { mix } from '../utils/color'

/** Round stone pedestal with a thin metallic inlay in the accent colour. */
export default function Plinth(props) {
  const palette = useAppStore((s) => s.palette)
  const stone = useMemo(
    () => new THREE.Color(mix(palette.bg, palette.light ? '#bfb5a6' : '#2a2724', 0.75)),
    [palette]
  )

  return (
    <group {...props}>
      <mesh position={[0, -0.11, 0]} receiveShadow>
        <cylinderGeometry args={[1.45, 1.5, 0.22, 96]} />
        <meshStandardMaterial color={stone} roughness={0.32} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.33, 1.36, 128]} />
        <meshStandardMaterial
          color={palette.accent}
          metalness={1}
          roughness={0.25}
          emissive={palette.accent}
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <cylinderGeometry args={[1.62, 1.66, 0.16, 96]} />
        <meshStandardMaterial color={stone} roughness={0.5} metalness={0.15} />
      </mesh>
    </group>
  )
}
