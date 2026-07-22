import { createServerSupabaseClient } from '@/lib/supabase/server'

// Kolom yang diperlukan untuk halaman publik dan metadata
const PUBLIC_INVITATION_COLUMNS = `
  id,
  slug,
  groom_name,
  groom_nickname,
  groom_father,
  groom_mother,
  groom_child_order,
  bride_name,
  bride_nickname,
  bride_father,
  bride_mother,
  bride_child_order,
  wedding_date,
  wedding_day,
  venue_name,
  venue_address,
  venue_city,
  venue_province,
  venue_map_url,
  akad_date,
  akad_time_start,
  akad_time_end,
  akad_venue,
  resepsi_date,
  resepsi_time_start,
  resepsi_time_end,
  resepsi_venue,
  quote_ayat,
  quote_surah,
  cover_image,
  music_url,
  video_url,
  theme,
  is_published,
  is_active,
  user_id,
  created_at,
  updated_at
`

export async function getInvitationBySlug(slug: string) {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('invitations')
    .select(PUBLIC_INVITATION_COLUMNS)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) throw error
  return data
}
