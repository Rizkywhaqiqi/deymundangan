'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { Heart } from 'lucide-react'

interface ClosingProps {
  groomName: string
  brideName: string
}

export default function Closing({ groomName, brideName }: ClosingProps) {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden bg-gradient-to-b from-cream to-warm-white">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-display text-charcoal leading-none">
          ❦
        </div>
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="w-12 h-[1px] bg-primary mx-auto mb-8" />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-6">
              Terima Kasih
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-6">
              Thank You
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="text-sm text-charcoal/60 leading-relaxed mb-8">
              Merupakan suatu kehormatan dan kebahagiaan apabila
              Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
              kepada kami di hari bahagia nanti.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-primary/40" />
              <Heart size={16} className="text-primary" />
              <div className="w-8 h-[1px] bg-primary/40" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={800}>
            <p className="font-display text-2xl md:text-3xl text-charcoal mb-2">
              {groomName} & {brideName}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={1000}>
            <div className="w-12 h-[1px] bg-primary mx-auto mt-8" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}