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
    
    // Create professional HTML email template
    const htmlMessage = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', 'Helvetica', sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f59e0b 0%, #eab308 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                🎉 New Contact Form Submission
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.95;">
                From your portfolio website
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 25px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                You have received a new message from your portfolio contact form:
              </p>
              
              <!-- Sender Info -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                    <p style="margin: 0 0 8px 0; color: #92400e; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                      Sender Details
                    </p>
                    <p style="margin: 0 0 5px 0; color: #1f2937; font-size: 16px;">
                      <strong>Name:</strong> ${body.name || 'Not provided'}
                    </p>
                    <p style="margin: 0; color: #1f2937; font-size: 16px;">
                      <strong>Email:</strong> <a href="mailto:${body.email}" style="color: #f59e0b; text-decoration: none;">${body.email || 'Not provided'}</a>
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Subject -->
              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                  Subject
                </p>
                <p style="margin: 0; color: #1f2937; font-size: 18px; font-weight: 600;">
                  ${body.subject || 'No subject'}
                </p>
              </div>
              
              <!-- Message -->
              <div style="margin-bottom: 30px;">
                <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                  Message
                </p>
                <div style="padding: 20px; background-color: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${body.message || 'No message'}</p>
                </div>
              </div>
              
              <!-- Reply Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center; padding: 20px 0;">
                    <a href="mailto:${body.email}?subject=Re: ${encodeURIComponent(body.subject || 'Your inquiry')}" 
                       style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #f59e0b 0%, #eab308 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);">
                      📧 Reply to ${body.name?.split(' ')[0] || 'Sender'}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 30px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 13px; text-align: center;">
                This email was sent from your portfolio contact form
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                <a href="https://irfanshaikhportfolio.netlify.app" style="color: #f59e0b; text-decoration: none;">irfanshaikhportfolio.netlify.app</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim()
    
    // Forward to FormSubmit.co with HTML template and anti-spam headers
    const referer = event.headers.referer || event.headers.origin || 'https://irfanshaikhportfolio.netlify.app';
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
        subject: `Portfolio Contact: ${body.subject}`,
        message: htmlMessage,
        _template: 'box',
        _captcha: 'false',
        _subject: `New Contact from ${body.name} - ${body.subject}`,
        _replyto: body.email,
        _autoresponse: `Hi ${body.name},\n\nThank you for reaching out! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nIrfan Shaikh\n\n---\nThis is an automated response. Please do not reply to this email.`
      })
    })
    
    const contentType = response.headers.get('content-type') || ''
    if (!response.ok || !contentType.includes('application/json')) {
      const errorText = await response.text()
      console.error('FormSubmit error response:', errorText)
      throw new Error(`FormSubmit returned status ${response.status}: ${errorText.substring(0, 300)}`)
    }

    const data = await response.json()
    console.log('FormSubmit response:', data)
    
    // Return success
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully! I will get back to you soon.' 
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
        message: 'Failed to send message. Please try again or email me directly at irfanshaikh110805@gmail.com',
        error: errorMessage
      })
    }
  }
}

