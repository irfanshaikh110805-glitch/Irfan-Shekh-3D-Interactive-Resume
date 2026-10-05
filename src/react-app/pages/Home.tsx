import { useState, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { BackToTop } from '@/react-app/components/MobileOptimizations'
import HeroPortfolio from '@/react-app/components/HeroPortfolio'

const AboutSection = lazy(() => import('@/react-app/components/AboutSection'))
const SkillsVisualization = lazy(() => import('@/react-app/components/SkillsVisualization'))
const CertificationsSection = lazy(() => import('@/react-app/components/CertificationsSection'))
const ProjectShowcase = lazy(() => import('@/react-app/components/ProjectShowcase'))
const ServicesSection = lazy(() => import('@/react-app/components/ServicesSection'))
const ContactSection = lazy(() => import('@/react-app/components/ContactSection'))

import Navigation from '@/react-app/components/Navigation'
import { User, Code, Briefcase, Wrench, Mail, Award } from 'lucide-react'
import { useMobileDetection } from '@/react-app/hooks/useMobileDetection'

// Lazy load non-critical decorative/interactive components
const MouseFollower = lazy(() => import('@/react-app/components/MouseFollower'))
const ScrollProgress = lazy(() => import('@/react-app/components/ScrollProgress'))
const InteractiveBackground = lazy(() => import('@/react-app/components/InteractiveBackground'))
const ResumeChatbot = lazy(() => import('@/react-app/components/ResumeChatbot'))
const RainEffect = lazy(() => import('@/react-app/components/RainEffect'))

// Helper for lazy loading sections - renders immediately but defers heavy components
function LazySection({ children, id, className }: { children: React.ReactNode, id: string, className?: string }) {
  const [hasRendered, setHasRendered] = useState(false)
  
  useEffect(() => {
    // Render immediately if section is already in or near viewport using IntersectionObserver
    const el = document.getElementById(id)
    if (!el) {
      setHasRendered(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRendered(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [id])

  return (
    <section className={`relative ${className || ''}`} id={id}>
      <Suspense fallback={
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-500 text-sm font-medium">Loading...</span>
          </div>
        </div>
      }>
        {hasRendered ? children : (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-500 text-sm font-medium">Loading section...</span>
            </div>
          </div>
        )}
      </Suspense>
    </section>
  )
}

// Helper to delay mounting of non-critical decorative components until main thread is idle
function DelayedMount({ children, delay = 1000 }: { children: React.ReactNode, delay?: number }) {
  const [shouldMount, setShouldMount] = useState(false);
  useEffect(() => {
    // Wait for the browser to become idle, or fallback to a timeout
    const timeout = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, options?: { timeout: number }) => void }).requestIdleCallback(() => setShouldMount(true), { timeout: 2000 });
      } else {
        setShouldMount(true);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);
  return shouldMount ? children : null;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('about')
  const isMobile = useMobileDetection()

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const navOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - navOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Accurate, high-performance scroll spy for active section tracking
  useEffect(() => {
    const sections = ['about', 'work', 'skills', 'certifications', 'services', 'contact']
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY
          const viewportHeight = window.innerHeight
          const docHeight = document.documentElement.scrollHeight

          // If scrolled to bottom of page (or within 80px), activate last section (contact)
          if (scrollPosition + viewportHeight >= docHeight - 80) {
            setActiveSection('contact')
            ticking = false
            return
          }

          // If scrolled to top (within Hero area), keep 'about' active
          if (scrollPosition < 300) {
            setActiveSection('about')
            ticking = false
            return
          }

          // Probe point at 35% of viewport height (natural reading line)
          const probeY = scrollPosition + viewportHeight * 0.35

          let matched = 'about'
          for (const id of sections) {
            const el = document.getElementById(id)
            if (el) {
              const top = el.offsetTop
              const height = el.offsetHeight
              if (probeY >= top && probeY < top + height) {
                matched = id
                break
              } else if (probeY >= top) {
                matched = id
              }
            }
          }

          setActiveSection(matched)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden relative">
      {/* Enhanced UI Components */}
      {!isMobile && (
        <>
          <DelayedMount delay={1500}>
            <Suspense fallback={null}>
              <MouseFollower />
            </Suspense>
          </DelayedMount>
          <DelayedMount delay={1500}>
            <Suspense fallback={null}>
              <div className="relative">
                <ScrollProgress />
              </div>
            </Suspense>
          </DelayedMount>
          <DelayedMount delay={2000}>
            <Suspense fallback={null}>
              <div className="relative">
                <InteractiveBackground />
              </div>
            </Suspense>
          </DelayedMount>
        </>
      )}

      {/* Rain Effect - Delayed until main thread is idle after hero paints */}
      <DelayedMount delay={600}>
        <Suspense fallback={null}>
          <div className="relative">
            <RainEffect />
          </div>
        </Suspense>
      </DelayedMount>

      {/* Navigation */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero Section */}
      <HeroPortfolio />

      {/* About Section */}
      <LazySection className="py-12 md:py-24 px-4 sm:px-6 bg-gray-50 relative" id="about">
        <div className="max-w-7xl mx-auto">
          <AboutSection />
        </div>
      </LazySection>

      {/* Featured Work Section */}
      <LazySection className="py-12 md:py-24 px-4 sm:px-6 bg-white relative" id="work">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-200/50 mb-3 uppercase tracking-wider font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Production Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 md:mb-6 text-gray-900">
              Featured <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A curated selection of production-grade systems showcasing my expertise in web engineering, AI architectures, and interactive 3D experiences.
            </p>
          </motion.div>
          <ProjectShowcase />
        </div>
      </LazySection>

      {/* Skills Section */}
      <LazySection className="py-12 md:py-24 px-4 sm:px-6 bg-gray-50 relative" id="skills">
        <div className="max-w-7xl mx-auto">
          <SkillsVisualization />
        </div>
      </LazySection>

      {/* Certifications Section */}
      <LazySection className="py-12 md:py-24 px-4 sm:px-6 bg-white relative" id="certifications">
        <div className="max-w-7xl mx-auto">
          <CertificationsSection />
        </div>
      </LazySection>

      {/* Services Section */}
      <LazySection className="py-12 md:py-24 px-4 sm:px-6 bg-gray-50 relative" id="services">
        <div className="max-w-7xl mx-auto">
          <ServicesSection />
        </div>
      </LazySection>

      {/* Contact Section */}
      <LazySection className="py-12 md:py-24 px-4 sm:px-6 bg-white relative" id="contact">
        <div className="max-w-5xl mx-auto">
          <ContactSection />
        </div>
      </LazySection>

      {/* Quick Navigation 3D Floating Dock */}
      <div className="fixed right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2.5 p-2 bg-white/95 backdrop-blur-md rounded-full border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
        {[
          { id: 'about', icon: User, label: 'About' },
          { id: 'work', icon: Briefcase, label: 'Work' },
          { id: 'skills', icon: Code, label: 'Skills' },
          { id: 'certifications', icon: Award, label: 'Certifications' },
          { id: 'services', icon: Wrench, label: 'Services' },
          { id: 'contact', icon: Mail, label: 'Contact' }
        ].map((item) => {
          const isActive = activeSection === item.id
          return (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`p-3 rounded-full transition-all duration-300 group relative flex items-center justify-center ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/35 ring-2 ring-amber-400/50'
                  : 'bg-white border border-gray-100 text-gray-500 hover:text-amber-600 hover:bg-amber-50/60 shadow-sm'
              }`}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Jump to ${item.label}`}
            >
              <item.icon size={18} />
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-xl pointer-events-none z-50 before:absolute before:left-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-l-gray-900">
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent mb-4">
                Irfan Shekh
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Full-Stack Developer & AI/ML Engineer. Building digital experiences
                that solve real-world problems with cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:irfanshaikh110805@gmail.com" className="text-gray-500 hover:text-amber-600 transition-colors text-sm font-semibold">
                  Email
                </a>
                <a 
                  href="https://www.linkedin.com/in/irfan-shekh-380461392?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-amber-600 transition-colors text-sm font-semibold"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/irfanshaikh110805-glitch" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-amber-600 transition-colors text-sm font-semibold"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="hidden md:block">
              <h4 className="text-base font-bold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#services" className="hover:text-amber-600 transition-colors">Web Development</a></li>
                <li><a href="#services" className="hover:text-amber-600 transition-colors">UI/UX Design</a></li>
                <li><a href="#services" className="hover:text-amber-600 transition-colors">3D Experiences</a></li>
                <li><a href="#services" className="hover:text-amber-600 transition-colors">AI / ML Integration</a></li>
              </ul>
            </div>

            <div className="hidden md:block">
              <h4 className="text-base font-bold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#about" className="hover:text-amber-600 transition-colors">About</a></li>
                <li><a href="#work" className="hover:text-amber-600 transition-colors">Portfolio</a></li>
                <li><a href="#skills" className="hover:text-amber-600 transition-colors">Skills</a></li>
                <li><a href="#contact" className="hover:text-amber-600 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-8 text-center text-xs text-gray-500">
            <p>© 2026 Irfan Shekh. All rights reserved. Crafted with passion and code.</p>
          </div>
        </div>
      </footer>

      {/* FAQ Chatbot */}
      <DelayedMount delay={2500}>
        <Suspense fallback={null}>
          <div className="relative">
            <ResumeChatbot />
          </div>
        </Suspense>
      </DelayedMount>

      {/* Mobile optimizations */}
      <BackToTop />
    </main>
  )
}
