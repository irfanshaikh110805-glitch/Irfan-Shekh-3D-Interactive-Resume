import { motion } from 'framer-motion'
import TypingAnimation from './TypingAnimation'
import ClickSpark from './ClickSpark'
import { ChevronDown, Download, Star } from 'lucide-react'
import { useMobileDetection } from '@/react-app/hooks/useMobileDetection'

export default function HeroPortfolio() {
  const isMobile = useMobileDetection()
  const roleTexts = [
    'Full Stack Developer',
    'AI/ML Engineer',
    'Problem Solver',
    'Creative Developer',
    'UI/UX Designer'
  ]

  const stats = [
    { number: '9+', label: 'Deployed Projects' },
    { number: '3', label: 'Internships' },
    { number: 'BCA', label: 'Graduate 2023–2026' },
    { number: '9', label: 'Certifications' }
  ]

  const heroContent = (
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-18 md:pt-20 pb-12 md:pb-16 overflow-x-hidden bg-gradient-to-br from-white via-amber-50/30 to-gray-50">
        {/* Premium Animated Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }} />
          </div>

          {/* Floating orbs - GPU accelerated */}
          {!isMobile && (
            <>
              <div
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-200/40 rounded-full blur-[100px] hidden md:block animate-pulse-orb pointer-events-none"
              />
              <div
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-200/40 rounded-full blur-[100px] hidden md:block animate-pulse-orb-delayed pointer-events-none"
              />
            </>
          )}
        </div>

        {/* Content Grid — 1 col on mobile (circle top, text bottom), 2 cols on desktop */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">

          {/* ── RIGHT: Profile Image with Studio Lighting & Smooth Bottom Blend ── */}
          <div className="flex justify-center items-center lg:items-end relative order-1 lg:order-2 py-2 lg:py-0">
            
            {/* Profile Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="relative flex items-center justify-center"
            >
              {/* Studio Ambient Glow */}
              <div 
                aria-hidden="true"
                className="absolute w-[85%] h-[85%] bg-gradient-to-tr from-amber-300/35 via-yellow-200/25 to-orange-200/20 rounded-full blur-3xl pointer-events-none -z-10"
              />

              {/* Original Full-Quality Profile Image with Smooth Bottom Gradient Fade */}
              <picture>
                <source type="image/webp" srcSet="/profile.webp" />
                <img
                  src="/profile.webp"
                  alt="Irfan Shekh - Full Stack Developer"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width="720"
                  height="1127"
                  className="relative z-10 select-none w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[440px] transition-transform duration-500 hover:scale-[1.02]"
                  style={{
                    height: 'auto',
                    aspectRatio: '720 / 1127',
                    filter: 'drop-shadow(0 20px 35px rgba(245, 158, 11, 0.15)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.08))',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
                    transform: 'translateZ(0)',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/profile.png'
                  }}
                />
              </picture>
            </motion.div>
          </div>

          {/* ── LEFT: Text content (order-2 on mobile = appears below the circle) ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-1 space-y-3 md:space-y-4 py-4 relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-amber-200/60 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md transition-shadow"
            >
              <Star className="w-4 h-4 text-amber-500 fill-current animate-pulse" />
              <span className="text-sm text-gray-700 font-medium">Available for freelance</span>
            </motion.div>

            <div className="relative z-10">
              <h1 className="text-5xl min-[375px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-center lg:text-left font-display leading-[0.95] mb-2">
                <span className="text-gray-900">IRFAN</span>
                {' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600">
                  SHEKH
                </span>
              </h1>
            </div>

            <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl h-10 sm:h-14 md:h-16 flex justify-center lg:justify-start items-center">
              <span className="text-gray-500 mr-2 font-light">Digital</span>
              <TypingAnimation
                texts={roleTexts}
                className="font-display font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"
                speed={100}
                delay={2000}
              />
            </div>
            
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              BCA graduate specializing in <span className="text-amber-600 font-semibold">full-stack development</span> and <span className="text-yellow-600 font-semibold">AI/ML integration</span>.
              Proven expertise building <span className="font-mono text-sm text-amber-700 bg-amber-50/80 px-2 py-0.5 rounded border border-amber-100">scalable web applications</span> with React, Node.js, and Flask, backed by 3 internships and 9+ deployed projects.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-row sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={() => {
                  const workSection = document.getElementById('work')
                  if (workSection) {
                    workSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="group px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View My Work</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
                </motion.div>
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download="Irfan_Shekh_Resume.pdf"
                className="group px-5 sm:px-8 py-3 sm:py-4 border-2 border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 hover:border-amber-400 hover:bg-white hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                <span>Resume</span>
              </motion.a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-5 pt-2 pb-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm lg:text-sm text-gray-500 font-medium leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </section>
  )

  return isMobile ? heroContent : (
    <ClickSpark
      sparkColor="#f59e0b"
      sparkSize={12}
      sparkRadius={25}
      sparkCount={12}
      duration={600}
    >
      {heroContent}
    </ClickSpark>
  )
}
