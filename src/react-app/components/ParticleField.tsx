import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count: number
  radius: number
  speed: number
}

export default function ParticleField({ count, radius, speed }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Random spherical distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(1 - 2 * Math.random())
      const r = radius * Math.cbrt(Math.random())
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      
      // Random colors between blue and purple
      const color = new THREE.Color()
      color.setHSL(
        0.6 + Math.random() * 0.2, // Hue: blue to purple
        0.7 + Math.random() * 0.3, // Saturation
        0.5 + Math.random() * 0.5  // Lightness
      )
      
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return { positions, colors }
  }, [count, radius])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed * 0.001
      meshRef.current.rotation.x += speed * 0.0005
      
      // Gentle floating animation
      const time = state.clock.elapsedTime
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
