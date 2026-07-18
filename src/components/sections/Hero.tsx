'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { motion } from 'framer-motion'

interface HeroProps {
  groomName: string
  brideName: string
  weddingDate: string
  venueName: string
  background?: string | null
}

export default function Hero({ groomName, brideName, weddingDate, venueName, background }: HeroProps) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={
        background
          ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { backgroundColor: '#faf8f5' }
      }
    >
      {background && <div className="absolute inset-0 bg-black/50" />}
      <div className="section-container relative z-10 text-center py-32">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">The Wedding Of</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-charcoal mb-2 leading-tight">
            {groomName}
          </h1>
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="w-12 h-[1px] bg-primary/60" />
            <span className="font-display text-2xl text-primary">&</span>
            <div className="w-12 h-[1px] bg-primary/60" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-charcoal mb-8 leading-tight">
            {brideName}
          </h1>
          <div className="w-16 h-[1px] bg-primary mx-auto mb-8" />
          <p className="text-sm tracking-[0.2em] text-charcoal/60 uppercase mb-2">{weddingDate}</p>
          <p className="text-xs tracking-[0.1em] text-charcoal/40">{venueName}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}