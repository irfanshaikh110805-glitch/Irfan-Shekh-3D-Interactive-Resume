import { motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import { useState } from 'react'

export default function DownloadResume() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      
      // Check if file exists before attempting download
      const response = await fetch('/resume.pdf', { method: 'HEAD' })
      
      if (!response.ok) {
        throw new Error('Resume file not found')
      }

      // Create a link element and trigger download
      const link = document.createElement('a')
      link.href = '/resume.pdf'
      link.download = 'Irfan_Shekh_Resume.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Sorry, the resume file could not be downloaded. Please try again later or contact me directly.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <motion.button
      onClick={handleDownload}
      disabled={isDownloading}
      className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={!isDownloading ? { scale: 1.05, y: -2 } : {}}
      whileTap={!isDownloading ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Download resume PDF"
    >
      <FileText size={20} className="group-hover:rotate-12 transition-transform duration-300" />
      <span>{isDownloading ? 'Downloading...' : 'Download Resume'}</span>
      <Download size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
    </motion.button>
  )
}
