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
import Wishes from '@/components/sections/Wishes'
import Closing from '@/components/sections/Closing'
import { useScrollProgress, useAudioPlayer } from '@/hooks/useScrollReveal'
import { Heart, Music } from 'lucide-react'
import { motion } from 'framer-motion'

// Data undangan langsung dari docs/dataundangan.md
const INVITATION = {
  id: 'paisal-trias',
  slug: 'paisal-trias',
  groom_name: 'Paisal Abdul Asis, A.Md',
  groom_nickname: 'Paisal',
  groom_father: 'Ahmad Usman',
  groom_mother: 'Wahyuningsih (Almh)',
  groom_child_order: 'kedua',
  bride_name: 'Trias Zuni Astuti, A.Md',
  bride_nickname: 'Trias',
  bride_father: 'Muhtar Ahadi (Alm)',
  bride_mother: 'Asnah (Almh)',
  bride_child_order: 'ketiga',
  wedding_date: '2026-09-06',
  wedding_day: 'Minggu',
  venue_name: 'Restoran Sugeban',
  venue_address: 'Jl. Alianyang No. 38 Sungai Bangkong',
  venue_city: 'Kota Pontianak, Kalimantan Barat',
  venue_province: 'Kalimantan Barat',
  venue_map_url: 'https://maps.google.com/maps?q=Restoran+Sugeban+Pontianak',
  akad_date: '2026-09-06',
  akad_time_start: '13:00',
  akad_time_end: '15:00',
  akad_venue: 'Restoran Sugeban',
  resepsi_date: '2026-09-06',
  resepsi_time_start: '15:00',
  resepsi_time_end: '18:00',
  resepsi_venue: 'Restoran Sugeban',
  quote_ayat: '"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."',
  quote_surah: 'QS. Ar-Rum Ayat 21',
  music_url: null,
  video_url: null,
}

const STORIES = [
  { id: 's1', title: 'Pertemuan Pertama', description: 'Semua berawal saat masih duduk di bangku SMA pada tahun 2008. Mereka saling mengenal tanpa menyadari bahwa pertemuan sederhana tersebut akan menjadi awal dari kisah cinta yang begitu panjang.', year: '2008' },
  { id: 's2', title: 'Jeda & Pendewasaan', description: 'Pada tahun 2017, mereka harus berpisah dan memilih jalan hidup masing-masing. Selama hampir sepuluh tahun tidak saling berkabar, masing-masing belajar tumbuh, dewasa, dan menjalani kehidupannya sendiri.', year: '2017' },
  { id: 's3', title: 'Takdir Mempertemukan Kembali', description: 'Setelah sekian lama berpisah, takdir kembali mempertemukan mereka pada 28 Januari 2026. Pertemuan itu menjadi awal bagi kisah yang sempat terhenti untuk kembali berlanjut.', year: '28 Januari 2026' },
  { id: 's4', title: 'Mengikat Cinta Dalam Doa', description: 'Pada 24 Maret 2026, mereka memutuskan untuk kembali berjalan bersama. Dengan niat yang tulus, mereka mengikat janji dalam doa dan memilih melangkah menuju pernikahan.', year: '24 Maret 2026' },
  { id: 's5', title: 'Hari Bahagia', description: 'Dengan penuh rasa syukur, pada Minggu, 6 September 2026, mereka siap memulai babak baru kehidupan sebagai pasangan suami istri.', year: '6 September 2026' },
]

const GIFTS = [
  { id: 'g1', bank_name: 'BRI', account_name: 'Trias Zuni Astuti', account_number: '480701006058536' },
  { id: 'g2', bank_name: 'BCA', account_name: 'Paisal Abdul Asis', account_number: '6640440625' },
]

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false)
  const progress = useScrollProgress()
  const { isPlaying, togglePlay } = useAudioPlayer(null)

  const weddingDate = `${INVITATION.wedding_day}, 6 September 2026`

  const handleOpen = useCallback(() => setIsOpen(true), [])

  return (
    <>
      {/* Opening Overlay */}
      {!isOpen && (
        <Opening
          groomName={INVITATION.groom_name}
          brideName={INVITATION.bride_name}
          weddingDate={weddingDate}
          onOpen={handleOpen}
        />
      )}

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-0.5 bg-cream">
        <motion.div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </div>

      {/* Music Toggle */}
      {INVITATION.music_url && (
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
          groomName={INVITATION.groom_name}
          brideName={INVITATION.bride_name}
          weddingDate={weddingDate}
          venueName={INVITATION.venue_name}
        />

        <Quote ayat={INVITATION.quote_ayat} surah={INVITATION.quote_surah} />

        <BrideGroom
          groomName={INVITATION.groom_name}
          groomNickname={INVITATION.groom_nickname}
          groomFather={INVITATION.groom_father}
          groomMother={INVITATION.groom_mother}
          groomChildOrder={INVITATION.groom_child_order}
          brideName={INVITATION.bride_name}
          brideNickname={INVITATION.bride_nickname}
          brideFather={INVITATION.bride_father}
          brideMother={INVITATION.bride_mother}
          brideChildOrder={INVITATION.bride_child_order}
        />

        <LoveStory stories={STORIES} />
        <Gallery images={[]} />
        <Video videoUrl={INVITATION.video_url} />

        <WeddingEvent
          akadDate={INVITATION.akad_date}
          akadTimeStart={INVITATION.akad_time_start}
          akadTimeEnd={INVITATION.akad_time_end}
          akadVenue={INVITATION.akad_venue}
          resepsiDate={INVITATION.resepsi_date}
          resepsiTimeStart={INVITATION.resepsi_time_start}
          resepsiTimeEnd={INVITATION.resepsi_time_end}
          resepsiVenue={INVITATION.resepsi_venue}
          venueName={INVITATION.venue_name}
          venueAddress={INVITATION.venue_address}
          venueCity={INVITATION.venue_city}
        />

        <Countdown targetDate={INVITATION.wedding_date} />

        <Maps
          venueName={INVITATION.venue_name}
          venueAddress={INVITATION.venue_address}
          mapUrl={INVITATION.venue_map_url}
        />

        <WeddingGift gifts={GIFTS} />

        <Wishes invitationId={INVITATION.id} />

        <Closing groomName={INVITATION.groom_name} brideName={INVITATION.bride_name} />

        {/* Footer */}
        <footer className="py-8 text-center bg-warm-white border-t border-primary/5">
          <p className="text-xs text-charcoal/40 flex items-center justify-center gap-1">
            Made with <Heart size={12} className="text-primary" /> for
            <span className="font-medium text-charcoal/60">{INVITATION.groom_name} & {INVITATION.bride_name}</span>
          </p>
          <p className="text-[10px] text-charcoal/20 mt-1">
            <a href="/admin/login" className="hover:text-primary/40 transition-colors">Admin</a>
          </p>
        </footer>
      </main>
    </>
  )
}