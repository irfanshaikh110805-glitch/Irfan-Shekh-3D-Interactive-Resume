import { motion } from 'framer-motion'
import { Code, Palette, Smartphone, Globe, Zap, Users, LucideIcon } from 'lucide-react'

// Helper function to get CSS class name for service colors
const getServiceColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#3b82f6': 'service-blue',
    '#8b5cf6': 'service-purple',
    '#059669': 'service-green',
    '#f59e0b': 'service-amber',
    '#ef4444': 'service-red',
    '#06b6d4': 'service-cyan'
  }
  return colorMap[color] || 'service-blue'
}

interface Service {
  id: string
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  color: string
  gradient: string
}

const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks and cutting-edge technologies.',
    icon: Code,
    features: ['React & Next.js', 'Full-Stack Solutions', 'API Integration', 'Performance Optimization'],
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: '2',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that provide exceptional user experiences.',
    icon: Palette,
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    color: '#8b5cf6',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: '3',
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications that work seamlessly across all devices.',
    icon: Smartphone,
    features: ['Flutter Development', 'Native Performance', 'Cross-Platform', 'App Store Deployment'],
    color: '#059669',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: '4',
    title: '3D Web Experiences',
    description: 'Immersive 3D web experiences that captivate and engage your audience.',
    icon: Globe,
    features: ['Three.js', 'WebGL', 'Interactive Animations', 'VR/AR Integration'],
    color: '#f59e0b',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: '5',
    title: 'Performance Optimization',
    description: 'Speed up your website and improve user experience with advanced optimization techniques.',
    icon: Zap,
    features: ['Code Splitting', 'Image Optimization', 'Caching Strategies', 'Core Web Vitals'],
    color: '#ef4444',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    id: '6',
    title: 'Consulting & Mentoring',
    description: 'Technical guidance and mentoring to help teams build better digital products.',
    icon: Users,
    features: ['Technical Consultation', 'Code Reviews', 'Team Training', 'Architecture Planning'],
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-blue-500'
  }
]

export default function ServicesSection() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="heading-lg mb-6 text-gradient text-shadow-glow">
          Services & Expertise
        </h2>
        <p className="body-lg text-gray-300 max-w-3xl mx-auto font-light">
          Comprehensive digital solutions tailored to bring your ideas to life with <span className="text-gradient-blue font-medium">cutting-edge technology</span> and creative excellence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl p-8 border border-gray-800/50 backdrop-blur-sm hover:border-gray-700/50 transition-all duration-500 overflow-hidden"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Icon */}
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 relative z-10`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Icon size={28} className="text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="heading-sm text-white mb-4 group-hover:text-gradient-blue transition-all duration-300">
                {service.title}
              </h3>

              <p className="body-md text-gray-300 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  Key Features
                </h4>
                <div className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <motion.div
                      key={fIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (index * 0.1) + (fIndex * 0.05) }}
                      className="flex items-center text-sm text-gray-300"
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 bg-dynamic ${getServiceColorClass(service.color)}`} />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className={`mt-8 w-full px-6 py-3 bg-gradient-to-r ${service.gradient} text-white rounded-xl font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>

              {/* Decorative Elements */}
              <div className={`absolute top-4 right-4 w-20 h-20 rounded-full bg-dynamic-opacity-5 transition-all duration-500 group-hover:opacity-10 group-hover:scale-150 ${getServiceColorClass(service.color)}`} />
              <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-dynamic-opacity-3 ${getServiceColorClass(service.color)}`} />
            </motion.div>
          )
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-16"
      >
        <motion.button
          onClick={() => {
            const contactSection = document.getElementById('contact')
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold flex items-center gap-3 mx-auto hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Start Your Project</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
        </motion.button>
        <p className="text-gray-400 text-sm mt-4">
          Let's discuss how I can help bring your vision to life
        </p>
      </motion.div>
    </div>
  )
}
