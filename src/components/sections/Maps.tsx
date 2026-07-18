'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { MapPin, ExternalLink } from 'lucide-react'

interface MapsProps {
  venueName: string
  venueAddress: string
  mapUrl: string | null
}

export default function Maps({ venueName, venueAddress, mapUrl }: MapsProps) {
  const defaultMapUrl = 'https://maps.google.com/maps?q=' + encodeURIComponent(venueAddress)

  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden bg-warm-white">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Location</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Lokasi Acara</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-4xl mx-auto">
          <ScrollReveal variant="scale">
            <div className="bg-cream rounded-xl overflow-hidden border border-primary/10">
              {/* Map placeholder */}
              <div className="relative w-full h-[300px] md:h-[400px] bg-gradient-to-br from-cream to-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-primary/40 mx-auto mb-4" />
                  <p className="text-sm text-charcoal/50">{venueAddress}</p>
                </div>
              </div>

              {/* Info & button */}
              <div className="p-6 md:p-8 text-center">
                <h3 className="font-serif text-xl text-charcoal mb-2">{venueName}</h3>
                <p className="text-sm text-charcoal/60 mb-6">{venueAddress}</p>

                <a
                  href={mapUrl || defaultMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full hover:bg-primary-dark transition-colors"
                >
                  <MapPin size={16} />
                  Buka di Google Maps
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}