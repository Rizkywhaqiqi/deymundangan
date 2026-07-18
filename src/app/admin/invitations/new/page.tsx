'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createInvitation } from '@/services/invitation'
import { Heart, ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { generateSlug } from '@/lib/utils'

export default function NewInvitationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    slug: '',
    groom_name: '',
    groom_nickname: '',
    groom_father: '',
    groom_mother: '',
    groom_child_order: 'Pertama',
    bride_name: '',
    bride_nickname: '',
    bride_father: '',
    bride_mother: '',
    bride_child_order: 'Pertama',
    wedding_date: '2026-09-06',
    wedding_day: 'Minggu',
    venue_name: '',
    venue_address: '',
    venue_city: '',
    venue_province: '',
    venue_map_url: '',
    akad_date: '2026-09-06',
    akad_time_start: '13:00',
    akad_time_end: '15:00',
    akad_venue: '',
    resepsi_date: '2026-09-06',
    resepsi_time_start: '15:00',
    resepsi_time_end: '18:00',
    resepsi_venue: '',
    quote_ayat: '',
    quote_surah: '',
    cover_image: '',
    music_url: '',
    video_url: '',
    theme: 'premium',
    is_published: false,
    is_active: true,
    user_id: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'groom_name' && prev.slug === '' ? { slug: generateSlug(value + '-' + formData.bride_name) } : {}),
      ...(name === 'bride_name' && prev.slug === '' ? { slug: generateSlug(formData.groom_name + '-' + value) } : {}),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const invitation = await createInvitation(formData as never)
      router.push(`/admin/invitations/${invitation.id}`)
    } catch (err) {
      console.error(err)
      alert('Gagal membuat undangan')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-white">
      <header className="border-b border-primary/10 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-charcoal/30 hover:text-charcoal/70">
              <ArrowLeft size={20} />
            </Link>
            <Heart size={20} className="text-primary" />
            <span className="font-serif text-lg text-charcoal">Undangan Baru</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Basic Info */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Informasi Dasar</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Slug</label>
                <input name="slug" value={formData.slug} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tema</label>
                <select name="theme" value={formData.theme} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40">
                  <option value="premium">Premium</option>
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                </select>
              </div>
            </div>
          </section>

          {/* Groom Info */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Mempelai Pria</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Lengkap</label>
                <input name="groom_name" value={formData.groom_name} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Panggilan</label>
                <input name="groom_nickname" value={formData.groom_nickname} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Ayah</label>
                <input name="groom_father" value={formData.groom_father} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Ibu</label>
                <input name="groom_mother" value={formData.groom_mother} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Anak Ke</label>
                <input name="groom_child_order" value={formData.groom_child_order} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
            </div>
          </section>

          {/* Bride Info */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Mempelai Wanita</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Lengkap</label>
                <input name="bride_name" value={formData.bride_name} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Panggilan</label>
                <input name="bride_nickname" value={formData.bride_nickname} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Ayah</label>
                <input name="bride_father" value={formData.bride_father} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Ibu</label>
                <input name="bride_mother" value={formData.bride_mother} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Anak Ke</label>
                <input name="bride_child_order" value={formData.bride_child_order} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
            </div>
          </section>

          {/* Wedding Info */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Informasi Pernikahan</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tanggal Pernikahan</label>
                <input type="date" name="wedding_date" value={formData.wedding_date} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Hari</label>
                <input name="wedding_day" value={formData.wedding_day} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Tempat</label>
                <input name="venue_name" value={formData.venue_name} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Alamat</label>
                <input name="venue_address" value={formData.venue_address} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Kota</label>
                <input name="venue_city" value={formData.venue_city} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Provinsi</label>
                <input name="venue_province" value={formData.venue_province} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Google Maps URL</label>
                <input name="venue_map_url" value={formData.venue_map_url} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" placeholder="https://maps.google.com/..." />
              </div>
            </div>
          </section>

          {/* Event Times */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Waktu Acara</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4 p-4 bg-cream rounded-lg">
                <h3 className="font-serif text-base text-charcoal">Akad Nikah</h3>
                <div>
                  <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tanggal</label>
                  <input type="date" name="akad_date" value={formData.akad_date} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Mulai</label>
                    <input type="time" name="akad_time_start" value={formData.akad_time_start} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Selesai</label>
                    <input type="time" name="akad_time_end" value={formData.akad_time_end} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tempat</label>
                  <input name="akad_venue" value={formData.akad_venue} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                </div>
              </div>

              <div className="space-y-4 p-4 bg-cream rounded-lg">
                <h3 className="font-serif text-base text-charcoal">Resepsi</h3>
                <div>
                  <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tanggal</label>
                  <input type="date" name="resepsi_date" value={formData.resepsi_date} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Mulai</label>
                    <input type="time" name="resepsi_time_start" value={formData.resepsi_time_start} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Selesai</label>
                    <input type="time" name="resepsi_time_end" value={formData.resepsi_time_end} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tempat</label>
                  <input name="resepsi_venue" value={formData.resepsi_venue} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                </div>
              </div>
            </div>
          </section>

          {/* Quote */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Ayat & Kutipan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Ayat</label>
                <textarea name="quote_ayat" value={formData.quote_ayat} onChange={handleChange} required rows={3} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40 resize-none" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Sumber Ayat</label>
                <input name="quote_surah" value={formData.quote_surah} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" placeholder="QS. Ar-Rum Ayat 21" />
              </div>
            </div>
          </section>

          {/* Media */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Media</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Cover Image URL</label>
                <input name="cover_image" value={formData.cover_image} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Music URL (MP3)</label>
                <input name="music_url" value={formData.music_url} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Video URL (YouTube)</label>
                <input name="video_url" value={formData.video_url} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" placeholder="https://youtube.com/..." />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 text-sm text-charcoal/50 hover:text-charcoal/70 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </motion.form>
      </main>
    </div>
  )
}