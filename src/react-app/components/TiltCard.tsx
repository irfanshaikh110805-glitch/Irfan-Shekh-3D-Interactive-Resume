import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useMobileDetection } from '@/react-app/hooks/useMobileDetection'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  glareOpacity?: number
  onClick?: () => void
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  glareOpacity = 0.12,
  onClick
}: TiltCardProps) {
  const isMobile = useMobileDetection()
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setRotate({ x: rotateX, y: rotateY })
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: glareOpacity
    })
  }, [isMobile, maxTilt, glareOpacity])

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 })
    setGlare(prev => ({ ...prev, opacity: 0 }))
  }, [])

  if (isMobile) {
    return (
      <div className={`relative ${className}`} onClick={onClick}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        transformPerspective: 1000
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 0.5
      }}
      className={`relative will-change-transform ${className}`}
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Specular Glare Layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(245, 158, 11, 0.4), transparent 65%)`
        }}
      />
      {children}
    </motion.div>
  )
}
