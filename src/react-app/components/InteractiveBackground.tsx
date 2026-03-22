import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'framer-motion'

export default function InteractiveBackground() {
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  // Use springs to smooth the mouse movement
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Animate the gradient directly without triggering React state updates
  const backgroundGradient = useMotionTemplate`radial-gradient(circle at ${smoothX}% ${smoothY}%, #fef3c7 0%, #fde68a 25%, #fcd34d 50%, #ffffff 100%)`

  const gridX = useTransform(smoothX, (v) => v * 0.02)
  const gridY = useTransform(smoothY, (v) => v * 0.02)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate percentage, default at 50%
      const xObj = (e.clientX / window.innerWidth) * 100
      const yObj = (e.clientY / window.innerHeight) * 100
      
      mouseX.set(50 + (xObj - 50) * 0.1)
      mouseY.set(50 + (yObj - 50) * 0.1)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-10 will-change-transform"
        style={{
          background: backgroundGradient
        }}
      />

      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2 h-2 bg-amber-400 rounded-full opacity-40 will-change-transform"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.4, 0.8, 0.3, 0.4]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5
          }}
        />
      ))}

      {/* Grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-5 interactive-grid will-change-transform"
        style={{
          x: gridX,
          y: gridY
        }}
      />
    </div>
  )
}
