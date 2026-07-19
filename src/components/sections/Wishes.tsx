'use client'

import { useState, useEffect } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BackgroundMedia from '@/components/ui/BackgroundMedia'
import { Send, Heart, MessageCircle } from 'lucide-react'

interface WishItem {
  id: string
  name: string
  message: string
  created_at: string
}

interface WishesProps {
  invitationId: string
  background?: string | null
}

export default function Wishes({ invitationId, background }: WishesProps) {
  const [wishes, setWishes] = useState<WishItem[]>([])
  const [formData, setFormData] = useState({ name: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await fetch(`/api/wishes?invitation_id=${invitationId}`)
        if (response.ok) {
          const data = await response.json()
          setWishes(data || [])
        }
      } catch (error) {
        console.error('Error fetching wishes:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishes()
  }, [invitationId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitation_id: invitationId,
          name: formData.name,
          message: formData.message,
        }),
      })

      if (response.ok) {
        const newWish = await response.json()
        setWishes([newWish, ...wishes])
        setFormData({ name: '', message: '' })
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Error submitting wish:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-28 md:py-36 lg:py-44 overflow-hidden">
      <BackgroundMedia url={background} />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/80 uppercase mb-4 text-glare-light">Wishes</p>
            <h2 className="font-display text-4xl md:text-5xl text-warm-white mb-4 text-glare">Buku Tamu</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Form */}
          <ScrollReveal variant="left">
            <div className="glass-card rounded-xl p-6 md:p-8">
              <h3 className="font-serif text-lg text-warm-white mb-6 flex items-center gap-2 text-glare">
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-sm text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-primary/40 transition-colors"
                />
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  placeholder="Tulis ucapan untuk kedua mempelai..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-sm text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-primary/40 transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  <Send size={16} /> Kirim
                </button>
                {isSuccess && <p className="text-xs text-primary text-center">Ucapan Anda telah terkirim!</p>}
              </form>
            </div>
          </ScrollReveal>

          {/* List */}
          <ScrollReveal variant="right" delay={200}>
            <div className="glass-card rounded-xl p-6 md:p-8 max-h-[500px] overflow-y-auto">
              <h3 className="font-serif text-lg text-warm-white mb-6 flex items-center gap-2 text-glare">
                <Heart size={18} className="text-primary" />
                Ucapan ({wishes.length})
              </h3>
              {isLoading ? (
                <p className="text-sm text-warm-white/40 text-center py-8">Memuat ucapan...</p>
              ) : wishes.length === 0 ? (
                <p className="text-sm text-warm-white/40 text-center py-8">Belum ada ucapan. Jadilah yang pertama!</p>
              ) : (
                <div className="space-y-4">
                  {wishes.map((wish) => (
                    <div key={wish.id} className="p-4 bg-white/5 rounded-lg">
                      <p className="text-xs font-medium text-warm-white/80 mb-1 text-glare-light">{wish.name}</p>
                      <p className="text-sm text-warm-white/60 leading-relaxed">{wish.message}</p>
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