'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { getInvitationById, updateInvitation, getCurrentUser } from '@/services/invitation'
import { Heart, ArrowLeft, Save, ChevronDown, ChevronUp, Image } from 'lucide-react'
import Link from 'next/link'

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
  const [isOpen, setIsOpen] = useState(!!value)

  return (
    <div className="bg-cream rounded-xl border border-primary/5 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-medium text-charcoal/70">{section.label}</span>
        {isOpen ? <ChevronUp size={16} className="text-charcoal/40" /> : <ChevronDown size={16} className="text-charcoal/40" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4 space-y-2"
          >
            <input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://i.ibb.co/..."
              className="w-full px-3 py-2 bg-white border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40"
            />
            {value && (
              <div className="relative group">
                <img src={value} alt={section.label} className="w-full h-24 object-cover rounded-lg border border-primary/5" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Hapus
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function EditInvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [id, setId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({})

  useEffect(() => {
    const init = async () => {
      const { id: invitationId } = await params
      setId(invitationId)

      try {
        const user = await getCurrentUser()
        if (!user) {
          router.push('/admin/login')
          return
        }
        const invitation = await getInvitationById(invitationId)
        setFormData(invitation as Record<string, unknown>)
      } catch {
        router.push('/admin/dashboard')
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [params, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleBackgroundChange = (section: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      backgrounds: {
        ...((prev.backgrounds as Record<string, string>) || {}),
        [section]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    setIsSubmitting(true)

    try {
      await updateInvitation(id, formData)
      router.push('/admin/dashboard')
    } catch {
      alert('Gagal menyimpan perubahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-white">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
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
            <span className="font-serif text-lg text-charcoal">Edit Undangan</span>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full ${String(formData.is_published) === 'true' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
            {formData.is_published ? 'Published' : 'Draft'}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Quick actions */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={!!formData.is_published}
                  onChange={(e) => setFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                  className="w-4 h-4 rounded border-primary/30 text-primary focus:ring-primary"
                />
                <span className="text-sm text-charcoal/70">Publikasikan</span>
              </label>

              {!!formData.slug && (
                <a
                  href={`/${String(formData.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-primary-dark underline"
                >
                  Lihat halaman →
                </a>
              )}
            </div>
          </section>

          {/* Foto Mempelai */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <Image size={18} className="text-primary" />
              <h2 className="font-serif text-lg text-charcoal">Foto Mempelai</h2>
            </div>
            <p className="text-xs text-charcoal/40 mb-6">
              Upload foto ke <a href="https://imgbb.com" target="_blank" className="text-primary underline">imgbb.com</a>, copy link, paste di bawah.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Foto Groom</label>
                <input
                  type="url"
                  value={(formData.groom_photo as string) || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, groom_photo: e.target.value }))}
                  placeholder="https://i.ibb.co/xxx/groom.jpg"
                  className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40"
                />
                {formData.groom_photo && (
                  <div className="mt-2 relative group">
                    <img src={formData.groom_photo as string} alt="Groom" className="w-full h-40 object-cover rounded-lg border border-primary/10" />
                    <button type="button" onClick={() => setFormData((prev) => ({ ...prev, groom_photo: '' }))} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Hapus
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Foto Bride</label>
                <input
                  type="url"
                  value={(formData.bride_photo as string) || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bride_photo: e.target.value }))}
                  placeholder="https://i.ibb.co/xxx/bride.jpg"
                  className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40"
                />
                {formData.bride_photo && (
                  <div className="mt-2 relative group">
                    <img src={formData.bride_photo as string} alt="Bride" className="w-full h-40 object-cover rounded-lg border border-primary/10" />
                    <button type="button" onClick={() => setFormData((prev) => ({ ...prev, bride_photo: '' }))} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Background per Section */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <Image size={18} className="text-primary" />
              <h2 className="font-serif text-lg text-charcoal">Background per Section</h2>
            </div>
            <p className="text-xs text-charcoal/40 mb-6">
              Klik section untuk expand, paste link gambar. Biarkan kosong untuk background default.
            </p>
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

          {/* Basic Info */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Informasi Dasar</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Slug</label>
                <input name="slug" value={(formData.slug as string) || ''} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tema</label>
                <select name="theme" value={(formData.theme as string) || 'premium'} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40">
                  <option value="premium">Premium</option>
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                </select>
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 text-sm text-charcoal/50 hover:text-charcoal/70 transition-colors"
            >
              Kembali
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