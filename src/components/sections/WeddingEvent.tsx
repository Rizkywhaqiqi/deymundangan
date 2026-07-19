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

const MONTHS_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

function formatDateToIndonesian(dateString: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  const day = date.getDate()
  const month = MONTHS_ID[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
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
            <p className="text-xs tracking-[0.3em] text-primary/80 uppercase mb-4 text-glare-light">Save The Date</p>
            <h2 className="font-display text-4xl md:text-5xl text-warm-white mb-4 text-glare">Wedding Event</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Akad Nikah */}
          <ScrollReveal variant="left">
            <div className="glass-card rounded-xl p-6 md:p-8">
              <div className="text-center mb-6">
                <h3 className="font-serif text-xl text-warm-white mb-2 text-glare">Akad Nikah</h3>
                <div className="w-12 h-[1px] bg-primary mx-auto" />
              </div>
              <div className="space-y-3 text-sm text-warm-white/70">
                <p className="font-medium text-warm-white text-glare-light">{formatDateToIndonesian(akadDate)}</p>
                <p>{akadTimeStart} - {akadTimeEnd} WIB</p>
                <p className="font-serif text-warm-white/80">{akadVenue}</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Resepsi */}
          <ScrollReveal variant="right">
            <div className="glass-card rounded-xl p-6 md:p-8">
              <div className="text-center mb-6">
                <h3 className="font-serif text-xl text-warm-white mb-2 text-glare">Resepsi</h3>
                <div className="w-12 h-[1px] bg-primary mx-auto" />
              </div>
              <div className="space-y-3 text-sm text-warm-white/70">
                <p className="font-medium text-warm-white text-glare-light">{formatDateToIndonesian(resepsiDate)}</p>
                <p>{resepsiTimeStart} - {resepsiTimeEnd} WIB</p>
                <p className="font-serif text-warm-white/80">{resepsiVenue}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className="text-center mt-12">
            <p className="font-serif text-lg text-warm-white mb-2 text-glare">{venueName}</p>
            <p className="text-sm text-warm-white/60 text-glare-light">{venueAddress}, {venueCity}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}