import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, RoundedBox, Float, Sparkles, useTexture } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'
import ParticleField from './ParticleField'
import FloatingShapes from './FloatingShapes'

export default function ProfileCard3D() {
  const groupRef = useRef<THREE.Group>(null)
  const cardRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const { size, mouse } = useThree()

  // Load profile texture
  const profileTexture = useTexture('/profile.webp')

  // Spring animation for hover effects
  const { scale, color } = useSpring({
    scale: hovered ? 1.1 : 1,
    color: hovered ? '#f59e0b' : '#1e293b',
    config: { mass: 1, tension: 280, friction: 30 }
  })

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + mouse.x * 0.2
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05 + mouse.y * 0.1
    }

    if (cardRef.current) {
      cardRef.current.rotation.y += 0.005
      cardRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.02
    }
  })

  // Responsive positioning and scaling
  const isMobile = size.width < 768
  const isTablet = size.width < 1024
  const cardPosition: [number, number, number] = isMobile ? [0, -1, 0] : isTablet ? [1, 0, 0] : [2, 0, 0]
  const cardScale = isMobile ? 0.7 : isTablet ? 0.85 : 1

  return (
    <group ref={groupRef}>
      {/* Particle Field Background */}
      <ParticleField count={300} radius={15} speed={0.3} />

      {/* Floating Shapes */}
      <FloatingShapes />

      {/* Enhanced particles */}
      <Sparkles
        count={80}
        scale={[12, 12, 12]}
        size={3}
        speed={0.6}
        color="#f59e0b"
      />

      <Sparkles
        count={40}
        scale={[6, 6, 6]}
        size={1.5}
        speed={0.8}
        color="#8b5cf6"
      />

      {/* Main Profile Card */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <animated.group position={cardPosition} scale={scale.to(s => s * cardScale)}>
          <RoundedBox
            ref={cardRef}
            args={[3, 4, 0.2]}
            radius={0.1}
            smoothness={4}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            <animated.meshStandardMaterial
              color={color}
              transparent
              opacity={0.9}
              roughness={0.1}
              metalness={0.8}
              emissive={color}
              emissiveIntensity={hovered ? 0.3 : 0.1}
            />
          </RoundedBox>

          {/* Profile Image - Using solid color to avoid CORS issues */}
          <RoundedBox
            args={[1.2, 1.2, 0.1]}
            position={[0, 1.2, 0.15]}
            radius={0.6}
            smoothness={8}
          >
            <meshStandardMaterial
              map={profileTexture}
              transparent
              opacity={0.9}
              roughness={0.2}
            />
          </RoundedBox>



          {/* Name */}
          <Text
            position={[0, 0.2, 0.15]}
            fontSize={0.25}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
          >
            IRFAN SHAIKH
          </Text>

          {/* Title */}
          <Text
            position={[0, -0.2, 0.15]}
            fontSize={0.15}
            color="#f59e0b"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
          >
            Web Developer
          </Text>

          {/* Experience Badge */}
          <RoundedBox
            args={[1.5, 0.3, 0.05]}
            position={[0, -0.7, 0.15]}
            radius={0.15}
            smoothness={4}
          >
            <meshStandardMaterial
              color="#f59e0b"
              transparent
              opacity={0.8}
              emissive="#064e3b"
              emissiveIntensity={0.3}
            />
          </RoundedBox>

          <Text
            position={[0, -0.7, 0.2]}
            fontSize={0.12}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
          >
            2+ YEARS
          </Text>

          {/* Skills Icons with enhanced animations */}
          {[
            { pos: [-0.8, -1.4, 0.15] as [number, number, number], color: "#f97316", label: "HTML" },
            { pos: [-0.3, -1.4, 0.15] as [number, number, number], color: "#f59e0b", label: "CSS" },
            { pos: [0.3, -1.4, 0.15] as [number, number, number], color: "#eab308", label: "JS" },
            { pos: [0.8, -1.4, 0.15] as [number, number, number], color: "#fbbf24", label: "React" }
          ].map((skill, index) => (
            <Float
              key={index}
              speed={2 + index * 0.5}
              rotationIntensity={0.3}
              floatIntensity={0.4}
            >
              <group>
                <RoundedBox
                  args={[0.3, 0.3, 0.05]}
                  position={skill.pos}
                  radius={0.05}
                  smoothness={4}
                >
                  <meshStandardMaterial
                    color={skill.color}
                    transparent
                    opacity={0.9}
                    emissive={skill.color}
                    emissiveIntensity={0.3}
                    roughness={0.2}
                    metalness={0.8}
                  />
                </RoundedBox>
                <Text
                  position={[skill.pos[0], skill.pos[1], skill.pos[2] + 0.05]}
                  fontSize={0.08}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
                >
                  {skill.label}
                </Text>
              </group>
            </Float>
          ))}
        </animated.group>
      </Float>

      {/* Enhanced Lighting */}
      <pointLight position={[2, 2, 2]} intensity={1.2} color="#f59e0b" />
      <pointLight position={[-2, -2, 2]} intensity={0.8} color="#eab308" />
      <pointLight position={[0, 5, 3]} intensity={0.6} color="#fbbf24" />
      <ambientLight intensity={0.4} />

      {/* Dynamic spotlight that follows mouse */}
      <spotLight
        position={[mouse.x * 5, mouse.y * 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#ffffff"
        target={cardRef.current || undefined}
      />
    </group>
  )
}
