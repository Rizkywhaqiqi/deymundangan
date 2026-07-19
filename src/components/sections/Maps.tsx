'use client'

import { useState, useEffect } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BackgroundMedia from '@/components/ui/BackgroundMedia'

interface MapsProps {
  venueName: string
  venueAddress: string
  mapUrl: string | null
  background?: string | null
}

export default function Maps({ venueName, venueAddress, mapUrl, background }: MapsProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!mapUrl) {
      setEmbedUrl(null)
      return
    }

    // Detect if it's a Google Maps URL
    const isMapsUrl = mapUrl.includes('maps.google.com') || mapUrl.includes('google.com/maps') || mapUrl.includes('goo.gl/maps')

    if (!isMapsUrl) {
      // Not a Google Maps URL - show link button
      setEmbedUrl(null)
      return
    }

    // Try to extract location from URL first
    let location = ''

    // Extract coordinates (@lat,lng)
    const coordMatch = mapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
    if (coordMatch) {
      location = `${coordMatch[1]},${coordMatch[2]}`
      setEmbedUrl(`https://maps.google.com/maps?q=${location}&t=&z=15&ie=UTF8&iwloc=&output=embed`)
      return
    }

    // Extract place name from /place/NAME
    const placeMatch = mapUrl.match(/place\/([^/?]+)/)
    if (placeMatch) {
      location = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '))
      setEmbedUrl(`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`)
      return
    }

    // Extract from ?q=QUERY
    const queryMatch = mapUrl.match(/[?&]q=([^&]+)/)
    if (queryMatch) {
      location = decodeURIComponent(queryMatch[1].replace(/\+/g, ' '))
      setEmbedUrl(`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`)
      return
    }

    // Fallback: use the venue name as search query
    if (venueName) {
      setEmbedUrl(`https://maps.google.com/maps?q=${encodeURIComponent(venueName + ', ' + venueAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`)
      return
    }

    // If nothing works, show link button
    setEmbedUrl(null)
  }, [mapUrl, venueName, venueAddress])

  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      <BackgroundMedia url={background} />
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

        {embedUrl && (
          <ScrollReveal variant="scale">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                />
              </div>
              <div className="text-center">
                <a
                  href={mapUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full text-center hover:bg-primary-dark transition-colors"
                >
                  Buka Google Maps
                </a>
              </div>
            </div>
          </ScrollReveal>
        )}

        {!embedUrl && mapUrl && (
          <ScrollReveal variant="scale">
            <div className="max-w-lg mx-auto">
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