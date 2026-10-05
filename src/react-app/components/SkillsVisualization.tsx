import { useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '@/shared/data'
// Import tech icons
import { 
  SiPython, SiJavascript, SiTypescript, SiReact, SiHtml5,
  SiTailwindcss, SiFramer, SiNodedotjs, SiFlask, SiSpring, SiExpress,
  SiMongodb, SiMysql, SiSupabase, SiTensorflow, SiKeras,
  SiGithub, SiDocker, SiPostman, SiVite,
  SiRender, SiNetlify
} from 'react-icons/si'
import { Database, Brain, Shield, FileCode, Code2 } from 'lucide-react'

// Define proper type for icon components
type IconComponent = React.ComponentType<{ size?: number; className?: string }>

// Icon mapping for each skill
const skillIcons: { [key: string]: IconComponent } = {
  'Python': SiPython,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Java': Code2,
  'React.js': SiReact,
  'HTML5 & CSS3': SiHtml5,
  'Tailwind CSS': SiTailwindcss,
  'Framer Motion': SiFramer,
  'Node.js': SiNodedotjs,
  'Flask': SiFlask,
  'Spring Boot': SiSpring,
  'Express.js': SiExpress,
  'REST APIs': FileCode,
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,
  'Supabase': SiSupabase,
  'NoSQL': Database,
  'TensorFlow': SiTensorflow,
  'MobileNetV2': Brain,
  'Keras': SiKeras,
  'NLP': Brain,
  'Computer Vision': Brain,
  'OCR': FileCode,
  'RAG': Brain,
  'Git & GitHub': SiGithub,
  'Docker': SiDocker,
  'Vite': SiVite,
  'VS Code': Code2,
  'Postman': SiPostman,
  'JWT Auth': Shield,
  'Render': SiRender,
  'Netlify': SiNetlify
}

export default function SkillsVisualization() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', 'Programming', 'Frontend', 'Backend', 'Databases', 'AI/ML', 'Tools', 'Deployment']

  const visibleSkills = skills.filter(skill => selectedCategory === 'All' || skill.category === selectedCategory)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-amber-50/90 border border-amber-200/70 rounded-full px-5 py-2 mb-4 shadow-sm">
          <Brain className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="text-xs sm:text-sm text-amber-800 font-semibold font-mono tracking-tight">Core Competencies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent tracking-tight">
          Technical Skills
        </h2>
        <p className="font-sans text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Comprehensive technology stack across programming languages, AI/ML architectures, databases, and deployment platforms.
        </p>

        {/* Category Filter with Sliding Active Pill Micro-Interaction */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 p-1.5 bg-gray-100/90 rounded-2xl border border-gray-200/60 max-w-fit mx-auto mt-6 mb-8 md:mb-12 shadow-inner">
          {categories.map((category) => {
            const isSelected = selectedCategory === category
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold font-mono tracking-wider transition-colors duration-300 cursor-pointer ${
                  isSelected ? 'text-amber-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeSkillCategory"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-gray-200/70 -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Clean Skills Grid with Dynamic Brand-Color Aura Micro-Interactions */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5"
      >
        {visibleSkills.map((skill, index) => {
          const SkillIcon = skillIcons[skill.name] || FileCode
          
          return (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, delay: index * 0.02 }}
              key={skill.name}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-3.5 sm:p-4 md:p-5 border border-gray-100/90 shadow-[-3px_-3px_8px_rgba(255,255,255,1),3px_4px_14px_rgba(0,0,0,0.04)] hover:shadow-[-4px_-4px_12px_rgba(255,255,255,1),4px_8px_22px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden cursor-default"
            >
              {/* Dynamic brand ambient glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ backgroundColor: skill.color }}
              />

              <div className="relative z-10 flex flex-col items-center text-center gap-2.5 sm:gap-3">
                {/* Tech Icon inside Tactile Socket */}
                <div 
                  className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-gray-50 border border-gray-100 shadow-inner group-hover:scale-110 group-hover:shadow-md transition-all duration-300"
                  style={{
                    boxShadow: 'inset 1.5px 1.5px 3px rgba(0,0,0,0.04), inset -1.5px -1.5px 3px rgba(255,255,255,0.95)'
                  }}
                >
                  <div style={{ color: skill.color }} className="transition-transform duration-300 group-hover:rotate-6">
                    <SkillIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </div>
                </div>

                {/* Skill Name & Category */}
                <div className="w-full">
                  <h3 className="font-display font-bold text-xs sm:text-sm md:text-base text-gray-900 group-hover:text-amber-700 transition-colors leading-tight mb-1">
                    {skill.name}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-500 font-mono">
                    <span className="uppercase tracking-wider font-semibold">{skill.category}</span>
                    <span className="font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: skill.color }}>
                      {skill.level}%
                    </span>
                  </div>
                  {/* Micro Proficiency Progress Indicator */}
                  <div className="w-full bg-gray-100 rounded-full h-1 mt-1.5 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 group-hover:w-full"
                      style={{ 
                        width: `${skill.level}%`,
                        backgroundColor: skill.color
                      }} 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
