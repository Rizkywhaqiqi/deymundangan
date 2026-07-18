'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'

interface MapsProps {
  venueName: string
  venueAddress: string
  mapUrl: string | null
  background?: string | null
}

export default function Maps({ venueName, venueAddress, mapUrl, background }: MapsProps) {
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
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Location</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Lokasi Acara</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-2xl mx-auto text-center mb-8">
          <ScrollReveal>
            <p className="font-serif text-xl text-charcoal mb-2">{venueName}</p>
            <p className="text-sm text-charcoal/60">{venueAddress}</p>
          </ScrollReveal>
        </div>

        {mapUrl && (
          <ScrollReveal variant="scale">
            <div className="max-w-2xl mx-auto">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full text-center hover:bg-primary-dark transition-colors"
              >
                Buka Google Maps
              </a>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}