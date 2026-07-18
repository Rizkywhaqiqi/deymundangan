-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'owner' CHECK (role IN ('admin', 'owner')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Invitations table
CREATE TABLE IF NOT EXISTS invitations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  groom_name TEXT NOT NULL,
  groom_nickname TEXT NOT NULL,
  groom_father TEXT NOT NULL,
  groom_mother TEXT NOT NULL,
  groom_child_order TEXT DEFAULT 'Pertama',
  bride_name TEXT NOT NULL,
  bride_nickname TEXT NOT NULL,
  bride_father TEXT NOT NULL,
  bride_mother TEXT NOT NULL,
  bride_child_order TEXT DEFAULT 'Pertama',
  wedding_date DATE NOT NULL,
  wedding_day TEXT NOT NULL,
  venue_name TEXT NOT NULL,
  venue_address TEXT NOT NULL,
  venue_city TEXT NOT NULL,
  venue_province TEXT NOT NULL,
  venue_map_url TEXT,
  akad_date DATE NOT NULL,
  akad_time_start TIME NOT NULL,
  akad_time_end TIME NOT NULL,
  akad_venue TEXT NOT NULL,
  resepsi_date DATE NOT NULL,
  resepsi_time_start TIME NOT NULL,
  resepsi_time_end TIME NOT NULL,
  resepsi_venue TEXT NOT NULL,
  quote_ayat TEXT NOT NULL,
  quote_surah TEXT NOT NULL,
  cover_image TEXT,
  music_url TEXT,
  video_url TEXT,
  theme TEXT DEFAULT 'premium',
  is_published BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Stories table (Love Story timeline)
CREATE TABLE IF NOT EXISTS stories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  year TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Galleries table
CREATE TABLE IF NOT EXISTS galleries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  type TEXT CHECK (type IN ('akad', 'resepsi')) NOT NULL,
  date DATE NOT NULL,
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  venue TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Gifts table (Bank & QRIS info)
CREATE TABLE IF NOT EXISTS gifts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  bank_name TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Guests table
CREATE TABLE IF NOT EXISTS guests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  category TEXT,
  is_attending BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RSVP table
CREATE TABLE IF NOT EXISTS rsvp (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  guest_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_attending BOOLEAN NOT NULL,
  total_guests INTEGER DEFAULT 1,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Wishes table (Guest Book)
CREATE TABLE IF NOT EXISTS wishes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_invitations_slug ON invitations(slug);
CREATE INDEX IF NOT EXISTS idx_invitations_user_id ON invitations(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_invitation_id ON stories(invitation_id);
CREATE INDEX IF NOT EXISTS idx_galleries_invitation_id ON galleries(invitation_id);
CREATE INDEX IF NOT EXISTS idx_events_invitation_id ON events(invitation_id);
CREATE INDEX IF NOT EXISTS idx_gifts_invitation_id ON gifts(invitation_id);
CREATE INDEX IF NOT EXISTS idx_guests_invitation_id ON guests(invitation_id);
CREATE INDEX IF NOT EXISTS idx_rsvp_invitation_id ON rsvp(invitation_id);
CREATE INDEX IF NOT EXISTS idx_wishes_invitation_id ON wishes(invitation_id);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- Hapus policy yang sudah ada (jika ada) lalu buat ulang
-- Profiles policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Invitations policies
DROP POLICY IF EXISTS "Published invitations viewable by everyone" ON invitations;
DROP POLICY IF EXISTS "Users can insert invitations" ON invitations;
DROP POLICY IF EXISTS "Users can update own invitations" ON invitations;
DROP POLICY IF EXISTS "Users can delete own invitations" ON invitations;

CREATE POLICY "Published invitations viewable by everyone" ON invitations
  FOR SELECT USING (is_published = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert invitations" ON invitations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own invitations" ON invitations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own invitations" ON invitations
  FOR DELETE USING (auth.uid() = user_id);

-- Stories policies
DROP POLICY IF EXISTS "Stories viewable by everyone" ON stories;
DROP POLICY IF EXISTS "Users can manage stories" ON stories;

CREATE POLICY "Stories viewable by everyone" ON stories
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM invitations WHERE id = stories.invitation_id AND (is_published = true OR user_id = auth.uid())
  ));

CREATE POLICY "Users can manage stories" ON stories
  FOR ALL USING (EXISTS (
    SELECT 1 FROM invitations WHERE id = stories.invitation_id AND user_id = auth.uid()
  ));

-- Galleries policies
DROP POLICY IF EXISTS "Galleries viewable by everyone" ON galleries;
DROP POLICY IF EXISTS "Users can manage galleries" ON galleries;

CREATE POLICY "Galleries viewable by everyone" ON galleries
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM invitations WHERE id = galleries.invitation_id AND (is_published = true OR user_id = auth.uid())
  ));

CREATE POLICY "Users can manage galleries" ON galleries
  FOR ALL USING (EXISTS (
    SELECT 1 FROM invitations WHERE id = galleries.invitation_id AND user_id = auth.uid()
  ));

-- Events policies
DROP POLICY IF EXISTS "Events viewable by everyone" ON events;
DROP POLICY IF EXISTS "Users can manage events" ON events;

CREATE POLICY "Events viewable by everyone" ON events
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM invitations WHERE id = events.invitation_id AND (is_published = true OR user_id = auth.uid())
  ));

CREATE POLICY "Users can manage events" ON events
  FOR ALL USING (EXISTS (
    SELECT 1 FROM invitations WHERE id = events.invitation_id AND user_id = auth.uid()
  ));

-- Gifts policies
DROP POLICY IF EXISTS "Gifts viewable by everyone" ON gifts;
DROP POLICY IF EXISTS "Users can manage gifts" ON gifts;

CREATE POLICY "Gifts viewable by everyone" ON gifts
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM invitations WHERE id = gifts.invitation_id AND (is_published = true OR user_id = auth.uid())
  ));

CREATE POLICY "Users can manage gifts" ON gifts
  FOR ALL USING (EXISTS (
    SELECT 1 FROM invitations WHERE id = gifts.invitation_id AND user_id = auth.uid()
  ));

-- Guests policies
DROP POLICY IF EXISTS "Guests viewable by everyone" ON guests;
DROP POLICY IF EXISTS "Users can manage guests" ON guests;

CREATE POLICY "Guests viewable by everyone" ON guests
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM invitations WHERE id = guests.invitation_id AND (is_published = true OR user_id = auth.uid())
  ));

CREATE POLICY "Users can manage guests" ON guests
  FOR ALL USING (EXISTS (
    SELECT 1 FROM invitations WHERE id = guests.invitation_id AND user_id = auth.uid()
  ));

-- RSVP policies
DROP POLICY IF EXISTS "Anyone can insert RSVP" ON rsvp;
DROP POLICY IF EXISTS "RSVP viewable by invitation owner" ON rsvp;

CREATE POLICY "Anyone can insert RSVP" ON rsvp
  FOR INSERT WITH CHECK (true);

CREATE POLICY "RSVP viewable by invitation owner" ON rsvp
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM invitations WHERE id = rsvp.invitation_id AND user_id = auth.uid()
  ));

-- Wishes policies
DROP POLICY IF EXISTS "Anyone can insert wishes" ON wishes;
DROP POLICY IF EXISTS "Approved wishes viewable by everyone" ON wishes;
DROP POLICY IF EXISTS "Users can manage wishes" ON wishes;

CREATE POLICY "Anyone can insert wishes" ON wishes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Approved wishes viewable by everyone" ON wishes
  FOR SELECT USING (is_approved = true OR EXISTS (
    SELECT 1 FROM invitations WHERE id = wishes.invitation_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can manage wishes" ON wishes
  FOR ALL USING (EXISTS (
    SELECT 1 FROM invitations WHERE id = wishes.invitation_id AND user_id = auth.uid()
  ));

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_invitations_updated_at
  BEFORE UPDATE ON invitations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();