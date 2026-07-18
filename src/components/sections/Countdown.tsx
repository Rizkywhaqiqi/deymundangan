'use client'

import { useCountdown } from '@/hooks/useScrollReveal'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface CountdownProps {
  targetDate: string
}

export default function Countdown({ targetDate }: CountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) return null

  const timeUnits = [
    { label: 'Hari', value: days },
    { label: 'Jam', value: hours },
    { label: 'Menit', value: minutes },
    { label: 'Detik', value: seconds },
  ]

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-warm-white via-cream to-warm-white">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-charcoal" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-charcoal" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-charcoal" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Countdown</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Menuju Hari Bahagia</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="flex justify-center gap-4 md:gap-8">
          {timeUnits.map((unit, index) => (
            <ScrollReveal key={unit.label} delay={index * 150}>
              <div className="text-center">
                <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center bg-warm-white rounded-xl shadow-sm border border-primary/10">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/5 to-transparent" />
                  <span className="relative font-serif text-3xl md:text-4xl text-charcoal">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-3 text-xs tracking-[0.2em] text-charcoal/50 uppercase">
                  {unit.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}