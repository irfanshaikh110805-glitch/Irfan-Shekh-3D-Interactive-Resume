import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Award, Coffee, Heart, Zap, Target, User, Languages } from 'lucide-react'

const Timeline3D = lazy(() => import('./Timeline3D'))

// Helper function to get CSS class name for achievement colors
const getAchievementColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#f59e0b': 'achievement-amber',
    '#eab308': 'achievement-purple',
    '#d97706': 'achievement-green',
    '#fbbf24': 'achievement-orange',
    '#f97316': 'achievement-red'
  }
  return colorMap[color] || 'achievement-amber'
}

// Helper function to get CSS class name for stat colors
const getStatColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#f59e0b': 'stat-amber',
    '#eab308': 'stat-purple',
    '#fbbf24': 'stat-green',
    '#f97316': 'stat-orange'
  }
  return colorMap[color] || 'stat-amber'
}

const achievements = [
  {
    icon: Award,
    title: 'Machine Learning Intern — SkillCraft Technology',
    description: 'Developed ML models for classification tasks, data preprocessing, feature engineering & model evaluation workflows.',
    year: 'Jun 2026 – Jul 2026',
    color: '#f59e0b'
  },
  {
    icon: Zap,
    title: 'Java Full Stack Intern — MTD, Mysuru',
    description: 'Completed full-stack development internship building applications with ReactJS, Spring Boot, and MongoDB under expert mentorship.',
    year: 'Jan 2026 – Feb 2026',
    color: '#eab308'
  },
  {
    icon: Target,
    title: 'Full-Stack Development Intern — Smt Kumudben Darbar College',
    description: 'Built responsive web modules using HTML5, CSS3, JavaScript & Flask. Implemented MySQL DB integration, designed RESTful API endpoints, and reduced load time by 30% through code refactoring.',
    year: 'Jan 2024 – May 2024',
    color: '#f97316'
  }
]

const philosophy = [
  {
    icon: Heart,
    title: 'Passion-Driven',
    description: 'Every project is crafted with genuine enthusiasm, semantic elegance, and engineering dedication.'
  },
  {
    icon: Coffee,
    title: 'Detail-Oriented',
    description: 'Meticulous attention to every micro-interaction, animation curve, pixel alignment, and user workflow.'
  },
  {
    icon: Zap,
    title: 'Innovation-Focused',
    description: 'Relentlessly exploring emerging AI tools, full-stack frameworks, and high-performance paradigms.'
  }
]

export default function AboutSection() {
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-amber-50/90 border border-amber-200/70 rounded-full px-5 py-2 mb-4 shadow-sm">
          <User className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="text-xs sm:text-sm text-amber-800 font-semibold font-mono tracking-tight">Biography & Background</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent tracking-tight">
          About Me
        </h2>
        <p className="font-sans text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A forward-thinking engineer who bridges <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent font-semibold">applied artificial intelligence</span> with robust full-stack software development.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[-4px_-4px_12px_rgba(255,255,255,1),4px_6px_16px_rgba(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 via-yellow-500 to-amber-600" />
            <h3 className="font-display text-xl font-bold text-gray-900 mb-6 tracking-tight">My Journey</h3>

            <div className="space-y-5 text-gray-700 font-sans text-sm md:text-base">
              <p className="leading-relaxed">
                <span className="font-display bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent font-bold text-lg">Hi, I'm Irfan Shekh</span> — a results-oriented <span className="font-semibold text-amber-700">BCA graduate</span> with verified expertise across full-stack web engineering, AI/ML pipelines, and database optimization.
                I build high-throughput applications with <span className="font-mono text-amber-800 bg-amber-50/90 border border-amber-200/70 px-2 py-0.5 rounded-md text-xs font-semibold inline-block">React</span>, <span className="font-mono text-emerald-800 bg-emerald-50/90 border border-emerald-200/70 px-2 py-0.5 rounded-md text-xs font-semibold inline-block">Node.js</span>, and <span className="font-mono text-yellow-800 bg-yellow-50/90 border border-yellow-200/70 px-2 py-0.5 rounded-md text-xs font-semibold inline-block">Flask</span>, with live production deployments in legal-tech and intelligent healthcare systems.
              </p>

              <p className="leading-relaxed">
                Graduated with a <span className="font-semibold text-gray-900">Bachelor of Computer Applications (BCA)</span> from <span className="font-semibold text-amber-700">Smt Kumudben Debar College, RCUB Belagavi</span> (2023–2026), grounding practical engineering in Data Structures & Algorithms, DBMS, Web Architectures, and Applied AI.
              </p>

              <p className="leading-relaxed">
                Completed <span className="font-bold text-amber-600">3 rigorous internships</span> (Machine Learning at SkillCraft, Java Full Stack at MTD Mysuru, Web Development at SKDC) and shipped <span className="font-bold text-yellow-600">9+ production systems</span> integrating TensorFlow, Computer Vision, OCR, RAG, and cloud serverless architectures.
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div className="space-y-3.5">
            <h3 className="font-display text-lg font-bold text-gray-900 tracking-tight">Core Engineering Values</h3>
            {philosophy.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="flex items-start gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-[-3px_-3px_8px_rgba(255,255,255,1),3px_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[-4px_-4px_12px_rgba(255,255,255,1),4px_8px_20px_rgba(245,158,11,0.08)] transition-all duration-300 group cursor-default"
                >
                  <div className="p-3 bg-amber-50/90 border border-amber-200/50 rounded-xl shrink-0 group-hover:scale-110 group-hover:bg-amber-100/80 transition-all">
                    <Icon size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900 mb-1 text-base group-hover:text-amber-600 transition-colors">{item.title}</h4>
                    <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Achievements & Stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Achievements */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[-4px_-4px_10px_rgba(255,255,255,1),4px_6px_16px_rgba(0,0,0,0.04)]">
            <h3 className="heading-sm text-gray-900 mb-6">Key Achievements</h3>

            <div className="space-y-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-[-3px_-3px_8px_rgba(255,255,255,1),3px_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[-4px_-4px_10px_rgba(255,255,255,1),4px_6px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-full bg-gray-50 border border-gray-100 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <Icon size={22} className={`text-dynamic ${getAchievementColorClass(achievement.color)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <h4 className="font-display font-semibold text-gray-900 text-lg group-hover:text-amber-600 transition-colors duration-300">{achievement.title}</h4>
                        <span className="font-mono text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm bg-gradient-to-r from-amber-500 to-yellow-500 whitespace-nowrap shrink-0 self-start tracking-wide">
                          {achievement.year}
                        </span>
                      </div>
                      <p className="body-sm text-gray-600 leading-relaxed">{achievement.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { number: '9+', label: 'Deployed Projects', color: '#f59e0b' },
              { number: '3', label: 'Internships Completed', color: '#eab308' },
              { number: 'BCA', label: 'Graduate 2023–2026', color: '#fbbf24' },
              { number: '9', label: 'Certifications', color: '#f97316' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-[-3px_-3px_8px_rgba(255,255,255,1),3px_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[-4px_-4px_10px_rgba(255,255,255,1),4px_6px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 text-center transition-all duration-300 group before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-amber-400 before:to-yellow-500 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity"
              >
                <div className={`text-3xl md:text-4xl font-display font-extrabold tracking-tight mb-1.5 group-hover:scale-105 transition-transform duration-300 text-dynamic ${getStatColorClass(stat.color)}`}>
                  {stat.number}
                </div>
                <div className="caption text-gray-600 font-semibold tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-3xl p-5 md:p-6 border border-gray-100 shadow-[-3px_-3px_8px_rgba(255,255,255,1),3px_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[-4px_-4px_10px_rgba(255,255,255,1),4px_6px_16px_rgba(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                <Languages size={18} />
              </div>
              <h4 className="font-display text-lg font-bold text-gray-900">Languages Known</h4>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {[
                { name: 'English', level: 'Professional' },
                { name: 'Hindi', level: 'Fluent' },
                { name: 'Kannada', level: 'Native / Working' }
              ].map((lang) => (
                <span 
                  key={lang.name}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-gray-50/80 hover:bg-amber-50/70 border border-gray-200/70 hover:border-amber-300 rounded-xl text-sm font-semibold text-gray-800 hover:text-amber-800 shadow-sm transition-all duration-200 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{lang.name}</span>
                  <span className="text-[11px] font-mono font-normal text-gray-600 ml-0.5">({lang.level})</span>
                </span>
              ))}
            </div>
            <p className="text-xs md:text-sm text-gray-600 mt-3 leading-relaxed">
              Multilingual proficiency enabling seamless communication with international clients and multidisciplinary agile teams.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Scrollable Career Timeline */}
      <Suspense fallback={
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <Timeline3D />
      </Suspense>
    </div>
  )
}
