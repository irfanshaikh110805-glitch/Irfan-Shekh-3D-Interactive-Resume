import { motion } from 'framer-motion'
import TypingAnimation from './TypingAnimation'
import ClickSpark from './ClickSpark'
import { ChevronDown, Play, Star } from 'lucide-react'

export default function HeroPortfolio() {
  const roleTexts = [
    'Creative Developer',
    'Digital Artist',
    'Problem Solver',
    'UI/UX Designer',
    'Full Stack Developer'
  ]

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '2+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ]

  return (
    <ClickSpark
      sparkColor="#60a5fa"
      sparkSize={12}
      sparkRadius={25}
      sparkCount={12}
      duration={600}
    >
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-x-hidden bg-black">
        {/* Premium Animated Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Radial gradient overlay - more subtle on black */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-600/15 via-transparent to-transparent" />

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(96, 165, 250, 0.4) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(96, 165, 250, 0.4) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          {/* Floating orbs - more vibrant on black */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/25 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/25 rounded-full blur-[120px]"
          />
        </div>

        {/* Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-full px-5 py-2.5 mb-6 backdrop-blur-sm"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
              <span className="text-sm text-gray-200 font-medium">Available for freelance</span>
            </motion.div>

            <div className="mb-6 relative z-10">
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-center lg:text-left font-display leading-[1.1] lg:leading-tight">
                <span className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">IRFAN</span>
                <br className="lg:hidden" />
                <span className="lg:ml-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 drop-shadow-[0_0_60px_rgba(59,130,246,0.6)]">
                  SHEKH
                </span>
              </h1>
            </div>

            <div className="text-2xl sm:text-3xl md:text-4xl mb-10 h-16 flex justify-center lg:justify-start">
              <TypingAnimation
                texts={roleTexts}
                className="font-display font-semibold text-gradient-blue text-shadow-soft"
                speed={100}
                delay={2000}
              />
            </div>
            
            <p className="body-lg text-gray-200 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Crafting <span className="text-gradient-purple font-medium">digital experiences</span> that blend creativity with cutting-edge technology.
              Specializing in <span className="mono-text text-cyan-300 bg-gray-900/70 px-2 py-1 rounded">interactive web applications</span> and immersive user interfaces.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <motion.button
                onClick={() => {
                  const workSection = document.getElementById('work')
                  if (workSection) {
                    workSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-[0_0_50px_rgba(59,130,246,0.4)] hover:shadow-[0_0_80px_rgba(59,130,246,0.6)]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View My Work</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
                </motion.div>
              </motion.button>

              <motion.button
                onClick={() => {
                  // Create a simple demo modal or redirect to a demo video
                  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
                }}
                className="group px-8 py-4 border-2 border-gray-600/60 bg-gray-900/50 backdrop-blur-sm text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:border-cyan-400/60 hover:bg-gray-800/70 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Profile Image with Premium Effects */}
          <div className="flex justify-center items-center relative lg:mt-0 order-1 lg:order-2 mb-8 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative w-[280px] h-[340px] sm:w-[360px] sm:h-[440px] lg:w-[440px] lg:h-[540px] z-10 lg:ml-0"
            >
              {/* Background glow effects removed */}

              {/* Premium border ring with glow */}
              {/* Premium border ring - subtle */}
              <div className="absolute inset-0 rounded-full border border-gray-700/30" />

              {/* Image Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Enhanced image with premium styling */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/profile.png"
                    alt="Irfan Shekh"
                    className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-700 ease-out z-10 brightness-110 contrast-115"
                    style={{
                      filter: 'drop-shadow(0 20px 80px rgba(0,0,0,0.9)) brightness(1.1) contrast(1.15)'
                    }}
                  />
                </div>
              </div>

              {/* Floating Elements with premium glassmorphism */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-10 lg:-right-8 lg:top-20 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-3 lg:p-5 rounded-2xl border border-blue-400/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-20 scale-90 lg:scale-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    <span className="text-lg lg:text-xl">🚀</span>
                  </div>
                  <div>
                    <div className="text-[10px] lg:text-xs text-gray-400 font-medium uppercase tracking-wider">Experience</div>
                    <div className="text-sm lg:text-lg font-bold text-white">2+ Years</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-4 bottom-28 lg:-left-8 lg:bottom-40 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-3 lg:p-5 rounded-2xl border border-cyan-400/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-20 scale-90 lg:scale-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                    <span className="text-lg lg:text-xl">💻</span>
                  </div>
                  <div>
                    <div className="text-[10px] lg:text-xs text-gray-400 font-medium uppercase tracking-wider">Projects</div>
                    <div className="text-sm lg:text-lg font-bold text-white">50+ Done</div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative particles around image */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 z-[1]"
              >
                <div className="absolute top-10 right-10 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <div className="absolute top-1/3 right-5 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <div className="absolute bottom-1/4 right-20 w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400 font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-blue-400 rounded-full mt-2"></div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-40 animate-pulse animate-delay-1s" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 animate-pulse animate-delay-2s" />
      </section>
    </ClickSpark>
  )
}
