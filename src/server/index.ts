import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { GoogleGenerativeAI } from '@google/generative-ai'

type Bindings = {
  GEMINI_API_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors())

app.onError((err, c) => {
  console.error('GLOBAL HONO ERROR:', err)
  return c.json({ 
    response: "Internal Server Error - The backend encountered a crash.",
    error: err.message,
    stack: err.stack
  }, 500)
})

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', message: 'API is running' })
})

app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    console.log('Contact form submission:', body)
    
    // Forward to FormSubmit.co to deliver actual email to user
    const referer = c.req.header('referer') || c.req.header('origin') || 'https://irfanshaikh.me'
    const response = await fetch('https://formsubmit.co/ajax/irfanshaikh110805@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': referer
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message
      })
    })
    
    const data = await response.json()
    console.log('FormSubmit response:', data)
    
    return c.json({ 
      success: true, 
      message: 'Message received! We will get back to you soon.' 
    })
  } catch (error) {
    console.error('Contact Handler Error:', error)
    return c.json({
      success: false,
      message: 'I encountered a problem while processing your message. Please try again!'
    }, 500)
  }
})

app.post('/api/chat', async (c) => {
  console.log('--- Chat API Called ---')
  
  try {
    const body = await c.req.json().catch(() => null)
    if (!body || !body.message) {
      console.error('Invalid request body')
      return c.json({ response: "I didn't receive your message correctly. Please try again!" }, 400)
    }

    const { message } = body
    const apiKey = c.env?.GEMINI_API_KEY || (process.env as Record<string, string | undefined>)?.GEMINI_API_KEY
    
    console.log('Message:', message)
    console.log('API Key Present:', !!apiKey)
    
    if (!apiKey) {
      console.error('CRITICAL: GEMINI_API_KEY is missing!')
      return c.json({ 
        response: "The AI is currently offline (API key missing). Please check your environment variables." 
      }, 500)
    }

    console.log('Initializing GoogleGenerativeAI SDK...')
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `You are Irfan's AI Assistant for his 3D Interactive Portfolio. 
    Your goal is to answer questions about Irfan's skills, projects, and experience.
    
    About Irfan:
    - Name: Irfan Shaikh
    - Role: Web Developer & AI Enthusiast
    - Skills: Python, React, JavaScript, TypeScript, Java, Node.js, Flask, MongoDB, MySQL, TensorFlow, MobileNetV2, Git, Postman, Supabase, JWT Auth.
    - Projects: 
      1. CaseSight AI: Indian AI Legal Operating System (Next.js, Supabase, Gemini AI, pgvector, Upstash, Inngest).
      2. AI Architecture Generator: Transforms project ideas into architectures using Gemini AI.
      3. Hotel Everest: Full-featured restaurant booking system with React & Supabase.
      4. AI Healthcare Assistant: Flask-based medical guidance app.
      5. Fruit & Vegetable Disease Detection: AI image classification with TensorFlow.
      6. HeavyDuty Parts: Industrial E-Commerce with WhatsApp checkout.
    - Education: Currently pursuing BCA at Smt Kumudben Debar College, Vijayapura, Karnataka.
    - Contact: irfanshaikh110805@gmail.com, +91 9964264412.
    - Availability: Open for freelance and full-time roles.
    
    Be professional, helpful, and concise.
    
    User message: ${message}`

    console.log('Generating content with Gemini...')
    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    
    console.log('AI Response generated successfully')
    return c.json({ response: responseText })

  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error('--- Gemini Handler Error ---')
    console.error('Error name:', err.name)
    console.error('Error message:', err.message)
    console.error('Stack trace:', err.stack)
    
    return c.json({ 
      response: "I encountered a problem while processing your request.",
      error: err.message
    }, 500)
  }
})

export default app
