import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ExternalLink, X, ZoomIn, CheckCircle2 } from 'lucide-react'
import TiltCard from '@/react-app/components/TiltCard'

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
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedCert])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-14"
      >
        <div className="inline-flex items-center gap-2 bg-amber-50/90 border border-amber-200/70 rounded-full px-5 py-2 mb-4 shadow-sm">
          <Award className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="text-xs sm:text-sm text-amber-800 font-semibold font-mono tracking-tight">Verified Credentials</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent tracking-tight">
          Certifications
        </h2>
        <p className="font-sans text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Industry-recognized credentials validating practical competence in AI/ML, Full-Stack Engineering, and Computer Science.
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
            className="h-full"
          >
            <TiltCard
              maxTilt={5}
              glareOpacity={0.12}
              onClick={() => setSelectedCert(cert)}
              className="group relative bg-white rounded-3xl p-4 md:p-5 border border-gray-100 shadow-[-4px_-4px_12px_rgba(255,255,255,1),4px_6px_16px_rgba(0,0,0,0.05)] hover:shadow-[-6px_-6px_16px_rgba(255,255,255,1),6px_12px_24px_rgba(245,158,11,0.12)] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer overflow-hidden"
            >
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {/* Certificate Image Frame with Shimmer Sheen */}
                  {cert.image && (
                    <div className="shimmer-hover-trigger relative mb-4 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100/90 p-1.5 group-hover:border-amber-200/60 transition-colors">
                      <img 
                        src={cert.image} 
                        alt={`${cert.title} certificate`}
                        width="400"
                        height="280"
                        decoding="async"
                        className="w-full h-36 md:h-44 object-contain object-center rounded-xl group-hover:scale-105 transition-transform duration-700 bg-white"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      
                      {/* Zoom hint overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 rounded-xl">
                        <div className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg text-gray-900 flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
                          <ZoomIn size={14} className="text-amber-600" />
                          <span className="text-xs font-bold font-sans">View Credential</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Badge & Year Row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xl p-1.5 rounded-xl bg-gray-50 border border-gray-100 shadow-sm inline-block group-hover:scale-110 transition-transform duration-300">{cert.badge}</div>
                    <span className="font-mono text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full shadow-sm">
                      {cert.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-gray-900 text-sm md:text-base mb-2 group-hover:text-amber-600 transition-colors leading-snug tracking-tight">
                    {cert.title}
                  </h3>
                </div>

                {/* Issuer Footer */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="font-sans text-xs md:text-sm text-gray-600 font-medium line-clamp-1">{cert.issuer}</span>
                  <div className="flex items-center gap-1 text-amber-600 text-xs font-bold font-mono group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect</span>
                    <ExternalLink size={13} />
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedCert.badge}</span>
                  <div>
                    <h3 className="font-display text-base sm:text-xl font-bold text-gray-900 leading-snug">
                      {selectedCert.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-gray-600 flex items-center gap-2 mt-0.5">
                      <span className="font-semibold text-amber-700">{selectedCert.issuer}</span>
                      <span>•</span>
                      <span className="font-mono">{selectedCert.year}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-700 transition-all cursor-pointer"
                  aria-label="Close certificate preview"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Certificate Image Canvas */}
              <div className="p-4 sm:p-8 bg-neutral-900 flex items-center justify-center overflow-auto max-h-[65vh]">
                {selectedCert.image ? (
                  <img
                    src={selectedCert.image}
                    alt={`${selectedCert.title} certificate full`}
                    className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="text-white py-16">No preview available</div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600 text-xs sm:text-sm font-semibold">
                  <CheckCircle2 size={16} />
                  <span>Credential verified & authentic</span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-bold font-sans transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

