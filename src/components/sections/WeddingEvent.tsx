'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { motion } from 'framer-motion'

interface WeddingEventProps {
  akadDate: string
  akadTimeStart: string
  akadTimeEnd: string
  akadVenue: string
  resepsiDate: string
  resepsiTimeStart: string
  resepsiTimeEnd: string
  resepsiVenue: string
  venueName: string
  venueAddress: string
  venueCity: string
  background?: string | null
}

export default function WeddingEvent({ akadDate, akadTimeStart, akadTimeEnd, akadVenue, resepsiDate, resepsiTimeStart, resepsiTimeEnd, resepsiVenue, venueName, venueAddress, venueCity, background }: WeddingEventProps) {
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    } catch {
      return dateStr
    }
  }

  return (
    <section
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
      style={
        background
          ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { backgroundColor: '#ffffff' }
      }
    >
      {background && <div className="absolute inset-0 bg-black/50" />}
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Wedding Event</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Acara Pernikahan</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <ScrollReveal variant="left">
            <div className="p-8 rounded-xl bg-warm-white/90 backdrop-blur-sm shadow-sm border border-primary/5 text-center">
              <span className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4 block">Akad Nikah</span>
              <div className="w-12 h-[1px] bg-primary/40 mx-auto mb-6" />
              <p className="text-sm text-charcoal/60 mb-2">{formatDate(akadDate)}</p>
              <p className="font-display text-lg text-charcoal mb-2">{akadTimeStart} - {akadTimeEnd} WIB</p>
              <p className="text-xs text-charcoal/40">{akadVenue}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="right" delay={200}>
            <div className="p-8 rounded-xl bg-warm-white/90 backdrop-blur-sm shadow-sm border border-primary/5 text-center">
              <span className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4 block">Resepsi</span>
              <div className="w-12 h-[1px] bg-primary/40 mx-auto mb-6" />
              <p className="text-sm text-charcoal/60 mb-2">{formatDate(resepsiDate)}</p>
              <p className="font-display text-lg text-charcoal mb-2">{resepsiTimeStart} - {resepsiTimeEnd} WIB</p>
              <p className="text-xs text-charcoal/40">{resepsiVenue}</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={400}>
          <div className="max-w-lg mx-auto mt-12 text-center p-6 rounded-xl bg-warm-white/90 backdrop-blur-sm shadow-sm border border-primary/5">
            <p className="text-xs tracking-[0.2em] text-primary/60 uppercase mb-2">Lokasi</p>
            <p className="font-serif text-base text-charcoal mb-1">{venueName}</p>
            <p className="text-xs text-charcoal/40">{venueAddress}, {venueCity}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}