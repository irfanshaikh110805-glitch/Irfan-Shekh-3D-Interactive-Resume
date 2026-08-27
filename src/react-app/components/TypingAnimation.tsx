import { useState, useEffect } from 'react'

interface TypingAnimationProps {
  texts: string[]
  className?: string
  speed?: number
  delay?: number
}

export default function TypingAnimation({ 
  texts, 
  className = '', 
  speed = 100, 
  delay = 2000 
}: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState(texts[0] ? texts[0].slice(0, 1) : '')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const type = () => {
      const fullText = texts[currentTextIndex]
      
      let nextText = currentText
      if (isDeleting) {
        nextText = fullText.substring(0, currentText.length - 1)
      } else {
        nextText = fullText.substring(0, currentText.length + 1)
      }
      
      setCurrentText(nextText)

      let typeSpeed = speed
      if (isDeleting) {
        typeSpeed /= 2
      }

      if (!isDeleting && nextText === fullText) {
        typeSpeed = delay
        setIsDeleting(true)
      } else if (isDeleting && nextText === '') {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      }

      timeout = setTimeout(type, typeSpeed)
    }

    timeout = setTimeout(type, speed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts, speed, delay])

  return (
    <span className={`inline-block ${className}`}>
      {currentText}
      <span
        aria-hidden="true"
        className="ml-1 inline-block animate-cursor-blink text-amber-500 font-bold"
      >
        |
      </span>
    </span>
  )
}
