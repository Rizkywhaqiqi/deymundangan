'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { getInvitationById, updateInvitation, getCurrentUser, getStories, createStory, updateStory, deleteStory, getGalleries, createGallery, deleteGallery } from '@/services/invitation'
import { Heart, ArrowLeft, Save, ChevronDown, ChevronUp, Image, Plus, Trash2, Edit } from 'lucide-react'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormData = Record<string, any>

interface Story {
  id: string
  title: string
  description: string
  year: string
  order: number
}

interface Gallery {
  id: string
  image_url: string
  caption: string | null
  order: number
}

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
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-4 py-3 text-left">
        <span className="text-sm font-medium text-charcoal/70">{section.label}</span>
        {isOpen ? <ChevronUp size={16} className="text-charcoal/40" /> : <ChevronDown size={16} className="text-charcoal/40" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="px-4 pb-4 space-y-2">
            <input type="url" value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://i.ibb.co/... atau https://...mp4" className="w-full px-3 py-2 bg-white border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40" />
            {value && (
              <div className="relative group">
                {value.match(/\.(mp4|webm|ogg|mov)$/i) || value.includes('youtube.com') || value.includes('youtu.be') ? (
                  <video className="w-full h-24 object-cover rounded-lg border border-primary/5" muted autoPlay loop>
                    <source src={value} type="video/mp4" />
                  </video>
                ) : (
                  <img src={value} alt={section.label} className="w-full h-24 object-cover rounded-lg border border-primary/5" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                )}
                <button type="button" onClick={() => onChange('')} className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">Hapus</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function StoryItem({ story, onUpdate, onDelete }: { story: Story; onUpdate: (story: Story) => void; onDelete: (id: string) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ title: story.title, description: story.description, year: story.year })

  const handleSave = () => {
    onUpdate({ ...story, ...editData })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="p-4 bg-cream rounded-lg space-y-3">
        <input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} placeholder="Judul" className="w-full px-3 py-2 bg-white border border-primary/10 rounded-lg text-sm" />
        <textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} rows={3} placeholder="Deskripsi" className="w-full px-3 py-2 bg-white border border-primary/10 rounded-lg text-sm resize-none" />
        <input type="number" value={editData.year} onChange={(e) => setEditData({ ...editData, year: e.target.value })} placeholder="Tahun" className="w-full px-3 py-2 bg-white border border-primary/10 rounded-lg text-sm" />
        <div className="flex gap-2">
          <button type="button" onClick={handleSave} className="px-3 py-1.5 bg-primary text-charcoal text-xs rounded-full">Simpan</button>
          <button type="button" onClick={() => setIsEditing(false)} className="px-3 py-1.5 bg-charcoal/10 text-charcoal text-xs rounded-full">Batal</button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-cream rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-serif text-sm text-charcoal">{story.title}</h4>
            <span className="text-xs text-charcoal/40">({story.year})</span>
          </div>
          <p className="text-xs text-charcoal/60 line-clamp-2">{story.description}</p>
        </div>
        <div className="flex gap-1 ml-2">
          <button type="button" onClick={() => setIsEditing(true)} className="p-1.5 text-charcoal/40 hover:text-primary transition-colors">
            <Edit size={14} />
          </button>
          <button type="button" onClick={() => onDelete(story.id)} className="p-1.5 text-charcoal/40 hover:text-red-500 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

function GalleryItem({ gallery, onDelete }: { gallery: Gallery; onDelete: (id: string) => void }) {
  return (
    <div className="relative group">
      <img src={gallery.image_url} alt={gallery.caption || 'Gallery'} className="w-full h-48 object-cover rounded-lg border border-primary/10" />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        <button type="button" onClick={() => onDelete(gallery.id)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
      {gallery.caption && <p className="text-xs text-charcoal/60 mt-2 line-clamp-2">{gallery.caption}</p>}
    </div>
  )
}

export default function EditInvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [id, setId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({})
  const [stories, setStories] = useState<Story[]>([])
  const [newStory, setNewStory] = useState({ title: '', description: '', year: '' })
  const [isAddingStory, setIsAddingStory] = useState(false)
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [newGallery, setNewGallery] = useState({ image_url: '', caption: '' })
  const [isAddingGallery, setIsAddingGallery] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { id: invitationId } = await params
      setId(invitationId)
      try {
        const user = await getCurrentUser()
        if (!user) { router.push('/admin/login'); return }
        const invitation = await getInvitationById(invitationId)
        setFormData(invitation as FormData)
        const storiesData = await getStories(invitationId)
        setStories((storiesData as Story[]) || [])
        const galleriesData = await getGalleries(invitationId)
        setGalleries((galleriesData as Gallery[]) || [])
      } catch { router.push('/admin/dashboard') }
      finally { setIsLoading(false) }
    }
    init()
  }, [params, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  const handleBackgroundChange = (section: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      backgrounds: { ...(prev.backgrounds as Record<string, string> || {}), [section]: value },
    }))
  }

  const handleAddStory = async () => {
    if (!id || !newStory.title || !newStory.description || !newStory.year) return
    try {
      const story = await createStory({
        invitation_id: id,
        ...newStory,
        order: stories.length,
      })
      setStories([...stories, story as Story])
      setNewStory({ title: '', description: '', year: '' })
      setIsAddingStory(false)
    } catch (error) {
      console.error('Error creating story:', error)
    }
  }

  const handleUpdateStory = async (updatedStory: Story) => {
    try {
      await updateStory(updatedStory.id, updatedStory as unknown as Record<string, unknown>)
      setStories(stories.map((s) => (s.id === updatedStory.id ? updatedStory : s)))
    } catch (error) {
      console.error('Error updating story:', error)
    }
  }

  const handleDeleteStory = async (storyId: string) => {
    try {
      await deleteStory(storyId)
      setStories(stories.filter((s) => s.id !== storyId))
    } catch (error) {
      console.error('Error deleting story:', error)
    }
  }

  const handleAddGallery = async () => {
    if (!id || !newGallery.image_url) return
    try {
      const gallery = await createGallery({
        invitation_id: id,
        image_url: newGallery.image_url,
        caption: newGallery.caption,
        order: galleries.length,
      })
      setGalleries([...galleries, gallery as Gallery])
      setNewGallery({ image_url: '', caption: '' })
      setIsAddingGallery(false)
    } catch (error) {
      console.error('Error creating gallery:', error)
    }
  }

  const handleDeleteGallery = async (galleryId: string) => {
    try {
      await deleteGallery(galleryId)
      setGalleries(galleries.filter((g) => g.id !== galleryId))
    } catch (error) {
      console.error('Error deleting gallery:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    setIsSubmitting(true)
    try {
      await updateInvitation(id, formData)
      router.push('/admin/dashboard')
    } catch { alert('Gagal menyimpan perubahan') }
    finally { setIsSubmitting(false) }
  }

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-warm-white">
      <header className="border-b border-primary/10 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-charcoal/30 hover:text-charcoal/70"><ArrowLeft size={20} /></Link>
            <Heart size={20} className="text-primary" />
            <span className="font-serif text-lg text-charcoal">Edit Undangan</span>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full ${formData.is_published ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
            {formData.is_published ? 'Published' : 'Draft'}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-8">

          {/* Quick Actions */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_published" checked={!!formData.is_published} onChange={(e) => setFormData((prev) => ({ ...prev, is_published: e.target.checked }))} className="w-4 h-4 rounded border-primary/30 text-primary focus:ring-primary" />
                <span className="text-sm text-charcoal/70">Publikasikan</span>
              </label>
              {formData.slug && (
                <a href={`/${String(formData.slug)}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:text-primary-dark underline">
                  Lihat halaman →
                </a>
              )}
            </div>
          </section>

          {/* Basic Info */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Informasi Dasar</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Slug</label>
                <input name="slug" value={(formData.slug as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
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

          {/* Groom Info */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Mempelai Pria</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Lengkap</label>
                <input name="groom_name" value={(formData.groom_name as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Panggilan</label>
                <input name="groom_nickname" value={(formData.groom_nickname as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Ayah</label>
                <input name="groom_father" value={(formData.groom_father as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Ibu</label>
                <input name="groom_mother" value={(formData.groom_mother as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Anak Ke</label>
                <input name="groom_child_order" value={(formData.groom_child_order as string) || 'Pertama'} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Foto Groom (Link)</label>
                <input name="groom_photo" value={(formData.groom_photo as string) || ''} onChange={handleChange} placeholder="https://i.ibb.co/..." className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40" />
              </div>
            </div>
          </section>

          {/* Bride Info */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Mempelai Wanita</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Lengkap</label>
                <input name="bride_name" value={(formData.bride_name as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Panggilan</label>
                <input name="bride_nickname" value={(formData.bride_nickname as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Ayah</label>
                <input name="bride_father" value={(formData.bride_father as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Nama Ibu</label>
                <input name="bride_mother" value={(formData.bride_mother as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Anak Ke</label>
                <input name="bride_child_order" value={(formData.bride_child_order as string) || 'Pertama'} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Foto Bride (Link)</label>
                <input name="bride_photo" value={(formData.bride_photo as string) || ''} onChange={handleChange} placeholder="https://i.ibb.co/..." className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40" />
              </div>
            </div>
          </section>

          {/* Wedding Info */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Informasi Pernikahan</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tanggal</label>
                <input type="date" name="wedding_date" value={(formData.wedding_date as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Hari</label>
                <input name="wedding_day" value={(formData.wedding_day as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tempat</label>
                <input name="venue_name" value={(formData.venue_name as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Alamat</label>
                <input name="venue_address" value={(formData.venue_address as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Kota</label>
                <input name="venue_city" value={(formData.venue_city as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Provinsi</label>
                <input name="venue_province" value={(formData.venue_province as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Google Maps URL</label>
                <input name="venue_map_url" value={(formData.venue_map_url as string) || ''} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" placeholder="https://maps.google.com/..." />
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
                  <input type="date" name="akad_date" value={(formData.akad_date as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Mulai</label>
                    <input type="time" name="akad_time_start" value={(formData.akad_time_start as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Selesai</label>
                    <input type="time" name="akad_time_end" value={(formData.akad_time_end as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tempat</label>
                  <input name="akad_venue" value={(formData.akad_venue as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                </div>
              </div>
              <div className="space-y-4 p-4 bg-cream rounded-lg">
                <h3 className="font-serif text-base text-charcoal">Resepsi</h3>
                <div>
                  <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tanggal</label>
                  <input type="date" name="resepsi_date" value={(formData.resepsi_date as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Mulai</label>
                    <input type="time" name="resepsi_time_start" value={(formData.resepsi_time_start as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Selesai</label>
                    <input type="time" name="resepsi_time_end" value={(formData.resepsi_time_end as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Tempat</label>
                  <input name="resepsi_venue" value={(formData.resepsi_venue as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
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
                <textarea name="quote_ayat" value={(formData.quote_ayat as string) || ''} onChange={handleChange} required rows={3} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40 resize-none" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Sumber Ayat</label>
                <input name="quote_surah" value={(formData.quote_surah as string) || ''} onChange={handleChange} required className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" placeholder="QS. Ar-Rum Ayat 21" />
              </div>
            </div>
          </section>

          {/* Media */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Media</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Music URL (MP3)</label>
                <input name="music_url" value={(formData.music_url as string) || ''} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Video URL (YouTube)</label>
                <input name="video_url" value={(formData.video_url as string) || ''} onChange={handleChange} className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40" placeholder="https://youtube.com/..." />
              </div>
            </div>
          </section>

          {/* Love Story */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-lg text-charcoal">Love Story</h2>
              <button type="button" onClick={() => setIsAddingStory(!isAddingStory)} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-charcoal text-xs rounded-full hover:bg-primary-dark transition-colors">
                <Plus size={14} /> Tambah
              </button>
            </div>

            {/* Add new story form */}
            <AnimatePresence>
              {isAddingStory && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-4 p-4 bg-cream rounded-lg space-y-3">
                  <input value={newStory.title} onChange={(e) => setNewStory({ ...newStory, title: e.target.value })} placeholder="Judul cerita" className="w-full px-3 py-2 bg-white border border-primary/10 rounded-lg text-sm" />
                  <textarea value={newStory.description} onChange={(e) => setNewStory({ ...newStory, description: e.target.value })} rows={3} placeholder="Deskripsi" className="w-full px-3 py-2 bg-white border border-primary/10 rounded-lg text-sm resize-none" />
                  <input type="number" value={newStory.year} onChange={(e) => setNewStory({ ...newStory, year: e.target.value })} placeholder="Tahun" className="w-full px-3 py-2 bg-white border border-primary/10 rounded-lg text-sm" />
                  <div className="flex gap-2">
                    <button type="button" onClick={handleAddStory} className="px-3 py-1.5 bg-primary text-charcoal text-xs rounded-full">Simpan</button>
                    <button type="button" onClick={() => setIsAddingStory(false)} className="px-3 py-1.5 bg-charcoal/10 text-charcoal text-xs rounded-full">Batal</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stories list */}
            <div className="space-y-3">
              {stories.length === 0 ? (
                <p className="text-sm text-charcoal/40 text-center py-8">Belum ada love story. Klik "Tambah" untuk menambahkan.</p>
              ) : (
                stories.map((story) => (
                  <StoryItem key={story.id} story={story} onUpdate={handleUpdateStory} onDelete={handleDeleteStory} />
                ))
              )}
            </div>
          </section>

          {/* Gallery */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-lg text-charcoal">Gallery</h2>
              <button type="button" onClick={() => setIsAddingGallery(!isAddingGallery)} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-charcoal text-xs rounded-full hover:bg-primary-dark transition-colors">
                <Plus size={14} /> Tambah
              </button>
            </div>

            {/* Add new gallery form */}
            <AnimatePresence>
              {isAddingGallery && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-4 p-4 bg-cream rounded-lg space-y-3">
                  <input value={newGallery.image_url} onChange={(e) => setNewGallery({ ...newGallery, image_url: e.target.value })} placeholder="URL Gambar (https://i.ibb.co/...)" className="w-full px-3 py-2 bg-white border border-primary/10 rounded-lg text-sm" />
                  <input value={newGallery.caption} onChange={(e) => setNewGallery({ ...newGallery, caption: e.target.value })} placeholder="Caption (opsional)" className="w-full px-3 py-2 bg-white border border-primary/10 rounded-lg text-sm" />
                  <div className="flex gap-2">
                    <button type="button" onClick={handleAddGallery} className="px-3 py-1.5 bg-primary text-charcoal text-xs rounded-full">Simpan</button>
                    <button type="button" onClick={() => setIsAddingGallery(false)} className="px-3 py-1.5 bg-charcoal/10 text-charcoal text-xs rounded-full">Batal</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gallery grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleries.length === 0 ? (
                <p className="text-sm text-charcoal/40 text-center py-8 col-span-full">Belum ada foto. Klik "Tambah" untuk menambahkan.</p>
              ) : (
                galleries.map((gallery) => (
                  <GalleryItem key={gallery.id} gallery={gallery} onDelete={handleDeleteGallery} />
                ))
              )}
            </div>
          </section>

          {/* Foto Mempelai */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <Image size={18} className="text-primary" />
              <h2 className="font-serif text-lg text-charcoal">Foto Mempelai</h2>
            </div>
            <p className="text-xs text-charcoal/40 mb-6">Upload ke <a href="https://imgbb.com" target="_blank" className="text-primary underline">imgbb.com</a>, paste link di bawah.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Foto Groom</label>
                <input type="url" value={(formData.groom_photo as string) || ''} onChange={(e) => setFormData((prev) => ({ ...prev, groom_photo: e.target.value }))} placeholder="https://i.ibb.co/xxx/groom.jpg" className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40" />
                {formData.groom_photo && (
                  <div className="mt-2 relative group">
                    <img src={formData.groom_photo as string} alt="Groom" className="w-full h-40 object-cover rounded-lg border border-primary/10" />
                    <button type="button" onClick={() => setFormData((prev) => ({ ...prev, groom_photo: '' }))} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">Hapus</button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/50 uppercase mb-2">Foto Bride</label>
                <input type="url" value={(formData.bride_photo as string) || ''} onChange={(e) => setFormData((prev) => ({ ...prev, bride_photo: e.target.value }))} placeholder="https://i.ibb.co/xxx/bride.jpg" className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40" />
                {formData.bride_photo && (
                  <div className="mt-2 relative group">
                    <img src={formData.bride_photo as string} alt="Bride" className="w-full h-40 object-cover rounded-lg border border-primary/10" />
                    <button type="button" onClick={() => setFormData((prev) => ({ ...prev, bride_photo: '' }))} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">Hapus</button>
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
            <p className="text-xs text-charcoal/40 mb-6">Klik section untuk expand, paste link <strong>gambar (.jpg/.png)</strong> atau <strong>video (.mp4/.webm/YouTube)</strong>. Biarkan kosong untuk default.</p>
            <div className="space-y-2">
              {SECTIONS.map((section) => (
                <SectionAccordion key={section.key} section={section} value={((formData.backgrounds as Record<string, string>)?.[section.key]) || ''} onChange={(val) => handleBackgroundChange(section.key, val)} />
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4">
            <Link href="/admin/dashboard" className="px-6 py-3 text-sm text-charcoal/50 hover:text-charcoal/70 transition-colors">Kembali</Link>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-3 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50">
              <Save size={16} /> {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </motion.form>
      </main>
    </div>
  )
}