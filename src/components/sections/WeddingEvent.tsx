'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { formatDate, formatTime } from '@/lib/utils'

interface EventDetail {
  type: string
  date: string
  time_start: string
  time_end: string
  venue: string
}

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
}: WeddingEventProps) {
  const events = [
    {
      title: 'Akad Nikah',
      date: akadDate,
      time: `${formatTime(akadTimeStart)} - ${formatTime(akadTimeEnd)}`,
      venue: akadVenue,
      icon: '🤍',
    },
    {
      title: 'Resepsi',
      date: resepsiDate,
      time: `${formatTime(resepsiTimeStart)} - ${formatTime(resepsiTimeEnd)}`,
      venue: resepsiVenue,
      icon: '🎉',
    },
  ]

  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden bg-cream">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Wedding Event</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Acara Pernikahan</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <ScrollReveal
                key={event.title}
                variant={index === 0 ? 'left' : 'right'}
                delay={index * 200}
              >
                <div className="bg-warm-white p-8 md:p-10 rounded-xl shadow-sm border border-primary/5 text-center h-full">
                  <span className="text-4xl mb-4 block">{event.icon}</span>
                  <h3 className="font-serif text-2xl text-charcoal mb-6">{event.title}</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3">
                      <Calendar size={16} className="text-primary" />
                      <span className="text-sm text-charcoal/70">
                        {formatDate(event.date)}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <Clock size={16} className="text-primary" />
                      <span className="text-sm text-charcoal/70">
                        {event.time} WIB
                      </span>
                    </div>

                    <div className="flex items-start justify-center gap-3">
                      <MapPin size={16} className="text-primary mt-0.5" />
                      <span className="text-sm text-charcoal/70">
                        {event.venue}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Venue info */}
          <ScrollReveal delay={400}>
            <div className="mt-12 text-center bg-warm-white p-8 rounded-xl shadow-sm border border-primary/5">
              <MapPin size={20} className="text-primary mx-auto mb-3" />
              <h4 className="font-serif text-lg text-charcoal mb-2">{venueName}</h4>
              <p className="text-sm text-charcoal/60">{venueAddress}</p>
              <p className="text-sm text-charcoal/50">{venueCity}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}