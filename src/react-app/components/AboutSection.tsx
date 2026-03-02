import { motion } from 'framer-motion'
import { Award, Coffee, Heart, Zap, Target } from 'lucide-react'

// Helper function to get CSS class name for achievement colors
const getAchievementColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#f59e0b': 'achievement-amber',
    '#8b5cf6': 'achievement-purple',
    '#059669': 'achievement-green',
    '#3b82f6': 'achievement-blue',
    '#ef4444': 'achievement-red',
    '#06b6d4': 'achievement-cyan'
  }
  return colorMap[color] || 'achievement-blue'
}

// Helper function to get CSS class name for stat colors
const getStatColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#3b82f6': 'stat-blue',
    '#8b5cf6': 'stat-purple',
    '#059669': 'stat-green',
    '#f59e0b': 'stat-amber'
  }
  return colorMap[color] || 'stat-blue'
}

const achievements = [
  {
    icon: Award,
    title: 'Web Development Intern',
    description: 'Smt Kumudben Debar College (Academic)',
    year: '2026',
    color: '#f59e0b'
  },
  {
    icon: Zap,
    title: 'Full-Stack Development',
    description: 'Hands-on experience in development workflow',
    year: '2026',
    color: '#8b5cf6'
  },
  {
    icon: Target,
    title: 'BCA Student',
    description: 'Computer Applications (2023-2026)',
    year: '2023-2026',
    color: '#059669'
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
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="heading-lg mb-6 text-gradient text-shadow-glow">
          About Me
        </h2>
        <p className="body-lg text-gray-300 max-w-3xl mx-auto font-light">
          A passionate developer who transforms ideas into <span className="text-gradient-blue font-medium">extraordinary digital experiences</span> through creativity and cutting-edge technology
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl p-8 border border-gray-800/50 backdrop-blur-sm">
            <h3 className="heading-sm text-white mb-6 text-shadow-soft">My Journey</h3>

            <div className="space-y-6 text-gray-300 body-md">
              <p className="leading-loose">
                <span className="text-gradient-blue font-semibold text-lg">Hi! I'm Irfan Shekh</span>, an enthusiastic Computer Applications student with strong <span className="font-semibold text-cyan-400">problem-solving skills</span> and hands-on experience in Python, web development, and database management.
                My journey is driven by a passion for building and deploying web applications that solve real-world challenges.
              </p>

              <p className="leading-loose">
                Currently pursuing my <span className="font-semibold text-purple-400">Bachelor of Computer Applications (BCA)</span> at <span className="font-semibold text-blue-400">Smt Kumudben Debar College of Commerce, Science & Management Studies / RCUB</span> (2023-2026), I'm skilled in building web applications, managing data, and applying analytical approaches to solve challenges.
              </p>

              <p className="leading-loose">
                I specialize in <span className="mono-text text-blue-400 bg-gray-800/50 px-2 py-1 rounded">Python</span>, <span className="mono-text text-green-400 bg-gray-800/50 px-2 py-1 rounded">JavaScript</span>, <span className="mono-text text-cyan-400 bg-gray-800/50 px-2 py-1 rounded">React</span>, and <span className="mono-text text-purple-400 bg-gray-800/50 px-2 py-1 rounded">Flask</span>, with experience in <span className="text-gradient-purple font-semibold">AI/ML technologies</span> like TensorFlow and MobileNetV2.
                I'm interested in emerging areas such as prompt engineering and seeking opportunities as a Software Engineer, Web Developer, or Data Analyst.
              </p>
            </div>



          </div>

          {/* Philosophy */}
          <div className="space-y-4">
            <h3 className="heading-sm text-white text-shadow-soft">My Philosophy</h3>
            {philosophy.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-gray-900/50 rounded-xl border border-gray-800/30 hover:bg-gray-800/70 transition-all duration-300"
                >
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Icon size={22} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-white mb-2 text-lg">{item.title}</h4>
                    <p className="body-sm text-gray-400 leading-relaxed">{item.description}</p>
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
          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl p-8 border border-gray-800/50 backdrop-blur-sm">
            <h3 className="heading-sm text-white mb-6 text-shadow-soft">Key Achievements</h3>

            <div className="space-y-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-5 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all duration-300 group"
                  >
                    <div className={`p-3 rounded-full group-hover:scale-110 transition-transform duration-300 bg-dynamic-alpha-25 shadow-dynamic ${getAchievementColorClass(achievement.color)}`}>
                      <Icon size={22} className={`text-dynamic ${getAchievementColorClass(achievement.color)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-display font-semibold text-white text-lg group-hover:text-blue-400 transition-colors duration-300">{achievement.title}</h4>
                        <span className="caption text-gray-400 bg-gray-800/70 px-3 py-1 rounded-full">
                          {achievement.year}
                        </span>
                      </div>
                      <p className="body-sm text-gray-400 leading-relaxed">{achievement.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { number: '50+', label: 'Projects', color: '#3b82f6' },
              { number: '2+', label: 'Years', color: '#8b5cf6' },
              { number: '100%', label: 'Satisfaction', color: '#059669' },
              { number: '24/7', label: 'Support', color: '#f59e0b' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl p-6 border border-gray-800/50 text-center hover:border-gray-700/50 transition-all duration-300 group"
              >
                <div className={`text-4xl font-display font-black mb-2 group-hover:scale-110 transition-transform duration-300 text-dynamic text-shadow-dynamic ${getStatColorClass(stat.color)}`}>
                  {stat.number}
                </div>
                <div className="caption text-gray-400 font-medium">
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
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 text-center hover:from-blue-500/15 hover:to-cyan-500/15 transition-all duration-300"
          >
            <h4 className="font-display text-xl font-bold text-white mb-3 text-gradient-blue">Languages</h4>
            <p className="body-md text-gray-300 leading-relaxed">
              I speak <span className="font-bold text-cyan-400">English</span>, <span className="font-bold text-yellow-400">Hindi</span>, and <span className="font-bold text-green-400">Kannada</span>, enabling me to collaborate effectively with diverse teams and clients.
              <span className="text-2xl ml-2">🌍💬</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
