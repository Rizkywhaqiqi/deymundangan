'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getInvitationById, updateInvitation, getCurrentUser } from '@/services/invitation'
import { Heart, ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormData = Record<string, any>

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

          {/* All form sections - same as new page but with existing data */}
          {/* Using a simple approach - just key fields for editing */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
            <h2 className="font-serif text-lg text-charcoal mb-6">Edit Data</h2>
            <p className="text-xs text-charcoal/40 mb-6">
              Silakan edit data undangan di database langsung untuk perubahan lengkap. Halaman ini menyediakan toggle publikasi.
            </p>

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