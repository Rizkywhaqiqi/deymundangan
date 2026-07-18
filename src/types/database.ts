export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      invitations: {
        Row: Invitation
        Insert: InsertInvitation
        Update: Partial<InsertInvitation>
        Relationships: []
      }
      stories: {
        Row: Story
        Insert: InsertStory
        Update: Partial<InsertStory>
        Relationships: []
      }
      galleries: {
        Row: Gallery
        Insert: InsertGallery
        Update: Partial<InsertGallery>
        Relationships: []
      }
      events: {
        Row: Event
        Insert: InsertEvent
        Update: Partial<InsertEvent>
        Relationships: []
      }
      gifts: {
        Row: Gift
        Insert: InsertGift
        Update: Partial<InsertGift>
        Relationships: []
      }
      guests: {
        Row: Guest
        Insert: InsertGuest
        Update: Partial<InsertGuest>
        Relationships: []
      }
      rsvp: {
        Row: RsvpRow
        Insert: InsertRsvp
        Update: Partial<InsertRsvp>
        Relationships: []
      }
      wishes: {
        Row: Wish
        Insert: InsertWish
        Update: Partial<InsertWish>
        Relationships: []
      }
      profiles: {
        Row: Profile
        Insert: InsertProfile
        Update: Partial<InsertProfile>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export interface Invitation {
  id: string
  slug: string
  groom_name: string
  groom_nickname: string
  groom_father: string
  groom_mother: string
  groom_child_order: string
  bride_name: string
  bride_nickname: string
  bride_father: string
  bride_mother: string
  bride_child_order: string
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
  theme: string
  is_published: boolean
  is_active: boolean
  user_id: string | null
  created_at: string
  updated_at: string
}

export type InsertInvitation = Omit<Invitation, 'id' | 'created_at' | 'updated_at'>

export interface Story {
  id: string
  invitation_id: string
  title: string
  description: string
  year: string
  order: number
  image_url: string | null
  created_at: string
}

export type InsertStory = Omit<Story, 'id' | 'created_at'>

export interface Gallery {
  id: string
  invitation_id: string
  image_url: string
  caption: string | null
  order: number
  created_at: string
}

export type InsertGallery = Omit<Gallery, 'id' | 'created_at'>

export interface Event {
  id: string
  invitation_id: string
  type: 'akad' | 'resepsi'
  date: string
  time_start: string
  time_end: string
  venue: string
  created_at: string
}

export type InsertEvent = Omit<Event, 'id' | 'created_at'>

export interface Gift {
  id: string
  invitation_id: string
  bank_name: string
  account_name: string
  account_number: string
  is_active: boolean
  created_at: string
}

export type InsertGift = Omit<Gift, 'id' | 'created_at'>

export interface Guest {
  id: string
  invitation_id: string
  name: string
  phone: string | null
  address: string | null
  category: string | null
  is_attending: boolean | null
  created_at: string
}

export type InsertGuest = Omit<Guest, 'id' | 'created_at'>

export interface RsvpRow {
  id: string
  invitation_id: string
  guest_name: string
  phone: string
  is_attending: boolean
  total_guests: number
  message: string | null
  created_at: string
}

export type InsertRsvp = Omit<RsvpRow, 'id' | 'created_at'>

export interface Wish {
  id: string
  invitation_id: string
  name: string
  message: string
  is_approved: boolean
  created_at: string
}

export type InsertWish = Omit<Wish, 'id' | 'created_at'>

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'admin' | 'owner'
  created_at: string
  updated_at: string
}

export type InsertProfile = Omit<Profile, 'id' | 'created_at' | 'updated_at'>