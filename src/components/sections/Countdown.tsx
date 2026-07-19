'use client'

import { useEffect, useState } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BackgroundMedia from '@/components/ui/BackgroundMedia'

interface CountdownProps {
  targetDate: string
  background?: string | null
}

export default function Countdown({ targetDate, background }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      <BackgroundMedia url={background} />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/80 uppercase mb-4 text-glare-light">Counting Down</p>
            <h2 className="font-display text-4xl md:text-5xl text-warm-white mb-4 text-glare">Countdown</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="flex justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {[
            { value: timeLeft.days, label: 'Hari' },
            { value: timeLeft.hours, label: 'Jam' },
            { value: timeLeft.minutes, label: 'Menit' },
            { value: timeLeft.seconds, label: 'Detik' },
          ].map((item, index) => (
            <ScrollReveal key={item.label} delay={index * 100}>
              <div className="text-center">
                <div className="glass-card rounded-xl p-4 md:p-6 mb-2">
                  <span className="font-display text-3xl md:text-5xl text-warm-white block text-glare">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-xs text-warm-white/60 uppercase tracking-wider text-glare-light">{item.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}