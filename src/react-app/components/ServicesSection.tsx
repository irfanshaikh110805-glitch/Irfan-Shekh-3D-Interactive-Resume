import { motion } from 'framer-motion'
import { Code, Palette, Smartphone, Globe, Zap, Users, LucideIcon } from 'lucide-react'

// Helper function to get CSS class name for service colors
const getServiceColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#f59e0b': 'service-amber',
    '#eab308': 'service-amber',
    '#d97706': 'service-amber',
    '#f97316': 'service-orange',
    '#fbbf24': 'service-cyan',
    '#ef4444': 'service-red'
  }
  return colorMap[color] || 'service-amber'
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
    title: 'Full-Stack Web Development',
    description: 'End-to-end web applications built with React, Node.js, Flask, and modern databases — deployed and production-ready.',
    icon: Code,
    features: ['React & Next.js', 'Flask / Node.js APIs', 'MongoDB & PostgreSQL', 'JWT Auth & Supabase'],
    color: '#f59e0b',
    gradient: 'from-amber-500 to-yellow-500'
  },
  {
    id: '2',
    title: 'AI / ML Development',
    description: 'Machine learning models and intelligent features using TensorFlow, Keras, and Python — from training to deployment.',
    icon: Zap,
    features: ['TensorFlow & Keras', 'Computer Vision (MobileNetV2)', 'NLP & Classification', 'Flask-based ML APIs'],
    color: '#eab308',
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    id: '3',
    title: 'UI/UX Design & Frontend',
    description: 'Beautiful, pixel-perfect interfaces with smooth animations using React, Tailwind CSS, and Framer Motion.',
    icon: Palette,
    features: ['React & TypeScript', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
    color: '#f59e0b',
    gradient: 'from-amber-500 to-yellow-500'
  },
  {
    id: '4',
    title: 'API Design & Integration',
    description: 'RESTful API design, third-party integrations, and cloud deployments on Render, Netlify, Vercel, and Cloudflare.',
    icon: Globe,
    features: ['REST API Design', 'Postman & Testing', 'Render / Netlify Deploy', 'Docker & Redis'],
    color: '#f59e0b',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: '5',
    title: 'Database Architecture',
    description: 'Scalable database design with MongoDB, MySQL, PostgreSQL, and Supabase for data-intensive applications.',
    icon: Smartphone,
    features: ['MongoDB & MySQL', 'Supabase & PostgreSQL', 'Database Design', 'Data Optimization'],
    color: '#f97316',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    id: '6',
    title: 'Technical Consulting',
    description: 'Architecture reviews, code consultations, and technical guidance for web and AI/ML projects.',
    icon: Users,
    features: ['Code Reviews', 'Architecture Planning', 'Technology Selection', 'Performance Audits'],
    color: '#fbbf24',
    gradient: 'from-yellow-500 to-amber-500'
  }
]

export default function ServicesSection() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-16"
      >
        <h2 className="heading-lg mb-6 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
          Services & Expertise
        </h2>
        <p className="body-lg text-gray-700 max-w-3xl mx-auto font-light">
          Comprehensive digital solutions tailored to bring your ideas to life with <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent font-medium">cutting-edge technology</span> and creative excellence
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
        {services.map((service, index) => {
          const Icon = service.icon

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-3 min-[375px]:p-4 md:p-8 border border-gray-200 hover:border-gray-300 transition-all duration-500 overflow-hidden shadow-sm flex flex-col justify-between"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div>
                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-9 h-9 min-[375px]:w-14 min-[375px]:h-14 rounded-xl min-[375px]:rounded-2xl bg-gradient-to-br ${service.gradient} mb-3 md:mb-6 relative z-10`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="text-white w-4.5 h-4.5 min-[375px]:w-6 min-[375px]:h-6 md:w-7 md:h-7" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xs min-[375px]:text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 md:mb-4 group-hover:text-amber-600 transition-all duration-300 leading-snug line-clamp-1">
                  {service.title}
                </h3>

                <p className="text-[10px] min-[375px]:text-xs md:text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3 md:line-clamp-none">
                  {service.description}
                </p>

                {/* Features */}
                <div className="hidden sm:block space-y-3">
                  <h4 className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Key Features
                  </h4>
                  <div className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <motion.div
                        key={fIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (index * 0.1) + (fIndex * 0.05) }}
                        className="flex items-center text-xs md:text-sm text-gray-700"
                      >
                        <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mr-2 md:mr-3 flex-shrink-0 bg-dynamic ${getServiceColorClass(service.color)}`} />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
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
                className={`mt-4 md:mt-8 w-full px-3 py-2 md:px-6 md:py-3 bg-gradient-to-r ${service.gradient} text-white rounded-lg md:rounded-xl font-medium text-[10px] min-[375px]:text-xs sm:text-sm md:text-base opacity-100 translate-y-0 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-4 lg:group-hover:translate-y-0 transition-all duration-300`}
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
        className="text-center mt-10 md:mt-16"
      >
        <motion.button
          onClick={() => {
            const contactSection = document.getElementById('contact')
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-bold flex items-center gap-3 mx-auto hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
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
        <p className="text-gray-600 text-sm mt-4">
          Let's discuss how I can help bring your vision to life
        </p>
      </motion.div>
    </div>
  )
}
