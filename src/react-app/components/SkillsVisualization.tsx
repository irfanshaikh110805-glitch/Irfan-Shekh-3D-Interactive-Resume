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
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
          Technical Skills
        </h2>
        <p className="text-xl text-gray-700 mb-6 md:mb-8">
          A visualization of my technical expertise and tools
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-gray-100/90 rounded-2xl border border-gray-200/50 max-w-fit mx-auto mb-8 md:mb-12 shadow-inner">
          {categories.map((category) => {
            const isSelected = selectedCategory === category
            return (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-300 text-xs sm:text-sm uppercase font-bold tracking-wider cursor-pointer ${
                  isSelected
                    ? 'bg-white text-amber-600 shadow-sm border border-gray-200/60'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Clean Skills Grid with Real Icons */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5"
      >
        {visibleSkills.map((skill, index) => {
          const SkillIcon = skillIcons[skill.name] || FileCode
          
          return (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.02 }}
              key={skill.name}
              className="group relative bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-[-3px_-3px_8px_rgba(255,255,255,1),3px_4px_14px_rgba(0,0,0,0.04)] hover:shadow-[-4px_-4px_12px_rgba(255,255,255,1),4px_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="relative z-10 flex flex-col items-center text-center gap-3">
                {/* Real Tech Icon inside Socket */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-gray-50 border border-gray-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <div style={{ color: skill.color }}>
                    <SkillIcon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                </div>

                {/* Skill Name */}
                <div className="w-full">
                  <h3 className="font-display font-bold text-sm md:text-base text-gray-900 group-hover:text-amber-600 transition-colors leading-tight mb-1">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    {skill.category}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
