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
    title: 'CaseSight AI — Indian AI Legal Operating System',
    description: 'A production-ready AI-powered legal intelligence platform built for Indian Law. CaseSight AI automates litigation management, chronologies, and document workflows, featuring an intelligent API gateway with failover support, hybrid semantic search, and an advanced mixed-mode OCR pipeline.',
    type: 'fullstack',
    technologies: ['Next.js 15', 'React 19', 'Supabase', 'pgvector', 'Google Gemini AI', 'Upstash Redis', 'Inngest', 'Resend'],
    image: '/casesightai-platform.webp',
    demoUrl: 'https://casesight-ai.onrender.com/',
    githubUrl: 'https://github.com/irfanshaikh110805-glitch/casesight-ai',
    highlights: [
      'Intelligent API Gateway',
      'Hybrid Legal Search',
      'Mixed-Mode OCR Pipeline',
      'Procedural Intelligence'
    ],
    color: '#dc2626'
  },
  {
    id: '2',
    title: 'AI Architecture Generator',
    description: 'Production-ready full-stack application that transforms plain English project ideas into comprehensive system architectures using Google Gemini AI, featuring JWT authentication, Redis caching, and real-time diagram generation.',
    type: 'fullstack',
    technologies: ['Python', 'FastAPI', 'React 19', 'Google Gemini AI', 'PostgreSQL', 'Redis', 'Docker'],
    image: '/AI Architecture Generator project immage.webp',
    demoUrl: 'https://ai-architecture.onrender.com/',
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
    id: '3',
    title: 'AI Healthcare Assistant Web App',
    description: 'Built a Flask-based AI healthcare assistant using NLP logic and REST APIs to provide automated medical guidance for common health queries.',
    type: 'web',
    technologies: ['Python', 'Flask', 'NLP', 'REST APIs'],
    image: '/medigu.webp',
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
    id: '6',
    title: 'Interactive Portfolio Website',
    description: 'A modern portfolio website featuring interactive animations, smooth transitions, and responsive design built with React and Framer Motion.',
    type: 'web',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    image: '/portfolio-website.webp',
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
    id: '7',
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
  },
  {
    id: '9',
    title: 'Padma Cinematic — Cinematography & Photography Portfolio',
    description: 'A modern, cinematic-style portfolio website designed for showcasing professional photography, videography, and cinematography services. Features event bookings, inquiry forms, and multi-channel client communication.',
    type: 'web',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Radix UI', 'Lucide React'],
    image: '/padamacinematic.webp',
    demoUrl: 'https://padmacinematic.vercel.app/',
    githubUrl: 'https://github.com/irfanshaikh110805-glitch/padma-cinematic',
    highlights: [
      'Cinematic Hero & Auto-Slideshow',
      'Photography & Video Galleries',
      'Event Bookings & Inquiry Options',
      'Multi-Channel Contact Integration'
    ],
    color: '#f59e0b'
  },
  {
    id: '8',
    title: 'CyberGuard AI Security Platform',
    description: 'Enterprise-grade cybersecurity platform combining machine learning threat detection with advanced reporting capabilities. Features real-time security analysis, automated vulnerability assessment, and comprehensive dashboard for security professionals.',
    type: 'fullstack',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Elasticsearch'],
    image: '/cyberguard-platform.webp',
    demoUrl: '#',
    githubUrl: 'https://github.com/irfanshaikh110805-glitch/phishing-detection-ml-tool',
    highlights: [
      'ML Threat Detection',
      'Real-time Analysis',
      'Advanced Reporting',
      'Security Dashboard'
    ],
    color: '#dc2626'
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
  { name: 'JavaScript', level: 88, color: '#eab308', category: 'Programming' },
  { name: 'TypeScript', level: 82, color: '#fbbf24', category: 'Programming' },
  { name: 'Java', level: 78, color: '#f97316', category: 'Programming' },
  { name: 'React.js', level: 88, color: '#fbbf24', category: 'Frontend' },
  { name: 'HTML5 & CSS3', level: 92, color: '#f97316', category: 'Frontend' },
  { name: 'Tailwind CSS', level: 85, color: '#f59e0b', category: 'Frontend' },
  { name: 'Framer Motion', level: 80, color: '#eab308', category: 'Frontend' },
  { name: 'Node.js', level: 82, color: '#d97706', category: 'Backend' },
  { name: 'Flask', level: 85, color: '#eab308', category: 'Backend' },
  { name: 'Express.js', level: 78, color: '#f59e0b', category: 'Backend' },
  { name: 'REST APIs', level: 88, color: '#fbbf24', category: 'Backend' },
  { name: 'MongoDB', level: 80, color: '#f59e0b', category: 'Databases' },
  { name: 'MySQL', level: 82, color: '#f59e0b', category: 'Databases' },
  { name: 'Supabase', level: 78, color: '#d97706', category: 'Databases' },
  { name: 'NoSQL', level: 75, color: '#eab308', category: 'Databases' },
  { name: 'TensorFlow', level: 78, color: '#f97316', category: 'AI/ML' },
  { name: 'MobileNetV2', level: 75, color: '#fbbf24', category: 'AI/ML' },
  { name: 'Keras', level: 72, color: '#f59e0b', category: 'AI/ML' },
  { name: 'NLP', level: 70, color: '#eab308', category: 'AI/ML' },
  { name: 'Computer Vision', level: 72, color: '#f97316', category: 'AI/ML' },
  { name: 'Git & GitHub', level: 88, color: '#f97316', category: 'Tools' },
  { name: 'Docker', level: 70, color: '#d97706', category: 'Tools' },
  { name: 'Vite', level: 82, color: '#fbbf24', category: 'Tools' },
  { name: 'Postman', level: 80, color: '#f97316', category: 'Tools' },
  { name: 'JWT Auth', level: 82, color: '#eab308', category: 'Tools' }
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
    title: 'Started BCA — Smt Kumudben Debar College',
    description: 'Began Bachelor of Computer Applications at RCUB, Vijayapura. Focused on core CS: Data Structures, DBMS, Web Technologies, Software Engineering, OOP, and AI fundamentals.',
    color: 'milestone-amber',
    align: 'left'
  },
  {
    year: 'Jan–May 2024',
    title: 'Full-Stack Intern — Smt Kumudben Darbar College',
    description: 'Academic internship building responsive web modules with HTML5, CSS3, JavaScript & Flask. Implemented MySQL DB integration, designed RESTful API endpoints, and reduced load time by 30% through code refactoring.',
    color: 'milestone-amber',
    align: 'right'
  },
  {
    year: 'Jan–Feb 2026',
    title: 'Java Full Stack Intern — MTD, Mysuru',
    description: 'Completed a full-stack development internship building applications with ReactJS, Spring Boot, and MongoDB under expert mentorship from MTD.',
    color: 'milestone-green',
    align: 'left'
  },
  {
    year: 'Jun–Jul 2026',
    title: 'Machine Learning Intern — SkillCraft Technology',
    description: 'Developed ML models for classification tasks and participated in data preprocessing, feature engineering, and model evaluation workflows.',
    color: 'milestone-blue',
    align: 'right'
  },
  {
    year: '2026',
    title: 'Graduating & Industry-Ready',
    description: 'Completing BCA with 9+ deployed projects, 3 internships, and expertise in AI/ML, full-stack development, and scalable cloud deployments.',
    color: 'milestone-purple',
    align: 'left'
  }
]
