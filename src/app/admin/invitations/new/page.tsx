'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createInvitation, getCurrentUser } from '@/services/invitation'
import { Heart, ArrowLeft, Save, ChevronDown, ChevronUp, Image } from 'lucide-react'
import Link from 'next/link'
import { generateSlug } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormData = Record<string, any>

const SECTIONS = [
  { key: 'opening', label: 'Opening' },
  { key: 'hero', label: 'Hero' },
  { key: 'quote', label: 'Quote' },
  { key: 'bride_groom', label: 'Bride & Groom' },
  { key: 'love_story', label: 'Love Story' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'video', label: 'Video' },
  { key: 'wedding_event', label: 'Wedding Event' },
  { key: 'countdown', label: 'Countdown' },
  { key: 'maps', label: 'Maps' },
  { key: 'wedding_gift', label: 'Wedding Gift' },
  { key: 'wishes', label: 'Wishes' },
  { key: 'closing', label: 'Closing' },
]

function SectionAccordion({ section, value, onChange }: { section: { key: string; label: string }; value: string; onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-cream rounded-xl border border-primary/5 overflow-hidden">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-4 py-3 text-left">
        <span className="text-sm font-medium text-charcoal/70">{section.label}</span>
        {isOpen ? <ChevronUp size={16} className="text-charcoal/40" /> : <ChevronDown size={16} className="text-charcoal/40" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="px-4 pb-4 space-y-2">
            <input type="url" value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://i.ibb.co/..." className="w-full px-3 py-2 bg-white border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40" />
            {value && (
              <div className="relative group">
                <img src={value} alt={section.label} className="w-full h-24 object-cover rounded-lg border border-primary/5" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                <button type="button" onClick={() => onChange('')} className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">Hapus</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function NewInvitationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    slug: '',
    groom_name: '',
    groom_nickname: '',
    groom_father: '',
    groom_mother: '',
    groom_child_order: 'Pertama',
    groom_photo: '',
    bride_name: '',
    bride_nickname: '',
    bride_father: '',
    bride_mother: '',
    bride_child_order: 'Pertama',
    bride_photo: '',
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
    backgrounds: {},
    theme: 'premium',
    is_published: false,
    is_active: true,
    user_id: null,
  })

  useEffect(() => {
    const init = async () => {
      const user = await getCurrentUser()
      if (user) {
        setFormData((prev) => ({ ...prev, user_id: user.id }))
      }
    }
    init()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      ...(name === 'groom_name' && !prev.slug ? { slug: generateSlug(value + '-' + formData.bride_name) } : {}),
      ...(name === 'bride_name' && !prev.slug ? { slug: generateSlug(formData.groom_name + '-' + value) } : {}),
    }))
  }

  const handleBackgroundChange = (section: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      backgrounds: { ...(prev.backgrounds as Record<string, string> || {}), [section]: value },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const invitation = await createInvitation(formData)
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
            <Link href="/admin/dashboard" className="text-charcoal/30 hover:text-charcoal/70"><ArrowLeft size={20} /></Link>
            <Heart size={20} className="text-primary" />
            <span className="font-serif text-lg text-charcoal">Undangan Baru</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-8">

          {/* Basic Info */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Informasi Dasar</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Slug</label>
                <input name="slug" value={formData.slug as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tema</label>
                <select name="theme" value={formData.theme as string} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40">
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
                <input name="groom_name" value={formData.groom_name as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Panggilan</label>
                <input name="groom_nickname" value={formData.groom_nickname as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Ayah</label>
                <input name="groom_father" value={formData.groom_father as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Ibu</label>
                <input name="groom_mother" value={formData.groom_mother as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Anak Ke</label>
                <input name="groom_child_order" value={formData.groom_child_order as string} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Foto Groom (Link imgbb)</label>
                <input name="groom_photo" value={formData.groom_photo as string} onChange={handleChange} placeholder="https://i.ibb.co/..." className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40" />
              </div>
            </div>
          </section>

          {/* Bride Info */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Mempelai Wanita</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Lengkap</label>
                <input name="bride_name" value={formData.bride_name as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Panggilan</label>
                <input name="bride_nickname" value={formData.bride_nickname as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Ayah</label>
                <input name="bride_father" value={formData.bride_father as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Ibu</label>
                <input name="bride_mother" value={formData.bride_mother as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Anak Ke</label>
                <input name="bride_child_order" value={formData.bride_child_order as string} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Foto Bride (Link imgbb)</label>
                <input name="bride_photo" value={formData.bride_photo as string} onChange={handleChange} placeholder="https://i.ibb.co/..." className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40" />
              </div>
            </div>
          </section>

          {/* Wedding Info */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Informasi Pernikahan</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tanggal Pernikahan</label>
                <input type="date" name="wedding_date" value={formData.wedding_date as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Hari</label>
                <input name="wedding_day" value={formData.wedding_day as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Tempat</label>
                <input name="venue_name" value={formData.venue_name as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Alamat</label>
                <input name="venue_address" value={formData.venue_address as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Kota</label>
                <input name="venue_city" value={formData.venue_city as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Provinsi</label>
                <input name="venue_province" value={formData.venue_province as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Google Maps URL</label>
                <input name="venue_map_url" value={formData.venue_map_url as string} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" placeholder="https://maps.google.com/..." />
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
                  <input type="date" name="akad_date" value={formData.akad_date as string} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Mulai</label>
                    <input type="time" name="akad_time_start" value={formData.akad_time_start as string} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Selesai</label>
                    <input type="time" name="akad_time_end" value={formData.akad_time_end as string} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tempat</label>
                  <input name="akad_venue" value={formData.akad_venue as string} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                </div>
              </div>
              <div className="space-y-4 p-4 bg-cream rounded-lg">
                <h3 className="font-serif text-base text-charcoal">Resepsi</h3>
                <div>
                  <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tanggal</label>
                  <input type="date" name="resepsi_date" value={formData.resepsi_date as string} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Mulai</label>
                    <input type="time" name="resepsi_time_start" value={formData.resepsi_time_start as string} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Selesai</label>
                    <input type="time" name="resepsi_time_end" value={formData.resepsi_time_end as string} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tempat</label>
                  <input name="resepsi_venue" value={formData.resepsi_venue as string} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
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
                <textarea name="quote_ayat" value={formData.quote_ayat as string} onChange={handleChange} required rows={3} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40 resize-none" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Sumber Ayat</label>
                <input name="quote_surah" value={formData.quote_surah as string} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" placeholder="QS. Ar-Rum Ayat 21" />
              </div>
            </div>
          </section>

          {/* Media */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Media</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Music URL (MP3)</label>
                <input name="music_url" value={formData.music_url as string} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Video URL (YouTube)</label>
                <input name="video_url" value={formData.video_url as string} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" placeholder="https://youtube.com/..." />
              </div>
            </div>
          </section>

          {/* Background per Section */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <Image size={18} className="text-primary" />
              <h2 className="font-serif text-lg text-charcoal">Background per Section</h2>
            </div>
            <p className="text-xs text-charcoal/40 mb-6">Upload background ke imgbb.com, paste link di sini. Biarkan kosong untuk default.</p>
            <div className="space-y-2">
              {SECTIONS.map((section) => (
                <SectionAccordion
                  key={section.key}
                  section={section}
                  value={((formData.backgrounds as Record<string, string>)?.[section.key]) || ''}
                  onChange={(val) => handleBackgroundChange(section.key, val)}
                />
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4">
            <Link href="/admin/dashboard" className="px-6 py-3 text-sm text-charcoal/50 hover:text-charcoal/70 transition-colors">Batal</Link>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-3 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50">
              <Save size={16} />
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </motion.form>
      </main>
    </div>
  )
}