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

    // Helper to check if URL is a valid Google Maps URL for embedding
    const isGoogleMapsUrl = mapUrl.includes('maps.google.com') || mapUrl.includes('google.com/maps') || mapUrl.includes('goo.gl/maps')

    if (!isGoogleMapsUrl) {
      // Not a Google Maps URL, show link button instead
      setEmbedUrl(null)
      return
    }

    // Handle goo.gl short URLs - can't embed
    if (mapUrl.includes('goo.gl/maps')) {
      setEmbedUrl(null)
      return
    }

    // Try to extract @lat,lng,zoom pattern
    const coordPattern = /@(-?\d+\.\d+),(-?\d+\.\d+)/
    const coordMatch = mapUrl.match(coordPattern)

    if (coordMatch) {
      const lat = coordMatch[1]
      const lng = coordMatch[2]
      setEmbedUrl(`https://www.google.com/maps/embed/v1/view?center=${lat},${lng}&zoom=15`)
      return
    }

    // Extract place name
    const placeMatch = mapUrl.match(/place\/([^/?]+)/)
    const queryMatch = mapUrl.match(/[?&]q=([^&]+)/)

    if (placeMatch) {
      const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '))
      setEmbedUrl(`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(placeName)}`)
      return
    }

    if (queryMatch) {
      const query = decodeURIComponent(queryMatch[1].replace(/\+/g, ' '))
      setEmbedUrl(`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(query)}`)
      return
    }

    // Fallback: show link button
    setEmbedUrl(null)
  }, [mapUrl])

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

        {mapUrl && (
          <ScrollReveal variant="scale">
            <div className="max-w-4xl mx-auto">
              {embedUrl ? (
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
              ) : (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-4 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full text-center hover:bg-primary-dark transition-colors"
                >
                  Buka Google Maps
                </a>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}