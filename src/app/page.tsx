import { createServerSupabaseClient } from '@/lib/supabase/server'
import InvitationPage from '@/components/layout/InvitationPage'
import { notFound } from 'next/navigation'

// Data default Paisal & Trias sebagai fallback jika Supabase belum terisi
const DEFAULT_INVITATION = {
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
  cover_image: null,
  music_url: null,
  video_url: null,
  theme: 'premium',
  is_published: true,
  is_active: true,
  user_id: null,
  created_at: '2026-01-01',
  updated_at: '2026-01-01',
}

const DEFAULT_STORIES = [
  { id: 's1', title: 'Pertemuan Pertama', description: 'Semua berawal saat masih duduk di bangku SMA pada tahun 2008. Mereka saling mengenal tanpa menyadari bahwa pertemuan sederhana tersebut akan menjadi awal dari kisah cinta yang begitu panjang.', year: '2008', invitation_id: 'default', order: 1, image_url: null, created_at: '' },
  { id: 's2', title: 'Jeda & Pendewasaan', description: 'Pada tahun 2017, mereka harus berpisah dan memilih jalan hidup masing-masing. Selama hampir sepuluh tahun tidak saling berkabar, masing-masing belajar tumbuh, dewasa, dan menjalani kehidupannya sendiri.', year: '2017', invitation_id: 'default', order: 2, image_url: null, created_at: '' },
  { id: 's3', title: 'Takdir Mempertemukan Kembali', description: 'Setelah sekian lama berpisah, takdir kembali mempertemukan mereka pada 28 Januari 2026.', year: '28 Januari 2026', invitation_id: 'default', order: 3, image_url: null, created_at: '' },
  { id: 's4', title: 'Mengikat Cinta Dalam Doa', description: 'Pada 24 Maret 2026, mereka memutuskan untuk kembali berjalan bersama.', year: '24 Maret 2026', invitation_id: 'default', order: 4, image_url: null, created_at: '' },
  { id: 's5', title: 'Hari Bahagia', description: 'Dengan penuh rasa syukur, pada Minggu, 6 September 2026, mereka siap memulai babak baru kehidupan.', year: '6 September 2026', invitation_id: 'default', order: 5, image_url: null, created_at: '' },
]

const DEFAULT_GIFTS = [
  { id: 'g1', bank_name: 'BRI', account_name: 'Trias Zuni Astuti', account_number: '480701006058536', invitation_id: 'default', is_active: true, created_at: '' },
  { id: 'g2', bank_name: 'BCA', account_name: 'Paisal Abdul Asis', account_number: '6640440625', invitation_id: 'default', is_active: true, created_at: '' },
]

async function getData() {
  try {
    const supabase = await createServerSupabaseClient()

    // Coba ambil data default (paisal-trias) dari Supabase
    const { data: invitation } = await supabase
      .from('invitations')
      .select('*')
      .eq('slug', 'paisal-trias')
      .eq('is_published', true)
      .single()

    if (invitation) {
      const [storiesResult, galleriesResult, giftsResult] = await Promise.all([
        supabase.from('stories').select('*').eq('invitation_id', invitation.id).order('order', { ascending: true }),
        supabase.from('galleries').select('*').eq('invitation_id', invitation.id).order('order', { ascending: true }),
        supabase.from('gifts').select('*').eq('invitation_id', invitation.id).eq('is_active', true),
      ])

      return {
        invitation,
        stories: storiesResult.data || [],
        galleries: galleriesResult.data || [],
        gifts: giftsResult.data || [],
      }
    }

    // Jika belum ada di Supabase, pakai data default
    return {
      invitation: DEFAULT_INVITATION,
      stories: DEFAULT_STORIES,
      galleries: [],
      gifts: DEFAULT_GIFTS,
    }
  } catch {
    // Fallback ke data default jika koneksi Supabase gagal
    return {
      invitation: DEFAULT_INVITATION,
      stories: DEFAULT_STORIES,
      galleries: [],
      gifts: DEFAULT_GIFTS,
    }
  }
}

export default async function HomePage() {
  const { invitation, stories, galleries, gifts } = await getData()

  return (
    <InvitationPage
      invitation={invitation}
      stories={stories}
      galleries={galleries}
      gifts={gifts}
    />
  )
}