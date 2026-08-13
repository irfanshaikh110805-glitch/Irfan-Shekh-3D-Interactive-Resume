import { motion, MotionProps } from 'framer-motion'
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

interface NavigatorWithBattery extends Navigator {
  getBattery: () => Promise<BatteryManager>
}

interface BatteryManager {
  charging: boolean
  level: number
}

interface TransitionWithDuration {
  duration?: number
}

interface PerformanceAwareMotionProps extends MotionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

// Hook to detect device performance
function usePerformanceTier() {
  const [tier, setTier] = useState<'low' | 'mid' | 'high'>('high')

  useEffect(() => {
    // Check device capabilities
    const deviceMemory = (navigator as NavigatorWithMemory).deviceMemory || 4
    const hardwareConcurrency = navigator.hardwareConcurrency || 4
    const connection = (navigator as NavigatorWithConnection).connection

    let score = 0

    // Memory check
    if (deviceMemory >= 8) score += 3
    else if (deviceMemory >= 4) score += 2
    else score += 1

    // CPU check
    if (hardwareConcurrency >= 8) score += 3
    else if (hardwareConcurrency >= 4) score += 2
    else score += 1

    // Connection check
    if (connection) {
      if (connection.effectiveType === '4g') score += 2
      else if (connection.effectiveType === '3g') score += 1
    } else {
      score += 2 // Assume good connection if not available
    }

    // Battery check
    if ('getBattery' in navigator) {
      (navigator as NavigatorWithBattery).getBattery().then((battery: BatteryManager) => {
        if (battery.charging || battery.level > 0.2) {
          setTier(score >= 7 ? 'high' : score >= 5 ? 'mid' : 'low')
        } else {
          setTier('low') // Force low performance if battery is low
        }
      })
    } else {
      setTier(score >= 7 ? 'high' : score >= 5 ? 'mid' : 'low')
    }
  }, [])

  return tier
}

export default function PerformanceAwareMotion({ 
  children, 
  fallback,
  animate,
  initial,
  whileHover,
  whileTap,
  transition,
  ...props 
}: PerformanceAwareMotionProps) {
  const performanceTier = usePerformanceTier()

  // Disable heavy animations on low-end devices
  if (performanceTier === 'low') {
    return fallback ? <>{fallback}</> : <div>{children}</div>
  }

  // Reduce animation complexity on mid-tier devices
  const getOptimizedTransition = () => {
    if (performanceTier !== 'mid' || !transition) {
      return transition || { duration: 0.3 }
    }
    
    const typedTransition = transition as TransitionWithDuration
    return {
      ...transition,
      duration: typedTransition.duration ? typedTransition.duration * 0.7 : 0.3
    }
  }
  
  const optimizedTransition = getOptimizedTransition()

  return (
    <motion.div
      {...props}
      animate={animate}
      initial={initial}
      whileHover={performanceTier === 'high' ? whileHover : undefined}
      whileTap={performanceTier === 'high' ? whileTap : undefined}
      transition={optimizedTransition}
    >
      {children}
    </motion.div>
  )
}