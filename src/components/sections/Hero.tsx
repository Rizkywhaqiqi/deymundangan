'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { motion } from 'framer-motion'
import BackgroundMedia from '@/components/ui/BackgroundMedia'

interface HeroProps {
  groomName: string
  brideName: string
  weddingDate: string
  venueName: string
  background?: string | null
}

export default function Hero({ groomName, brideName, weddingDate, venueName, background }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundMedia url={background} />
      <div className="section-container relative z-10 text-center py-32">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-primary/80 uppercase mb-4 text-glare-light">The Wedding Of</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-warm-white mb-2 leading-tight text-glare">
            {groomName}
          </h1>
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="w-12 h-[1px] bg-primary/80" />
            <span className="font-display text-2xl text-primary text-glare">&</span>
            <div className="w-12 h-[1px] bg-primary/80" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-warm-white mb-8 leading-tight text-glare">
            {brideName}
          </h1>
          <div className="w-16 h-[1px] bg-primary mx-auto mb-8" />
          <p className="text-sm tracking-[0.2em] text-warm-white/80 uppercase mb-2 text-glare-light">{weddingDate}</p>
          <p className="text-xs tracking-[0.1em] text-warm-white/60 text-glare-light">{venueName}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}