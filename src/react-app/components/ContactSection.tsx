import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Copy, Check } from 'lucide-react'
import { getContactColorClass } from '@/react-app/utils/colorUtils'

const contactInfo = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: 'irfanshaikh110805@gmail.com',
    href: 'mailto:irfanshaikh110805@gmail.com',
    copyable: true,
    color: '#f59e0b'
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Phone',
    value: '+91 9964264412',
    href: 'tel:+919964264412',
    copyable: true,
    color: '#eab308'
  },
  {
    id: 'location',
    icon: MapPin,
    label: 'Location',
    value: 'Vijayapura, Karnataka, India',
    href: '#',
    copyable: false,
    color: '#fbbf24'
  }
]

// Custom SVG icons for social links (brand icons removed from lucide-react)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
  </svg>
)

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const socialLinks = [
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/irfan-shekh-380461392?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    hoverClass: 'hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:shadow-[0_4px_16px_rgba(0,119,181,0.25)]'
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    href: 'https://github.com/irfanshaikh110805-glitch',
    hoverClass: 'hover:text-black hover:border-gray-900/50 hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
  },
  {
    icon: WhatsappIcon,
    label: 'WhatsApp',
    href: 'https://wa.me/919964264412?text=Hi%20Irfan!%20%F0%9F%91%8B%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding%20a%20project%20%2F%20opportunity.',
    hoverClass: 'hover:text-[#25d366] hover:border-[#25d366]/50 hover:shadow-[0_4px_16px_rgba(37,211,102,0.25)]'
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    href: 'https://www.instagram.com/dark_rider170?igsh=dWhha2FqeHlqNHky',
    hoverClass: 'hover:text-[#e4405f] hover:border-[#e4405f]/50 hover:shadow-[0_4px_16px_rgba(228,64,95,0.25)]'
  },
  {
    icon: FacebookIcon,
    label: 'Facebook',
    href: 'https://www.facebook.com/irfan.shaikh.870227',
    hoverClass: 'hover:text-[#1877f2] hover:border-[#1877f2]/50 hover:shadow-[0_4px_16px_rgba(24,119,242,0.25)]'
  }
]

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Listen for 'select-service' event to auto-fill subject
  useEffect(() => {
    const handleServiceSelect = (e: CustomEvent) => {
      if (e.detail) {
        setFormData(prev => ({
          ...prev,
          subject: `Inquiry: ${e.detail}`
        }))
        const messageInput = document.getElementById('message')
        if (messageInput) {
          messageInput.focus()
        }
      }
    }
    window.addEventListener('select-service', handleServiceSelect as EventListener)
    return () => window.removeEventListener('select-service', handleServiceSelect as EventListener)
  }, [])

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
     setIsSubmitting(true)
     
     try {
       // Try the primary endpoint first
       let response = await fetch('/api/contact', {
         method: 'POST',
         headers: { 
           'Content-Type': 'application/json',
           'Accept': 'application/json'
         },
         body: JSON.stringify(formData)
       })

       // If primary fails, try direct Netlify functions path
       if (!response.ok) {
         console.log('Primary endpoint failed, trying direct path...')
         response = await fetch('/.netlify/functions/contact', {
           method: 'POST',
           headers: { 
             'Content-Type': 'application/json',
             'Accept': 'application/json'
           },
           body: JSON.stringify(formData)
         })
       }
       
       if (!response.ok) {
         // If both fail, use FormSubmit directly as fallback
         console.log('Both endpoints failed, using FormSubmit directly...')
         const formSubmitResponse = await fetch('https://formsubmit.co/ajax/irfanshaikh110805@gmail.com', {
           method: 'POST',
           headers: { 
             'Content-Type': 'application/json',
             'Accept': 'application/json'
           },
           body: JSON.stringify({
             name: formData.name,
             email: formData.email,
             subject: `Portfolio Contact: ${formData.subject}`,
             message: `From: ${formData.name} (${formData.email})\n\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`,
             _template: 'box',
             _captcha: 'false'
           })
         })
         
         if (!formSubmitResponse.ok) {
           throw new Error(`All endpoints failed. Status: ${response.status}`)
         }
         
         response = formSubmitResponse
       }

       const data = await response.json()
       
       if (data.success === 'true' || data.success === true || response.ok) {
         setIsSubmitted(true)
         setFormData({ name: '', email: '', subject: '', message: '' })
         setTimeout(() => setIsSubmitted(false), 5000)
       } else {
         alert(data.message || 'Failed to send message. Please try again.')
       }
     } catch (error) {
       console.error('Submission error:', error)
       alert('An error occurred. Please email me directly at irfanshaikh110805@gmail.com or try again later.')
     } finally {
       setIsSubmitting(false)
     }
   }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-14"
      >
        <div className="inline-flex items-center gap-2 bg-amber-50/90 border border-amber-200/70 rounded-full px-5 py-2 mb-4 shadow-sm">
          <Mail className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="text-xs sm:text-sm text-amber-800 font-semibold font-mono tracking-tight">Direct Channel</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent tracking-tight">
          Let's Build Something Great
        </h2>
        <p className="font-sans text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Open for full-time engineering roles, AI/ML initiatives, and select high-impact freelance projects.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          {/* Contact Information Cards with 1-Click Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[-4px_-4px_12px_rgba(255,255,255,1),4px_6px_18px_rgba(0,0,0,0.05)]"
          >
            <h3 className="font-display text-xl font-bold text-gray-900 mb-6 tracking-tight">Direct Contacts</h3>
            <div className="space-y-3.5">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon
                const isCopied = copiedId === contact.id

                return (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gray-50/70 border border-gray-100/90 hover:border-amber-200/80 hover:bg-amber-50/30 transition-all duration-300 group"
                  >
                    <a
                      href={contact.href}
                      className="flex items-center gap-3.5 flex-1 min-w-0"
                    >
                      <div className={`p-3 rounded-xl bg-white border border-gray-100 shadow-sm group-hover:scale-110 transition-transform ${getContactColorClass(contact.color)}`}>
                        <Icon size={18} className={`contact-icon-color ${getContactColorClass(contact.color)}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 font-semibold font-mono uppercase tracking-wider">{contact.label}</p>
                        <p className="text-gray-900 font-medium font-sans text-xs sm:text-sm group-hover:text-amber-600 transition-colors truncate">
                          {contact.value}
                        </p>
                      </div>
                    </a>

                    {contact.copyable && (
                      <button
                        onClick={() => handleCopy(contact.id, contact.value)}
                        className={`ml-2 p-2 rounded-xl border transition-all duration-300 flex items-center gap-1.5 cursor-pointer text-xs font-semibold ${
                          isCopied
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                            : 'bg-white border-gray-200/80 text-gray-500 hover:text-amber-600 hover:border-amber-300 shadow-sm'
                        }`}
                        title={`Copy ${contact.label}`}
                        aria-label={`Copy ${contact.label}`}
                      >
                        {isCopied ? (
                          <>
                            <Check size={14} className="text-emerald-600 animate-bounce" />
                            <span className="hidden sm:inline font-mono">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span className="hidden sm:inline font-mono">Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Social Links with Distinct Brand Glowing Micro-Interactions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[-4px_-4px_12px_rgba(255,255,255,1),4px_6px_18px_rgba(0,0,0,0.05)]"
          >
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4 tracking-tight">Social Channels</h3>
            <p className="font-sans text-xs text-gray-500 mb-5">Connect with me across platforms for updates and collaborations.</p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-gray-200/80 text-gray-600 shadow-[-2px_-2px_6px_rgba(255,255,255,1),2px_3px_8px_rgba(0,0,0,0.05)] transition-all duration-300 ${social.hoverClass}`}
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <IconComponent />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[-4px_-4px_12px_rgba(255,255,255,1),4px_6px_18px_rgba(0,0,0,0.05)]"
        >
          <h3 className="font-display text-xl font-bold text-gray-900 mb-6 tracking-tight">Send a Message</h3>
          
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <CheckCircle size={32} />
              </div>
              <h4 className="font-display text-2xl font-bold text-gray-900 mb-2">Message Dispatched!</h4>
              <p className="font-sans text-gray-600 text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-6 text-amber-600 font-semibold font-sans text-sm hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl focus:bg-white shadow-[inset_1.5px_1.5px_3px_rgba(0,0,0,0.03)] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl focus:bg-white shadow-[inset_1.5px_1.5px_3px_rgba(0,0,0,0.03)] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700 mb-1.5">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Consultation / Full-Stack Role"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl focus:bg-white shadow-[inset_1.5px_1.5px_3px_rgba(0,0,0,0.03)] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-bold font-mono uppercase tracking-wider text-gray-700 mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and goals..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200/80 rounded-xl focus:bg-white shadow-[inset_1.5px_1.5px_3px_rgba(0,0,0,0.03)] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all resize-none text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="shimmer-hover-trigger w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-white font-bold font-display tracking-tight text-sm rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 transform transition-all active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
