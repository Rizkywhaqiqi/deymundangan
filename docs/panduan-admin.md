# 📋 Panduan Membuat Admin User di Supabase

## Langkah-langkah:

### 1. Buka Supabase Dashboard
Buka https://supabase.com/dashboard/project/tbdhzkvmpnqxwhtmtzwh

### 2. Buat User Admin (Authentication)
- Klik menu **Authentication** → **Users** di sidebar kiri
- Klik tombol **"Add user"** atau **"Invite user"**
- Masukkan email dan password untuk admin:
  - Email: `admin@deymundangan.com`
  - Password: `Admin123!`
- Klik **Create user**
- **CATAT ID USER**: Setelah user dibuat, klik user tersebut dan copy **UUID** (User ID) dari kolom `id`. Simpan ID ini, kita akan pakai di langkah 4.

### 3. Jalankan SQL Migration
- Klik menu **SQL Editor** di sidebar kiri
- Klik **New query**
- Copy paste seluruh isi file `supabase/migrations.sql` ke editor
- Klik **Run** atau **Ctrl+Enter**

### 4. Buat Profile Admin (Manual dengan ID User)
Ganti `USER_UUID_DARI_LANGKAH_2` dengan ID user yang sudah di-copy:

```sql
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  'USER_UUID_DARI_LANGKAH_2',
  'admin@deymundangan.com',
  'Admin Utama',
  'owner'
);
```

**Atau** cara mudah: jalankan query ini untuk mencari ID user terbaru:

```sql
-- Cari ID user yang baru dibuat
SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 5;

-- Lalu INSERT pakai ID tersebut
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  'ID_DARI_HASIL_QUERY_DIATAS',
  'admin@deymundangan.com',
  'Admin Utama',
  'owner'
);
```

### 5. Login ke Admin Dashboard
- Buka `http://localhost:3000/admin/login`
- Masukkan email dan password yang sudah dibuat

### 6. Buat Undangan Baru
- Setelah login, klik **"Undangan Baru"**
- Isi semua data mengacu pada file `docs/dataundangan.md`
- Klik **Simpan**
- Di halaman edit, centang **"Publikasikan"** dan simpan lagi
- Buka `http://localhost:3000/paisal-trias` untuk melihat hasilnya

---

## 🚀 Deploy ke GitHub

```bash
# Push kode ke GitHub (gunakan token)
cd c:\laragon\www\deymundangan
git remote set-url origin https://[TOKEN]@github.com/Rizkywhaqiqi/deymundangan.git
git push -u origin master
```

## ☁️ Deploy ke Vercel
1. Push kode ke GitHub
2. Buka https://vercel.com/new
3. Import repositori `Rizkywhaqiqi/deymundangan`
4. Tambahkan environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Deploy!

---

## ⚠️ Catatan Penting

Error `null value in column "id"` terjadi karena query INSERT ke tabel `profiles` harus menyertakan `id` yang valid dari `auth.users`. Pastikan:

1. User sudah dibuat di **Authentication → Users** terlebih dahulu
2. Copy **UUID** (User ID) yang muncul setelah create user
3. Gunakan UUID tersebut di query INSERT
4. Atau jalankan `SELECT id, email FROM auth.users` untuk melihat daftar user

