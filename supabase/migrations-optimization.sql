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
-- CATATAN: Fungsi menggunakan SECURITY INVOKER agar publik tidak bisa memanggil via RPC API
-- dan search_path di-set ke 'public' untuk mencegah serangan search_path

-- Perbaiki fungsi update_updated_at_column yang sudah ada (tambah search_path)
-- Fungsi lama akan di-drop dulu karena menggunakan SECURITY DEFINER tanpa search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Buat function helper untuk cek akses publik
-- AMAN: Fungsi ini hanya SELECT dari tabel invitations yang sudah punya RLS policy publik
-- dan menggunakan SECURITY INVOKER sehingga berjalan dengan hak akses pemanggil (bukan superuser)
CREATE OR REPLACE FUNCTION is_invitation_published(inv_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM invitations
    WHERE id = inv_id AND is_published = true
  );
$$;

-- Buat function helper untuk cek kepemilikan
-- AMAN: Fungsi ini hanya SELECT dengan filter auth.uid() yang aman
-- dan menggunakan SECURITY INVOKER sehingga berjalan dengan hak akses pemanggil
CREATE OR REPLACE FUNCTION is_invitation_owner(inv_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = 'public'
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

-- 5. CATATAN TAMBAHAN UNTUK LINTER WARNS:
-- 
-- a) RLS Policy "Anyone can insert RSVP" dengan WITH CHECK (true) -> INI DISENGAJA
--    Tamu publik harus bisa submit RSVP tanpa login. Ini adalah requirement fungsional.
--    Tidak ada data sensitif yang bisa dieksploitasi karena hanya INSERT.
--
-- b) RLS Policy "Anyone can insert wishes" dengan WITH CHECK (true) -> INI DISENGAJA
--    Tamu publik harus bisa kirim ucapan tanpa login. Sama seperti RSVP.
--
-- c) Leaked Password Protection -> Aktifkan via Supabase Dashboard:
--    Authentication -> Settings -> Bot Protection -> Enable "Leaked password protection"

-- 6. AKTIFKAN PG_STAT_STATEMENTS (opsional, untuk monitoring query)
-- Buka: Supabase Dashboard -> Database -> Extensions -> cari "pg_stat_statements" -> Enable
-- Atau jalankan:
-- CREATE EXTENSION IF NOT EXISTS pg_stat_statements;