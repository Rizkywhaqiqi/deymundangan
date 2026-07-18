-- Upgrade untuk tampilan cinematic dengan background per section dan photo mempelai

-- Tambah kolom backgrounds (JSON) untuk background per section
ALTER TABLE invitations 
ADD COLUMN IF NOT EXISTS backgrounds JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS groom_photo TEXT,
ADD COLUMN IF NOT EXISTS bride_photo TEXT;

-- Contoh isi backgrounds:
-- {
--   "opening": "https://...",
--   "hero": "https://...",
--   "quote": "https://...",
--   "bride_groom": "https://...",
--   "love_story": "https://...",
--   "gallery": "https://...",
--   "video": "https://...",
--   "wedding_event": "https://...",
--   "countdown": "https://...",
--   "maps": "https://...",
--   "wedding_gift": "https://...",
--   "wishes": "https://...",
--   "closing": "https://..."
-- }

-- Index untuk performa
CREATE INDEX IF NOT EXISTS idx_invitations_backgrounds ON invitations USING GIN (backgrounds);