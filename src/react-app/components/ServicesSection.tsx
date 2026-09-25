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
        viewport={{ once: true }}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, index) => {
          const Icon = service.icon

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl p-5 md:p-8 border border-gray-100 shadow-[-4px_-4px_12px_rgba(255,255,255,1),4px_6px_18px_rgba(0,0,0,0.05)] hover:shadow-[-6px_-6px_16px_rgba(255,255,255,1),6px_10px_22px_rgba(0,0,0,0.09)] transition-all duration-500 flex flex-col justify-between"
              whileHover={{ y: -6 }}
            >
              <div>
                {/* Icon Dock */}
                <div className="p-2 rounded-2xl bg-amber-50/80 border border-amber-100 inline-block mb-4 md:mb-6 shadow-sm">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.gradient} text-white shadow-md`}>
                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-amber-600 transition-all duration-300 leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Key Features
                  </h4>
                  <div className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        className="flex items-center text-xs md:text-sm text-gray-700"
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-gray-50 border border-gray-200/50 flex items-center justify-center mr-2.5 flex-shrink-0">
                          <div className={`w-1.5 h-1.5 rounded-full bg-dynamic ${getServiceColorClass(service.color)}`} />
                        </div>
                        {feature}
                      </div>
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
                className="mt-6 w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-bold text-xs sm:text-sm hover:from-amber-600 hover:to-yellow-600 shadow-md shadow-amber-500/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
              >
                Inquire About Service
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-12 md:mt-16"
      >
        <motion.button
          onClick={() => {
            const contactSection = document.getElementById('contact')
            if (contactSection) {
              const navOffset = 80
              const elementPosition = contactSection.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.scrollY - navOffset
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              })
            }
          }}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-2xl font-bold text-sm sm:text-base hover:from-amber-600 hover:to-yellow-600 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 cursor-pointer inline-flex items-center gap-3 mx-auto"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          <span>Start Your Project</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
        </motion.button>
        <p className="text-gray-600 text-sm mt-4 font-medium">
          Let's discuss how I can help bring your vision to life
        </p>
      </motion.div>
    </div>
  )
}
