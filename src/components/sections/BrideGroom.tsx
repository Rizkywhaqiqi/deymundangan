'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { motion } from 'framer-motion'
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

export default function BrideGroom({ groomName, groomNickname, groomFather, groomMother, groomChildOrder, groomPhoto, brideName, brideNickname, brideFather, brideMother, brideChildOrder, bridePhoto, background }: BrideGroomProps) {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      <BackgroundMedia src={background} overlayColor="bg-black/50" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Bride & Groom</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Kedua Mempelai</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-5xl mx-auto">
          {/* Groom */}
          <ScrollReveal variant="left">
            <div className="text-center group">
              <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
                {groomPhoto ? (
                  <img src={groomPhoto} alt={groomName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-rose/10 flex items-center justify-center">
                    <span className="font-display text-6xl text-primary/30">👤</span>
                  </div>
                )}
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-2">{groomName}</h3>
              <p className="text-xs tracking-[0.2em] text-primary/60 uppercase mb-3">{groomNickname}</p>
              <p className="text-xs text-charcoal/40 leading-relaxed">
                Putra {groomChildOrder} dari<br />
                Bapak {groomFather}<br />
                dan Ibu {groomMother}
              </p>
            </div>
          </ScrollReveal>

          {/* Bride */}
          <ScrollReveal variant="right" delay={200}>
            <div className="text-center group">
              <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
                {bridePhoto ? (
                  <img src={bridePhoto} alt={brideName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose/10 to-primary/10 flex items-center justify-center">
                    <span className="font-display text-6xl text-primary/30">👰</span>
                  </div>
                )}
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-2">{brideName}</h3>
              <p className="text-xs tracking-[0.2em] text-primary/60 uppercase mb-3">{brideNickname}</p>
              <p className="text-xs text-charcoal/40 leading-relaxed">
                Putri {brideChildOrder} dari<br />
                Bapak {brideFather}<br />
                dan Ibu {brideMother}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}