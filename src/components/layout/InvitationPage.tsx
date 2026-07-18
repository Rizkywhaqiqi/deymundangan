'use client'

import { useState, useCallback } from 'react'
import Opening from '@/components/sections/Opening'
import Hero from '@/components/sections/Hero'
import Quote from '@/components/sections/Quote'
import BrideGroom from '@/components/sections/BrideGroom'
import LoveStory from '@/components/sections/LoveStory'
import Gallery from '@/components/sections/Gallery'
import Video from '@/components/sections/Video'
import WeddingEvent from '@/components/sections/WeddingEvent'
import Countdown from '@/components/sections/Countdown'
import Maps from '@/components/sections/Maps'
import WeddingGift from '@/components/sections/WeddingGift'
import RSVP from '@/components/sections/RSVP'
import Wishes from '@/components/sections/Wishes'
import Closing from '@/components/sections/Closing'
import { useScrollProgress } from '@/hooks/useScrollReveal'
import { Heart, Music } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAudioPlayer } from '@/hooks/useScrollReveal'

interface StoryData {
  id: string
  title: string
  description: string
  year: string
}

interface GalleryData {
  id: string
  image_url: string
  caption: string | null
}

interface GiftData {
  id: string
  bank_name: string
  account_name: string
  account_number: string
}

export interface InvitationData {
  id: string
  slug: string
  groom_name: string
  groom_nickname: string
  groom_father: string
  groom_mother: string
  groom_child_order: string
  groom_photo?: string | null
  bride_name: string
  bride_nickname: string
  bride_father: string
  bride_mother: string
  bride_child_order: string
  bride_photo?: string | null
  wedding_date: string
  wedding_day: string
  venue_name: string
  venue_address: string
  venue_city: string
  venue_province: string
  venue_map_url: string | null
  akad_date: string
  akad_time_start: string
  akad_time_end: string
  akad_venue: string
  resepsi_date: string
  resepsi_time_start: string
  resepsi_time_end: string
  resepsi_venue: string
  quote_ayat: string
  quote_surah: string
  cover_image: string | null
  music_url: string | null
  video_url: string | null
  backgrounds?: Record<string, string> | null
  theme: string
  is_published: boolean
  is_active: boolean
  user_id: string | null
  created_at: string
  updated_at: string
}

interface InvitationPageProps {
  invitation: InvitationData
  stories: StoryData[]
  galleries: GalleryData[]
  gifts: GiftData[]
}

export default function InvitationPage({ invitation, stories, galleries, gifts }: InvitationPageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const progress = useScrollProgress()
  const { isPlaying, togglePlay, isValid } = useAudioPlayer(invitation.music_url)
  const bg = invitation.backgrounds || {}

  const weddingDate = `${invitation.wedding_day}, ${new Date(invitation.wedding_date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    // Auto play music after user interaction
    if (invitation.music_url) {
      setTimeout(() => togglePlay(), 100)
    }
  }, [invitation.music_url, togglePlay])

  return (
    <>
      {/* Opening Overlay */}
      {!isOpen && (
        <Opening
          groomName={invitation.groom_name}
          brideName={invitation.bride_name}
          weddingDate={weddingDate}
          onOpen={handleOpen}
          background={bg.opening}
        />
      )}

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-0.5 bg-cream">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Music Toggle */}
      {invitation.music_url && (
        <button
          onClick={togglePlay}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary/90 text-charcoal flex items-center justify-center shadow-lg hover:bg-primary transition-colors"
        >
          <Music size={20} className={isPlaying ? 'animate-pulse' : ''} />
        </button>
      )}

      {/* Main Content */}
      <main className={isOpen ? 'block' : 'hidden'}>
        <Hero
          groomName={invitation.groom_name}
          brideName={invitation.bride_name}
          weddingDate={weddingDate}
          venueName={invitation.venue_name}
          background={bg.hero}
        />

        <Quote
          ayat={invitation.quote_ayat}
          surah={invitation.quote_surah}
          background={bg.quote}
        />

        <BrideGroom
          groomName={invitation.groom_name}
          groomNickname={invitation.groom_nickname}
          groomFather={invitation.groom_father}
          groomMother={invitation.groom_mother}
          groomChildOrder={invitation.groom_child_order}
          groomPhoto={invitation.groom_photo}
          brideName={invitation.bride_name}
          brideNickname={invitation.bride_nickname}
          brideFather={invitation.bride_father}
          brideMother={invitation.bride_mother}
          brideChildOrder={invitation.bride_child_order}
          bridePhoto={invitation.bride_photo}
          background={bg.bride_groom}
        />

        <LoveStory stories={stories} background={bg.love_story} />
        <Gallery images={galleries} background={bg.gallery} />

        <Video videoUrl={invitation.video_url} background={bg.video} />

        <WeddingEvent
          akadDate={invitation.akad_date}
          akadTimeStart={invitation.akad_time_start}
          akadTimeEnd={invitation.akad_time_end}
          akadVenue={invitation.akad_venue}
          resepsiDate={invitation.resepsi_date}
          resepsiTimeStart={invitation.resepsi_time_start}
          resepsiTimeEnd={invitation.resepsi_time_end}
          resepsiVenue={invitation.resepsi_venue}
          venueName={invitation.venue_name}
          venueAddress={invitation.venue_address}
          venueCity={invitation.venue_city}
          background={bg.wedding_event}
        />

        <Countdown targetDate={invitation.wedding_date} background={bg.countdown} />

        <Maps
          venueName={invitation.venue_name}
          venueAddress={invitation.venue_address}
          mapUrl={invitation.venue_map_url}
          background={bg.maps}
        />

        <WeddingGift gifts={gifts} background={bg.wedding_gift} />
        <RSVP invitationId={invitation.id} background={bg.wishes} />
        <Wishes invitationId={invitation.id} background={bg.wishes} />

        <Closing
          groomName={invitation.groom_name}
          brideName={invitation.bride_name}
          background={bg.closing}
        />

        {/* Footer */}
        <footer className="py-8 text-center bg-warm-white border-t border-primary/5">
          <p className="text-xs text-charcoal/40 flex items-center justify-center gap-1">
            Made with <Heart size={12} className="text-primary" /> for
            <span className="font-medium text-charcoal/60">{invitation.groom_name} & {invitation.bride_name}</span>
          </p>
        </footer>
      </main>
    </>
  )
}