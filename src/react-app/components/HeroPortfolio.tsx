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
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-10 sm:pb-14 md:pb-16 overflow-x-hidden bg-gradient-to-br from-white via-amber-50/30 to-gray-50">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
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
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[120px] hidden md:block animate-pulse-orb pointer-events-none"
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-200/30 rounded-full blur-[120px] hidden md:block animate-pulse-orb-delayed pointer-events-none"
            />
          </>
        )}
      </div>

      {/* Content Grid — Balanced 1 col on mobile, 2 cols on desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-12 items-center">

        {/* ── PROFILE IMAGE: Responsively sized on mobile & full-sized on desktop ── */}
        <div className="flex justify-center items-center lg:items-end relative order-1 lg:order-2 py-1 sm:py-2 lg:py-0">
          
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
              className="absolute w-[88%] h-[88%] bg-gradient-to-tr from-amber-300/30 via-yellow-200/20 to-orange-200/15 rounded-full blur-2xl sm:blur-3xl pointer-events-none -z-10"
            />

            {/* Profile Image with Balanced Scaling & Smooth Bottom Gradient Blend */}
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
                className="relative z-10 select-none w-full max-w-[190px] min-[380px]:max-w-[220px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[420px] xl:max-w-[440px] transition-transform duration-500 hover:scale-[1.02]"
                style={{
                  height: 'auto',
                  aspectRatio: '720 / 1127',
                  filter: 'drop-shadow(0 15px 25px rgba(245, 158, 11, 0.15)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.08))',
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

        {/* ── LEFT: Text content & Quick Actions ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left order-2 lg:order-1 space-y-3 sm:space-y-4 md:space-y-5 py-1 sm:py-2 lg:py-4 relative"
        >
          {/* Status Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md border border-amber-200/60 rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 shadow-[-2px_-2px_6px_rgba(255,255,255,1),2px_3px_8px_rgba(0,0,0,0.05)] hover:shadow-md transition-all"
          >
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-current animate-pulse shrink-0" />
            <span className="text-xs sm:text-sm text-gray-700 font-semibold">Available for freelance & full-time</span>
          </motion.div>

          {/* Name Title */}
          <div className="relative z-10">
            <h1 className="text-4xl min-[380px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-center lg:text-left font-display leading-[1.02] sm:leading-[0.95] mb-1 sm:mb-2 break-words">
              <span className="text-gray-900">IRFAN</span>
              {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600">
                SHEKH
              </span>
            </h1>
          </div>

          {/* Dynamic Typing Title */}
          <div className="text-base min-[380px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl h-8 sm:h-12 md:h-14 lg:h-16 flex justify-center lg:justify-start items-center">
            <span className="text-gray-600 mr-2 font-light">Digital</span>
            <TypingAnimation
              texts={roleTexts}
              className="font-display font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"
              speed={100}
              delay={2000}
            />
          </div>
          
          {/* Bio Summary */}
          <p className="text-xs min-[380px]:text-sm sm:text-base lg:text-xl text-gray-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal px-1 sm:px-0">
            BCA graduate specializing in <span className="text-amber-600 font-semibold">full-stack development</span> and <span className="text-yellow-600 font-semibold">AI/ML integration</span>.
            Proven expertise building <span className="font-mono text-[11px] min-[380px]:text-xs sm:text-sm text-amber-700 bg-amber-50/90 border border-amber-200/60 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-semibold inline-block my-0.5 shadow-sm">scalable web applications</span> with React, Node.js, and Flask, backed by 3 internships and 9+ deployed projects.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col min-[400px]:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
            <motion.button
              onClick={() => {
                const workSection = document.getElementById('work')
                if (workSection) {
                  const navOffset = 80
                  const elementPosition = workSection.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.scrollY - navOffset
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
              }}
              className="group px-5 min-[380px]:px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl sm:rounded-2xl font-bold text-xs min-[380px]:text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 cursor-pointer w-full min-[400px]:w-auto"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>View My Work</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 rotate-[-90deg]" />
              </motion.div>
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download="Irfan_Shekh_Resume.pdf"
              className="group px-5 min-[380px]:px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 border-2 border-gray-200 bg-white/95 backdrop-blur-sm text-gray-900 rounded-xl sm:rounded-2xl font-bold text-xs min-[380px]:text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 hover:border-amber-400 hover:bg-white hover:text-amber-600 shadow-[-2px_-2px_6px_rgba(255,255,255,1),2px_3px_8px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-300 cursor-pointer w-full min-[400px]:w-auto"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Resume</span>
            </motion.a>
          </div>

          {/* Elevated Stats Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4 pt-3 sm:pt-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
                className="p-2.5 min-[380px]:p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 border border-gray-100 shadow-[-3px_-3px_8px_rgba(255,255,255,1),3px_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[-4px_-4px_10px_rgba(255,255,255,1),4px_6px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all text-center lg:text-left"
              >
                <div className="text-lg min-[380px]:text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-0.5 sm:mb-1 font-display">
                  {stat.number}
                </div>
                <div className="text-[10px] min-[380px]:text-[11px] sm:text-xs text-gray-600 font-semibold leading-tight">
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
