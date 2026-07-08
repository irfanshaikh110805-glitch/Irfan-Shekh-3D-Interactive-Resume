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
    { number: 'BCA', label: '2023–2026' },
    { number: '7+', label: 'Certifications' }
  ]

  const heroContent = (
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 md:pt-24 pb-10 md:pb-16 overflow-x-hidden bg-gradient-to-br from-white via-amber-50/30 to-gray-50">
        {/* Premium Animated Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-100/30 via-transparent to-transparent" />

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }} />
          </div>

          {/* Floating orbs */}
          {!isMobile && (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-200/40 rounded-full blur-[100px] hidden md:block"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.08, 0.04] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-200/40 rounded-full blur-[100px] hidden md:block"
              />
            </>
          )}
        </div>

        {/* Content Grid — 1 col on mobile (circle top, text bottom), 2 cols on desktop */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">

          {/* ── RIGHT: Amber Circle + Profile (shown on all sizes, order-1 on mobile = appears first) ── */}
          <div className="flex justify-center items-center relative order-1 lg:order-2 py-0 lg:py-0">

            {/* Outer amber glowing circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="relative flex items-center justify-center"
              style={{
                width: 'min(440px, 85vw)',
                height: 'min(440px, 85vw)',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 50% 45%, rgba(245,158,11,0.22) 0%, rgba(251,191,36,0.14) 45%, rgba(254,243,199,0.20) 70%, rgba(255,251,235,0.06) 100%)',
                border: '2px solid rgba(245,158,11,0.30)',
                boxShadow: '0 0 90px rgba(245,158,11,0.22), 0 0 35px rgba(245,158,11,0.12), inset 0 0 70px rgba(254,243,199,0.15)',
              }}
            >
              {/* Inner decorative ring */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  border: '1px solid rgba(245,158,11,0.16)',
                  margin: '5%',
                  borderRadius: '50%',
                }}
              />

              {/* Round-cropped profile image — centered inside circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                className="relative z-10"
                style={{
                  width: 'min(370px, 72vw)',
                  height: 'min(370px, 72vw)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '4px solid rgba(245,158,11,0.35)',
                  boxShadow: '0 8px 40px rgba(245,158,11,0.20), 0 2px 12px rgba(0,0,0,0.10)',
                }}
              >
                <img
                  src="/profile.webp"
                  alt="Irfan Shaikh - Full Stack Developer"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="hover:scale-[1.04] transition-transform duration-700 ease-out select-none"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                    filter: 'brightness(1.05) contrast(1.03) saturate(0.97)',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null;
                    target.src = '/profile.png';
                  }}
                />
              </motion.div>

              {/* Floating accent dots */}
              <motion.div
                animate={{ y: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute z-30 w-4 h-4 lg:w-5 lg:h-5 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"
                style={{ top: '7%', right: '14%' }}
              />
              <motion.div
                animate={{ y: [5, -5, 5], opacity: [0.35, 0.75, 0.35] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute z-30 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-yellow-300 rounded-full shadow-md"
                style={{ top: '24%', left: '11%' }}
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute z-30 w-3 h-3 lg:w-3.5 lg:h-3.5 bg-orange-400 rounded-full"
                style={{ bottom: '13%', right: '11%' }}
              />
              <motion.div
                animate={{ y: [-3, 3, -3], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
                className="absolute z-30 w-2 h-2 bg-amber-300 rounded-full"
                style={{ bottom: '19%', left: '13%' }}
              />
            </motion.div>
          </div>

          {/* ── LEFT: Text content (order-2 on mobile = appears below the circle) ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-1 space-y-3 md:space-y-6"
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
                  SHAIKH
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
              Crafting <span className="text-amber-600 font-semibold">digital experiences</span> that blend creativity with cutting-edge technology.
              Specializing in <span className="font-mono text-sm text-amber-700 bg-amber-50/80 px-2 py-0.5 rounded border border-amber-100">interactive web applications</span> and immersive user interfaces.
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
                download="Irfan_Shaikh_Resume.pdf"
                className="group px-5 sm:px-8 py-3 sm:py-4 border-2 border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 hover:border-amber-400 hover:bg-white hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                <span>Resume</span>
              </motion.a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 md:gap-6 pt-1">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-0.5">
                    {stat.number}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative background dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-500 rounded-full opacity-40 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-500 rounded-full opacity-30 animate-pulse animate-delay-1s" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-orange-500 rounded-full opacity-35 animate-pulse animate-delay-2s" />
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
