'use client'

import { useState, useEffect } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { getWishes, submitWish } from '@/services/invitation'
import { Send, Heart, MessageCircle } from 'lucide-react'

interface WishItem {
  id: string
  name: string
  message: string
  created_at: string
}

interface WishesProps {
  invitationId: string
}

export default function Wishes({ invitationId }: WishesProps) {
  const [wishes, setWishes] = useState<WishItem[]>([])
  const [formData, setFormData] = useState({ name: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const loadWishes = async () => {
      try {
        const data = await getWishes(invitationId)
        setWishes(data as WishItem[])
      } catch {
        // Silently fail
      }
    }
    loadWishes()
  }, [invitationId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitWish({
        invitation_id: invitationId,
        name: formData.name,
        message: formData.message,
        is_approved: false,
      })
      setFormData({ name: '', message: '' })
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3000)
    } catch {
      // Silently fail
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden bg-cream">
      <div className="section-container">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">Wishes</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Buku Tamu</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Form */}
          <ScrollReveal variant="left">
            <div className="bg-warm-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5">
              <h3 className="font-serif text-lg text-charcoal mb-6 flex items-center gap-2">
                <MessageCircle size={18} className="text-primary" />
                Tulis Ucapan
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama Anda"
                  className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40 transition-colors"
                />
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  placeholder="Tulis ucapan untuk kedua mempelai..."
                  className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40 transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Mengirim...' : (
                    <>
                      <Send size={16} />
                      Kirim
                    </>
                  )}
                </button>

                {isSuccess && (
                  <p className="text-xs text-primary text-center">
                    Ucapan Anda telah terkirim! (Menunggu persetujuan)
                  </p>
                )}
              </form>
            </div>
          </ScrollReveal>

          {/* List */}
          <ScrollReveal variant="right" delay={200}>
            <div className="bg-warm-white p-6 md:p-8 rounded-xl shadow-sm border border-primary/5 max-h-[500px] overflow-y-auto">
              <h3 className="font-serif text-lg text-charcoal mb-6 flex items-center gap-2">
                <Heart size={18} className="text-primary" />
                Ucapan ({wishes.length})
              </h3>

              {wishes.length === 0 ? (
                <p className="text-sm text-charcoal/40 text-center py-8">
                  Belum ada ucapan. Jadilah yang pertama!
                </p>
              ) : (
                <div className="space-y-4">
                  {wishes.map((wish) => (
                    <div
                      key={wish.id}
                      className="p-4 bg-cream rounded-lg"
                    >
                      <p className="text-xs font-medium text-charcoal/80 mb-1">
                        {wish.name}
                      </p>
                      <p className="text-sm text-charcoal/60 leading-relaxed">
                        {wish.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}