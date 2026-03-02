import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react'

// Helper function to get CSS class name for contact colors
const getContactColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#3b82f6': 'contact-blue',
    '#059669': 'contact-green',
    '#8b5cf6': 'contact-purple'
  }
  return colorMap[color] || 'contact-blue'
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'irfanshaikh110805@gmail.com',
    href: 'mailto:irfanshaikh110805@gmail.com',
    color: '#3b82f6'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9964264412',
    href: 'tel:+919964264412',
    color: '#059669'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Vijayapura, Karnataka, India',
    href: '#',
    color: '#8b5cf6'
  }
]

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/irfan-shekh-380461392?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    color: '#0077b5'
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/irfan-shekh',
    color: '#333'
  }
]

export default function ContactSection() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Let's Connect
        </h2>
        <p className="text-gray-300">
          Ready to bring your ideas to life? Let's discuss your next project.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
          <div className="space-y-4">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon
              return (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700/30 transition-all duration-300 group ${getContactColorClass(contact.color)}`}
                  whileHover={{ x: 5 }}
                >
                  <div className={`p-3 rounded-full contact-icon-bg ${getContactColorClass(contact.color)}`}>
                    <Icon
                      size={20}
                      className={`contact-icon-color ${getContactColorClass(contact.color)}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">{contact.label}</p>
                    <p className="text-white group-hover:text-blue-400 transition-colors duration-300">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold text-white mb-6">Social Links</h3>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon
                    size={20}
                    className="text-gray-400 group-hover:text-white transition-colors duration-300"
                  />
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* Quick Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold text-white mb-6">Quick Message</h3>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const name = formData.get('name') as string
              const email = formData.get('email') as string
              const message = formData.get('message') as string

              if (!name || !email || !message) {
                alert('Please fill in all fields')
                return
              }

              // Create mailto link with form data
              const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
              const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
              const mailtoLink = `mailto:irfanshaikh110805@gmail.com?subject=${subject}&body=${body}`

              window.location.href = mailtoLink

                // Clear form
                ; (e.target as HTMLFormElement).reset()
              alert('Thank you for your message! Your email client should open now.')
            }}
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-300"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-300"
              />
            </div>
            <div>
              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                required
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={16} />
              Send Message
            </motion.button>
          </form>
        </motion.div>

      </div>
    </div>
  )
}
