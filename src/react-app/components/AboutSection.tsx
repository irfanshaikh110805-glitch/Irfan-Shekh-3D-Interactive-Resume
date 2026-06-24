import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Award, Coffee, Heart, Zap, Target } from 'lucide-react'

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
    title: 'ML Intern — SkillCraft Technology',
    description: 'Developed ML models for classification tasks, data preprocessing, feature engineering & model evaluation workflows.',
    year: 'Jun–Jul 2026',
    color: '#f59e0b'
  },
  {
    icon: Zap,
    title: 'Java Full Stack Intern — MTD, Mysuru',
    description: 'Built applications with ReactJS, Spring Boot, and MongoDB under expert mentorship.',
    year: 'Jan–Feb 2026',
    color: '#eab308'
  },
  {
    icon: Target,
    title: 'Full-Stack Dev Intern — Smt Kumudben Darbar',
    description: 'Built responsive web modules using HTML5, CSS3, JS & Flask. Reduced load time by 30% through code refactoring.',
    year: 'Jan–May 2024',
    color: '#d97706'
  }
]

const philosophy = [
  {
    icon: Heart,
    title: 'Passion-Driven',
    description: 'Every project is crafted with genuine enthusiasm and dedication to excellence.'
  },
  {
    icon: Coffee,
    title: 'Detail-Oriented',
    description: 'Meticulous attention to every pixel, animation, and user interaction.'
  },
  {
    icon: Zap,
    title: 'Innovation-Focused',
    description: 'Always exploring cutting-edge technologies and creative solutions.'
  }
]

export default function AboutSection() {
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-16"
      >
        <h2 className="heading-lg mb-6 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
          About Me
        </h2>
        <p className="body-lg text-gray-700 max-w-3xl mx-auto font-light">
          A passionate developer who transforms ideas into <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent font-medium">extraordinary digital experiences</span> through creativity and cutting-edge technology
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
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
            <h3 className="heading-sm text-gray-900 mb-6">My Journey</h3>

            <div className="space-y-6 text-gray-700 body-md">
              <p className="leading-loose">
                <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent font-semibold text-lg">Hi! I'm Irfan Shaikh</span>, an enthusiastic Computer Applications student with strong <span className="font-semibold text-amber-600">problem-solving skills</span> and hands-on experience in Python, web development, and database management.
                My journey is driven by a passion for building and deploying web applications that solve real-world challenges.
              </p>

              <p className="leading-loose">
                Currently pursuing my <span className="font-semibold text-amber-700">Bachelor of Computer Applications (BCA)</span> at <span className="font-semibold text-amber-600">Smt Kumudben Debar College of Commerce, Science & Management Studies / RCUB</span> (2023-2026), I'm skilled in building web applications, managing data, and applying analytical approaches to solve challenges.
              </p>

              <p className="leading-loose">
                I specialize in <span className="mono-text text-amber-700 bg-amber-50 px-2 py-1 rounded">Python</span>, <span className="mono-text text-green-700 bg-green-50 px-2 py-1 rounded">JavaScript</span>, <span className="mono-text text-orange-700 bg-orange-50 px-2 py-1 rounded">React</span>, and <span className="mono-text text-yellow-700 bg-yellow-50 px-2 py-1 rounded">Flask</span>, with experience in <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent font-semibold">AI/ML technologies</span> like TensorFlow and MobileNetV2.
                I'm interested in emerging areas such as prompt engineering and seeking opportunities as a Software Engineer, Web Developer, or Data Analyst.
              </p>
            </div>



          </div>

          {/* Philosophy */}
          <div className="space-y-4">
            <h3 className="heading-sm text-gray-900">My Philosophy</h3>
            {philosophy.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm"
                >
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <Icon size={22} className="text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-gray-900 mb-2 text-lg">{item.title}</h4>
                    <p className="body-sm text-gray-600 leading-relaxed">{item.description}</p>
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
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
            <h3 className="heading-sm text-gray-900 mb-6">Key Achievements</h3>

            <div className="space-y-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
                  >
                    <div className={`p-3 rounded-full group-hover:scale-110 transition-transform duration-300 bg-dynamic-alpha-25 shadow-dynamic ${getAchievementColorClass(achievement.color)}`}>
                      <Icon size={22} className={`text-dynamic ${getAchievementColorClass(achievement.color)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2 mb-2">
                        <h4 className="font-display font-semibold text-gray-900 text-lg group-hover:text-amber-600 transition-colors duration-300">{achievement.title}</h4>
                        <span className="caption text-gray-600 bg-gray-200 px-3 py-1 rounded-full w-fit">
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
              { number: '3', label: 'Internships', color: '#eab308' },
              { number: 'BCA', label: 'Graduate 2026', color: '#fbbf24' },
              { number: '7+', label: 'Certifications', color: '#f97316' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 text-center hover:border-gray-300 transition-all duration-300 group shadow-sm"
              >
                <div className={`text-4xl font-display font-black mb-2 group-hover:scale-110 transition-transform duration-300 text-dynamic ${getStatColorClass(stat.color)}`}>
                  {stat.number}
                </div>
                <div className="caption text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-5 md:p-6 text-center hover:from-amber-100 hover:to-yellow-100 transition-all duration-300 shadow-sm"
          >
            <h4 className="font-display text-xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Languages</h4>
            <p className="body-md text-gray-700 leading-relaxed">
              I speak <span className="font-bold text-amber-600">English</span>, <span className="font-bold text-yellow-600">Hindi</span>, and <span className="font-bold text-orange-600">Kannada</span>, enabling me to collaborate effectively with diverse teams and clients.
              <span className="text-2xl ml-2">🌍💬</span>
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
