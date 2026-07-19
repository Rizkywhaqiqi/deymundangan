'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import BackgroundMedia from '@/components/ui/BackgroundMedia'

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

export default function WeddingEvent({
  akadDate,
  akadTimeStart,
  akadTimeEnd,
  akadVenue,
  resepsiDate,
  resepsiTimeStart,
  resepsiTimeEnd,
  resepsiVenue,
  venueName,
  venueAddress,
  venueCity,
  background,
}: WeddingEventProps) {
  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      <BackgroundMedia url={background} />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Save The Date</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Wedding Event</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Akad Nikah */}
          <ScrollReveal variant="left">
            <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-sm border border-primary/10">
              <div className="text-center mb-6">
                <h3 className="font-serif text-xl text-charcoal mb-2">Akad Nikah</h3>
                <div className="w-12 h-[1px] bg-primary mx-auto" />
              </div>
              <div className="space-y-3 text-sm text-charcoal/70">
                <p className="font-medium text-charcoal">{akadDate}</p>
                <p>{akadTimeStart} - {akadTimeEnd}</p>
                <p className="font-serif text-charcoal">{akadVenue}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Resepsi */}
          <ScrollReveal variant="right">
            <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-sm border border-primary/10">
              <div className="text-center mb-6">
                <h3 className="font-serif text-xl text-charcoal mb-2">Resepsi</h3>
                <div className="w-12 h-[1px] bg-primary mx-auto" />
              </div>
              <div className="space-y-3 text-sm text-charcoal/70">
                <p className="font-medium text-charcoal">{resepsiDate}</p>
                <p>{resepsiTimeStart} - {resepsiTimeEnd}</p>
                <p className="font-serif text-charcoal">{resepsiVenue}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className="text-center mt-12">
            <p className="font-serif text-lg text-charcoal mb-2">{venueName}</p>
            <p className="text-sm text-charcoal/60">{venueAddress}, {venueCity}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}