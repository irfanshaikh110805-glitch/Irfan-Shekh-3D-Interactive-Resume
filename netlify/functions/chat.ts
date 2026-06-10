import { Handler } from '@netlify/functions'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Rule-based chatbot fallback responses
const getBotResponseFallback = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  // Skills related
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
    return "Irfan is proficient in:\n\n🔹 Frontend: React, JavaScript, TypeScript, HTML, CSS, Tailwind\n🔹 Backend: Node.js, Express, Flask, Python\n🔹 Databases: MongoDB, MySQL, Supabase\n🔹 AI/ML: TensorFlow, MobileNetV2, Gemini AI\n🔹 Tools: Git, Postman, JWT Authentication\n\nHe's always learning new technologies to stay current!"
  }
  
  // Projects related
  if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
    return "Here are Irfan's key projects:\n\n1️⃣ AI Architecture Generator - Transforms ideas into system architectures using Gemini AI\n2️⃣ Hotel Everest - Restaurant booking system with React & Supabase\n3️⃣ MediGuardian AI - Healthcare assistant built with Flask\n4️⃣ Fruit & Vegetable Disease Detection - AI-powered image classification\n5️⃣ HeavyDuty Parts - Industrial e-commerce platform\n\nEach project showcases different aspects of his full-stack and AI capabilities!"
  }
  
  // Contact related
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
    return "📧 Email: irfanshaikh110805@gmail.com\n📱 Phone: +91 9964264412\n💼 LinkedIn: Available on request\n🐙 GitHub: Check out the portfolio for links\n\nFeel free to reach out for collaborations or opportunities!"
  }
  
  // Education related
  if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('college') || lowerMessage.includes('study')) {
    return "🎓 Irfan is currently pursuing a Bachelor of Computer Applications (BCA) at Smt Kumudben Debar College in Vijayapura, Karnataka. He's passionate about combining academic knowledge with practical development experience!"
  }
  
  // Availability/Freelance
  if (lowerMessage.includes('available') || lowerMessage.includes('freelance') || lowerMessage.includes('hire') || lowerMessage.includes('job')) {
    return "✅ Yes! Irfan is available for:\n\n• Freelance projects\n• Full-time opportunities\n• Contract work\n• Consulting\n\nHe's particularly interested in web development, AI integration, and full-stack projects. Let's discuss your requirements!"
  }
  
  // Experience related
  if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
    return "Irfan has hands-on experience in:\n\n✨ Building full-stack web applications\n✨ Integrating AI/ML models into production apps\n✨ Database design and optimization\n✨ RESTful API development\n✨ Responsive UI/UX implementation\n\nHis diverse project portfolio demonstrates real-world problem-solving skills!"
  }
  
  // About/Who
  if (lowerMessage.includes('who') || lowerMessage.includes('about') || lowerMessage.includes('introduce')) {
    return "👋 Hi! I'm Irfan's AI assistant. Irfan Shaikh is a passionate Web Developer and AI Enthusiast currently pursuing BCA in Karnataka. He specializes in building modern web applications with React, Node.js, and integrating AI capabilities. With a strong foundation in both frontend and backend development, he creates innovative solutions that solve real-world problems!"
  }
  
  // Greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "👋 Hello! I'm Irfan's AI assistant. I can help you learn about his skills, projects, experience, and how to get in touch. What would you like to know?"
  }
  
  // Thanks
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're welcome! Feel free to ask anything else about Irfan's work or reach out directly via email or phone. Have a great day! 😊"
  }
  
  // Default response
  return "I'm here to help you learn about Irfan! You can ask me about:\n\n• His skills and technologies\n• Projects he's built\n• Education and background\n• How to contact him\n• His availability for work\n\nWhat would you like to know?"
}

export const handler: Handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    }
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ response: 'Method not allowed' })
    }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    
    if (!body.message) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          response: "I didn't receive your message correctly. Please try again!" 
        })
      }
    }

    const { message } = body
    const apiKey = process.env.GEMINI_API_KEY

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        const prompt = `You are Irfan's AI Assistant for his 3D Interactive Portfolio. 
        Your goal is to answer questions about Irfan's skills, projects, and experience.
        
        About Irfan:
        - Name: Irfan Shaikh
        - Role: Web Developer & AI Enthusiast
        - Skills: Python, React, JavaScript, TypeScript, Java, Node.js, Flask, MongoDB, MySQL, TensorFlow, MobileNetV2, Git, Postman, Supabase, JWT Auth.
        - Projects: 
          1. AI Architecture Generator: Transforms project ideas into architectures using Gemini AI.
          2. Hotel Everest: Full-featured restaurant booking system with React & Supabase.
          3. AI Healthcare Assistant: Flask-based medical guidance app.
          4. Fruit & Vegetable Disease Detection: AI image classification with TensorFlow.
          5. HeavyDuty Parts: Industrial E-Commerce with WhatsApp checkout.
        - Education: Currently pursuing BCA at Smt Kumudben Debar College, Vijayapura, Karnataka (2023-2026).
        - Contact: irfanshaikh110805@gmail.com, +91 9964264412.
        - Availability: Open for freelance and full-time roles.
        
        Be professional, helpful, and concise. Keep answers short and relevant to his resume.
        
        User message: ${message}`

        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ response: responseText })
        }
      } catch (aiError) {
        console.error('Gemini API call failed, falling back to rule-based response:', aiError)
      }
    }

    // Fallback if apiKey is not defined or API call failed
    const response = getBotResponseFallback(message)
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ response })
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error('Bot Handler Error:', error)
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        response: "I encountered a problem while processing your request. Please try again!",
        error: errorMessage
      })
    }
  }
}
