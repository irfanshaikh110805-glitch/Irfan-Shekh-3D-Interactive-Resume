import { useState, useEffect } from 'react'

/**
 * Custom hook to detect mobile devices and screen size
 * Returns true if viewport width is less than 768px (mobile/tablet)
 */
export function useMobileDetection(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Initial check just in case
    checkMobile()

    // Add event listener with debounce for better performance
    let timeoutId: NodeJS.Timeout
    const debouncedCheck = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 150)
    }

    window.addEventListener('resize', debouncedCheck)
    window.addEventListener('orientationchange', checkMobile)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', debouncedCheck)
      window.removeEventListener('orientationchange', checkMobile)
    }
  }, [breakpoint])

  return isMobile
}

/**
 * Hook to detect if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

/**
 * Hook to get device performance tier
 * Returns 'high', 'medium', or 'low' based on device capabilities
 */
export function useDevicePerformance(): 'high' | 'medium' | 'low' {
  const [performance, setPerformance] = useState<'high' | 'medium' | 'low'>('medium')

  useEffect(() => {
    // Extended Navigator interface for device-specific properties
    interface ExtendedNavigator extends Navigator {
      deviceMemory?: number
      connection?: {
        effectiveType?: '4g' | '3g' | '2g' | 'slow-2g'
      }
    }

    const nav = navigator as ExtendedNavigator

    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 2
    
    // Check device memory (if available)
    const memory = nav.deviceMemory || 4
    
    // Check connection type (if available)
    const effectiveType = nav.connection?.effectiveType || '4g'

    // Determine performance tier
    if (cores >= 8 && memory >= 8 && effectiveType === '4g') {
      setPerformance('high')
    } else if (cores >= 4 && memory >= 4) {
      setPerformance('medium')
    } else {
      setPerformance('low')
    }
  }, [])

  return performance
}
