import { useEffect, useState } from 'react'

// Extended Navigator interfaces for device capability detection
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number
}

interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType?: string
    downlink?: number
  }
}

interface PerformanceSettings {
  reduceMotion: boolean
  enableGPUAcceleration: boolean
  lowEndDevice: boolean
  shouldPreloadImages: boolean
}

export function usePerformanceOptimization(): PerformanceSettings {
  const [settings, setSettings] = useState<PerformanceSettings>({
    reduceMotion: false,
    enableGPUAcceleration: true,
    lowEndDevice: false,
    shouldPreloadImages: true,
  })

  useEffect(() => {
    // Check user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Check device capabilities
    const deviceMemory = (navigator as NavigatorWithMemory).deviceMemory || 4
    const hardwareConcurrency = navigator.hardwareConcurrency || 4
    const connection = (navigator as NavigatorWithConnection).connection

    // Determine if this is a low-end device
    const isLowEnd = Boolean(
      deviceMemory < 4 ||
      hardwareConcurrency < 4 ||
      (connection && connection.effectiveType && !['4g', '3g'].includes(connection.effectiveType))
    )

    // Check for slow connection
    const hasSlowConnection = Boolean(connection && (
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      (connection.downlink && connection.downlink < 1)
    ))

    setSettings({
      reduceMotion: Boolean(prefersReducedMotion || isLowEnd),
      enableGPUAcceleration: !isLowEnd,
      lowEndDevice: Boolean(isLowEnd),
      shouldPreloadImages: !hasSlowConnection && !isLowEnd,
    })

    // Listen for changes in user preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => {
      setSettings(prev => ({
        ...prev,
        reduceMotion: Boolean(mediaQuery.matches || isLowEnd)
      }))
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return settings
}

export function useOptimizedAnimationProps() {
  const { reduceMotion, enableGPUAcceleration } = usePerformanceOptimization()

  return {
    animate: reduceMotion ? undefined : 'animate',
    initial: reduceMotion ? false : 'initial',
    transition: {
      duration: reduceMotion ? 0 : 0.3,
      ease: 'easeOut',
    },
    style: {
      transform: enableGPUAcceleration ? 'translateZ(0)' : undefined,
      willChange: enableGPUAcceleration ? 'transform, opacity' : undefined,
    }
  }
}