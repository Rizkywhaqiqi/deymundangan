-- ========================================
-- OPTIMASI PERFORMANCE SUPPABASE FREE TIER
-- ========================================

-- 1. PARTIAL INDEXES (mengurangi ukuran index & mempercepat query)
-- Index hanya untuk data yang sering di-query

-- Hanya index untuk undangan yang dipublikasi (yang sering diakses publik)
CREATE INDEX IF NOT EXISTS idx_invitations_published
ON invitations(id, slug, groom_name, bride_name, wedding_date)
WHERE is_published = true;

-- Hanya index untuk wishes yang sudah disetujui (yang tampil di publik)
CREATE INDEX IF NOT EXISTS idx_wishes_approved
ON wishes(invitation_id, created_at DESC)
WHERE is_approved = true;

-- Index untuk pagination wishes (tanpa is_approved filter karena sudah partial)
CREATE INDEX IF NOT EXISTS idx_wishes_pagination
ON wishes(invitation_id, created_at DESC)
WHERE is_approved = true;

-- Hanya index untuk gifts yang aktif
CREATE INDEX IF NOT EXISTS idx_gifts_active
ON gifts(invitation_id, bank_name)
WHERE is_active = true;

-- 2. HAPUS INDEX LAMA YANG SUDAH TIDAK EFISIEN
-- Index umum diganti dengan partial index yang lebih spesifik
DROP INDEX IF EXISTS idx_wishes_invitation_id;

-- 3. OPTIMASI RLS POLICIES - ganti subquery dengan security definer functions

-- Buat function helper untuk cek akses publik (lebih cepat daripada subquery)
CREATE OR REPLACE FUNCTION is_invitation_published(inv_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM invitations
    WHERE id = inv_id AND is_published = true
  );
$$;

-- Buat function helper untuk cek kepemilikan (lebih cepat daripada subquery)
CREATE OR REPLACE FUNCTION is_invitation_owner(inv_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM invitations
    WHERE id = inv_id AND user_id = auth.uid()
  );
$$;

-- 4. UPDATE RLS POLICIES menggunakan function helper
-- (Catatan: policies baru akan replace yang lama saat migration dijalankan ulang)

-- Stories: tampilkan jika published atau owner
DROP POLICY IF EXISTS "Stories viewable by everyone" ON stories;
CREATE POLICY "Stories viewable by everyone" ON stories
  FOR SELECT USING (
    is_invitation_published(invitation_id) OR is_invitation_owner(invitation_id)
  );

-- Galleries: tampilkan jika published atau owner
DROP POLICY IF EXISTS "Galleries viewable by everyone" ON galleries;
CREATE POLICY "Galleries viewable by everyone" ON galleries
  FOR SELECT USING (
    is_invitation_published(invitation_id) OR is_invitation_owner(invitation_id)
  );

-- Events: tampilkan jika published atau owner
DROP POLICY IF EXISTS "Events viewable by everyone" ON events;
CREATE POLICY "Events viewable by everyone" ON events
  FOR SELECT USING (
    is_invitation_published(invitation_id) OR is_invitation_owner(invitation_id)
  );

-- Gifts: tampilkan jika published atau owner
DROP POLICY IF EXISTS "Gifts viewable by everyone" ON gifts;
CREATE POLICY "Gifts viewable by everyone" ON gifts
  FOR SELECT USING (
    is_invitation_published(invitation_id) OR is_invitation_owner(invitation_id)
  );

-- Guests: tampilkan jika published atau owner
DROP POLICY IF EXISTS "Guests viewable by everyone" ON guests;
CREATE POLICY "Guests viewable by everyone" ON guests
  FOR SELECT USING (
    is_invitation_published(invitation_id) OR is_invitation_owner(invitation_id)
  );

-- RSVP: viewable by owner
DROP POLICY IF EXISTS "RSVP viewable by invitation owner" ON rsvp;
CREATE POLICY "RSVP viewable by invitation owner" ON rsvp
  FOR SELECT USING (is_invitation_owner(invitation_id));

-- Wishes: approved wishes viewable by everyone
DROP POLICY IF EXISTS "Approved wishes viewable by everyone" ON wishes;
CREATE POLICY "Approved wishes viewable by everyone" ON wishes
  FOR SELECT USING (
    is_approved = true OR is_invitation_owner(invitation_id)
  );

-- 5. REKOMENDASI: Aktifkan pg_stat_statements untuk monitoring query performance
-- (Hanya bisa diaktifkan via Supabase Dashboard -> Database -> Extensions)
-- CREATE EXTENSION IF NOT EXISTS pg_stat_statements;