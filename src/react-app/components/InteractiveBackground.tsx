import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [gradientOffset, setGradientOffset] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100

      setMousePosition({ x, y })
      setGradientOffset({
        x: 50 + (x - 50) * 0.1,
        y: 50 + (y - 50) * 0.1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${gradientOffset.x}% ${gradientOffset.y}%, #172554 0%, #2e1065 25%, #083344 50%, #000000 100%)`
        }}
        animate={{
          background: `radial-gradient(circle at ${gradientOffset.x}% ${gradientOffset.y}%, #172554 0%, #2e1065 25%, #083344 50%, #000000 100%)`
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40"
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
        className="absolute inset-0 opacity-5 interactive-grid"
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}
