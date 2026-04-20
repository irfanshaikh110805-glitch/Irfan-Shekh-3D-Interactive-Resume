export interface Project {
  id: string
  title: string
  description: string
  type: 'web' | 'mobile' | 'fullstack'
  technologies: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
  highlights: string[]
  color: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI Architecture Generator',
    description: 'Production-ready full-stack application that transforms plain English project ideas into comprehensive system architectures using Google Gemini AI, featuring JWT authentication, Redis caching, and real-time diagram generation.',
    type: 'fullstack',
    technologies: ['Python', 'FastAPI', 'React 19', 'Google Gemini AI', 'PostgreSQL', 'Redis', 'Docker'],
    image: '/AI Architecture Generator project immage.png',
    demoUrl: '#',
    githubUrl: 'https://github.com/irfanshaikh110805-glitch/AI-Architecture-Generator',
    highlights: [
      'AI-Powered Architecture Generation',
      'Real-time ER Diagrams',
      '30% API Cost Reduction',
      '75%+ Test Coverage'
    ],
    color: '#f59e0b'
  },
  {
    id: '2',
    title: 'Hotel Everest Family Restaurant',
    description: 'A full-featured restaurant booking and food ordering platform with authentic Indian cuisine menu, table reservations, shopping cart, and user authentication.',
    type: 'fullstack',
    technologies: ['React', 'Supabase', 'Authentication', 'Responsive Design'],
    image: '/restaurant-hero.webp',
    demoUrl: 'https://hoteleverestfamilyrestaurant.netlify.app/',
    githubUrl: 'https://github.com/irfanshaikh110805-glitch/restaurant-management-system-with-online-ordering-table-booking',
    highlights: [
      'Table Booking System',
      'Menu Management',
      'User Authentication',
      'Mobile Responsive'
    ],
    color: '#f97316'
  },
  {
    id: '3',
    title: 'AI Healthcare Assistant Web App',
    description: 'Built a Flask-based AI healthcare assistant using NLP logic and REST APIs to provide automated medical guidance for common health queries.',
    type: 'web',
    technologies: ['Python', 'Flask', 'NLP', 'REST APIs'],
    image: '/mediguardianaipicture.webp',
    demoUrl: 'https://mediguardian-frontend.onrender.com',
    githubUrl: 'https://github.com/irfanshaikh110805-glitch/mediguardian-ai',
    highlights: [
      'NLP Integration',
      'Medical Guidance',
      'REST API',
      'Flask Backend'
    ],
    color: '#f59e0b'
  },
  {
    id: '4',
    title: 'Fruit & Vegetable Disease Detection System',
    description: 'Created an AI-based image classification system using TensorFlow MobileNetV2 and a Flask API for real-time fruit and vegetable disease detection.',
    type: 'web',
    technologies: ['Python', 'TensorFlow', 'MobileNetV2', 'Flask'],
    image: '/detect-fruit-vegetable.webp',
    demoUrl: 'https://fruit-veg-disease-detection-1.onrender.com',
    githubUrl: 'https://github.com/irfanshaikh110805-glitch/fruit-veg-disease-detection',
    highlights: [
      'AI Classification',
      'Image Recognition',
      'Real-time Detection',
      'Mobile Optimized'
    ],
    color: '#eab308'
  },
  {
    id: '5',
    title: 'Interactive Portfolio Website',
    description: 'A modern portfolio website featuring interactive animations, smooth transitions, and responsive design built with React and Framer Motion.',
    type: 'web',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    image: '/portfolio-website.png',
    demoUrl: 'https://irfanshaikhportfolio.netlify.app/',
    githubUrl: 'https://github.com/irfanshaikh110805-glitch/Irfan-Shekh-3D-Interactive-Resume',
    highlights: [
      'Interactive Animations',
      'Responsive Design',
      'Modern UI',
      'Performance Optimized'
    ],
    color: '#f59e0b'
  },
  {
    id: '6',
    title: 'HeavyDuty Parts — Industrial E-Commerce',
    description: 'Full-stack industrial hardware e-commerce platform (AdiSync Solutions) for selling heavy machinery parts in India. Features WhatsApp checkout, a rotating hero banner, product catalog with categories, search & filtering, and INR currency support.',
    type: 'fullstack',
    technologies: ['React 19', 'TypeScript', 'Hono', 'Cloudflare Workers', 'Tailwind CSS', 'Netlify'],
    image: '/heavydutyparts-shop.webp',
    demoUrl: 'https://heavydutyparts-shop.netlify.app',
    githubUrl: 'https://github.com/irfanshaikh110805-glitch/heavydutyparts-or-heavyduty-parts',
    highlights: [
      'WhatsApp Checkout',
      'Product Catalog & Search',
      'Cloudflare Workers API',
      'Responsive Design'
    ],
    color: '#d97706'
  }
]

export interface Skill {
  name: string
  level: number
  color: string
  category: string
}

export const skills: Skill[] = [
  { name: 'Python', level: 90, color: '#f59e0b', category: 'Programming' },
  { name: 'JavaScript', level: 85, color: '#eab308', category: 'Programming' },
  { name: 'Java', level: 80, color: '#f97316', category: 'Programming' },
  { name: 'React', level: 88, color: '#fbbf24', category: 'Frontend' },
  { name: 'HTML', level: 92, color: '#f97316', category: 'Frontend' },
  { name: 'CSS', level: 90, color: '#f59e0b', category: 'Frontend' },
  { name: 'Node.js', level: 82, color: '#d97706', category: 'Backend' },
  { name: 'Flask', level: 85, color: '#eab308', category: 'Backend' },
  { name: 'MongoDB', level: 80, color: '#f59e0b', category: 'Databases' },
  { name: 'MySQL', level: 82, color: '#f59e0b', category: 'Databases' },
  { name: 'TensorFlow', level: 75, color: '#f97316', category: 'AI/ML' },
  { name: 'MobileNetV2', level: 75, color: '#fbbf24', category: 'AI/ML' },
  { name: 'Git', level: 85, color: '#f97316', category: 'Tools' },
  { name: 'Postman', level: 80, color: '#f97316', category: 'Tools' },
  { name: 'Supabase', level: 78, color: '#d97706', category: 'Tools' },
  { name: 'JWT Auth', level: 80, color: '#eab308', category: 'Tools' }
]

export interface Milestone {
  year: string
  title: string
  description: string
  color: string
  align: 'left' | 'right'
}

export const milestones: Milestone[] = [
  {
    year: '2023',
    title: 'Started BCA Journey',
    description: 'Began studying Computer Applications at Smt Kumudben Debar College, focusing on core programming concepts.',
    color: 'from-amber-500 to-yellow-500',
    align: 'left'
  },
  {
    year: '2024',
    title: 'Full-Stack Development',
    description: 'Built complex full-stack applications like Hotel Everest booking system, mastering React and Python Flask.',
    color: 'from-amber-500 to-yellow-500',
    align: 'right'
  },
  {
    year: '2025',
    title: 'AI & Data Science',
    description: 'Dove deep into Machine Learning. Developed a Fruit Disease Detection system using TensorFlow and MobileNetV2.',
    color: 'from-emerald-500 to-green-500',
    align: 'left'
  },
  {
    year: '2026',
    title: 'Ready for the Industry',
    description: 'Graduating as a Software Engineer, bringing ideas to life with scalable backend systems and immersive UIs.',
    color: 'from-purple-500 to-pink-500',
    align: 'right'
  }
]
