import { motion } from 'framer-motion'
import TypingAnimation from './TypingAnimation'
import ClickSpark from './ClickSpark'
import { ChevronDown, Download, Star } from 'lucide-react'
import { useMobileDetection } from '@/react-app/hooks/useMobileDetection'

export default function HeroPortfolio() {
  const isMobile = useMobileDetection()
  const roleTexts = [
    'Creative Developer',
    'Digital Artist',
    'Problem Solver',
    'UI/UX Designer',
    'Full Stack Developer'
  ]

  const stats = [
    { number: '5+ ', label: 'Major Projects' },
    { number: '100%', label: 'Dedicated' },
    { number: 'BCA', label: 'Computer Applications' },
    { number: '24/7', label: 'Support Available' }
  ]

  const heroContent = (
      <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24 pb-4 md:pb-8 overflow-x-hidden bg-gradient-to-br from-white via-amber-50/30 to-gray-50">
        {/* Premium Animated Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Radial gradient overlay - soft and professional */}
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

          {/* Floating orbs - subtle light theme */}
          {!isMobile && (
            <>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-200/40 rounded-full blur-[100px] hidden md:block"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.04, 0.08, 0.04],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-200/40 rounded-full blur-[100px] hidden md:block"
              />
            </>
          )}
        </div>

        {/* Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8 lg:gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-1 space-y-4 md:space-y-6"
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
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-center lg:text-left font-display leading-[0.95] mb-2">
                <span className="text-gray-900">IRFAN</span>
                {' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600">
                  SHAIKH
                </span>
              </h1>
            </div>

            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl h-12 sm:h-14 md:h-16 flex justify-center lg:justify-start items-center">
              <span className="text-gray-500 mr-2 font-light">Digital</span>
              <TypingAnimation
                texts={roleTexts}
                className="font-display font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"
                speed={100}
                delay={2000}
              />
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Crafting <span className="text-amber-600 font-semibold">digital experiences</span> that blend creativity with cutting-edge technology.
              Specializing in <span className="font-mono text-sm text-amber-700 bg-amber-50/80 px-2 py-0.5 rounded border border-amber-100">interactive web applications</span> and immersive user interfaces.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={() => {
                  const workSection = document.getElementById('work')
                  if (workSection) {
                    workSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40"
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
                className="group px-8 py-4 border-2 border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl font-semibold flex items-center justify-center gap-3 hover:border-amber-400 hover:bg-white hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                <span>Resume</span>
              </motion.a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Profile Image with Premium Effects */}
          <div className="flex justify-center items-center relative lg:mt-0 order-1 lg:order-2 mb-4 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative w-[300px] h-[400px] sm:w-[380px] sm:h-[500px] lg:w-[420px] lg:h-[550px] z-10 rounded-[2rem] overflow-hidden"
            >
              {/* Premium border ring - subtle light theme */}
              <div className="absolute inset-0 rounded-[2rem] border border-gray-200/60 shadow-2xl shadow-amber-500/5" />

              {/* Image Container */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-gray-50 via-white to-amber-50/20">
                {/* Enhanced image with premium styling */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/profile.webp"
                    srcSet="/profile-small.webp 600w, /profile.webp 1177w"
                    sizes="(max-width: 768px) 300px, (max-width: 1024px) 380px, 420px"
                    alt="Irfan Shaikh - Full Stack Developer"
                    width="420"
                    height="550"
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out z-10"
                    style={{
                      filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.08)) brightness(1.03) contrast(1.03)',
                      objectPosition: 'center 30%',
                      transform: 'scale(1.15)'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.onerror = null;
                      target.style.display = 'none'
                      console.error('Profile image failed to load')
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>



        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-500 rounded-full opacity-40 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-500 rounded-full opacity-30 animate-pulse animate-delay-1s" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-orange-500 rounded-full opacity-35 animate-pulse animate-delay-2s" />
      </section>
  )

  return isMobile ? heroContent : (
    <ClickSpark
      sparkColor="#60a5fa"
      sparkSize={12}
      sparkRadius={25}
      sparkCount={12}
      duration={600}
    >
      {heroContent}
    </ClickSpark>
  )
}
