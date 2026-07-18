'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(Math.min(scrollPercent * 100, 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

export function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isExpired: false,
      })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

export function useAudioPlayer(audioUrl: string | null, autoPlay = false) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioUrl) {
      setIsValid(false)
      return
    }

    // Create audio element
    const audio = new Audio()
    audio.loop = true
    audio.volume = 0.5
    audio.preload = 'auto'
    audio.src = audioUrl
    audioRef.current = audio

    // Validate audio source
    const handleCanPlay = () => {
      setIsValid(true)
      if (autoPlay) {
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
      }
    }

    const handleError = () => {
      setIsValid(false)
      setIsPlaying(false)
      console.error('Invalid audio URL:', audioUrl)
    }

    audio.addEventListener('canplaythrough', handleCanPlay, { once: true })
    audio.addEventListener('error', handleError, { once: true })

    // If already loaded
    if (audio.readyState >= 2) {
      handleCanPlay()
    }

    return () => {
      audio.pause()
      audio.src = ''
      audio.removeEventListener('canplaythrough', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audioRef.current = null
    }
  }, [audioUrl, autoPlay])

  const togglePlay = () => {
    if (!audioRef.current || !isValid) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((error) => {
        console.error('Play failed:', error)
        setIsPlaying(false)
      })
    }
  }

  return { isPlaying, togglePlay, isValid }
}