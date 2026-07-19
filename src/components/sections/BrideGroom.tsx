'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BackgroundMedia from '@/components/ui/BackgroundMedia'

interface BrideGroomProps {
  groomName: string
  groomNickname: string
  groomFather: string
  groomMother: string
  groomChildOrder: string
  groomPhoto?: string | null
  brideName: string
  brideNickname: string
  brideFather: string
  brideMother: string
  brideChildOrder: string
  bridePhoto?: string | null
  background?: string | null
}

export default function BrideGroom({
  groomName,
  groomNickname,
  groomFather,
  groomMother,
  groomChildOrder,
  groomPhoto,
  brideName,
  brideNickname,
  brideFather,
  brideMother,
  brideChildOrder,
  bridePhoto,
  background,
}: BrideGroomProps) {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      <BackgroundMedia url={background} />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/80 uppercase mb-4 text-glare-light">Mempelai</p>
            <h2 className="font-display text-4xl md:text-5xl text-warm-white mb-4 text-glare">Bride & Groom</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Groom */}
          <ScrollReveal variant="left">
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/20 ring-2 ring-white/10">
                {groomPhoto ? (
                  <img src={groomPhoto} alt={groomName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-cream/80 flex items-center justify-center">
                    <span className="font-display text-4xl text-primary/50">G</span>
                  </div>
                )}
              </div>
              <h3 className="font-display text-3xl text-warm-white mb-1 text-glare">{groomName}</h3>
              <p className="text-sm text-warm-white/70 mb-4">{groomNickname}</p>
              <div className="text-xs text-warm-white/50 space-y-1">
                <p>Putra dari {groomChildOrder}</p>
                <p>Bpk. {groomFather} & Ibu {groomMother}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Bride */}
          <ScrollReveal variant="right">
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/20 ring-2 ring-white/10">
                {bridePhoto ? (
                  <img src={bridePhoto} alt={brideName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-cream/80 flex items-center justify-center">
                    <span className="font-display text-4xl text-primary/50">B</span>
                  </div>
                )}
              </div>
              <h3 className="font-display text-3xl text-warm-white mb-1 text-glare">{brideName}</h3>
              <p className="text-sm text-warm-white/70 mb-4">{brideNickname}</p>
              <div className="text-xs text-warm-white/50 space-y-1">
                <p>Putri dari {brideChildOrder}</p>
                <p>Bpk. {brideFather} & Ibu {brideMother}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}