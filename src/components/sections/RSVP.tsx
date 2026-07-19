'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BackgroundMedia from '@/components/ui/BackgroundMedia'
import { Send } from 'lucide-react'
import { submitRSVP } from '@/services/invitation'

interface RSVPProps {
  invitationId: string
  background?: string | null
}

export default function RSVP({ invitationId, background }: RSVPProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    status: 'hadir',
    total_guests: 1,
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await submitRSVP({
        invitation_id: invitationId,
        ...formData,
      })
      setIsSuccess(true)
      setFormData({ name: '', phone: '', status: 'hadir', total_guests: 1, message: '' })
    } catch {
      alert('Gagal mengirim RSVP')
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
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4 text-glare-light">RSVP</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4 text-glare">Konfirmasi Kehadiran</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-xl mx-auto">
          {isSuccess ? (
            <ScrollReveal>
              <div className="glass-card rounded-xl p-8 text-center">
                <p className="text-lg font-serif text-warm-white mb-2 text-glare">Terima Kasih!</p>
                <p className="text-sm text-warm-white/70">Konfirmasi kehadiran Anda telah diterima.</p>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="glass-card rounded-xl p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nama Lengkap"
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-sm text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-primary/40"
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="No. WhatsApp (opsional)"
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-sm text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-primary/40"
                  />
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-sm text-warm-white focus:outline-none focus:border-primary/40"
                  >
                    <option value="hadir">Hadir</option>
                    <option value="tidak_hadir">Tidak Hadir</option>
                    <option value="ragu">Masih Ragu</option>
                  </select>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.total_guests}
                    onChange={(e) => setFormData({ ...formData, total_guests: parseInt(e.target.value) })}
                    placeholder="Jumlah Tamu"
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-sm text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-primary/40"
                  />
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    placeholder="Pesan (opsional)"
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-sm text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-primary/40 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    <Send size={16} /> {isSubmitting ? 'Mengirim...' : 'Kirim'}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  )
}