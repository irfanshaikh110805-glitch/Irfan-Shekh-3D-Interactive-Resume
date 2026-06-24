import { useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '@/shared/data'
import { getSkillColorClass, getGlowColorClass } from '@/react-app/utils/colorUtils'

export default function SkillsVisualization() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', 'Programming', 'Frontend', 'Backend', 'Databases', 'AI/ML', 'Tools']
  // TypeScript added to Programming, Express.js to Backend, Docker to Tools in data.ts

  const visibleSkills = skills.filter(skill => selectedCategory === 'All' || skill.category === selectedCategory)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
          Technical Skills
        </h2>
        <p className="text-xl text-gray-700 mb-6 md:mb-8">
          A visualization of my technical expertise and tools
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full transition-all duration-300 ${selectedCategory === category
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-amber-300 uppercase text-xs font-semibold tracking-wider'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Premium 2D Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
      >
        {visibleSkills.map((skill, index) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            key={skill.name}
            className="group relative bg-white/80 rounded-xl p-3 min-[375px]:p-4 md:p-6 border border-gray-200 hover:border-amber-300 transition-all duration-300 backdrop-blur-sm overflow-hidden shadow-sm"
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(245, 158, 11, 0.1)' }}
          >
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${getGlowColorClass(skill.color)} to-transparent`} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2 md:mb-4">
                <div className="flex items-center gap-1.5 min-[375px]:gap-3">
                  <div className={`w-7 h-7 min-[375px]:w-10 min-[375px]:h-10 rounded-md min-[375px]:rounded-lg flex items-center justify-center bg-gray-50 border border-gray-200 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <div className={`w-2 h-2 min-[375px]:w-3 min-[375px]:h-3 rounded-full ${getSkillColorClass(skill.color)} shadow-[0_0_10px_currentColor]`} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xs min-[375px]:text-sm sm:text-base md:text-lg text-gray-900 group-hover:text-amber-600 transition-colors leading-tight line-clamp-1">{skill.name}</h3>
                    <span className="text-[9px] min-[375px]:text-xs text-gray-500 uppercase tracking-wider font-mono line-clamp-1">{skill.category}</span>
                  </div>
                </div>
                <span className="font-mono text-sm min-[375px]:text-base md:text-xl font-bold text-gray-600 group-hover:text-gray-900 transition-colors">{skill.level}%</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2.5 min-[375px]:h-3 w-full bg-gray-100 rounded-full overflow-hidden p-[2px] border border-gray-200">
                <motion.div
                  className={`h-full rounded-full ${getSkillColorClass(skill.color)} shadow-[0_0_10px_currentColor]`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
