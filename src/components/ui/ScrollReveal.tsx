'use client'

import { type ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'left' | 'right' | 'scale'
  threshold?: number
  delay?: number
}

export default function ScrollReveal({
  children,
  className = '',
  variant = 'default',
  threshold = 0.1,
  delay = 0,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold })

  const variantClasses = {
    default: 'scroll-reveal',
    left: 'scroll-reveal-left',
    right: 'scroll-reveal-right',
    scale: 'scroll-reveal-scale',
  }

  return (
    <div
      ref={ref}
      className={`${variantClasses[variant]} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}