'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { submitRSVP } from '@/services/invitation'
import { Send, Check } from 'lucide-react'

interface RSVPProps {
  invitationId: string
}

export default function RSVP({ invitationId }: RSVPProps) {
  const [formData, setFormData] = useState({
    guest_name: '',
    phone: '',
    is_attending: true,
    total_guests: 1,
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      await submitRSVP({
        invitation_id: invitationId,
        ...formData,
      })
      setIsSuccess(true)
    } catch {
      setError('Gagal mengirim RSVP. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section className="relative py-28 md:py-36 overflow-hidden bg-warm-white">
        <div className="section-container">
          <div className="max-w-lg mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
            >
              <Check size={32} className="text-primary" />
            </motion.div>
            <h3 className="font-display text-3xl text-charcoal mb-4">Terima Kasih!</h3>
            <p className="text-sm text-charcoal/60">
              Konfirmasi kehadiran Anda telah kami terima.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-warm-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-primary/60 uppercase mb-4">RSVP</p>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-4">Konfirmasi Kehadiran</h2>
            <div className="w-16 h-[1px] bg-primary mx-auto" />
          </ScrollReveal>
        </div>

        <div className="max-w-lg mx-auto">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/60 uppercase mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={formData.guest_name}
                  onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                  className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/60 uppercase mb-2">
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/60 uppercase mb-3">
                  Konfirmasi Kehadiran
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, is_attending: true })}
                    className={`flex-1 px-4 py-3 rounded-lg text-sm transition-all ${
                      formData.is_attending
                        ? 'bg-primary text-charcoal'
                        : 'bg-cream text-charcoal/50 hover:bg-primary/10'
                    }`}
                  >
                    Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, is_attending: false })}
                    className={`flex-1 px-4 py-3 rounded-lg text-sm transition-all ${
                      !formData.is_attending
                        ? 'bg-primary text-charcoal'
                        : 'bg-cream text-charcoal/50 hover:bg-primary/10'
                    }`}
                  >
                    Tidak Hadir
                  </button>
                </div>
              </div>

              {formData.is_attending && (
                <div>
                  <label className="block text-xs tracking-[0.1em] text-charcoal/60 uppercase mb-2">
                    Jumlah Tamu
                  </label>
                  <select
                    value={formData.total_guests}
                    onChange={(e) => setFormData({ ...formData, total_guests: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal focus:outline-none focus:border-primary/40 transition-colors"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} orang
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs tracking-[0.1em] text-charcoal/60 uppercase mb-2">
                  Pesan (Opsional)
                </label>
                <textarea
                  value={formData.message || ''}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-cream border border-primary/10 rounded-lg text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-primary/40 transition-colors resize-none"
                  placeholder="Tulis pesan untuk kami..."
                />
              </div>

              {error && (
                <p className="text-xs text-red-400 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-charcoal text-sm tracking-[0.1em] uppercase rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  'Mengirim...'
                ) : (
                  <>
                    <Send size={16} />
                    Kirim
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}