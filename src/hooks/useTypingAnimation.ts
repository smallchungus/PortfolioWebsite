import { useEffect, useState, useCallback } from 'react'

export interface UseTypingAnimationOptions {
  strings: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseDuration?: number
  loop?: boolean
  respectReducedMotion?: boolean
}

export const useTypingAnimation = ({
  strings,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  loop = true,
  respectReducedMotion = true,
}: UseTypingAnimationOptions) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  // Check for reduced motion preference
  const prefersReducedMotion = respectReducedMotion 
    ? (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false)
    : false

  useEffect(() => {
    if (prefersReducedMotion) {
      // Show the first string immediately if user prefers reduced motion
      setDisplayedText(strings[currentStringIndex])
      return
    }

    if (!strings.length) return

    const currentString = strings[currentStringIndex]
    let timeoutId: NodeJS.Timeout

    if (isDeleting) {
      // Deleting characters
      timeoutId = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1))
        
        if (displayedText === '') {
          setIsDeleting(false)
          setIsTyping(true)
          if (loop) {
            setCurrentStringIndex((prev) => (prev + 1) % strings.length)
          }
        }
      }, deleteSpeed)
    } else if (isTyping) {
      // Typing characters
      timeoutId = setTimeout(() => {
        if (displayedText.length < currentString.length) {
          setDisplayedText(currentString.slice(0, displayedText.length + 1))
        } else {
          setIsTyping(false)
          // Pause before deleting or moving to next string
          setTimeout(() => {
            if (loop && strings.length > 1) {
              setIsDeleting(true)
            }
          }, pauseDuration)
        }
      }, typeSpeed)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [
    strings,
    currentStringIndex,
    displayedText,
    isTyping,
    isDeleting,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
    loop,
    prefersReducedMotion,
  ])

  const reset = useCallback(() => {
    setCurrentStringIndex(0)
    setDisplayedText('')
    setIsTyping(true)
    setIsDeleting(false)
  }, [])

  return {
    displayedText,
    currentStringIndex,
    isTyping,
    isDeleting,
    reset,
    prefersReducedMotion,
  }
}