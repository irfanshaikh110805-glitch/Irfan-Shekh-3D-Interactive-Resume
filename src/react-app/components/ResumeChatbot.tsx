import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'

type Message = {
  id: string
  text: string
  sender: 'ai' | 'user'
}

const INITIAL_MESSAGE: Message = {
  id: '0',
  text: "Hi! I'm Irfan's AI Assistant. Ask me anything about his skills, projects, or experience!",
  sender: 'ai'
}

export default function ResumeChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  // Client-side chatbot logic (no server needed!)
  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    // Skills related
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
      return "Irfan is proficient in:\n\n🔹 Frontend: React, JavaScript, TypeScript, HTML, CSS, Tailwind\n🔹 Backend: Node.js, Express, Flask, Python\n🔹 Databases: MongoDB, MySQL, Supabase\n🔹 AI/ML: TensorFlow, MobileNetV2, Gemini AI\n🔹 Tools: Git, Postman, JWT Authentication\n\nHe's always learning new technologies to stay current!"
    }
    
    // Projects related
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      return "Here are Irfan's key projects:\n\n1️⃣ CaseSight AI - Indian AI Legal Operating System (Next.js & Gemini AI)\n2️⃣ AI Architecture Generator - Transforms ideas into system architectures using Gemini AI\n3️⃣ Hotel Everest - Restaurant booking system with React & Supabase\n4️⃣ MediGuardian AI - Healthcare assistant built with Flask\n5️⃣ Fruit & Vegetable Disease Detection - AI-powered image classification\n6️⃣ HeavyDuty Parts - Industrial e-commerce platform\n\nEach project showcases different aspects of his full-stack and AI capabilities!"
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

  // Fetch response from serverless function with client-side fallback
  const generateAIResponse = async (input: string) => {
    setIsTyping(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input })
      })

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`)
      }

      const data = await response.json()
      if (data && data.response) {
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          text: data.response, 
          sender: 'ai' 
        }])
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      console.warn('API error, falling back to rule-based responses:', err)
      // Simulate a small delay for the fallback to feel natural
      await new Promise(resolve => setTimeout(resolve, 500))
      const response = getBotResponse(input)
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        text: response, 
        sender: 'ai' 
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userMessage, sender: 'user' }])
    setInputValue('')
    
    // Fake AI processing
    generateAIResponse(userMessage)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-8 w-[90%] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 p-0.5 border border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img 
                    src="/chatbot.webp" 
                    alt="AI Avatar" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="font-semibold font-display">Chat with Irfan AI</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-amber-600 rounded-full p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-white border border-amber-100 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img 
                        src="/chatbot.webp" 
                        alt="AI Avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className={`max-w-[75%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.sender === 'user' 
                      ? 'bg-amber-500 text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-100 shadow-sm text-gray-700 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-white border border-amber-100 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img 
                      src="/chatbot.webp" 
                      alt="AI Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white border border-gray-100 shadow-sm text-gray-400 p-3 rounded-2xl rounded-tl-sm text-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages[messages.length - 1]?.sender === 'ai' && !isTyping && (
              <div className="px-4 py-2 border-t border-gray-100 flex flex-wrap gap-2 overflow-x-auto bg-gray-50/20 max-h-32 scrollbar-none">
                {[
                  "What are your skills?",
                  "Tell me about your projects",
                  "Are you available for freelance?",
                  "What technologies do you use?",
                  "How can I contact you?",
                  "What is your education?"
                ].filter(q => messages[messages.length - 2]?.text !== q).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      setMessages(prev => [...prev, { id: Date.now().toString(), text: q, sender: 'user' }])
                      generateAIResponse(q)
                    }}
                    className="text-xs px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full hover:border-amber-400 hover:text-amber-500 hover:bg-amber-50/50 transition-all duration-300 whitespace-nowrap shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-amber-500 text-white rounded-full p-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-600 transition-colors"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] focus:outline-none bg-transparent border-none p-0 cursor-pointer"
        animate={isOpen ? {} : {
          y: [0, -12, 0]
        }}
        transition={isOpen ? {} : {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {isOpen ? (
          <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center text-white border-2 border-white hover:bg-amber-600 transition-colors">
            <X size={24} />
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Glow / pulse effect behind the robot */}
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl scale-75 animate-pulse" />
            
            <img 
              src="/chatbot.webp" 
              alt="Open Chatbot" 
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_8px_16px_rgba(245,158,11,0.4)] hover:drop-shadow-[0_12px_20px_rgba(245,158,11,0.5)] transition-all duration-300"
            />
          </div>
        )}
      </motion.button>
    </>
  )
}
