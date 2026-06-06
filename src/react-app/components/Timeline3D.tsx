import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, Code, Database, Rocket } from 'lucide-react'
import { milestones } from '@/shared/data'

const milestoneIcons = [GraduationCap, Code, Database, Rocket]

export default function Timeline3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // We map the scroll progress to the height of the vertical line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-12 px-4 md:px-0 mt-8" style={{ position: 'relative' }}>
      {/* 3D Perspective Container */}
      <h3 className="heading-sm text-center mb-12 text-gray-900">Education & Career Journey</h3>

      <div className="relative" style={{ perspective: '1000px', position: 'relative' }}>
        
        {/* Background Vertical Line */}
        <div className="absolute left-[40px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2 rounded-full overflow-hidden">
          {/* Animated fill line */}
          <motion.div 
            className="w-full bg-gradient-to-b from-amber-400 via-amber-500 to-yellow-600"
            style={{ height: lineHeight, originY: 0 }}
          />
        </div>

        {/* Timeline Items */}
        <div className="relative z-10 space-y-12 md:space-y-24">
          {milestones.map((item, index) => {
            const Icon = milestoneIcons[index] || Rocket
            const isLeft = item.align === 'left'

            return (
              <TimelineItem 
                key={index}
                item={item}
                Icon={Icon}
                isLeft={isLeft}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TimelineItem({ item, Icon, isLeft }: { 
  item: { year: string, title: string, description: string, color: string, align: string }, 
  Icon: React.ComponentType<{ size?: number }>, 
  isLeft: boolean 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Track scroll for each individual card to animate them slightly differently based on scroll
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "0.5 0.5"] // Trigger from bottom of viewport to middle
  })

  // 3D rotation based on scroll position - elements swing in
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [isLeft ? -30 : 30, 0] // Start rotated and swing to 0 flat
  )
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])

  return (
    <div className={`relative flex items-center w-full justify-start md:justify-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
      
      {/* Desktop empty spacer to push content */}
      <div className={`hidden md:block w-1/2 ${isLeft ? 'order-2' : 'order-1'}`} />

      {/* The Center Node / Icon */}
      <motion.div 
        ref={cardRef}
        style={{ scale, opacity }}
        className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 bg-white border-4 border-white shadow-xl shadow-amber-500/20 w-12 h-12 rounded-full flex items-center justify-center z-20"
      >
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}>
          <Icon size={20} />
        </div>
      </motion.div>

      {/* The Content Card with 3D Flip */}
      <motion.div 
        style={{ 
          rotateY, 
          opacity, 
          scale, 
          y,
          perspective: 1000 
        }}
        className={`w-full md:w-[45%] pl-[70px] md:pl-0 ${isLeft ? 'md:pr-10 order-1' : 'md:pl-10 order-2'} z-10 relative`}
      >
        {/* Connector arrow pointing to node */}
        <div className={`hidden md:block absolute top-1/2 -mt-2 w-0 h-0 border-y-8 border-y-transparent ${isLeft ? 'right-8 border-l-8 border-l-white' : 'left-8 border-r-8 border-r-white'} z-30`} />
        
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-200/50 hover:shadow-amber-500/10 border border-gray-100 transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 bg-gradient-to-r ${item.color} text-white text-sm font-bold rounded-full`}>
              {item.year}
            </span>
            <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
          </div>
          <p className="text-gray-600 leading-relaxed font-light">{item.description}</p>
        </div>
      </motion.div>

    </div>
  )
}
