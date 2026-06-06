import { Handler } from '@netlify/functions'

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
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    console.log('Contact form submission:', body)
    
    // Forward to FormSubmit.co to deliver actual email to user
    const referer = event.headers.referer || event.headers.origin || 'https://irfanshaikh.me';
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
    
    // Return success
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message received! We will get back to you soon.' 
      })
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error('Contact Handler Error:', error)
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: false, 
        message: 'I encountered a problem while processing your message. Please try again!',
        error: errorMessage
      })
    }
  }
}
