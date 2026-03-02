import { motion } from 'framer-motion'
import { ExternalLink, Github, Code, Smartphone, Globe } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  type: 'web' | 'mobile' | 'fullstack'
  technologies: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
  highlights: string[]
  color: string
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Hotel Everest Family Restaurant',
    description: 'A full-featured restaurant booking and food ordering platform with authentic Indian cuisine menu, table reservations, shopping cart, and user authentication.',
    type: 'fullstack',
    technologies: ['React', 'Supabase', 'Authentication', 'Responsive Design'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80',
    demoUrl: 'https://hoteleverestfamilyrestaurant.netlify.app/',
    githubUrl: '#',
    highlights: ['Table Booking System', 'Menu Management', 'User Authentication', 'Mobile Responsive'],
    color: '#f97316'
  },
  {
    id: '2',
    title: 'AI Healthcare Assistant Web App',
    description: 'Built a Flask-based AI healthcare assistant using NLP logic and REST APIs to provide automated medical guidance for common health queries.',
    type: 'web',
    technologies: ['Python', 'Flask', 'NLP', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&q=80',
    demoUrl: '#',
    githubUrl: '#',
    highlights: ['NLP Integration', 'Medical Guidance', 'REST API', 'Flask Backend'],
    color: '#3b82f6'
  },
  {
    id: '3',
    title: 'Fruit & Vegetable Disease Detection System',
    description: 'Created an AI-based image classification system using TensorFlow MobileNetV2 and a Flask API for real-time fruit and vegetable disease detection.',
    type: 'web',
    technologies: ['Python', 'TensorFlow', 'MobileNetV2', 'Flask'],
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop&q=80',
    demoUrl: '#',
    githubUrl: '#',
    highlights: ['AI Classification', 'Image Recognition', 'Real-time Detection', 'Mobile Optimized'],
    color: '#8b5cf6'
  },
  {
    id: '4',
    title: 'Interactive Portfolio Website',
    description: 'A modern portfolio website featuring interactive animations, smooth transitions, and responsive design built with React and Framer Motion.',
    type: 'web',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop&q=80',
    demoUrl: '#',
    githubUrl: '#',
    highlights: ['Interactive Animations', 'Responsive Design', 'Modern UI', 'Performance Optimized'],
    color: '#f59e0b'
  },
  {
    id: '5',
    title: 'Database Management System',
    description: 'Developed database solutions using MongoDB and MySQL with efficient data management and query optimization for web applications.',
    type: 'fullstack',
    technologies: ['MongoDB', 'MySQL', 'Node.js', 'Express'],
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop&q=80',
    demoUrl: '#',
    githubUrl: '#',
    highlights: ['Database Design', 'Query Optimization', 'Data Management', 'API Integration'],
    color: '#ef4444'
  },
  {
    id: '6',
    title: 'Web Development Projects',
    description: 'Developed and tested web modules using HTML, CSS, JavaScript, and Flask with database integration and REST API functionality.',
    type: 'web',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Flask'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80',
    demoUrl: '#',
    githubUrl: '#',
    highlights: ['Full-stack Development', 'REST API', 'Database Integration', 'Debugging & Testing'],
    color: '#06b6d4'
  }
]

const typeIcons = {
  web: Globe,
  mobile: Smartphone,
  fullstack: Code
}


// Helper functions to get CSS class names for colors
const getProjectTypeClass = (type: 'web' | 'mobile' | 'fullstack') => {
  return `project-type-${type}`
}

const getProjectColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    '#3b82f6': 'project-color-blue',
    '#059669': 'project-color-green',
    '#8b5cf6': 'project-color-purple',
    '#f59e0b': 'project-color-amber',
    '#ef4444': 'project-color-red',
    '#06b6d4': 'project-color-cyan'
  }
  return colorMap[color] || 'project-color-blue'
}

const getProjectColorOpacityClass = (color: string) => {
  const colorMap: Record<string, string> = {
    '#3b82f6': 'project-color-blue-opacity',
    '#059669': 'project-color-green-opacity',
    '#8b5cf6': 'project-color-purple-opacity',
    '#f59e0b': 'project-color-amber-opacity',
    '#ef4444': 'project-color-red-opacity',
    '#06b6d4': 'project-color-cyan-opacity'
  }
  return colorMap[color] || 'project-color-blue-opacity'
}

export default function ProjectShowcase() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          const TypeIcon = typeIcons[project.type]

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl overflow-hidden border border-gray-800/50 backdrop-blur-sm hover:border-gray-700/50 transition-all duration-500"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

                {/* Project Type Badge */}
                <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium ${getProjectTypeClass(project.type)}`}>
                  <TypeIcon size={16} />
                  {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.demoUrl && (
                    <motion.button
                      onClick={() => {
                        if (project.demoUrl === '#') {
                          alert(`${project.title} demo coming soon! Contact me for a live demonstration.`)
                        } else {
                          window.open(project.demoUrl, '_blank')
                        }
                      }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                    </motion.button>
                  )}
                  {project.githubUrl && (
                    <motion.button
                      onClick={() => {
                        if (project.githubUrl === '#') {
                          alert(`${project.title} source code is private. Contact me to discuss the implementation details.`)
                        } else {
                          window.open(project.githubUrl, '_blank')
                        }
                      }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="heading-sm text-white mb-4 group-hover:text-gradient-blue transition-all duration-300">
                  {project.title}
                </h3>

                <p className="body-md text-gray-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Key Features
                  </h4>
                  <div className="space-y-1">
                    {project.highlights.map((highlight, hIndex) => (
                      <motion.div
                        key={hIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: hIndex * 0.1 }}
                        className="flex items-center text-sm text-gray-300"
                      >
                        <div className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${getProjectColorClass(project.color)}`} />
                        {highlight}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className={`absolute bottom-0 right-0 w-32 h-32 rounded-full transform translate-x-16 translate-y-16 ${getProjectColorOpacityClass(project.color)}`} />
            </motion.div>
          )
        })}
      </div>

      {/* View More Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-8"
      >
        <motion.button
          onClick={() => {
            window.open('https://github.com/irfan-shekh', '_blank')
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Projects
        </motion.button>
      </motion.div>
    </div>
  )
}
