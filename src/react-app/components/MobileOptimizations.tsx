import { useEffect, useState } from 'react'
import { ArrowUp, Zap } from 'lucide-react'

// Performance optimization component for mobile
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  [key: string]: unknown; // For additional HTML attributes
}

export function LazyImage({ src, alt, className, ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const imgElement = document.querySelector(`img[alt="${alt}"]`)
    if (imgElement) {
      observer.observe(imgElement)
    }

    return () => observer.disconnect()
  }, [alt])

  return (
    <div className={`relative overflow-hidden ${className || ''}`} {...props}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center transition-opacity duration-300">
          <div className="animate-spin">
            <Zap className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  )
}

// Back to top button for mobile - 0-dependency, pure CSS transitions
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-4 z-40 p-2.5 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 active:scale-90 transition-all duration-300 md:hidden ${
        isVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  )
}
