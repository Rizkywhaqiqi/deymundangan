# 🔑 Reset Password Admin

## Langkah 1: Buka SQL Editor
Buka link ini: https://supabase.com/dashboard/project/tbdhzkvmpnqxwhtmtzwh/sql/new

## Langkah 2: Copy Paste Query di Bawah Ini

```sql
-- Reset password admin menjadi: admin123
UPDATE auth.users 
SET encrypted_password = crypt('admin123', gen_salt('bf'))
WHERE email = 'admin@deymundangan.com';

-- Buat profile admin (jika belum ada)
INSERT INTO profiles (id, email, full_name, role)
SELECT id, email, 'Admin Utama', 'owner'
FROM auth.users WHERE email = 'admin@deymundangan.com'
ON CONFLICT (id) DO NOTHING;
```

## Langkah 3: Klik "Run" atau Ctrl+Enter

## Langkah 4: Login ke Admin
Buka: https://triaspaisalwedding.vercel.app/admin/login
- Email: `admin@deymundangan.com`
- Password: `admin123`

## Catatan:
- Password baru adalah `admin123`
- Setelah login, segera ganti password di halaman profile admin
- Jika masih error, cek console browser (F12) untuk melihat error detail