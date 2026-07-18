import { createClient } from '@/lib/supabase/client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseClient = ReturnType<typeof createClient>

// ========== INVITATION ==========

export async function getInvitationById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getAllInvitations() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
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
    .select('*')
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
    .select('*')
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
    .select('*')
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
    .select('*')
    .eq('invitation_id', invitationId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// ========== WISHES ==========

export async function getWishes(invitationId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('wishes')
    .select('*')
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
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}