import { createClient } from '@/lib/supabase/client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseClient = ReturnType<typeof createClient>

// ========== INVITATION ==========

// Kolom yang diperlukan untuk halaman publik
const PUBLIC_INVITATION_COLUMNS = `
  id,
  slug,
  groom_name,
  groom_nickname,
  groom_father,
  groom_mother,
  groom_child_order,
  groom_photo,
  bride_name,
  bride_nickname,
  bride_father,
  bride_mother,
  bride_child_order,
  bride_photo,
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
  backgrounds,
  theme,
  is_published,
  is_active,
  user_id,
  created_at,
  updated_at
`

// Kolom untuk dashboard admin (lebih lengkap)
const ADMIN_INVITATION_COLUMNS = '*'

export async function getInvitationById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('invitations')
    .select(PUBLIC_INVITATION_COLUMNS)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getAllInvitations() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('invitations')
    .select('id, slug, groom_name, bride_name, wedding_date, is_published, is_active, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createInvitation(invitation: Record<string, unknown>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('invitations')
    .insert(invitation as never)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateInvitation(id: string, invitation: Record<string, unknown>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('invitations')
    .update(invitation as never)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteInvitation(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('invitations')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// ========== STORIES ==========

export async function getStories(invitationId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('stories')
    .select('id, title, description, year, order, image_url')
    .eq('invitation_id', invitationId)
    .order('order', { ascending: true })

  if (error) throw error
  return data
}

export async function createStory(story: Record<string, unknown>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('stories')
    .insert(story as never)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateStory(id: string, story: Record<string, unknown>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('stories')
    .update(story as never)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteStory(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('stories')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// ========== GALLERIES ==========

export async function getGalleries(invitationId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('galleries')
    .select('id, image_url, caption, order')
    .eq('invitation_id', invitationId)
    .order('order', { ascending: true })

  if (error) throw error
  return data
}

export async function createGallery(gallery: Record<string, unknown>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('galleries')
    .insert(gallery as never)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteGallery(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('galleries')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// ========== GIFTS ==========

export async function getGifts(invitationId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('gifts')
    .select('id, bank_name, account_name, account_number')
    .eq('invitation_id', invitationId)
    .eq('is_active', true)

  if (error) throw error
  return data
}

export async function createGift(gift: Record<string, unknown>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('gifts')
    .insert(gift as never)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteGift(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('gifts')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// ========== RSVP ==========

export async function submitRSVP(rsvp: Record<string, unknown>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('rsvp')
    .insert(rsvp as never)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getRSVPs(invitationId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('rsvp')
    .select('id, guest_name, phone, is_attending, total_guests, message, created_at')
    .eq('invitation_id', invitationId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function deleteRSVP(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('rsvp')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// ========== WISHES ==========

export async function getWishes(invitationId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('wishes')
    .select('id, name, message, created_at')
    .eq('invitation_id', invitationId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function submitWish(wish: Record<string, unknown>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('wishes')
    .insert(wish as never)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function approveWish(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('wishes')
    .update({ is_approved: true } as never)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteWish(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('wishes')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// ========== AUTH ==========

export async function signIn(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signUp(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export async function getProfile(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, avatar_url, role')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}
