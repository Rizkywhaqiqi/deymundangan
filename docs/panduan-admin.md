# 📋 Panduan Membuat Admin User di Supabase

## Langkah-langkah:

### 1. Buka Supabase Dashboard
Buka https://supabase.com/dashboard/project/tbdhzkvmpnqxwhtmtzwh

### 2. Buat User Admin (Authentication)
- Klik menu **Authentication** → **Users** di sidebar kiri
- Klik tombol **"Invite user"** atau **"Add user"**
- Masukkan email dan password untuk admin
- Contoh:
  - Email: `admin@deymundangan.com`
  - Password: `Admin123!` (gunakan password yang kuat)
- Klik **Create user**

### 3. Jalankan SQL Migration
- Klik menu **SQL Editor** di sidebar kiri
- Klik **New query**
- Copy paste seluruh isi file `supabase/migrations.sql` ke editor
- Klik **Run** atau **Ctrl+Enter**

### 4. Buat Profile Admin (Otomatis)
Setelah login pertama kali melalui halaman `/admin/login`, profile admin akan otomatis terbuat.

Atau jalankan SQL ini di SQL Editor untuk membuat profile manual:

```sql
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@deymundangan.com' LIMIT 1),
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
# Init git dan push ke GitHub
cd c:\laragon\www\deymundangan
git init
git add .
git commit -m "Initial commit: Wedding Invitation Premium"
git remote add origin https://github.com/Rizkywhaqiqi/deymundangan.git
git branch -M main
git push -u origin main
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