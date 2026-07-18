'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { motion } from 'framer-motion'

interface ClosingProps {
  groomName: string
  brideName: string
  background?: string | null
}

export default function Closing({ groomName, brideName, background }: ClosingProps) {
  return (
    <section
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
      style={
        background
          ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { backgroundColor: '#0a0a0a' }
      }
    >
      {background && <div className="absolute inset-0 bg-black/60" />}

      {/* Decorative */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/5 via-transparent to-rose/5 blur-3xl" />
      </div>

      <div className="section-container relative z-10 text-center">
        <ScrollReveal>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="font-script text-xl md:text-2xl text-primary/80 mb-8">
            Terima kasih atas doa dan restu Anda
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="w-12 h-[1px] bg-primary/40 mx-auto mb-6" />
        </ScrollReveal>

        <ScrollReveal delay={600}>
          <p className="text-xs tracking-[0.3em] text-warm-white/40 uppercase mb-4">Kami yang berbahagia</p>
          <p className="font-display text-2xl md:text-4xl text-warm-white mb-2">{groomName}</p>
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="w-8 h-[1px] bg-primary/60" />
            <span className="font-display text-lg text-primary">&</span>
            <div className="w-8 h-[1px] bg-primary/60" />
          </div>
          <p className="font-display text-2xl md:text-4xl text-warm-white">{brideName}</p>
        </ScrollReveal>

        <ScrollReveal delay={800}>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-12" />
        </ScrollReveal>
      </div>
    </section>
  )
}