import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Smartphone, Database, ExternalLink, X, ZoomIn } from 'lucide-react'
import { projects, Project } from '@/shared/data'
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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
              {/* Project Image Container */}
              <div 
                className="relative h-28 min-[375px]:h-36 sm:h-44 md:h-48 overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
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
                
                {/* Click to zoom overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <div className="p-2 min-[375px]:p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn size={20} className="w-4 h-4 min-[375px]:w-5 min-[375px]:h-5" />
                  </div>
                </div>

                {/* Project Type Badge */}
                <div className={`absolute top-2 left-2 min-[375px]:top-4 min-[375px]:left-4 flex items-center gap-1 px-1.5 py-0.5 min-[375px]:px-2.5 min-[375px]:py-1 rounded-full text-white text-[10px] min-[375px]:text-xs sm:text-sm font-medium ${getTypeClass(project.type)}`}>
                  <Icon size={12} className="min-[375px]:w-3.5 min-[375px]:h-3.5 md:w-4 md:h-4" />
                  <span className="hidden min-[375px]:inline">{project.type.charAt(0).toUpperCase() + project.type.slice(1)}</span>
                </div>

                {/* Action Buttons - Always Visible */}
                <div className="absolute top-2 right-2 min-[375px]:top-4 min-[375px]:right-4 flex gap-1 min-[375px]:gap-2 transition-all duration-300 z-20">
                  {project.demoUrl && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
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
                      onClick={(e) => {
                        e.stopPropagation()
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Column / Top Section: The Image */}
              <div className="relative w-full md:flex-1 bg-black flex items-center justify-center overflow-hidden h-[220px] min-[375px]:h-[260px] sm:h-[320px] md:h-auto flex-shrink-0">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="max-w-full max-h-full md:max-h-[80vh] object-contain transition-all duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23374151" width="400" height="300"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage unavailable%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>

              {/* Right Column / Bottom Section: Project Details */}
              <div className="w-full md:w-[360px] p-5 sm:p-8 flex flex-col border-t md:border-t-0 md:border-l border-neutral-800 bg-neutral-900/95 text-white flex-1 min-h-0">
                {/* Header (Static) */}
                <div className="flex-shrink-0 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getTypeClass(selectedProject.type)}`}>
                      {selectedProject.type.charAt(0).toUpperCase() + selectedProject.type.slice(1)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent leading-snug">
                    {selectedProject.title}
                  </h3>
                </div>
                
                {/* Scrollable Body Content */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-4 scrollbar-thin scrollbar-thumb-neutral-700">
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 md:py-1 bg-neutral-800 text-neutral-300 text-[10px] sm:text-xs rounded-md border border-neutral-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                      Key Highlights
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-neutral-300">
                          <span className="text-amber-500 mr-2 mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer / Action Links (Static) */}
                <div className="flex-shrink-0 flex gap-3 pt-3 border-t border-neutral-800 mt-auto">
                  {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] text-xs sm:text-sm text-center leading-none"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl border border-neutral-700 transition-all duration-300 transform hover:scale-[1.02] text-xs sm:text-sm text-center leading-none"
                    >
                      <span>Code</span>
                      <GithubIcon size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-neutral-800/80 hover:bg-neutral-700/90 text-white rounded-full transition-all duration-300 border border-neutral-700 shadow-md group backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
