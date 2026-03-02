import { useState } from 'react'
import { motion } from 'framer-motion'

// Helper function to get CSS class name for skill colors
const getSkillColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#f97316': 'skill-orange',
    '#3b82f6': 'skill-blue',
    '#eab308': 'skill-yellow',
    '#06b6d4': 'skill-cyan',
    '#8b5cf6': 'skill-purple',
    '#059669': 'skill-green',
    '#dc2626': 'skill-red',
    '#ec4899': 'skill-pink'
  }
  return colorMap[color] || 'skill-blue'
}

interface Skill {
  name: string
  level: number
  color: string
  category: string
}

const skills: Skill[] = [
  { name: 'Python', level: 90, color: '#3b82f6', category: 'Programming' },
  { name: 'JavaScript', level: 85, color: '#eab308', category: 'Programming' },
  { name: 'Java', level: 80, color: '#f97316', category: 'Programming' },
  { name: 'React', level: 88, color: '#06b6d4', category: 'Frontend' },
  { name: 'HTML', level: 92, color: '#f97316', category: 'Frontend' },
  { name: 'CSS', level: 90, color: '#3b82f6', category: 'Frontend' },
  { name: 'Node.js', level: 82, color: '#059669', category: 'Backend' },
  { name: 'Flask', level: 85, color: '#8b5cf6', category: 'Backend' },
  { name: 'MongoDB', level: 80, color: '#059669', category: 'Databases' },
  { name: 'MySQL', level: 82, color: '#3b82f6', category: 'Databases' },
  { name: 'TensorFlow', level: 75, color: '#f97316', category: 'AI/ML' },
  { name: 'MobileNetV2', level: 75, color: '#8b5cf6', category: 'AI/ML' },
  { name: 'Git', level: 85, color: '#dc2626', category: 'Tools' },
  { name: 'Postman', level: 80, color: '#f97316', category: 'Tools' },
  { name: 'Supabase', level: 78, color: '#059669', category: 'Tools' },
  { name: 'JWT Auth', level: 80, color: '#ec4899', category: 'Tools' }
]

// SkillBar3D component temporarily disabled to prevent WebGL context conflicts
// function SkillBar3D({ skill, index }: { skill: Skill; index: number }) {
//   const meshRef = useRef<THREE.Mesh>(null)
//   const [hovered, setHovered] = useState(false)
//
//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1
//     }
//   })
//
//   const height = (skill.level / 100) * 3
//   const position: [number, number, number] = [
//     (index % 4 - 1.5) * 2,
//     height / 2 - 1.5,
//     Math.floor(index / 4) * 2 - 1
//   ]
//
//   return (
//     <Float speed={1 + index * 0.1} rotationIntensity={0.3} floatIntensity={0.5}>
//       <group position={position}>
//         <RoundedBox
//           ref={meshRef}
//           args={[0.6, height, 0.6]}
//           radius={0.05}
//           smoothness={4}
//           onPointerEnter={() => setHovered(true)}
//           onPointerLeave={() => setHovered(false)}
//         >
//           <meshStandardMaterial
//             color={skill.color}
//             transparent
//             opacity={hovered ? 0.9 : 0.7}
//             emissive={skill.color}
//             emissiveIntensity={hovered ? 0.3 : 0.1}
//             roughness={0.2}
//             metalness={0.8}
//           />
//         </RoundedBox>
//
//         <Text
//           position={[0, height / 2 + 0.5, 0]}
//           fontSize={0.2}
//           color="#ffffff"
//           anchorX="center"
//           anchorY="middle"
//           font="Inter"
//         >
//           {skill.name}
//         </Text>
//
//         <Text
//           position={[0, height / 2 + 0.2, 0]}
//           fontSize={0.15}
//           color={skill.color}
//           anchorX="center"
//           anchorY="middle"
//           font="Inter"
//         >
//           {skill.level}%
//         </Text>
//       </group>
//     </Float>
//   )
// }

// Temporarily disabled to prevent WebGL context conflicts
// function Skills3DScene() {
//   return (
//     <>
//       <OrbitControls enableZoom={false} enablePan={false} />
//       <ambientLight intensity={0.4} />
//       <pointLight position={[5, 5, 5]} intensity={1} color="#60a5fa" />
//       <pointLight position={[-5, -5, 5]} intensity={0.8} color="#8b5cf6" />

//       {skills.map((skill, index) => (
//         <SkillBar3D key={skill.name} skill={skill} index={index} />
//       ))}

//       {/* Base platform */}
//       <RoundedBox
//         args={[10, 0.2, 6]}
//         position={[0, -2.5, 0]}
//         radius={0.1}
//         smoothness={4}
//       >
//         <meshStandardMaterial
//           color="#1e293b"
//           transparent
//           opacity={0.3}
//           roughness={0.8}
//           metalness={0.2}
//         />
//       </RoundedBox>
//     </>
//   )
// }

export default function SkillsVisualization() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', 'Programming', 'Frontend', 'Backend', 'Databases', 'AI/ML', 'Tools']

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Technical Skills
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Interactive 3D visualization of my technical expertise
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Premium 2D Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skills
          .filter(skill => selectedCategory === 'All' || skill.category === selectedCategory)
          .map((skill, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={skill.name}
              className="group relative bg-gray-900/40 rounded-xl p-6 border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm overflow-hidden"
              whileHover={{ y: -5, boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)' }}
            >
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${getSkillColorClass(skill.color).replace('skill-', 'from-')}-500 to-transparent`} />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800/80 border border-gray-700/50 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className={`w-3 h-3 rounded-full ${getSkillColorClass(skill.color)} shadow-[0_0_10px_currentColor]`} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-200 transition-colors">{skill.name}</h3>
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-mono">{skill.category}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xl font-bold text-gray-400 group-hover:text-white transition-colors">{skill.level}%</span>
                </div>

                {/* Progress Bar */}
                <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden p-[2px] border border-gray-700/30">
                  <motion.div
                    className={`h-full rounded-full ${getSkillColorClass(skill.color)} shadow-[0_0_15px_currentColor]`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  )
}
