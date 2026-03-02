import { useRef, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'
import { ComponentType } from 'react'

// Type for Three.js geometry props
interface ThreeGeometryProps {
  position?: [number, number, number];
  args?: number[];
  radius?: number;
  [key: string]: unknown;
}

const FloatingShapes = memo(function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  const shapes = [
    {
      component: RoundedBox,
      props: { args: [0.5, 0.5, 0.5], radius: 0.1 },
      position: [4, 3, -2] as [number, number, number],
      color: '#3b82f6',
      speed: 1.5
    },
    {
      component: Sphere,
      props: { args: [0.3] },
      position: [-4, 2, -1] as [number, number, number],
      color: '#8b5cf6',
      speed: 2
    },
    {
      component: Torus,
      props: { args: [0.3, 0.1, 8, 16] },
      position: [3, -2, -3] as [number, number, number],
      color: '#06b6d4',
      speed: 1.8
    },
    {
      component: RoundedBox,
      props: { args: [0.4, 0.8, 0.4], radius: 0.05 },
      position: [-3, -3, -2] as [number, number, number],
      color: '#f59e0b',
      speed: 1.2
    },
    {
      component: Sphere,
      props: { args: [0.25] },
      position: [5, -1, 1] as [number, number, number],
      color: '#ef4444',
      speed: 2.5
    },
    {
      component: Torus,
      props: { args: [0.2, 0.08, 6, 12] },
      position: [-5, 1, 2] as [number, number, number],
      color: '#10b981',
      speed: 1.7
    }
  ]

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => {
        const ShapeComponent = shape.component as ComponentType<ThreeGeometryProps>
        
        return (
          <Float
            key={index}
            speed={shape.speed}
            rotationIntensity={0.4}
            floatIntensity={0.6}
          >
            <ShapeComponent
              position={shape.position}
              {...shape.props}
            >
              <meshStandardMaterial
                color={shape.color}
                transparent
                opacity={0.7}
                emissive={shape.color}
                emissiveIntensity={0.2}
                roughness={0.2}
                metalness={0.8}
              />
            </ShapeComponent>
          </Float>
        )
      })}
    </group>
  )
})

export default FloatingShapes
