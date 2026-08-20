import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'

interface Certification {
  id: string
  title: string
  issuer: string
  year: string
  badge: string
  image?: string
  link?: string
}

const certifications: Certification[] = [
  {
    id: '1',
    title: 'Oracle Certified Foundations Associate — Agentic AI',
    issuer: 'Oracle University',
    year: 'Jul 2026',
    badge: '🏆',
    image: '/cirtificats/Oracle%20Certified%20Foundations%20Associate%20Agentic%20AI%20Certified%20Foundations%20Associate.jpg',
    link: '#'
  },
  {
    id: '2',
    title: 'Java Full Stack Internship',
    issuer: 'MTD, Mysuru',
    year: 'Jan-Feb 2026',
    badge: '💼',
    image: '/cirtificats/Java%20Full%20Stack%20Internship%20%E2%80%93%20ReactJS%2C%20Spring%20Boot%20%26%20MongoDB%20%E2%80%94%20MTD%2C%20Mysuru.jpg',
    link: '#'
  },
  {
    id: '3',
    title: 'Cybersecurity Analyst Job Simulation',
    issuer: 'Tata, via Forage',
    year: 'Jun 2026',
    badge: '🔐',
    image: '/cirtificats/Cybersecurity%20Analyst%20Job%20Simulation%20Tata%20%20Forage.jpg',
    link: '#'
  },
  {
    id: '4',
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Tata, via Forage',
    year: 'Jun 2026',
    badge: '📊',
    image: '/cirtificats/GenAI%20Powered%20Data%20Analytics%20Job%20Simulation%20Tata%20Forage.jpg',
    link: '#'
  },
  {
    id: '5',
    title: 'Generative AI – A Way of Life',
    issuer: 'Completion Certificate',
    year: 'Sep 2025',
    badge: '🤖',
    image: '/cirtificats/Generative%20AI%20%E2%80%93%20A%20Way%20of%20Life.jpg',
    link: '#'
  },
  {
    id: '6',
    title: 'JavaScript & React.JS from A to Z (7-Day Bootcamp)',
    issuer: 'DevTown',
    year: 'Mar 2024',
    badge: '⚡',
    image: '/cirtificats/JavaScript%20%26%20React.JS%20from%20A%20to%20Z%20%20Certificate%20of%20Completion%20%20DevTownAWS%20Community%20Builders..jpg',
    link: '#'
  },
  {
    id: '7',
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    year: '2024',
    badge: '🧮',
    image: '/cirtificats/JavaScript%20Algorithms%20and%20Data%20Structures.jpg',
    link: '#'
  },
  {
    id: '8',
    title: 'DevTown Certificate of Appreciation',
    issuer: 'DevTown',
    year: 'Mar 2024',
    badge: '🎖️',
    image: '/cirtificats/Certificate%20of%20Appreciation%20%E2%80%94%20DevTown%2C%20dated%2020%20March%202024..jpg',
    link: '#'
  }
]

export default function CertificationsSection() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-5 py-2 mb-4">
          <Award className="w-4 h-4 text-amber-600" />
          <span className="text-sm text-amber-700 font-medium">Professional Development</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
          Certifications
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Continuous learning through industry-recognized certifications and programs
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative bg-white rounded-2xl p-3 min-[375px]:p-4 md:p-6 border border-gray-200 hover:border-amber-300 transition-all duration-300 shadow-sm overflow-hidden"
            whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(245, 158, 11, 0.12)' }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 to-yellow-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              {/* Certificate Image (if available) */}
              {cert.image && (
                <div className="mb-3 md:mb-4 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                  <img 
                    src={cert.image} 
                    alt={`${cert.title} certificate`}
                    className="w-full h-32 md:h-40 object-contain object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Badge & Year Row */}
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className="text-2xl min-[375px]:text-3xl">{cert.badge}</div>
                <span className="text-[9px] min-[375px]:text-[11px] md:text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 min-[375px]:px-3 min-[375px]:py-1 rounded-full">
                  {cert.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 text-xs min-[375px]:text-sm md:text-base mb-1.5 md:mb-2 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2 md:line-clamp-none">
                {cert.title}
              </h3>

              {/* Issuer */}
              <div className="flex items-center justify-between mt-2 md:mt-3">
                <span className="text-[10px] min-[375px]:text-xs md:text-sm text-gray-500 font-medium line-clamp-1">{cert.issuer}</span>
                {cert.link && cert.link !== '#' && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:text-amber-700 transition-colors"
                    aria-label={`View certificate: ${cert.title}`}
                  >
                    <ExternalLink size={14} className="min-[375px]:w-4 min-[375px]:h-4 md:w-[18px] md:h-[18px]" />
                  </a>
                )}
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-amber-100/60 group-hover:bg-amber-200/60 transition-colors duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
