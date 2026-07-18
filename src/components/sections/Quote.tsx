'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface QuoteProps {
  ayat: string
  surah: string
}

export default function Quote({ ayat, surah }: QuoteProps) {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden bg-cream">
      {/* Background decorative */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-display text-charcoal leading-none">
          ❦
        </div>
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="w-12 h-[1px] bg-primary mx-auto mb-8" />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              {/* Decorative quote marks */}
              <span className="font-display text-6xl text-primary/20 absolute -top-8 -left-4">&ldquo;</span>

              <p className="font-script text-xl md:text-2xl lg:text-3xl text-charcoal/80 leading-relaxed italic px-8">
                {ayat}
              </p>

              <span className="font-display text-6xl text-primary/20 absolute -bottom-16 -right-4">&rdquo;</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="w-8 h-[1px] bg-primary/40 mx-auto my-8" />
            <p className="text-sm tracking-[0.2em] text-charcoal/50 uppercase">
              — {surah} —
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}