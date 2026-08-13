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

      {/* Clean Skills Grid with Real Icons */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4"
      >
        {visibleSkills.map((skill, index) => {
          const SkillIcon = skillIcons[skill.name] || FileCode
          
          return (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              key={skill.name}
              className="group relative bg-white rounded-xl p-4 md:p-5 border border-gray-200 hover:border-amber-300 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br from-gray-200 to-transparent" />

              <div className="relative z-10 flex flex-col items-center text-center gap-3">
                {/* Real Tech Icon with Brand Colors */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center bg-white border border-gray-200 group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-lg">
                  <div style={{ color: skill.color }}>
                    <SkillIcon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                </div>

                {/* Skill Name */}
                <div className="w-full">
                  <h3 className="font-display font-bold text-sm md:text-base text-gray-900 group-hover:text-amber-600 transition-colors leading-tight mb-1">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-medium">
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
