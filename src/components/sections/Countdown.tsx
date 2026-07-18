'use client'

import { useState, useEffect } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface CountdownProps {
  targetDate: string
  background?: string | null
}

export default function Countdown({ targetDate, background }: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime()
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <section
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
      style={
        background
          ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { backgroundColor: '#faf8f5' }
      }
    >
      {background && <div className="absolute inset-0 bg-black/50" />}
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Countdown</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Menuju Hari Bahagia</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="flex justify-center gap-4 md:gap-8">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <ScrollReveal key={unit} variant="scale" delay={Object.keys(timeLeft).indexOf(unit) * 100}>
              <div className="text-center">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white shadow-sm border border-primary/10 flex items-center justify-center">
                  <span className="font-display text-2xl md:text-4xl text-charcoal">{value}</span>
                </div>
                <p className="text-xs tracking-[0.2em] text-charcoal/50 uppercase mt-3">{unit}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}