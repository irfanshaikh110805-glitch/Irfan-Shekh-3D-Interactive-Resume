import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloudRain, EyeOff, Droplets, Code2, Sparkles } from 'lucide-react'

interface RainDrop {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  width: number
  layer: number // 0: background mist, 1: midground, 2: foreground
  windOffset: number
}

interface SplashParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

interface GroundRipple {
  x: number
  y: number
  radiusX: number
  radiusY: number
  maxRadius: number
  opacity: number
  lineWidth: number
}

export default function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rainDropsRef = useRef<RainDrop[]>([])
  const splashParticlesRef = useRef<SplashParticle[]>([])
  const groundRipplesRef = useRef<GroundRipple[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef<{ x: number; y: number; vx: number; vy: number; lastX: number; lastY: number }>({
    x: -1000,
    y: -1000,
    vx: 0,
    vy: 0,
    lastX: -1000,
    lastY: -1000
  })

  const [isVisible, setIsVisible] = useState(true)
  const [intensity, setIntensity] = useState<'normal' | 'heavy' | 'light'>('normal')
  const [showControls, setShowControls] = useState(false)
  const [cloudsVisible, setCloudsVisible] = useState(true)

  // Mouse move handler to create interactive wind turbulence
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const m = mouseRef.current
    const dx = e.clientX - m.lastX
    const dy = e.clientY - m.lastY
    m.vx = dx * 0.15
    m.vy = dy * 0.15
    m.lastX = e.clientX
    m.lastY = e.clientY
    m.x = e.clientX
    m.y = e.clientY
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Rain Simulation Engine
  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initRainDrops()
    }

    window.addEventListener('resize', handleResize)

    // Density multiplier based on intensity setting
    const densityMultiplier = intensity === 'heavy' ? 1.5 : intensity === 'light' ? 0.6 : 1.0

    // Initialize multi-layer realistic raindrops
    const initRainDrops = () => {
      const drops: RainDrop[] = []
      // Density based on screen area
      const totalDrops = Math.floor(((width * height) / 9000) * densityMultiplier)

      for (let i = 0; i < totalDrops; i++) {
        // Distribute across 3 layers: 50% background, 35% midground, 15% foreground
        const rand = Math.random()
        const layer = rand < 0.5 ? 0 : rand < 0.85 ? 1 : 2

        let length = 0
        let speed = 0
        let opacity = 0
        let dropWidth = 0

        if (layer === 0) {
          // Background mist / distant rain
          length = Math.random() * 10 + 10
          speed = Math.random() * 5 + 10
          opacity = Math.random() * 0.2 + 0.12
          dropWidth = Math.random() * 0.3 + 0.5
        } else if (layer === 1) {
          // Midground rain
          length = Math.random() * 18 + 18
          speed = Math.random() * 7 + 15
          opacity = Math.random() * 0.3 + 0.3
          dropWidth = Math.random() * 0.5 + 0.7
        } else {
          // Foreground high-speed streaks
          length = Math.random() * 22 + 28
          speed = Math.random() * 8 + 20
          opacity = Math.random() * 0.25 + 0.45
          dropWidth = Math.random() * 0.6 + 0.9
        }

        drops.push({
          x: Math.random() * (width + 200) - 100,
          y: Math.random() * (height + 200) - 200,
          length,
          speed,
          opacity,
          width: dropWidth,
          layer,
          windOffset: (Math.random() - 0.5) * 0.25
        })
      }
      rainDropsRef.current = drops
    }

    initRainDrops()

    // Spawn splash particles on ground impact
    const createGroundImpact = (x: number, y: number, layer: number) => {
      if (layer === 0) return // Skip tiny background drops

      const count = layer === 2 ? Math.floor(Math.random() * 3) + 2 : 1
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI + Math.PI // upwards arc
        const splashSpeed = Math.random() * 2.2 + 1.0
        splashParticlesRef.current.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y - 2,
          vx: Math.cos(angle) * splashSpeed + 0.4,
          vy: Math.sin(angle) * splashSpeed,
          size: Math.random() * 1.2 + 0.5,
          opacity: 0.65,
          color: layer === 2 ? 'rgba(215, 235, 255,' : 'rgba(180, 210, 245,'
        })
      }

      // Spawn subtle ground water ripple
      if (Math.random() > (layer === 2 ? 0.35 : 0.75) && groundRipplesRef.current.length < 25) {
        groundRipplesRef.current.push({
          x,
          y: y - Math.random() * 4,
          radiusX: 1,
          radiusY: 0.38,
          maxRadius: Math.random() * 8 + 5,
          opacity: 0.45,
          lineWidth: Math.random() * 0.5 + 0.5
        })
      }
    }

    let lastTime = performance.now()

    // Animation Loop
    const animate = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 16.67, 2.0)
      lastTime = currentTime

      ctx.clearRect(0, 0, width, height)

      // Calculate global natural wind
      const timeSec = currentTime * 0.001
      const baseWindAngle = 0.7
      const dynamicGust = Math.sin(timeSec * 1.2) * 0.35 + Math.sin(timeSec * 0.5) * 0.25
      const totalWind = baseWindAngle + dynamicGust

      // Damp mouse velocity
      const m = mouseRef.current
      m.vx *= 0.92
      m.vy *= 0.92

      // Draw & Update Raindrops
      const drops = rainDropsRef.current
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]

        let localWind = totalWind + drop.windOffset
        if (m.x > 0 && m.y > 0) {
          const distToMouse = Math.hypot(drop.x - m.x, drop.y - m.y)
          if (distToMouse < 100) {
            const influence = (1 - distToMouse / 100) * (drop.layer + 1) * 0.35
            localWind += m.vx * influence
          }
        }

        const endX = drop.x + localWind * (drop.length * 0.15)
        const endY = drop.y + drop.length

        const grad = ctx.createLinearGradient(drop.x, drop.y, endX, endY)
        grad.addColorStop(0, `rgba(195, 220, 255, 0)`)
        grad.addColorStop(0.3, `rgba(205, 225, 255, ${drop.opacity * 0.5})`)
        grad.addColorStop(0.8, `rgba(225, 240, 255, ${drop.opacity})`)
        grad.addColorStop(1, `rgba(255, 255, 255, ${Math.min(1, drop.opacity * 1.15)})`)

        ctx.beginPath()
        ctx.strokeStyle = grad
        ctx.lineWidth = drop.width
        ctx.lineCap = 'round'
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // Move raindrop
        drop.y += drop.speed * dt
        drop.x += localWind * dt

        // Ground collision & splash
        if (drop.y + drop.length >= height - 8) {
          createGroundImpact(endX, height - 4, drop.layer)

          drop.y = -drop.length - Math.random() * 30
          drop.x = Math.random() * (width + 200) - 100
        }

        // Reset if drifted too far horizontally
        if (drop.x > width + 100) {
          drop.x = -50
        } else if (drop.x < -100) {
          drop.x = width + 50
        }
      }

      // Draw & Update Splash Droplets
      const splashes = splashParticlesRef.current
      for (let i = splashes.length - 1; i >= 0; i--) {
        const p = splashes[i]
        p.vy += 0.25 * dt // gravity
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.opacity -= 0.035 * dt

        if (p.opacity <= 0 || p.y > height) {
          splashes.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.fillStyle = `${p.color} ${p.opacity})`
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw & Update Ground Ripples
      const ripples = groundRipplesRef.current
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        r.radiusX += 0.7 * dt
        r.radiusY = r.radiusX * 0.38
        r.opacity -= 0.025 * dt

        if (r.opacity <= 0 || r.radiusX > r.maxRadius) {
          ripples.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.strokeStyle = `rgba(195, 225, 255, ${r.opacity})`
        ctx.lineWidth = r.lineWidth
        ctx.ellipse(r.x, r.y, r.radiusX, r.radiusY, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isVisible, intensity])

  return (
    <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
      {/* Dynamic Modern Floating Tech Symbols & Cyber Particle Mesh */}
      {cloudsVisible && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Tech Glyph 1: <developer /> - Upper Left to Right */}
          <motion.div
            className="absolute top-4 sm:top-7 select-none pointer-events-none"
            initial={{ x: '-20vw' }}
            animate={{ x: '110vw' }}
            transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/75 backdrop-blur-md border border-amber-300/40 text-amber-700/80 font-mono text-[11px] font-semibold shadow-sm hover:shadow-md transition-shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{'<developer />'}</span>
            </div>
          </motion.div>

          {/* Tech Glyph 2: { AI / ML } - Upper Right to Left */}
          <motion.div
            className="absolute top-10 sm:top-14 select-none pointer-events-none hidden sm:block"
            initial={{ x: '110vw' }}
            animate={{ x: '-25vw' }}
            transition={{ duration: 75, repeat: Infinity, ease: 'linear', delay: 5 }}
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/75 backdrop-blur-md border border-yellow-300/40 text-yellow-700/80 font-mono text-[11px] font-semibold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              <span>{'{ AI / ML }'}</span>
            </div>
          </motion.div>

          {/* Tech Glyph 3: ( ) => deploy() - Gliding across center */}
          <motion.div
            className="absolute top-2 sm:top-4 select-none pointer-events-none"
            initial={{ x: '25vw' }}
            animate={{ x: '115vw' }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/70 backdrop-blur-md border border-orange-300/30 text-orange-700/75 font-mono text-[10px] font-medium shadow-xs">
              <span>{'() => deploy()'}</span>
            </div>
          </motion.div>

          {/* Tech Glyph 4: [ React 19 ] - Subtle drifting badge */}
          <motion.div
            className="absolute top-16 sm:top-24 select-none pointer-events-none hidden sm:block"
            initial={{ x: '80vw' }}
            animate={{ x: '-20vw' }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/70 backdrop-blur-md border border-cyan-300/35 text-cyan-800/75 font-mono text-[10px] font-medium shadow-xs">
              <span className="text-cyan-500">⚛</span>
              <span>React 19</span>
            </div>
          </motion.div>

          {/* Tech Glyph 5: // 0101 - Binary Matrix accent */}
          <motion.div
            className="absolute top-6 sm:top-10 select-none pointer-events-none"
            initial={{ x: '50vw' }}
            animate={{ x: '110vw' }}
            transition={{ duration: 85, repeat: Infinity, ease: 'linear' }}
          >
            <div className="px-2 py-0.5 rounded-md bg-amber-50/60 backdrop-blur-xs border border-amber-200/30 text-amber-600/60 font-mono text-[9px] tracking-wider">
              {'// 01001001'}
            </div>
          </motion.div>

          {/* Tech Glyph 6: λ full-stack - Mobile & Desktop visible */}
          <motion.div
            className="absolute top-8 sm:top-12 select-none pointer-events-none"
            initial={{ x: '95vw' }}
            animate={{ x: '-25vw' }}
            transition={{ duration: 88, repeat: Infinity, ease: 'linear' }}
          >
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/70 backdrop-blur-md border border-amber-300/30 text-amber-700/70 font-mono text-[10px]">
              <span className="text-amber-500 font-bold">λ</span>
              <span>full-stack</span>
            </div>
          </motion.div>

          {/* Subtle Ambient Tech Particles / Glowing Circuit Nodes */}
          <div className="absolute top-1/6 left-1/5 w-2 h-2 rounded-full bg-amber-400/40 blur-[1px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-yellow-400/50 blur-[1px] animate-ping" />
          <div className="absolute top-1/8 right-1/3 w-1 h-1 rounded-full bg-orange-400/45 blur-[0.5px] animate-pulse" />
        </div>
      )}

      {/* Realistic Rain Canvas */}
      {isVisible && (
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none"
          style={{ mixBlendMode: 'normal' }}
        />
      )}

      {/* Atmospheric bottom mist gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-900/4 via-sky-800/2 to-transparent pointer-events-none" />

      {/* Interactive Rain Floating Controls Toggle Button */}
      <div className="fixed top-20 right-4 pointer-events-auto z-[101]">
        <div className="relative">
          <motion.button
            onClick={() => setShowControls(!showControls)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full backdrop-blur-md shadow-lg border transition-all duration-300 flex items-center justify-center ${
              isVisible
                ? 'bg-white/90 text-amber-600 border-amber-200/80 shadow-amber-500/10 hover:bg-white'
                : 'bg-gray-900/80 text-gray-400 border-gray-700 hover:text-white'
            }`}
            title={isVisible ? 'Rain Active - Click for settings' : 'Rain Off - Click to enable'}
            aria-label="Toggle weather & rain settings"
          >
            {isVisible ? (
              <CloudRain className="w-4 h-4 animate-pulse text-amber-500" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </motion.button>

          {/* Quick Dropdown / Options Menu */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-56 p-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-100/80 text-gray-800 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Atmospheric FX
                  </span>
                  <button
                    onClick={() => setIsVisible(!isVisible)}
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium transition-colors ${
                      isVisible
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isVisible ? 'Disable' : 'Enable'}
                  </button>
                </div>

                {/* Intensity selector */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-medium text-gray-500 flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-sky-500" />
                    Rain Density
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-gray-100/80 p-1 rounded-xl">
                    {(['light', 'normal', 'heavy'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setIntensity(mode)
                          if (!isVisible) setIsVisible(true)
                        }}
                        className={`text-[10px] py-1 rounded-lg font-semibold capitalize transition-all ${
                          intensity === mode && isVisible
                            ? 'bg-white text-amber-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tech Atmosphere layer toggle */}
                <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                  <span className="text-[11px] text-gray-600 flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-amber-500" />
                    Tech Atmosphere
                  </span>
                  <button
                    onClick={() => setCloudsVisible(!cloudsVisible)}
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold transition-colors ${
                      cloudsVisible
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {cloudsVisible ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
