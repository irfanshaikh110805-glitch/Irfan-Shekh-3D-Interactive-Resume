import { motion } from 'framer-motion'
import { Monitor, Smartphone, Database, ExternalLink } from 'lucide-react'
import { projects } from '@/shared/data'
import { getProjectColorClass } from '@/react-app/utils/colorUtils'
import { useMobileDetection } from '@/react-app/hooks/useMobileDetection'

// Custom GitHub icon (brand icons removed from lucide-react)
const GithubIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const typeIcons = {
  web: Monitor,
  mobile: Smartphone,
  fullstack: Database
}

const getTypeClass = (type: string) => `project-type-${type}`

const getColorClass = getProjectColorClass

const getColorOpacityClass = (color: string) => {
  const colorMap: Record<string, string> = {
    '#f59e0b': 'project-color-amber-opacity',
    '#d97706': 'project-color-green-opacity',
    '#eab308': 'project-color-purple-opacity',
    '#f97316': 'project-color-red-opacity',
    '#fbbf24': 'project-color-orange-opacity',
    '#dc2626': 'project-color-red-dark-opacity'
  }
  return colorMap[color] || 'project-color-amber-opacity'
}

export default function ProjectShowcase() {
  const isMobile = useMobileDetection()
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
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
              <div className="relative h-28 min-[375px]:h-36 sm:h-44 md:h-48 overflow-hidden">
                <img
                  src={project.image}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
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
                <div className={`absolute top-2 left-2 min-[375px]:top-4 min-[375px]:left-4 flex items-center gap-1 px-1.5 py-0.5 min-[375px]:px-2.5 min-[375px]:py-1 rounded-full text-white text-[10px] min-[375px]:text-xs sm:text-sm font-medium ${getTypeClass(project.type)}`}>
                  <Icon size={12} className="min-[375px]:w-3.5 min-[375px]:h-3.5 md:w-4 md:h-4" />
                  <span className="hidden min-[375px]:inline">{project.type.charAt(0).toUpperCase() + project.type.slice(1)}</span>
                </div>

                {/* Action Buttons - Always Visible */}
                <div className="absolute top-2 right-2 min-[375px]:top-4 min-[375px]:right-4 flex gap-1 min-[375px]:gap-2 transition-all duration-300 z-20">
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
                      className={`p-1.5 min-[375px]:p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 shadow-lg transition-all duration-300 ${project.demoUrl === '#' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:shadow-xl'}`}
                      whileHover={project.demoUrl !== '#' ? { scale: 1.1 } : {}}
                      whileTap={project.demoUrl !== '#' ? { scale: 0.95 } : {}}
                    >
                      <ExternalLink size={14} className="min-[375px]:w-4 min-[375px]:h-4 md:w-[18px] md:h-[18px]" />
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
                      className={`p-1.5 min-[375px]:p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 shadow-lg transition-all duration-300 ${project.githubUrl === '#' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:shadow-xl'}`}
                      whileHover={project.githubUrl !== '#' ? { scale: 1.1 } : {}}
                      whileTap={project.githubUrl !== '#' ? { scale: 0.95 } : {}}
                    >
                      <GithubIcon size={14} className="min-[375px]:w-4 min-[375px]:h-4 md:w-[18px] md:h-[18px]" />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-3 min-[375px]:p-4 md:p-6">
                <h3 className="text-sm min-[375px]:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 md:mb-4 group-hover:text-amber-600 transition-all duration-300 leading-snug line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-[11px] min-[375px]:text-xs md:text-sm text-gray-700 leading-relaxed mb-3 md:mb-4 line-clamp-3 md:line-clamp-none">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 min-[375px]:gap-1.5 md:gap-2 mb-3 md:mb-4">
                  {project.technologies.slice(0, isMobile ? 3 : project.technologies.length).map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                      className="px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-100 text-gray-700 text-[9px] min-[375px]:text-[11px] md:text-xs rounded-full border border-gray-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {isMobile && project.technologies.length > 3 && (
                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[9px] min-[375px]:text-[11px] rounded-full border border-gray-200">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Highlights */}
                <div className="hidden sm:block space-y-2">
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
