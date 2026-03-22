import { motion } from 'framer-motion'
import { Monitor, Smartphone, Database, ExternalLink } from 'lucide-react'

// Custom GitHub icon (brand icons removed from lucide-react)
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

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
    image: '/restaurant-hero.webp',
    demoUrl: 'https://hoteleverestfamilyrestaurant.netlify.app/',
    githubUrl: '#',
    highlights: [
      'Table Booking System',
      'Menu Management',
      'User Authentication',
      'Mobile Responsive'
    ],
    color: '#f97316'
  },
  {
    id: '2',
    title: 'AI Healthcare Assistant Web App',
    description: 'Built a Flask-based AI healthcare assistant using NLP logic and REST APIs to provide automated medical guidance for common health queries.',
    type: 'web',
    technologies: ['Python', 'Flask', 'NLP', 'REST APIs'],
    image: '/mediguardianaipicture.webp',
    demoUrl: '#',
    githubUrl: '#',
    highlights: [
      'NLP Integration',
      'Medical Guidance',
      'REST API',
      'Flask Backend'
    ],
    color: '#f59e0b'
  },
  {
    id: '3',
    title: 'Fruit & Vegetable Disease Detection System',
    description: 'Created an AI-based image classification system using TensorFlow MobileNetV2 and a Flask API for real-time fruit and vegetable disease detection.',
    type: 'web',
    technologies: ['Python', 'TensorFlow', 'MobileNetV2', 'Flask'],
    image: '/detect-fruit-vegetable.webp',
    demoUrl: '#',
    githubUrl: '#',
    highlights: [
      'AI Classification',
      'Image Recognition',
      'Real-time Detection',
      'Mobile Optimized'
    ],
    color: '#eab308'
  },
  {
    id: '4',
    title: 'Interactive Portfolio Website',
    description: 'A modern portfolio website featuring interactive animations, smooth transitions, and responsive design built with React and Framer Motion.',
    type: 'web',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    image: '/devfolio.webp',
    demoUrl: '#',
    githubUrl: '#',
    highlights: [
      'Interactive Animations',
      'Responsive Design',
      'Modern UI',
      'Performance Optimized'
    ],
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
    highlights: [
      'Database Design',
      'Query Optimization',
      'Data Management',
      'API Integration'
    ],
    color: '#f97316'
  },
  {
    id: '6',
    title: 'HeavyDuty Parts — Industrial E-Commerce',
    description: 'Full-stack industrial hardware e-commerce platform (AdiSync Solutions) for selling heavy machinery parts in India. Features WhatsApp checkout, a rotating hero banner, product catalog with categories, search & filtering, and INR currency support.',
    type: 'fullstack',
    technologies: ['React 19', 'TypeScript', 'Hono', 'Cloudflare Workers', 'Tailwind CSS', 'Netlify'],
    image: '/heavydutyparts-shop.webp',
    demoUrl: 'https://heavydutyparts-shop.netlify.app',
    githubUrl: '#',
    highlights: [
      'WhatsApp Checkout',
      'Product Catalog & Search',
      'Cloudflare Workers API',
      'Responsive Design'
    ],
    color: '#d97706'
  }
]

const typeIcons = {
  web: Monitor,
  mobile: Smartphone,
  fullstack: Database
}

const getTypeClass = (type: string) => `project-type-${type}`

const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    '#f59e0b': 'project-color-amber',
    '#d97706': 'project-color-green',
    '#eab308': 'project-color-purple',
    '#f97316': 'project-color-red',
    '#fbbf24': 'project-color-orange'
  }
  return colorMap[color] || 'project-color-amber'
}

const getColorOpacityClass = (color: string) => {
  const colorMap: Record<string, string> = {
    '#f59e0b': 'project-color-amber-opacity',
    '#d97706': 'project-color-green-opacity',
    '#eab308': 'project-color-purple-opacity',
    '#f97316': 'project-color-red-opacity',
    '#fbbf24': 'project-color-orange-opacity'
  }
  return colorMap[color] || 'project-color-amber-opacity'
}

export default function ProjectShowcase() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, index) => {
          const Icon = typeIcons[project.type]
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-500 shadow-sm"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.description.substring(0, 100)}`}
                  loading="lazy"
                  width="400"
                  height="300"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback for broken images
                    const target = e.target as HTMLImageElement
                    target.onerror = null;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23374151" width="400" height="300"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage unavailable%3C/text%3E%3C/svg%3E'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                
                {/* Project Type Badge */}
                <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium ${getTypeClass(project.type)}`}>
                  <Icon size={16} />
                  {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-20">
                  {project.demoUrl && (
                    <motion.button
                      onClick={() => {
                        if (project.demoUrl !== '#') {
                          window.open(project.demoUrl, '_blank')
                        }
                      }}
                      disabled={project.demoUrl === '#'}
                      title={project.demoUrl === '#' ? `${project.title} demo coming soon!` : `View live demo of ${project.title}`}
                      aria-label={`View live demo of ${project.title}`}
                      className={`p-2 bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors duration-300 ${project.demoUrl === '#' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/30'}`}
                      whileHover={project.demoUrl !== '#' ? { scale: 1.1 } : {}}
                      whileTap={project.demoUrl !== '#' ? { scale: 0.95 } : {}}
                    >
                      <ExternalLink size={16} />
                    </motion.button>
                  )}
                  {project.githubUrl && (
                    <motion.button
                      onClick={() => {
                        if (project.githubUrl !== '#') {
                          window.open(project.githubUrl, '_blank')
                        }
                      }}
                      disabled={project.githubUrl === '#'}
                      title={project.githubUrl === '#' ? `Source code is private` : `View source code of ${project.title}`}
                      aria-label={`View source code of ${project.title}`}
                      className={`p-2 bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors duration-300 ${project.githubUrl === '#' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/30'}`}
                      whileHover={project.githubUrl !== '#' ? { scale: 1.1 } : {}}
                      whileTap={project.githubUrl !== '#' ? { scale: 0.95 } : {}}
                    >
                      <GithubIcon size={16} />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-5 md:p-6">
                <h3 className="heading-sm text-gray-900 mb-4 group-hover:text-amber-600 transition-all duration-300">
                  {project.title}
                </h3>
                <p className="body-md text-gray-700 leading-relaxed mb-4">
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
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Key Features
                  </h4>
                  <div className="space-y-1">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <motion.div
                        key={highlightIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: highlightIndex * 0.1 }}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <div className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${getColorClass(project.color)}`} />
                        {highlight}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className={`absolute bottom-0 right-0 w-32 h-32 rounded-full transform translate-x-16 translate-y-16 ${getColorOpacityClass(project.color)}`} />
            </motion.div>
          )
        })}
      </div>

      {/* View All Projects Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-6 md:mt-8"
      >
        <motion.button
          onClick={() => {
            window.open('https://github.com/irfanshaikh110805-glitch', '_blank')
          }}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg font-medium hover:from-amber-600 hover:to-yellow-600 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Projects
        </motion.button>
      </motion.div>
    </div>
  )
}
