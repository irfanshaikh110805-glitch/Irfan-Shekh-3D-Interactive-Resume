import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot } from 'lucide-react'

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

  // Simple hardcoded responses based on keywords
  const generateAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase()
    
    // Artificial delay effect
    setIsTyping(true)
    
    setTimeout(() => {
      let response = "I'm still learning! You can ask me about Irfan's skills (like Python, React), his Healthcare project, or how to contact him."
      
      if (lowerInput.includes('freelance') || lowerInput.includes('hire')) {
        response = "Yes! Irfan is available for freelance projects and full-time opportunities. He's always looking to build amazing things!"
      } else if (lowerInput.includes('technologies') || lowerInput.includes('tech stack')) {
        response = "Irfan works with a wide range of technologies, including React, TypeScript, Tailwind CSS, Python (Flask), and TensorFlow."
      } else if (lowerInput.includes('skills')) {
        response = "Irfan specializes in Python, React, and Data Science. You can see more details in the 'My Expertise' section below!"
      } else if (lowerInput.includes('python')) {
        response = "Irfan is very skilled in Python! He uses it for backend development with Flask, and for AI/ML tasks utilizing TensorFlow and MobileNetV2."
      } else if (lowerInput.includes('react')) {
        response = "Yes, Irfan has strong frontend skills using React, TypeScript, and Tailwind CSS. This very portfolio is built with React 19 and Framer Motion!"
      } else if (lowerInput.includes('healthcare') || lowerInput.includes('project')) {
        response = "One of Irfan's top projects is an 'AI Healthcare Assistant' built with Flask and NLP. He also created a Fruit & Vegetable Disease Detection system using TensorFlow!"
      } else if (lowerInput.includes('contact') || lowerInput.includes('email')) {
        response = "You can contact Irfan at irfanshaikh110805@gmail.com or call him at +91 9964264412. Would you like a link to his LinkedIn?"
      } else if (lowerInput.includes('bca') || lowerInput.includes('education') || lowerInput.includes('college')) {
        response = "Irfan is currently pursuing his BCA (Bachelor of Computer Applications) at Smt Kumudben Debar College, graduating in 2026."
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi ')) {
        response = "Hello there! How can I help you learn more about Irfan's experience?"
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), text: response, sender: 'ai' }])
      setIsTyping(false)
    }, 1000)
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
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-8 w-[90%] sm:w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Bot size={24} />
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
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-amber-500 text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-100 shadow-sm text-gray-700 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center text-white z-[100] hover:shadow-xl hover:shadow-amber-500/40 transition-shadow"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </>
  )
}
