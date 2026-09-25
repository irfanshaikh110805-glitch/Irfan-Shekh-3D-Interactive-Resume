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
    title: 'PG-DCA [Post Graduate Diploma in Computer Applications]',
    issuer: 'IACT — Institute for Advanced Computer Technology',
    year: 'Dec 2022',
    badge: '🎓',
    image: '/cirtificats/PG-DCA Diploma in Computer Application — IACT.webp',
    link: '#'
  },
  {
    id: '2',
    title: 'Oracle Certified Foundations Associate — Agentic AI',
    issuer: 'Oracle University',
    year: 'Jul 2026',
    badge: '🏆',
    image: '/cirtificats/Oracle Certified Foundations Associate Agentic AI Certified Foundations Associate.webp',
    link: '#'
  },
  {
    id: '3',
    title: 'Java Full Stack Internship',
    issuer: 'MTD, Mysuru',
    year: 'Jan-Feb 2026',
    badge: '💼',
    image: '/cirtificats/Java Full Stack Internship – ReactJS, Spring Boot & MongoDB — MTD, Mysuru.webp',
    link: '#'
  },
  {
    id: '4',
    title: 'Cybersecurity Analyst Job Simulation',
    issuer: 'Tata, via Forage',
    year: 'Jun 2026',
    badge: '🔐',
    image: '/cirtificats/Cybersecurity Analyst Job Simulation Tata  Forage.webp',
    link: '#'
  },
  {
    id: '5',
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Tata, via Forage',
    year: 'Jun 2026',
    badge: '📊',
    image: '/cirtificats/GenAI Powered Data Analytics Job Simulation Tata Forage.webp',
    link: '#'
  },
  {
    id: '6',
    title: 'Generative AI – A Way of Life',
    issuer: 'Completion Certificate',
    year: 'Sep 2025',
    badge: '🤖',
    image: '/cirtificats/Generative AI – A Way of Life.webp',
    link: '#'
  },
  {
    id: '7',
    title: 'JavaScript & React.JS from A to Z (7-Day Bootcamp)',
    issuer: 'DevTown',
    year: 'Mar 2024',
    badge: '⚡',
    image: '/cirtificats/JavaScript & React.JS from A to Z  Certificate of Completion  DevTownAWS Community Builders..webp',
    link: '#'
  },
  {
    id: '8',
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    year: '2024',
    badge: '🧮',
    image: '/cirtificats/JavaScript Algorithms and Data Structures.webp',
    link: '#'
  },
  {
    id: '9',
    title: 'DevTown Certificate of Appreciation',
    issuer: 'DevTown',
    year: 'Mar 2024',
    badge: '🎖️',
    image: '/cirtificats/Certificate of Appreciation — DevTown, dated 20 March 2024..webp',
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
        <div className="inline-flex items-center gap-2 bg-amber-50/80 border border-amber-200/60 rounded-full px-5 py-2 mb-4 shadow-sm">
          <Award className="w-4 h-4 text-amber-600" />
          <span className="text-sm text-amber-700 font-semibold">Professional Development</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
          Certifications
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Continuous learning through industry-recognized certifications and programs
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative bg-white rounded-3xl p-4 md:p-6 border border-gray-100 shadow-[-4px_-4px_12px_rgba(255,255,255,1),4px_6px_16px_rgba(0,0,0,0.05)] hover:shadow-[-6px_-6px_16px_rgba(255,255,255,1),6px_10px_22px_rgba(0,0,0,0.09)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
            whileHover={{ y: -6 }}
          >
            <div className="relative z-10">
              {/* Certificate Image Frame */}
              {cert.image && (
                <div className="mb-4 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-1.5">
                  <img 
                    src={cert.image} 
                    alt={`${cert.title} certificate`}
                    width="400"
                    height="280"
                    decoding="async"
                    className="w-full h-36 md:h-44 object-contain object-center rounded-xl hover:scale-105 transition-transform duration-500 bg-white"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Failed to load certificate image:', cert.image);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Badge & Year Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl p-1.5 rounded-xl bg-gray-50 border border-gray-100 shadow-sm inline-block">{cert.badge}</div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full shadow-sm">
                  {cert.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 text-sm md:text-base mb-2 group-hover:text-amber-700 transition-colors leading-snug">
                {cert.title}
              </h3>

              {/* Issuer */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs md:text-sm text-gray-600 font-semibold line-clamp-1">{cert.issuer}</span>
                {cert.link && cert.link !== '#' && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-amber-50 border border-amber-200/60 text-amber-600 hover:bg-amber-100 shadow-sm transition-all"
                    aria-label={`View certificate: ${cert.title}`}
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
