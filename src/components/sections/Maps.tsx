'use client'

import { useState, useEffect } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'

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

    // Convert Google Maps URL to embed URL
    let embed = mapUrl

    // If it's a place URL, convert to embed
    if (mapUrl.includes('maps.google.com') || mapUrl.includes('google.com/maps')) {
      // Extract place ID or coordinates if possible
      const placeMatch = mapUrl.match(/place\/([^/]+)/)
      const queryMatch = mapUrl.match(/[?&]q=([^&]+)/)
      const llMatch = mapUrl.match(/ll=([^&]+)/)

      if (placeMatch) {
        const placeName = decodeURIComponent(placeMatch[1])
        embed = `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(placeName)}`
      } else if (queryMatch) {
        const query = decodeURIComponent(queryMatch[1])
        embed = `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(query)}`
      } else if (llMatch) {
        const coords = llMatch[1]
        embed = `https://www.google.com/maps/embed/v1/view?center=${coords}&zoom=15`
      } else {
        // Fallback: use the URL as is with embed parameter
        embed = `https://www.google.com/maps/embed?pb=${encodeURIComponent(mapUrl)}`
      }
    } else if (mapUrl.includes('goo.gl/maps')) {
      // Short URL - can't embed directly, show link instead
      setEmbedUrl(null)
      return
    }

    setEmbedUrl(embed)
  }, [mapUrl])

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
